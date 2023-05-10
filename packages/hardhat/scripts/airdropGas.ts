import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

const readFile = "accounts.json";

/**
 * Drops ETH for gas to all accounts in accounts.json
 */
export async function airdropGas(amount: string) {
  // hre comes from the hardhat runtime environment (using a task)
  const ethers = hre.ethers;
  const { deployer } = await hre.getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  console.log("💦 air dropping...");

  const wallets = JSON.parse(fs.readFileSync(readFile, "utf8"));
  console.log("wallets", wallets);

  console.log("🔑 Signing with " + deployer);

  console.log("🏦 Balance: " + ethers.utils.formatEther(await signer.getBalance()));

  const allPromises = [];

  for (const address in wallets) {
    console.log("✨ checking " + address);

    const balance = await ethers.provider.getBalance(address);
    console.log("💫 balance", ethers.utils.formatEther(balance));

    const amountToSend = ethers.utils.parseEther(amount);

    if (balance.lt(amountToSend)) {
      const tx = await signer.sendTransaction({
        to: address,
        value: amountToSend,
      });
      console.log("💸 airdropping to: " + address);
      allPromises.push(tx.wait());
    } else {
      console.log(" 🐥 already good ");
    }
  }

  console.log("📡 Waiting for all txs to get mined...");

  await Promise.all(allPromises);

  console.log("🎉 Done!");
}
