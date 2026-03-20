// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LifeSaverCoin is ERC20, Ownable {
    // Pass msg.sender as the initial owner.
    constructor() ERC20("LifeSaverCoin", "LSC") Ownable(msg.sender) {
        // Optionally mint an initial supply to the owner (e.g., 1 million tokens for liquidity)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /**
     * @dev Mint new tokens to an address. Only the owner (backend) can call this.
     * @param to The address of the user who earned the E-Coins.
     * @param amount The number of tokens to mint (in wei).
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
