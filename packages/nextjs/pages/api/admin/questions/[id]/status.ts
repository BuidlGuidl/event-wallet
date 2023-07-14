import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import untypedQuestions from "~~/questions.json";
import { Question } from "~~/types/question";

type ReqBody = {
  newStatus: string;
  option?: number;
  value?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    const { id } = req.query;
    const { newStatus, option, value }: ReqBody = req.body;

    if (!id) {
      res.status(400).json({ error: "Missing ID." });
      return;
    }

    const questionId: number = parseInt(id as string);

    const questions: Question[] = untypedQuestions;

    const question = questions.find(q => q.id === questionId);

    if (!question) {
      res.status(404).json({ error: "Question do not exists." });
      return;
    }

    const key = `question:${questionId}`;

    const currentStatus = await kv.hget<string>(key, "status");

    console.log("currentStatus: ", currentStatus);

    if (currentStatus === newStatus) {
      res.status(400).json({ error: "Question already in that status." });
      return;
    }

    if (currentStatus === "reveal") {
      res.status(400).json({ error: "Can't change question status after revealed." });
      return;
    }

    type NewDataType = {
      status: string;
      option?: number;
    };

    const newData: NewDataType = { status: newStatus };

    if (newStatus === "reveal" && option === undefined) {
      res.status(400).json({ error: "You have to sent the right option when revealing the question." });
      return;
    }

    if (newStatus === "reveal" && !value) {
      res.status(400).json({ error: "You have to sent the value when revealing the question." });
      return;
    }

    if (newStatus === "reveal") {
      newData["option"] = option;
    }

    await kv.hset(key, newData);
    if (newStatus !== "closed") {
      await kv.sadd(`questions:status:${newStatus}`, questionId);
    }
    if (currentStatus !== "closed") {
      await kv.srem(`questions:status:${currentStatus}`, questionId);
    }

    // we update the users score and the leaderboard after revealing the question
    if (newStatus === "reveal" && value && value !== 0) {
      const addresses = await kv.smembers(`questions:${questionId}:${option}`);
      for (const address of addresses) {
        const key = `user:${address}`;
        const score = await kv.hincrby(key, "score", value);
        await kv.zadd("leaderboard", { score: score, member: address });
      }
    }

    res.status(200).json({ message: "Question status changed!", id: questionId });
  } else {
    const { id } = req.query;
    const status = await kv.hget(`question:${id}`, "status");

    res.status(200).json(status);
  }
}
