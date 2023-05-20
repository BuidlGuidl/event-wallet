// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CongratsVIPLounge is Ownable {
  address[] public VIPs;

  function setVIPStatus (address addy) public onlyOwner {
    VIPs.push(addy);
  }

  function getAddresses() public view returns (address[] memory) {
    return VIPs;
  }

}