import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

const readFile = "accounts.json";

/**
 * Drops Gems to all accounts in accounts.json
 */
export async function airdropGems(amount: string) {
  // hre comes from the hardhat runtime environment (using a task)
  const ethers = hre.ethers;
  const { deployer } = await hre.getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const { execute, get, read } = hre.deployments;

  const gemsContract = await get("EventGems");
  const amountToSend = ethers.utils.parseEther(amount);
  const signerBalance = await read("EventGems", "balanceOf", signer.address);

  console.log("💦 air dropping gems...");

  const wallets = JSON.parse(fs.readFileSync(readFile, "utf8"));
  console.log("wallets", wallets);

  console.log("🔑 Signing with " + (await signer.getAddress()));
  console.log("📡 Checking balance of signer " + signer.address + " from contract: " + gemsContract.address);

  console.log("🏦 Signer Token Balance: " + ethers.utils.formatEther(signerBalance));

  const allPromises = [];

  for (const address in wallets) {
    console.log("✨ checking " + address);

    const balance = await read("EventGems", "balanceOf", address);
    console.log("💫 balance", ethers.utils.formatEther(balance));

    if (balance.lt(amountToSend)) {
      console.log("💸 airdropping gems to: " + address);
      const receipt = await execute("EventGems", { from: deployer, log: true }, "transfer", address, amountToSend);
      allPromises.push(receipt);
    } else {
      console.log(" 🐥 already good ");
    }
  }

  console.log("📡 Waiting for all txs to get mined...");
  await Promise.all(allPromises);

  console.log("🎉 Done!");
}
