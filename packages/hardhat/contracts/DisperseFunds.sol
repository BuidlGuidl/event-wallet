// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 is Ownable {
    function transfer(address, uint256) external returns(bool);
}

contract DisperseFunds {
    error UserClaimed();
    address public saltAddr;
    uint256 public constant saltFaucetAmount = 25 ether;
    uint256 public constant daiFaucentAmount = 0.1 ether;
    mapping (address => bool) addressClaimed;
    

    constructor(address _saltAddr) {
        saltAddr = _saltAddr;
    }

    function disperseBatch(address[] users) external onlyOwner {
        uint256 userLen = users.length;

        for (uint256 i; i < userLen; i++) {
            address user = users[i];
            // check if address has already claimed
            if (addressClaimed[user]) revert UserClaimed();

            // send xDAI & SALT
            payable(user).call{value: daiFaucentAmount}("");
            IERC20(saltAddr).transfer(user, saltFaucetAmount);
            
            addressClaimed[user] = true;
        }
    }
}