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

  mapping(uint => string) private _tokenMappings;
  mapping(uint => uint) private _tokenToType;
  mapping(uint => uint) private _deadlines;
  mapping(uint => uint) private _amountMinted;
  mapping(address => mapping(uint => bool)) private _mintedByAddress;

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner, address gemAddress) ERC721("EventSBT", "ESBT") {
    _tokenMappings[1066212499] = "QmQx2dRHteZvTVckrgL261EiXkrbdrZomnVHop8ndtcdSX";
    _tokenMappings[1152785339] = "QmRMLViPmmLte5Qh5zyjLYVUrkXHbeQ5ajeheqAbTMfi7u";
    _tokenMappings[1470339894] = "QmPFVVxDZwb8fp4bU3AMHmjJVsHNMgUiwCjps17EAcQvUy";
    _tokenMappings[1486094948] = "QmRverdPEvezk6rYjBDwqbxjezfseMggiYE9x8qCHWXvnv";
    _tokenMappings[1775823636] = "QmamHWWYXfpeEeiQnxw8N4MLUjnYhvkXqrcEtjiXL9ZVJ6";
    _tokenMappings[1897450059] = "QmRwexcrvNFKaKwjPzGPwoiD7u4JEurbusD3cHNaxxUcus";
    _tokenMappings[3047684315] = "QmeofozPwfGoFsJJgvR2muCrbVmUGvYFMP5e7iT4YnRbfs";
    _tokenMappings[3180570215] = "QmPdrjaWZKKY8uj5ZR7JwbLnF7E6Wn1iyKrs1KXCJuVZ1x";
    _tokenMappings[3493854200] = "QmR2UF3iMCxowRRJjjCmukvUaoQnWGZzT5bMaoo1GFw5Ds";
    _tokenMappings[3536130927] = "QmakJpYkkmxftpqjwc6qsLYd6a8Z2D4wRtqoYPWk1dkBLF";
    _tokenMappings[3601829102] = "QmQAniyBCFZ5tXmLvffneKJCbH6kQmEF97eHXNMcdNhf1Y";
    _tokenMappings[3822163328] = "QmVBQf3n4K5AfXJyieY6DJmHMmTuzKmcAwCM5RHfYzBmEV";
    _tokenMappings[4002193819] = "QmYaySJxZHE2kH7FBYCNjbetHtFkHkxGeZzoAFxziHgbu6";
    _tokenMappings[4145416817] = "QmYMvnm14ujWMFGhfGxUy4hVChkNsQK1dqbJ6Xxivogdoy";
    _tokenMappings[4230353047] = "QmUmKa7FeyVGRYEF1W2qS8DECNppYssGUefUfceZZPtCen";
    _tokenMappings[5225978028] = "QmS31yoDYSNkYhp6PJf2wNs9c7KqXx2pBY1Vk6fggzRa1U";
    _tokenMappings[6256967705] = "QmcLYiDbRm1tTXiRbxaT4aZ9Yc5rp7DG3pGeM162w4DxSm";
    _tokenMappings[400997836] = "QmP1UEUUKG8pamTbUs449WZcpqkeQ2WmHuFZKWcukbWhuo";
    _tokenMappings[5813981926] = "QmTNVgaaEx9caxLwvv5KrBz23CKbpLkNXLE8twh5B3pup2";
    _tokenMappings[832534473] = "QmcWtmt1UX3Bu6jw5e5ygD8tFgb1NEELeRV1VH9r4bKSy4";
    _tokenMappings[7878782959] = "QmRnoMeyAgqPVAkEu2sARVsQTSutsydWmLQ2LCmQGt8P8X";
    _tokenMappings[7204923664] = "QmVr7XdvsdiAYoMNAJjkokemWEm8HVFzqSF7ZAAyG891ek";
    _tokenMappings[9434728409] = "QmdvA9EVmDMFeDLwdB6JYWLm3Naebd75yKzuLyCCsUhhae";
    _tokenMappings[9499679904] = "QmaGsnJEEWhEuKLcwXW9k9XPWevbQDXb2JXpnM9GBv5WTQ";
    _tokenMappings[9178845366] = "QmSpSPfWsqoAhx9Z9wq4pVhzyRMg75wiSTieEupsLg2eLK";
    _tokenMappings[5581757411] = "QmfYZjZ2Bm98ejxSuYogZFY4wEq7TVyo1ejvdTNBakgkR2";
    _tokenMappings[8766938167] = "QmXYEBQHEn6X3h4m8ENehnMssRFPbP8ujeWizYwUL8t3Ed";
    _tokenMappings[6379388553] = "QmSJXhH5g6GsjywVXC6SWEAaxasHpamz5fbZcs6cch8Qx1";
    _tokenMappings[5796444724] = "QmWMK317givCe8ojm3FqeZov8EVBWSD4mkH7euvCjDNBDV";
    _tokenMappings[4996736397] = "QmVXaDjB8PcMrLNdsPiaTqNKKx1myLCPd6SZYncjRVmoJ7";
    _tokenMappings[730379712] = "QmfNg36DFy8GzFek5KVvEui7oCF79evshwvcBU4cCyzr94";
    _tokenMappings[844853892] = "QmeYGmudhfa9MTnj8xj54QPWt84ud25SSggNE49D7DbRKQ";
    _tokenMappings[6090030330] = "QmfLeLtBbisZ68ryHdptCJ4RnkxGr7iF61MjquieyUh9sC";
    _tokenMappings[6735593017] = "QmSeUHXLfSbfJh8jXv4RGGfyNsDtpHhsqbmB837fGAU9Cq";
    _tokenMappings[5933657837] = "QmSFDd2bhBtZWbcnThfPr888aCnobHADTCKghgKzGq4b1B";
    _tokenMappings[6710911400] = "QmPAVjd6sVPhBWmne9ZNTHmjCaoAyXN52pG6wo4wGQxq62";
    _tokenMappings[6911524420] = "QmTogZwarN6CTZYmfZUpAFvZ788ZHeB8LX5CQjWbmdNzWU";
    _tokenMappings[9618105629] = "QmS2jxN7vsBsDjzmvS7BR7oJwvWS9RdtRay5P6uhhaCW2P";
    _tokenMappings[9484111446] = "Qmb1SGLqn3NvV4ndBpsbGfas9wNffEo2fTKRWo4zEYuMMb";
    _tokenMappings[612490202] = "QmUjwrUJD98ukH1YJLXMnWYWBX6sWQrC88G6ngjwmX5ZTs";
    _tokenMappings[376228402] = "QmYhuLq5jxoEyixT91TyyPjggu3d4GnT6ZXCAcTHf252rR";

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



  function mint(address to, uint256 tokenType) public whenNotPaused {
    bytes memory tokenBytes = bytes(_tokenMappings[tokenType]);
    require(tokenBytes.length > 0, "SBT: invalid token type");
    require(_mintedByAddress[to][tokenType] == false, "SBT: already minted");

    _tokenToType[supply] = tokenType;
    _amountMinted[tokenType] = _amountMinted[tokenType] + 1;
    _mintedByAddress[to][tokenType] = true;

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
