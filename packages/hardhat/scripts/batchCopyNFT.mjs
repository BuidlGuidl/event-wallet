import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const backmapping = {
  "QmYhuLq5jxoEyixT91TyyPjggu3d4GnT6ZXCAcTHf252rR": 376228402,
  "QmP1UEUUKG8pamTbUs449WZcpqkeQ2WmHuFZKWcukbWhuo": 400997836,
  "QmUjwrUJD98ukH1YJLXMnWYWBX6sWQrC88G6ngjwmX5ZTs": 612490202,
  "QmfNg36DFy8GzFek5KVvEui7oCF79evshwvcBU4cCyzr94": 730379712,
  "QmcWtmt1UX3Bu6jw5e5ygD8tFgb1NEELeRV1VH9r4bKSy4": 832534473,
  "QmeYGmudhfa9MTnj8xj54QPWt84ud25SSggNE49D7DbRKQ": 844853892,
  "QmQx2dRHteZvTVckrgL261EiXkrbdrZomnVHop8ndtcdSX": 1066212499,
  "QmRMLViPmmLte5Qh5zyjLYVUrkXHbeQ5ajeheqAbTMfi7u": 1152785339,
  "QmTgiVr5MsB8rAYXXd8HXjUbULac2CW1zDUHJ8e77sLBbA": 1208133159,
  "QmPFVVxDZwb8fp4bU3AMHmjJVsHNMgUiwCjps17EAcQvUy": 1470339894,
  "QmRverdPEvezk6rYjBDwqbxjezfseMggiYE9x8qCHWXvnv": 1486094948,
  "QmXyXPH6N4LH14jonExnmQW7srawnESf3tU2bFGx2XzbKf": 1618976604,
  "QmamHWWYXfpeEeiQnxw8N4MLUjnYhvkXqrcEtjiXL9ZVJ6": 1775823636,
  "QmRwexcrvNFKaKwjPzGPwoiD7u4JEurbusD3cHNaxxUcus": 1897450059,
  "QmaPA7Cr5ZJGL4ndpRppuMXynssQAfA31k9pS3TJ18CopV": 2195506947,
  "QmeofozPwfGoFsJJgvR2muCrbVmUGvYFMP5e7iT4YnRbfs": 3047684315,
  "QmPdrjaWZKKY8uj5ZR7JwbLnF7E6Wn1iyKrs1KXCJuVZ1x": 3180570215,
  "QmR2UF3iMCxowRRJjjCmukvUaoQnWGZzT5bMaoo1GFw5Ds": 3493854200,
  "QmakJpYkkmxftpqjwc6qsLYd6a8Z2D4wRtqoYPWk1dkBLF": 3536130927,
  "QmQAniyBCFZ5tXmLvffneKJCbH6kQmEF97eHXNMcdNhf1Y": 3601829102,
  "Qmc5kneXwtGeN4vXkQc8gaT2ETsHgp7H7SCwnkRDbBokPf": 3739034685,
  "QmVBQf3n4K5AfXJyieY6DJmHMmTuzKmcAwCM5RHfYzBmEV": 3822163328,
  "Qmd2sCNFDpZXEd5JbursevUUqsFzNNuuBufR4ggQBFbSBm": 3923742679,
  "QmYaySJxZHE2kH7FBYCNjbetHtFkHkxGeZzoAFxziHgbu6": 4002193819,
  "QmYMvnm14ujWMFGhfGxUy4hVChkNsQK1dqbJ6Xxivogdoy": 4145416817,
  "QmUmKa7FeyVGRYEF1W2qS8DECNppYssGUefUfceZZPtCen": 4230353047,
  "QmS31yoDYSNkYhp6PJf2wNs9c7KqXx2pBY1Vk6fggzRa1U": 5225978028,
  "QmcLYiDbRm1tTXiRbxaT4aZ9Yc5rp7DG3pGeM162w4DxSm": 6256967705,
  "QmTNVgaaEx9caxLwvv5KrBz23CKbpLkNXLE8twh5B3pup2": 5813981926,
  "QmRnoMeyAgqPVAkEu2sARVsQTSutsydWmLQ2LCmQGt8P8X": 7878782959,
  "QmVr7XdvsdiAYoMNAJjkokemWEm8HVFzqSF7ZAAyG891ek": 7204923664,
  "QmdvA9EVmDMFeDLwdB6JYWLm3Naebd75yKzuLyCCsUhhae": 9434728409,
  "QmaGsnJEEWhEuKLcwXW9k9XPWevbQDXb2JXpnM9GBv5WTQ": 9499679904,
  "QmYfYdR7i6wowXXM8YD7j9fnoLvKrErZ42ngr95fnmhtoi": 9178845366,
  "QmfYZjZ2Bm98ejxSuYogZFY4wEq7TVyo1ejvdTNBakgkR2": 5581757411,
  "QmXYEBQHEn6X3h4m8ENehnMssRFPbP8ujeWizYwUL8t3Ed": 8766938167,
  "QmSJXhH5g6GsjywVXC6SWEAaxasHpamz5fbZcs6cch8Qx1": 6379388553,
  "QmWMK317givCe8ojm3FqeZov8EVBWSD4mkH7euvCjDNBDV": 5796444724,
  "QmVXaDjB8PcMrLNdsPiaTqNKKx1myLCPd6SZYncjRVmoJ7": 4996736397,
  "QmfLeLtBbisZ68ryHdptCJ4RnkxGr7iF61MjquieyUh9sC": 6090030330,
  "QmSeUHXLfSbfJh8jXv4RGGfyNsDtpHhsqbmB837fGAU9Cq": 6735593017,
  "QmSFDd2bhBtZWbcnThfPr888aCnobHADTCKghgKzGq4b1B": 5933657837,
  "QmPAVjd6sVPhBWmne9ZNTHmjCaoAyXN52pG6wo4wGQxq62": 6710911400,
  "QmTogZwarN6CTZYmfZUpAFvZ788ZHeB8LX5CQjWbmdNzWU": 6911524420,
  "QmS2jxN7vsBsDjzmvS7BR7oJwvWS9RdtRay5P6uhhaCW2P": 9618105629,
  "Qmb1SGLqn3NvV4ndBpsbGfas9wNffEo2fTKRWo4zEYuMMb": 9484111446,
  "QmVvzE4TYJ2HEopAc962dGFDf7hjxGkztnDg5hyfY6oueu": 7880610541,
  "QmNeUwkqieJaycjPj3JZzqaSFrAsJHJgivuTByFc1LVeB6": 6050659325,
  "QmcrDGyViJAS6gUJbkUb6ZmqhGUVfGRpGfEzJDPHTsQGb1": 4867417766,
  "Qme2WtyRavPTszRixDZkXwCJbeMnPVDPjgiyhiSGuUDE5r": 6324807063,
  "QmYeY1XvcJk9WQTqQpLHz7GtpjHqE2EfgDKu9Woviu9wFq": 7845796305,
  "QmYeLDTpyJsJBm7YaADptE3qjeGWbHDqxf323azDHrMN3P": 4920984003,
  "QmUz76r6oGRSVKyhiHMFpL7LSMmwCd5HTSwBcmNVqX4pRE": 9974389911
};

/**
 * Henerate PDFs for each account.
 */
async function main() {
  // Get the deployer key from .env file
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  // Connect to Gnosis chain
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.eu-central-2.gateway.fm/v4/gnosis/non-archival/mainnet?apiKey=Kl9rMDPptvWGpaY1WNUGsHr0jr4G2uRW.hc18qxYscJg926Ax",
  );

  // Initiate the wallet (signer)
  const wallet = new ethers.Wallet(privateKey, provider);

  // Define the contract address and ABI
  const contractAddress = "0x4c3D3927d849704249064a7bfB85b75D09861Ab1";
  const contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "gemAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenType",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "addTokenType",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "tokenTypes",
          type: "uint256[]",
        },
        {
          internalType: "string[]",
          name: "uris",
          type: "string[]",
        },
      ],
      name: "addTokenTypeBatch",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "to",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "tokenType",
          type: "uint256[]",
        },
      ],
      name: "batchMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenType",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "supply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
  // Initiate the contract
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);


  //read batchMintThese.json 

  const batchMintTheseCached = await fs.readFileSync("batchMintThese.json");

  const allBatchMintThese = JSON.parse(batchMintTheseCached);

  if(allBatchMintThese){

    //console.log("allBatchMintThese is ready:",allBatchMintThese)

    const addresses = allBatchMintThese.map((item) => item.address);
    const tokenTypes = allBatchMintThese.map((item) => String(item.backmapping));

    //slice into batches of 50
    for(let i=0 ; i < addresses.length; i+=100){
      const batchAddresses = addresses.slice(i, i+100);
      const batchTokenTypes = tokenTypes.slice(i, i+100);

      console.log(JSON.stringify(batchAddresses));
      console.log(JSON.stringify(batchTokenTypes));

      console.log(i,"--------------------\n\n\n")
      /*
      const tx = await contract.batchMint(batchAddresses, batchTokenTypes, { gasLimit: 3000000} );

      console.log("tx", tx);

      await tx.wait();

      console.log("tx mined");*
      */
    }
   
  

  }else{

    const cachedEvents = await fs.readFileSync("allMintEvents.json");

    const allEvents = JSON.parse(cachedEvents);
  
    const batchMintThese = []
  
    if(!allEvents) {
      // Fetch all 'Mint' events from the contract
      const filter = contract.filters.Transfer();
      const events = await contract.queryFilter(filter);
  
      console.log("events", events);
  
      fs.writeFileSync("allMintEvents.json", JSON.stringify(events, null, 2));
  
    }else{
      console.log("cached events", allEvents);
  
      //FOR ALL EVENTS 
      for(let i = 0; i < allEvents.length; i++){
          let anEvent = allEvents[i];
  
        console.log("anEvent",anEvent.args[1], ethers.BigNumber.from( anEvent.args[2] ).toNumber());
        const tokenUri = (await contract.tokenURI(ethers.BigNumber.from( anEvent.args[2] ).toNumber())).replace("https://ipfs.io/ipfs/","");
        console.log("tokenUri", tokenUri);
        //use backmapping
        console.log("backmapping", backmapping[tokenUri])
        batchMintThese.push({
          address: anEvent.args[1],
          tokenId: ethers.BigNumber.from( anEvent.args[2] ).toNumber(),
          tokenUri: tokenUri,
          backmapping: backmapping[tokenUri]
        })
        
      }
  
      console.log("batchMintThese", batchMintThese);
      fs.writeFileSync("batchMintThese.json", JSON.stringify(batchMintThese, null, 2));
  
    }
  }









  /*
  const records = events.reduce((acc, event) => {
    // Extract the minter address and token ID from event args
    const { _to, _tokenId } = event.args;

    // Add this record to the accumulated object
    acc[_to] = _tokenId.toString();

    return acc;
  }, {});*/

  // Write data to JSON file
  //fs.writeFileSync("out.json", JSON.stringify(records, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
