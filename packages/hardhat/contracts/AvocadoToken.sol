//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * ERC20 token contract for Events.
 */
contract AvocadoToken is ERC20, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor(address _owner) ERC20("Avocado", "AVC") {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _mint(_owner, 60000 ether);
  }

  function transferOwnership(address newOwner) public onlyRole(DEFAULT_ADMIN_ROLE) {
    require(!hasRole(DEFAULT_ADMIN_ROLE, newOwner), "Ownable: new owner already have admin role");

    grantRole(DEFAULT_ADMIN_ROLE, newOwner);
    renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {}
}
