import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import scaffoldConfig from "~~/scaffold.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokens = scaffoldConfig.tokens;

  type TokenPrices = {
    [key: string]: string;
  };

  type PricePoint = { price: string; timestamp: number };

  const tokenPrices: TokenPrices = {};

  for (const token of tokens) {
    const key = `${token.name}:price`;

    const data = await kv.zrange(key, 0, 0, { rev: true, withScores: true });

    const prices: PricePoint[] = [];

    for (let i = 0; i < data.length; i += 2) {
      prices.push({ price: (data[i] as string).split("-")[1], timestamp: data[i + 1] as number });
    }

    tokenPrices[token.name] = prices[prices.length - 1].price;
  }

  res.status(200).json(tokenPrices);
}
