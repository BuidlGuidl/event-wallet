import { ethers } from "ethers";
import dotenv from "dotenv";
import { generateBurner } from "./generateBurnerAccount";
import deployedContracts from "./deployedContracts";
dotenv.config();

interface TokenInfo {
  name: string;
  dexAddr: string;
  tokenAddr: string;
  tokenAbi: any;
}

const saltAddr = deployedContracts[100][0]["contracts"]["SaltToken"]["address"];
const saltAbi = deployedContracts[100][0]["contracts"]["SaltToken"]["abi"];

// import rpc, deployer pk
const gnosisRpc = process.env.GNOSIS_RPC!;
const privateKey = process.env.DEPLOYER_PRIVATE_KEY!;

const provider = new ethers.providers.JsonRpcProvider(gnosisRpc);
const deployerWallet = new ethers.Wallet(privateKey, provider);

// number of tokens & amount of xDai to send to burner wallets
const tokenAmount = "1";
const xDaiAmount = "0.001";

// set up contract instances

// create burner wallet\
async function prepBurner(tokenInfo: TokenInfo) {
  const traderWallet = await generateBurner(tokenInfo.name);
  const saltContract = new ethers.Contract(saltAddr, saltAbi, deployerWallet);
  const tokenContract = new ethers.Contract(tokenInfo.tokenAddr, tokenInfo.tokenAbi, deployerWallet);

  const traderAddr = traderWallet.address;
  // send XDAI
  const sendXDai = await deployerWallet.sendTransaction({
    to: traderAddr,
    value: ethers.utils.parseEther(xDaiAmount),
  });

  // send SALT/TOKEN
  const sendSalt = await saltContract.transfer(traderAddr, ethers.utils.parseEther(tokenAmount));
  const sendToken = await tokenContract.transfer(traderAddr, ethers.utils.parseEther(tokenAmount));

  console.log(`${sendXDai}, ${sendSalt}, ${sendToken} COMPLETE`);
  console.log(`XDAI/SALT/${tokenInfo.name} sent to ${traderAddr}`);
}

const AvocadoInfo: TokenInfo = {
  name: "AVOCADO",
  dexAddr: deployedContracts[100][0]["contracts"]["BasicDexAvocado"]["address"],
  tokenAddr: deployedContracts[100][0]["contracts"]["AvocadoToken"]["address"],
  tokenAbi: deployedContracts[100][0]["contracts"]["AvocadoToken"]["abi"],
};

const BananaInfo: TokenInfo = {
  name: "BANANA",
  dexAddr: deployedContracts[100][0]["contracts"]["BasicDexBanana"]["address"],
  tokenAddr: deployedContracts[100][0]["contracts"]["BananaToken"]["address"],
  tokenAbi: deployedContracts[100][0]["contracts"]["BananaToken"]["abi"],
};

const TomatoInfo: TokenInfo = {
  name: "TOMATO",
  dexAddr: deployedContracts[100][0]["contracts"]["BasicDexTomato"]["address"],
  tokenAddr: deployedContracts[100][0]["contracts"]["TomatoToken"]["address"],
  tokenAbi: deployedContracts[100][0]["contracts"]["TomatoToken"]["abi"],
};

async function batchPrepBurners() {
  const prepAvocado = await prepBurner(AvocadoInfo);
  const prepBanana = await prepBurner(BananaInfo);
  const prepTomato = await prepBurner(TomatoInfo);
  console.log(`${prepAvocado}, ${prepBanana}, ${prepTomato} COMPLETE`);
}

batchPrepBurners();
