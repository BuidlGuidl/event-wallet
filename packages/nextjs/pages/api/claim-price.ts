import { kv } from "@vercel/kv";
import { ethers } from "ethers";
import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  signature: string;
  signerAddress: string;
  destinationAddress: string;
};

// month is 0-indexed (5 for June)
const claimingPeriodStart = new Date(2023, 5, 29);
const claimingPeriodEnd = new Date(claimingPeriodStart.getTime());
claimingPeriodEnd.setDate(claimingPeriodStart.getDate() + 60);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { signature, signerAddress, destinationAddress }: ReqBody = req.body;

  // Params validation
  if (!process.env.PRIVATE_KEY) {
    res.status(400).json({ error: "Missing sender private key" });
    return;
  }
  if (!signature || !destinationAddress) {
    res.status(400).json({ error: "Missing required parameters." });
    return;
  }

  const now = new Date();
  if (now > claimingPeriodEnd) {
    res.status(401).json({ error: "Claiming period is over" });
    return;
  }

  let recoveredAddress: string;
  try {
    // The message is just the signer address
    recoveredAddress = verifyMessage(signerAddress, signature);
  } catch (error) {
    res.status(400).json({ error: "Error recovering the signature" });
    return;
  }

  if (recoveredAddress !== signerAddress) {
    res.status(403).json({ error: "The signature is not valid" });
    return;
  }

  const amount = await kv.hget<string>(signerAddress, "amount");

  if (!amount) {
    res.status(403).json({ error: "The address is not a winner (or already claimed)" });
    return;
  }

  // Mark the address as claimed
  await kv.hset(signerAddress, { amount: "0" });

  // Init the provider and wallet.
  let provider: ethers.providers.JsonRpcProvider;
  let wallet: ethers.Wallet;
  let daiContractAddress: string;
  let providerUrl: string;
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    // Mainnet
    providerUrl = process.env.RPC_PROVIDER_URL || "https://rpc.eth.gateway.fm";
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // Mainnet DAI
    daiContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  } else {
    // Sepolia
    providerUrl = "https://rpc.sepolia.org/";
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // Mock DAI contract on Sepolia
    daiContractAddress = "0x53844f9577c2334e541aec7df7174ece5df1fcf0";
  }

  try {
    const daiAmount = ethers.utils.parseUnits(String(amount), "ether");
    const daiContractABI = ["function transfer(address dst, uint wad) external returns (bool)"];
    const daiContract = new ethers.Contract(daiContractAddress, daiContractABI, wallet);
    await daiContract.transfer(destinationAddress, daiAmount);
    // We don't wait for the transaction to be mined, just until it's sent to the network
    res.status(200).json({ message: "DAI sent!" });
  } catch (error) {
    console.log("Error sending the DAI", error);
    // Reset the address as not claimed
    await kv.hset(signerAddress, { amount });
    res.status(400).json({ error: "Error sending the DAI. Please contact us." });
  }
}
