const { ethers } = require('ethers');
const { User } = require('../models');

// Configure this when the contract is deployed.
// In a real app, these come from process.env
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

// Hardhat default account #0 (Owner/Deployer)
// WARNING: NEVER HARDCODE PRIVATE KEYS IN PRODUCTION!
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

// Minimal ERC20 ABI just for the mint function
const contractABI = [
  "function mint(address to, uint256 amount) public"
];

const mintWallet = new ethers.Wallet(PRIVATE_KEY, provider);
const lifeSaverCoin = new ethers.Contract(CONTRACT_ADDRESS, contractABI, mintWallet);

const claimCoins = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const { walletAddress } = req.body;
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Valid Ethereum wallet address is required.' });
    }

    const user = await User.findByPk(userId);
    if (!user || user.coins <= 0) {
      return res.status(400).json({ error: 'Insufficient E-Coins to claim.' });
    }

    const coinsToClaim = user.coins;
    
    // We deduct the coins first to prevent double-spending
    user.coins = 0;
    await user.save();

    try {
      // Amount needs to be converted to wei (18 decimals)
      // Example: 10 E-Coins -> 10 * 10^18 tokens
      const amountToMint = ethers.parseUnits(coinsToClaim.toString(), 18);

      // Call the mint function on the blockchain
      const tx = await lifeSaverCoin.mint(walletAddress, amountToMint);
      await tx.wait(); // Wait for confirmation

      res.json({
        success: true,
        message: `Successfully minted ${coinsToClaim} LSC to ${walletAddress}`,
        txHash: tx.hash,
        remainingCoins: user.coins
      });
    } catch (mintError) {
      console.error('Blockchain Mint Error:', mintError);
      
      // If blockchain tx failed, refund the user's database coins!
      user.coins = coinsToClaim;
      await user.save();
      
      return res.status(500).json({ error: 'Failed to claim coins on the blockchain: ' + (mintError.reason || mintError.message) });
    }

  } catch (error) {
    console.error('Web3 Claim Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred: ' + error.message });
  }
};

module.exports = { claimCoins };
