import { kv } from "@vercel/kv";
import { isAddress } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function checkClaimed(req: NextApiRequest, res: NextApiResponse) {
  // Ensure it's a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed, please use GET" });
  }

  const { address } = req.query;

  // Params validation
  if (!address || typeof address !== "string" || !isAddress(address)) {
    res.status(400).json({ error: "Missing or invalid address parameter." });
    return;
  }

  try {
    const amount = await kv.hget<string>(address, "amount");

    // Check if the user has already claimed
    if (amount === "0" || !amount) {
      res.status(200).json({ claimed: true });
    } else {
      res.status(200).json({ claimed: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking claim status. Please contact us." });
  }
}
