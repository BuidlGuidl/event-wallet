import { kv } from "@vercel/kv";
import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  signature: string;
  signerAddress: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { signature, signerAddress }: ReqBody = req.body;

  if (!signature || !signerAddress) {
    res.status(400).json({ error: "Missing required parameters." });
    return;
  }

  let recoveredAddress: string;
  try {
    const message = JSON.stringify({ action: "user-checkin", address: signerAddress });
    recoveredAddress = verifyMessage(message, signature);
  } catch (error) {
    res.status(400).json({ error: "Error recovering the signature" });
    return;
  }

  if (recoveredAddress !== signerAddress) {
    res.status(403).json({ error: "The signature is not valid" });
    return;
  }

  const key = `user:${signerAddress}`;

  const checkIn = await kv.hget<string>(key, "checkin");

  if (!checkIn) {
    await kv.hset(key, { checkin: new Date() });
    await kv.sadd("users:checkin", signerAddress);
    res.status(200).json({ message: "Checked in!" });
    return;
  }

  res.status(403).json({ error: `Already checked in! Checked in at ${checkIn}` });
}
