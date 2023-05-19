//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract Batch  {
  
  function splitEthToArrayOfAddresses(address payable[] calldata _addresses,uint256 amount) external payable {
    for (uint256 i = 0; i < _addresses.length; i++) {
      //_addresses[i].transfer(amount); // but lets do call format
      _addresses[i].call{value: amount}("");
      //require(success, "Transfer failed.");
    }
    //send all the money in the contract to the msg sender
    //msg.sender.transfer(address(this).balance); //but use call
    msg.sender.call{value: address(this).balance}("");
  }
  
}
