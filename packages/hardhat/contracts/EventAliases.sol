// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EventAliases is Ownable {
  mapping(address => string) public aliases;

  function setName(string memory name) public {
    aliases[msg.sender] = name;
  }

  function adminSetName(address user, string memory name) public onlyOwner {
    aliases[user] = name;
  }

  function getNames(address[] memory users) public view returns (string[] memory) {
    string[] memory resolvedNames = new string[](users.length);

    for (uint i = 0; i < users.length; i++) {
      resolvedNames[i] = aliases[users[i]];
    }

    return resolvedNames;
  }
}