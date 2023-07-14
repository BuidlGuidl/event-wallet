import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id, option } = req.query;
    const status = await kv.hget(`question:${id}`, "status");

    if (status !== "reveal") {
      res.status(400).json({ error: "Question not in reveal status." });
      return;
    }

    const addresses = await kv.smembers(`questions:${id}:${option}`);

    res.status(200).json(addresses);
  }
}
