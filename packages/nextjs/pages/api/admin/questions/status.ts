import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const open = await kv.smembers("questions:status:open");
    const reveal = await kv.smembers("questions:status:reveal");

    res.status(200).json({ open, reveal });
  }
}
