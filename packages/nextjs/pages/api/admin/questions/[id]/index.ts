import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import untypedQuestions from "~~/questions.json";
import { Question } from "~~/types/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.query;

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

    const open = await kv.hget<boolean>(key, "open");

    console.log("open: ", open);

    if (open) {
      res.status(400).json({ error: "Question already opened." });
      return;
    }

    await kv.hset(key, { open: true });
    await kv.sadd("questions:opened", questionId);

    res.status(200).json({ message: "Question opened!", id: questionId });
  }
}
