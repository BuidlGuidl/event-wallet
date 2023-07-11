import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const opened = await kv.smembers("questions:opened");

  res.status(200).json(opened);
}
