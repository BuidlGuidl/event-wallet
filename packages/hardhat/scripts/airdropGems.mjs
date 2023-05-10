
import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import * as fs from "fs";
const readFile = 'accounts.json';

  
//const RPCURL = "https://eth-goerli.g.alchemy.com/v2/"+process.env.ALCHEMY //"https://rpc.scaffoldeth.io:48544/"
//const RPCURL = "https://rpc.gnosischain.com"
const RPCURL = "https://rpc2.sepolia.org/"

const GEMS_ADDRESS = "0x2fFCE47161611DD4B8b57229C8cdf4610d8049E5";


async function main() {

/**
 * Generate list of new random private key and write it to a json file
 */

  // Check if amount argument is provided
  const [amount] = process.argv.slice(2);
  if (!amount) {
    console.error("🚫️ Please provide an amount. E.g. yarn airdrop-gems 2");

  }else{

    console.log("💦 air dropping gems...");

    
    const wallets = JSON.parse(fs.readFileSync(readFile, 'utf8'));
    console.log("wallets",wallets)


    console.log(" 📡 Connecting to RPC: " +RPCURL)
    const provider = new ethers.providers.JsonRpcProvider(RPCURL);
    
    // Replace with your private key or mnemonic phrase
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

    if(!privateKey){
      console.error("🚫️ Please provide a private key (use 'yarn generate' to create one)");
      return;
    }

    // Create a signer using the private key or mnemonic phrase
    const signer = new ethers.Wallet(privateKey).connect(provider);
    

    console.log("🔑 Signing with " + await signer.getAddress());

    console.log("📚 reading gems contract artifacts...");

    const gemsContractArtifacts = fs.readFileSync("./artifacts/contracts/EventGems.sol/EventGems.json", 'utf8')

    const gemsContractArtifactsParsed = JSON.parse(gemsContractArtifacts)

    //console.log("gemsContractArtifactsParsed",gemsContractArtifactsParsed)

    const contract = new ethers.Contract( GEMS_ADDRESS , gemsContractArtifactsParsed.abi , signer );

    console.log("📡 Checking balance of signer "+signer.address+" from contract: " + GEMS_ADDRESS);

    const balance = await contract.balanceOf(signer.address);

    console.log("🏦 Signer Token Balance: " + ethers.utils.formatEther(balance));

    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
    //const contract = new ethers.Contract(contractAddress, [
    //  "function transfer(address recipient, uint256 amount) public",
    //], signer);
  
    const allPromises = [];

    for (const address in wallets) {
      //const tx = await contract.transfer(address, ethers.utils.parseEther(amount));
      //send eth

      console.log("✨ checking "+address)

      const balance = await contract.balanceOf(address);
      console.log("💫 balance",ethers.utils.formatEther(balance))

      const amountToSend = ethers.utils.parseEther(amount)

      if(balance.lt(amountToSend)){

        /*const tx = await signer.sendTransaction({
          to: address,
          value: amountToSend,
        });*/
        console.log("💸 airdropping gems to: " + address);
        const receipt = await contract.transfer(address, amountToSend);
        allPromises.push(receipt.wait());
      }else{
        console.log(" 🐥 already good ")
      }

    }

    console.log("📡 Waiting for all txs to get mined...");

    await Promise.all(allPromises);

    console.log("🎉 Done!");
  }



}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
