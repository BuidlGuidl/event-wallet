import { kv } from "@vercel/kv";
import { integer } from "aws-sdk/clients/cloudfront";
import { NextApiRequest, NextApiResponse } from "next";

type ReqBody = {
  question: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const question: ReqBody = req.body;

    if (!question) {
      res.status(400).json({ error: "Missing required parameters." });
      return;
    }

    const idKey = "ids:questions";

    let questionId = await kv.get<integer>(idKey);

    console.log("questionId: ", questionId);

    if (!questionId) {
      questionId = 1;
    }

    const key = `question:${questionId}`;

    await kv.json.set(key, "$", question);
    await kv.sadd("questions:ids", questionId);
    await kv.set(idKey, questionId + 1);

    res.status(200).json({ message: "Saved", id: questionId });
  } else {
    const ids = await kv.smembers("questions:ids");

    const questions: any[] = [];

    for (const id of ids) {
      const question = await kv.hget(`question:${id}`, "question");
      questions.push({ id: id, question: question });
    }

    res.status(200).json(questions);
  }
}
