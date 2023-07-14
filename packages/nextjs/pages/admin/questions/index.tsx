import { useState } from "react";
import type { NextPage } from "next";
import { useInterval } from "usehooks-ts";
import { List } from "~~/components/Questions/List";
import untypedQuestions from "~~/questions.json";
import scaffoldConfig from "~~/scaffold.config";
import { Question } from "~~/types/question";
import { notification } from "~~/utils/scaffold-eth";

const Questions: NextPage = () => {
  const questions: Question[] = untypedQuestions;

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionsOpened, setQuestionsOpened] = useState<number[]>([]);
  const [questionsRevealed, setQuestionsRevealed] = useState<number[]>([]);

  const fetchQuestionsStatus = async () => {
    try {
      const response = await fetch("/api/admin/questions/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("data", data);

      if (response.ok) {
        setQuestionsOpened(data.open);
        setQuestionsRevealed(data.reveal);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching questions status", e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useInterval(async () => {
    await fetchQuestionsStatus();
  }, scaffoldConfig.pollingInterval);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Questions</h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <List
          questions={questions}
          isLoading={loadingQuestions}
          questionsOpened={questionsOpened}
          questionsRevealed={questionsRevealed}
        />
      </div>
    </div>
  );
};

export default Questions;
