
import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import * as fs from "fs";

const readFile = 'accounts.json';

async function main() {
  

/**
 * Generate list of new random private key and write it to a json file
 */

  // Check if amount argument is provided
  const [amount] = process.argv.slice(2);
  if (!amount) {
    console.error("🚫️ Please provide an amount. E.g. yarn airdrop-gas 0.01");

  }else{

    console.log("💦 air dropping...");

    
    const wallets = JSON.parse(fs.readFileSync(readFile, 'utf8'));
    console.log("wallets",wallets)
  
    //const RPCURL = "https://eth-goerli.g.alchemy.com/v2/"+process.env.ALCHEMY //"https://rpc.scaffoldeth.io:48544/"
    //const RPCURL = "https://rpc.gnosischain.com"
    const RPCURL = "https://rpc2.sepolia.org/"


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

    console.log("🏦 Balance: " + ethers.utils.formatEther(await signer.getBalance()));
    //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
    //const contract = new ethers.Contract(contractAddress, [
    //  "function transfer(address recipient, uint256 amount) public",
    //], signer);
  
    const allPromises = [];

    for (const address in wallets) {
      //const tx = await contract.transfer(address, ethers.utils.parseEther(amount));
      //send eth



      console.log("✨ checking "+address)

      const balance = await provider.getBalance(address);
      console.log("💫 balance",ethers.utils.formatEther(balance))

      const amountToSend = ethers.utils.parseEther(amount)

      if(balance.lt(amountToSend)){

        const tx = await signer.sendTransaction({
          to: address,
          value: amountToSend,
        });
        console.log("💸 airdropping to: " + address);
        allPromises.push(tx.wait());
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
