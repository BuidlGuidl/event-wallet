//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

abstract contract EventGemsContract {
  function mint(address to, uint256 amount) public virtual;
}

/**
 * ERC721 soulbound token contract for Events.
 */
contract EventSBT is ERC721Enumerable, Ownable, Pausable {
  EventGemsContract eventGemsContract;

  uint256 public constant DEADLINE_TIME = 2 days;

  mapping(uint => string) private _tokenMappings;
  mapping(uint => uint) private _tokenToType;
  mapping(uint => uint) private _deadlines;
  mapping(uint => bool) private _noDeadline;
  mapping(uint => uint) private _amountMinted;
  mapping(address => mapping(uint => bool)) private _mintedByAddress;

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner, address gemAddress) ERC721("EventSBT", "ESBT") {
    _tokenMappings[5833866498] = "QmPwABJ7inpBUxkerJ2yddNEg8y8pxshAsbT9ukSJoLEDv";
    _tokenMappings[9575260270] = "QmQEksNfFrTkAvtvzAf6PHdXshyPcGkZhUT7mALH8BJH1o";
    _tokenMappings[9699728194] = "QmVyYzzR1vYfKBSBVdMjcvDV3UbyHRW5xx9x22BgDaE1yA";

    _noDeadline[5833866498] = true;

    transferOwnership(_owner);
    eventGemsContract = EventGemsContract(gemAddress);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return string.concat(_baseURI(), _tokenMappings[_tokenToType[tokenId]]);
  }

  uint256 public supply = 0;

  function batchMint(address[] memory to, uint256[] memory tokenType) public onlyOwner {
    require(to.length == tokenType.length, "SBT: invalid input");
    for (uint256 i = 0; i < to.length; i++) {
      bytes memory tokenBytes = bytes(_tokenMappings[tokenType[i]]);
      require(tokenBytes.length > 0, "SBT: invalid token type");
      require(_mintedByAddress[to[i]][tokenType[i]] == false, "SBT: already minted");

      _tokenToType[supply] = tokenType[i];
      _amountMinted[tokenType[i]] = _amountMinted[tokenType[i]] + 1;
      _mintedByAddress[to[i]][tokenType[i]] = true;

      _mint(to[i], supply++);
    }
  }

  function mint(address to, uint256 tokenType) public whenNotPaused {
    bytes memory tokenBytes = bytes(_tokenMappings[tokenType]);
    require(tokenBytes.length > 0, "SBT: invalid token type");
    require(_mintedByAddress[to][tokenType] == false, "SBT: already minted");
    require(
      _noDeadline[tokenType] || _deadlines[tokenType] == 0 || _deadlines[tokenType] > block.timestamp,
      "SBT: deadline passed"
    );

    _tokenToType[supply] = tokenType;
    _amountMinted[tokenType] = _amountMinted[tokenType] + 1;
    _mintedByAddress[to][tokenType] = true;

    if (_amountMinted[tokenType] == 10) {
      _deadlines[tokenType] = block.timestamp + DEADLINE_TIME;
    }

    if (_amountMinted[tokenType] < 200) {
      eventGemsContract.mint(to, (10 - (_amountMinted[tokenType] / 20)) * 1 ether);
    } else {
      eventGemsContract.mint(to, 1 ether);
    }

    _mint(to, supply++);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
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
