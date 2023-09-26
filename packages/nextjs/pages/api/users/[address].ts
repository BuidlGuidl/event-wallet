import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    res.status(400).json({ error: "Missing address." });
    return;
  }

  const userData = await kv.hgetall<any>(`user:${address}`);

  if (!userData || !userData.checkin) {
    res.status(404).json({ error: "Not checked in!" });
    return;
  }

  res.status(200).json(userData);
}
