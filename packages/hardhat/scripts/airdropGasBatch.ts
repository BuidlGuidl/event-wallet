import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

const readFile = "accounts.json";

/**
 * Drops ETH for gas to all accounts in accounts.json
 */
export async function airdropGasBatch(amount: string) {
  // hre comes from the hardhat runtime environment (using a task)
  const ethers = hre.ethers;
  const { deployer } = await hre.getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const { execute, get, read } = hre.deployments;

  const batchContract = await get("Batch");

  console.log("💦 air dropping...");

  const wallets = JSON.parse(fs.readFileSync(readFile, "utf8"));
  //console.log("wallets", wallets);

  console.log("🔑 Signing with " + deployer);

  console.log("🏦 Balance: " + ethers.utils.formatEther(await signer.getBalance()));

  const allPromises = [];

  const allAddresses = [];

  const amountToSend = ethers.utils.parseEther(amount);

  for (const address in wallets) {
    /*console.log("✨ checking " + address);

    const balance = await ethers.provider.getBalance(address);
    console.log("💫 balance", ethers.utils.formatEther(balance));

    if (balance.lt(amountToSend)) {*/
    allAddresses.push(address);
    /*} else {
      console.log(" 🐥 already good ");
    }*/
  }

  console.log("📡 okay we have to drop to ...", allAddresses);

  //go through the addresses in batches of 50
  for (let i = 24; i < allAddresses.length; i += 50) {
    const batch = allAddresses.slice(i, i + 50);
    console.log("📡 sending batch", batch);
    const receipt = await execute(
      "Batch",
      { from: deployer, log: true, value: amountToSend.mul(batch.length) },
      "splitEthToArrayOfAddresses",
      batch,
      amountToSend,
    );
    console.log("receipt", receipt);
  }

  console.log("🎉 Done!");
}
