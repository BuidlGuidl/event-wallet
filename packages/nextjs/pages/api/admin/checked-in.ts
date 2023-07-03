import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const addresses: string[] = [];

  for await (const key of kv.scanIterator({ match: "user:*" })) {
    addresses.push(key.split(":")[1]);
  }

  res.status(200).json(addresses);
}
