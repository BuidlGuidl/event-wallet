import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    res.status(400).json({ error: "Missing address." });
    return;
  }

  if (typeof address !== "string") {
    res.status(400).json({ error: "Invalid address." });
    return;
  }

  const alias = await kv.hget<any>("users:alias", address);

  if (!alias) {
    res.status(404).json({ error: "No alias!" });
    return;
  }

  res.status(200).json(alias);
}
