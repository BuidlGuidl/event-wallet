import { kv } from "@vercel/kv";
import { verifyMessage } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  signature: string;
  signerAddress: string;
  option: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: "Missing ID." });
      return;
    }

    const { signature, signerAddress, option }: ReqBody = req.body;

    if (!signature || !signerAddress || !option) {
      res.status(400).json({ error: "Missing required parameters." });
      return;
    }

    let recoveredAddress: string;
    try {
      // The message is the option
      recoveredAddress = verifyMessage(option, signature);
    } catch (error) {
      res.status(400).json({ error: "Error recovering the signature" });
      return;
    }

    if (recoveredAddress !== signerAddress) {
      res.status(403).json({ error: "The signature is not valid" });
      return;
    }

    const questionKey = `question:${id}`;

    const open = await kv.hget<boolean>(questionKey, "open");

    if (!open) {
      res.status(400).json({ error: "Question not opened." });
      return;
    }

    const key = `user:${signerAddress}`;

    const checkIn = await kv.hget<string>(key, "checkin");

    if (!checkIn) {
      res.status(400).json({ error: "User not checked in." });
      return;
    }

    const questionAnswer: Record<string, string> = {};
    questionAnswer[`question:${id}`] = option;

    await kv.hset(key, questionAnswer);

    const alreadyAnswered = await kv.sismember(`questions:${id}:answered`, signerAddress);

    // we allow to change the answer
    if (!alreadyAnswered) {
      await kv.sadd(`questions:${id}:answered`, signerAddress);
    }

    res.status(200).json({ message: "Answered!" });
  } else if (req.method === "GET") {
    const { id } = req.query;
    const open = await kv.hget<boolean>(`question:${id}`, "open");
    const addresses = await kv.smembers(`questions:${id}:answered`);

    res.status(200).json({ open, addresses });
  }
}
