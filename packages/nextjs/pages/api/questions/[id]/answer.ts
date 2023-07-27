import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id, address } = req.query;
    const key = `user:${address}`;
    const option = await kv.hget<string>(key, `question:${id}`);

    res.status(200).json(option);
  }
}
