import { kv } from "@vercel/kv";
import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  signature: string;
  signerAddress: string;
  alias: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { signature, signerAddress, alias }: ReqBody = req.body;

    if (!signature || !signerAddress || !alias) {
      res.status(400).json({ error: "Missing required parameters." });
      return;
    }

    if (alias.length > 64 || alias.length < 3) {
      res.status(400).json({ error: "Alias must be between 3 and 64 characters." });
      return;
    }

    let recoveredAddress: string;
    try {
      const message = JSON.stringify({ action: "save-alias", address: signerAddress, alias });
      recoveredAddress = verifyMessage(message, signature);
    } catch (error) {
      res.status(400).json({ error: "Error recovering the signature" });
      return;
    }

    if (recoveredAddress !== signerAddress) {
      res.status(403).json({ error: "The signature is not valid" });
      return;
    }

    const aliasData: { [key: string]: string } = {};
    aliasData[signerAddress] = alias;

    await kv.hset("users:alias", aliasData);
    res.status(200).json({ message: "Alias saved!" });
    return;
  } else {
    let aliases = await kv.hgetall("users:alias");
    if (!aliases) {
      aliases = {};
    }
    res.status(200).json(aliases);
  }
}
