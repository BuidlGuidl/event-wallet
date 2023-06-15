import { ethers, Wallet } from "ethers";
import * as fs from "fs";

/**
 * Generate list of new random private key and write it to a json file
 */
async function main() {
  // Load and parse "ticket_secrets.csv" file
  let secrets;
  try {
    secrets = fs.readFileSync("./ticket_secrets.csv", "utf8");
  } catch (e) {
    console.error("🚫️ packages/hardhat/ticket_secrets.csv file not found");
    return;
  }

  // Count the number of lines in the file
  const ticketSecrets = secrets.trim().split("\n");
  const numberOfSecrets = ticketSecrets.length;
  console.log("🔥 Generating " + numberOfSecrets + " new burner accounts...");

  // Loop through walletSecrets and create a new wallet for each (using the value as a seed)
  // and store the wallet address and private key in a json file
  const wallets = {};
  for (let i = 0; i < numberOfSecrets; i++) {
    const secretsWithoutTrailingSpaces = ticketSecrets[i].trim();
    const generatedWallet = new Wallet(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secretsWithoutTrailingSpaces)));
    wallets[generatedWallet.address] = generatedWallet.privateKey;
  }

  // Dump wallets into a json file
  fs.writeFileSync("./accounts.json", JSON.stringify(wallets, null, 2));
  console.log("📄 Account and its private keys saved to packages/hardhat/accounts.json file");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
