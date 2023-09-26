import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

import deployedContracts from "./deployedContracts";

if (process.argv.length != 3) {
  console.log("Input dex to trade, example:");
  console.log("ts-node tradeDex.ts 0");
  process.exit();
}

const gnosisRpc = process.env.GNOSIS_RPC!;
const dexChoice = Number(process.argv[2]);

const saltAbi = deployedContracts[100][0]["contracts"]["SaltToken"]["abi"];
const saltAddr = deployedContracts[100][0]["contracts"]["SaltToken"]["address"];
let dexAddr: string;
let dexAbi, tokenAddr, privateKey;

if (dexChoice == 0) {
  // avocado
  dexAddr = deployedContracts[100][0]["contracts"]["BasicDexAvocado"]["address"];
  dexAbi = deployedContracts[100][0]["contracts"]["BasicDexAvocado"]["abi"];
  tokenAddr = deployedContracts[100][0]["contracts"]["AvocadoToken"]["address"];
  privateKey = process.env.AVOCADO;
} else if (dexChoice == 1) {
  // banana
  dexAddr = deployedContracts[100][0]["contracts"]["BasicDexBanana"]["address"];
  dexAbi = deployedContracts[100][0]["contracts"]["BasicDexBanana"]["abi"];
  tokenAddr = deployedContracts[100][0]["contracts"]["BananaToken"]["address"];
  privateKey = process.env.BANANA;
} else {
  // tomato
  dexAddr = deployedContracts[100][0]["contracts"]["BasicDexTomato"]["address"];
  dexAbi = deployedContracts[100][0]["contracts"]["BasicDexTomato"]["abi"];
  tokenAddr = deployedContracts[100][0]["contracts"]["TomatoToken"]["address"];
  privateKey = process.env.TOMATO;
}

if (!privateKey) {
  console.log("No trader PK found, run prepBurnerTraders.ts first");
  process.exit();
}

const tradeFrequency = 10_000; // 10 seconds

const provider = new ethers.providers.JsonRpcProvider(gnosisRpc);
const wallet = new ethers.Wallet(privateKey, provider);

const saltContract = new ethers.Contract(saltAddr, saltAbi, wallet);
const tokenContract = new ethers.Contract(tokenAddr, saltAbi, wallet);

const tradeWeights = [0.1, 0.25, 0.5, 0.75, 0.9];
const blocksBeforeSwitch = [5, 10, 15, 25];
let tradeWeight = tradeWeights[Math.floor(Math.random() * tradeWeights.length)];
let switchTimer = blocksBeforeSwitch[Math.floor(Math.random() * blocksBeforeSwitch.length)];
const txSizes = ["0.01", "0.02", "0.04", "0.08", "0.1"];

let count = 0;

console.log("Starting trades");
console.log("Initial trade weight:", tradeWeight);
console.log("Blocks til next switch:", switchTimer);
const assetDexContract = new ethers.Contract(dexAddr, dexAbi, wallet);

console.log(wallet.address);

async function approveDex() {
  const approveSalt = await saltContract.approve(dexAddr, ethers.constants.MaxUint256);
  const approveToken = await tokenContract.approve(dexAddr, ethers.constants.MaxUint256);
  console.log(`${approveSalt}, ${approveToken} COMPLETE`);
}

async function makeTx() {
  const randSize = Math.floor(Math.random() * txSizes.length);
  // const currentBlock = await provider.getBlockNumber();
  count++;
  console.log("Current count", count);
  if (count % switchTimer == 0) {
    tradeWeight = tradeWeights[Math.floor(Math.random() * tradeWeights.length)];
    switchTimer = blocksBeforeSwitch[Math.floor(Math.random() * blocksBeforeSwitch.length)];
    count = 0;
    console.log("Changing trade strategy");
    console.log("New trade weight:", tradeWeight);
    console.log("Blocks til next switch:", switchTimer);
  }

  if (Math.random() >= tradeWeight) {
    // buy credit
    const tx = await assetDexContract.assetToCredit(ethers.utils.parseEther(txSizes[randSize]), BigInt(0));
    tx.wait();
    console.log("Credit purchase complete");
  } else {
    // buy asset
    const tx = await assetDexContract.creditToAsset(ethers.utils.parseEther(txSizes[randSize]), BigInt(0));
    tx.wait();
    console.log("Asset purchase complete");
  }
}
approveDex();
setInterval(makeTx, tradeFrequency);
