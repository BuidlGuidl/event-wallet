import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenName } = req.query;

  if (!tokenName) {
    res.status(400).json({ error: "Missing token name." });
    return;
  }

  const key = `${tokenName}:price`;

  const data = await kv.zrange(key, 0, Date.now(), { byScore: true, withScores: true });

  type PricePoint = { price: string; timestamp: number };

  const prices: PricePoint[] = [];

  for (let i = 0; i < data.length; i += 2) {
    prices.push({ price: (data[i] as string).split("-")[1], timestamp: data[i + 1] as number });
  }

  res.status(200).json(prices);
}
