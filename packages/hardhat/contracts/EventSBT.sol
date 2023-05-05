//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * ERC20 token contract for Events.
 */
contract EventSBT is ERC721, Ownable {

    mapping (uint => string) private _tokenMappings;
    mapping (uint => uint) private _tokenToType;
    mapping (uint => uint) private _amountMinted;

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner) ERC721("EventSBT", "ESBT") {
        _tokenMappings[19273198273] = "https://ipfs.io/ipfs/QmY9j9csK89C1huoirBCurhVv2g59XNL9RNUJexLeyrxmK";
        _tokenMappings[3453465376] = "https://ipfs.io/ipfs/QmY9j9csK89C1huoirBCurhVv2g59XNL9RNUJexLeyrxmK";
        transferOwnership(_owner);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenMappings[_tokenToType[tokenId]];
    }

    uint256 public supply = 0;

    function mint(address to, uint256 tokenType) public virtual {
        // valid token type ? 
        // they dont own this already 
        
        _tokenToType[supply] = tokenType;
        _amountMinted[tokenType] = _amountMinted[tokenType] + 1;
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
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {
        //we might need to check if from is address(0) and then it's okay 

        // some thing isn't working here 

        require(false, "SBT: token transfer not allowed");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
