//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * ERC20 token contract for Events.
 */
contract EventGems is ERC20 {

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner) ERC20("EventGems", "EGM") {
        _mint(_owner, 1000 ether);
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
