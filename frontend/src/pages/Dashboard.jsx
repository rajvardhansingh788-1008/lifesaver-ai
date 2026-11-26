import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, claimCoins } from '../api/client';
import { ethers } from 'ethers';
import './Dashboard.css'; // Assuming this exists or I will create it.

export default function Dashboard() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // Web3 States
  const [walletAddress, setWalletAddress] = useState(null);
  const [lscBalance, setLscBalance] = useState('0');
  const [claiming, setClaiming] = useState(false);
  const [web3Error, setWeb3Error] = useState('');
  const [web3Success, setWeb3Success] = useState('');

  // Minimal ERC20 ABI to read balance
  const tokenABI = ["function balanceOf(address owner) view returns (uint256)"];
  const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Hardhat localhost

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setStats(res.data.user);
        updateUser(res.data.user);
      } catch (err) {
        console.error('Profile error:', err);
      }
    };
    fetchProfile();
    
    // Check if wallet is already connected
    checkIfWalletIsConnected();
  }, []);

  const data = stats || user;

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const account = accounts[0];
          setWalletAddress(account);
          fetchTokenBalance(account);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection", error);
    }
  };

  const connectWallet = async () => {
    try {
      setWeb3Error('');
      if (!window.ethereum) {
        return setWeb3Error("Please install MetaMask to use Web3 features.");
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      fetchTokenBalance(accounts[0]);
    } catch (error) {
      setWeb3Error(error.message || "Failed to connect wallet.");
    }
  };

  const fetchTokenBalance = async (address) => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, tokenABI, provider);
      const balance = await contract.balanceOf(address);
      setLscBalance(ethers.formatUnits(balance, 18));
    } catch (error) {
      console.error("Failed to fetch token balance", error);
    }
  };

  const handleClaimCoins = async () => {
    if (!walletAddress) {
      return setWeb3Error("Connect your wallet first.");
    }
    if (!data?.coins || data.coins <= 0) {
      return setWeb3Error("You don't have enough E-Coins to claim.");
    }

    setClaiming(true);
    setWeb3Error('');
    setWeb3Success('');

    try {
      const res = await claimCoins({ walletAddress });
      setWeb3Success(res.data.message);
      
      // Update local UI state
      setStats(prev => ({ ...prev, coins: res.data.remainingCoins }));
      updateUser({ coins: res.data.remainingCoins });

      // Wait a few seconds to let blockchain update, then refresh balance
      setTimeout(() => fetchTokenBalance(walletAddress), 3000);
    } catch (error) {
      setWeb3Error(error.response?.data?.error || "Failed to claim coins. Make sure backend is running and contract is deployed.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="dashboard-page">
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="logo-icon">🛡️</span>
          <span>LifeSaver AI</span>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/simulation" className="nav-link">2D Simulate</Link>
          <Link to="/simulation-3d" className="nav-link">3D Simulate</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back, <span className="highlight">{data?.name}</span>!</h1>
          <p>Ready to continue your disaster preparedness training?</p>
        </div>

        {/* WEB3 WALLET SECTION */}
        <div className="web3-wallet-section">
          <div className="web3-header">
            <h3>🌐 Web3 Crypto Wallet</h3>
            {walletAddress ? (
              <span className="wallet-badge connected">Connected: {walletAddress.substring(0,6)}...{walletAddress.substring(38)}</span>
            ) : (
              <span className="wallet-badge disconnected">Not Connected</span>
            )}
          </div>
          
          <div className="web3-content">
            <div className="crypto-balance">
              <span className="crypto-icon">💎</span>
              <div className="crypto-info">
                <h4>{lscBalance} LSC</h4>
                <p>LifeSaverCoin Balance (On-Chain)</p>
              </div>
            </div>

            <div className="web3-actions">
              {!walletAddress ? (
                <button className="btn-primary web3-btn" onClick={connectWallet}>
                   Connect MetaMask
                </button>
              ) : (
                <button 
                  className="btn-primary claim-btn" 
                  onClick={handleClaimCoins}
                  disabled={claiming || !data?.coins || data.coins <= 0}
                >
                  {claiming ? "Minting..." : `💸 Claim ${data?.coins || 0} E-Coins to Wallet`}
                </button>
              )}
            </div>
          </div>

          {web3Error && <div className="error-msg" style={{ marginTop: '10px' }}>{web3Error}</div>}
          {web3Success && <div className="success-msg" style={{ marginTop: '10px', color: '#4ade80' }}>✔ {web3Success}</div>}
        </div>

        <div className="stats-grid">
          <div className="stat-card coins-card">
            <div className="stat-icon">🪙</div>
            <div className="stat-info">
              <span className="stat-value coin-value">{data?.coins || 0}</span>
              <span className="stat-label">In-Game E-Coins</span>
            </div>
          </div>
          <div className="stat-card accuracy-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-value">{data?.accuracy || 0}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
          <div className="stat-card scenarios-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <span className="stat-value">{data?.scenariosAttempted || 0}</span>
              <span className="stat-label">Scenarios Attempted</span>
            </div>
          </div>
          <div className="stat-card school-card">
            <div className="stat-icon">🏫</div>
            <div className="stat-info">
              <span className="stat-value school-name">{data?.school || 'Not specified'}</span>
              <span className="stat-label">School</span>
            </div>
          </div>
        </div>

        <div className="action-grid">
          <div className="action-card action-simulate" onClick={() => navigate('/simulation')}>
            <div className="action-icon">🎮</div>
            <h3>Start Simulation</h3>
            <p>Face an AI-generated disaster scenario safely.</p>
            <span className="action-arrow">→</span>
          </div>
          <div className="action-card action-simulate" onClick={() => navigate('/simulation-3d')} style={{ '--fire-glow': 'rgba(99, 102, 241, 0.25)' }}>
            <div className="action-icon">🕶️</div>
            <h3>3D Simulation</h3>
            <p>Experience realistic moving 3D disasters (New!).</p>
            <span className="action-arrow">→</span>
          </div>
          <div className="action-card action-quiz" onClick={() => navigate('/quiz')}>
            <div className="action-icon">📝</div>
            <h3>Take Quiz</h3>
            <p>Test your knowledge and earn extra E-Coins.</p>
            <span className="action-arrow">→</span>
          </div>
          <div className="action-card action-board" onClick={() => navigate('/leaderboard')}>
            <div className="action-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>See top students and schools in the network.</p>
            <span className="action-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
