import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    res.status(400).json({ error: "Missing address." });
    return;
  }

  const checkIn = await kv.hget<string>(`user:${address}`, "checkin");

  if (!checkIn) {
    res.status(404).json({ error: "Not checked in!" });
    return;
  }

  res.status(200).json({ address, checkIn });
}
