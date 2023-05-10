//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

abstract contract EventGemsContract {
  function mint(address to, uint256 amount) public virtual;
}

/**
 * ERC721 soulbound token contract for Events.
 */
contract EventSBT is ERC721Enumerable, Ownable {
  EventGemsContract eventGemsContract;

  mapping(uint => string) private _tokenMappings;
  mapping(uint => uint) private _tokenToType;
  mapping(uint => uint) private _amountMinted;
  mapping(address => mapping(uint => bool)) private _mintedByAddress;

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner, address gemAddress) ERC721("EventSBT", "ESBT") {
    _tokenMappings[19273198273] = "QmebGFqdLR4C4ZzeAA2tWxQW5jgqq6frhiusfZsv4kr8zy";
    _tokenMappings[3453465376] = "QmUFw1rVNBUhfB5fPMgBxXnveaPirkej5s44w1QczTYWui";
    _tokenMappings[1122334455] = "QmNXbXkZyFwEuvZDCmtMAPrX6Kx3hnfW6KEJJg3rUvUE7x";

    transferOwnership(_owner);
    eventGemsContract = EventGemsContract(gemAddress);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return string.concat(_baseURI(), _tokenMappings[_tokenToType[tokenId]]);
  }

  uint256 public supply = 0;

  function mint(address to, uint256 tokenType) public virtual {
    bytes memory tokenBytes = bytes(_tokenMappings[tokenType]);
    require(tokenBytes.length > 0, "SBT: invalid token type");
    require(_mintedByAddress[to][tokenType] == false, "SBT: already minted");

    _tokenToType[supply] = tokenType;
    _amountMinted[tokenType] = _amountMinted[tokenType] + 1;
    _mintedByAddress[to][tokenType] = true;

    eventGemsContract.mint(to, 5 ether);
    // mint (20 - (_amountMinted[tokenType]/10)) diamonds
    _mint(to, supply++);
  }

  function addTokenType(uint256 tokenType, string memory uri) public onlyOwner {
    _tokenMappings[tokenType] = uri;
  }

  function addTokenTypeBatch(uint256[] memory tokenTypes, string[] memory uris) public onlyOwner {
    for (uint i = 0; i < tokenTypes.length; i++) {
      _tokenMappings[tokenTypes[i]] = uris[i];
    }
  }

  //soul bound
  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override {
    require(from == address(0), "SBT: token transfer not allowed");

    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {}
}
