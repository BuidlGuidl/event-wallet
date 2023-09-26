import { ethers } from "ethers";
import deployedContracts from "./deployedContracts";
import dotenv from "dotenv";
dotenv.config();

//@ts-expect-error Contract currently not deployed so address will be undefined
const disperseAddress = deployedContracts[100][0]["contracts"]["DisperseFunds"]["address"];
//@ts-expect-error Contract currently not deployed so abi will be undefined
const disperseAbi = deployedContracts[100][0]["contracts"]["DisperseFunds"]["abi"];
const saltAddress = deployedContracts[100][0]["contracts"]["SaltToken"]["address"];
const saltAbi = deployedContracts[100][0]["contracts"]["SaltToken"]["abi"];

const gnosisRpc = process.env.GNOSIS_RPC!;
const privateKey = process.env.DEPLOYER_PRIVATE_KEY!;
const checkedInApi = "https://event-wallet-ten.vercel.app/api/admin/checked-in";

const provider = new ethers.providers.JsonRpcProvider(gnosisRpc);
const wallet = new ethers.Wallet(privateKey, provider);
const intervalFreq = 60_000; // 1 minute

const disperseContract = new ethers.Contract(disperseAddress, disperseAbi, wallet);
const saltTokenContract = new ethers.Contract(saltAddress, saltAbi, wallet);

let dispersedTo: string[] = [];

async function fundContract(saltAmount: string, xDaiAmount: string) {
  try {
    const sendSalt = await saltTokenContract.transfer(disperseAddress, ethers.utils.parseEther(saltAmount));
    sendSalt.wait();
    const sendXDai = await wallet.sendTransaction({
      to: disperseAddress,
      value: ethers.utils.parseEther(xDaiAmount),
    });
    sendXDai.wait();
    console.log("DisperseFunds contract funded");
  } catch {
    console.log("Something went wrong, DisperseFunds contract NOT funded");
  }
}

/**
 * Fetches latest array of checked in addresses from frontends api
 * Filters it against an array of addresses that have already received tokens
 * Submits the filtered array to the DisperseFunds contract
 * Adds the filtered addresses to the dispersedTo array
 */
async function sendFunds() {
  const checkInResponse = await fetch(checkedInApi);
  const checkInJson = await checkInResponse.json();
  const filteredAddresses = checkInJson.filter((address: string) => !dispersedTo.includes(address));

  try {
    const tx = await disperseContract.disperseBatch(filteredAddresses);
    tx.wait();
  } catch {
    console.log("Something went wrong");
  }
  console.log(`Tokens dispersed to ${filteredAddresses.length} addresses`);

  dispersedTo = dispersedTo.concat(filteredAddresses);
  console.log(dispersedTo);
}

// send 1000 $SALT & 1 $XDAI to the disperse funds contract
fundContract("1000", "1");
/**
 * Repeat the sendFunds function every intervalFreq to make sure users who join late are given their starting allowance
 */
setInterval(sendFunds, intervalFreq);
