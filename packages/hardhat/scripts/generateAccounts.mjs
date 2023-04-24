import { ethers } from "ethers";
import * as fs from "fs";

/**
 * Generate list of new random private key and write it to a json file
 */
async function main() {
  // Check if amount argument is provided
  const [amount] = process.argv.slice(2);
  if (!amount) {
    console.error("🚫️ Please provide an amount argument. E.g. yarn generate-multiple 200");
    return;
  }

  console.log("🔥 Generating " + amount + " new burner accounts...");

  const wallets = {};
  for (let i = 0; i < +amount; i++) {
    const randomWallet = ethers.Wallet.createRandom();
    wallets[randomWallet.address] = randomWallet.privateKey;
  }

  // Dump wallets into a json file
  fs.writeFileSync("./accounts.json", JSON.stringify(wallets, null, 2));
  console.log("📄 Account and its private keys saved to packages/hardhat/accounts.json file");

}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
