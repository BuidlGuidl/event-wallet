import { kv } from "@vercel/kv";
import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  signature: string;
  signerAddress: string;
  alias: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { signature, signerAddress, alias }: ReqBody = req.body;

  if (!signature || !signerAddress || !alias) {
    res.status(400).json({ error: "Missing required parameters." });
    return;
  }

  let recoveredAddress: string;
  try {
    const message = JSON.stringify({ action: "user-checkin", address: signerAddress, alias: alias });
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

    const aliasData: { [key: string]: string } = {};
    aliasData[signerAddress] = alias;
    await kv.hset("users:alias", aliasData);

    res.status(200).json({ message: "Checked in!" });
    return;
  }

  res.status(403).json({ error: `Already checked in! Checked in at ${checkIn}` });
}
