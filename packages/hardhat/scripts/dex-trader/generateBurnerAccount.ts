import { ethers } from "ethers";
import { parse, stringify } from "envfile";
import * as fs from "fs";

const envFilePath = "./.env";

/**
 * Generate a new random private key and write it to the .env file
 * @param existingEnvConfig
 */
const setNewEnvConfig = (name: string, existingEnvConfig = {}) => {
  console.log("👛 Generating new burner wallet");
  const randomWallet = ethers.Wallet.createRandom();

  const newEnvConfig = {
    ...existingEnvConfig,
    [name]: randomWallet.privateKey,
  };

  // Store in .env
  fs.writeFileSync(envFilePath, stringify(newEnvConfig));
  console.log("📄 Private Key saved to packages/hardhat/.env file");

  return randomWallet;
};

async function generateBurner(name: string) {
  if (!fs.existsSync(envFilePath)) {
    // No .env file yet.
    return setNewEnvConfig(name);
  }

  // .env file exists
  const existingEnvConfig = parse(fs.readFileSync(envFilePath).toString());

  return setNewEnvConfig(name, existingEnvConfig);
}

export { generateBurner };
