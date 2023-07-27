import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { QuestionsLeaderboard } from "~~/types/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const rawLeaderboard = await kv.zrange("leaderboard", 0, 50, { rev: true, withScores: true });

    const leaderboard: QuestionsLeaderboard[] = [];

    for (let i = 0; i < rawLeaderboard.length; i += 2) {
      leaderboard.push({ address: rawLeaderboard[i] as string, score: rawLeaderboard[i + 1] as number });
    }

    res.status(200).json(leaderboard);
  }
}
