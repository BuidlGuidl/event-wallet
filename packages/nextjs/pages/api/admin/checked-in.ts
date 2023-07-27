import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const addresses = await kv.smembers("users:checkin");

  res.status(200).json(addresses);
}
