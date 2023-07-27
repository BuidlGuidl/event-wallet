import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Board } from "~~/components/Questions/Board";
import { QuestionsLeaderboard } from "~~/types/question";
import { notification } from "~~/utils/scaffold-eth";

type Leaderboard = {
  address: string;
  score: number;
};

const Leaderboard: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<QuestionsLeaderboard[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/questions/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLeaderboard(data);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching questions leaderboard", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLeaderboard();
    })();
  }, []);

  /*
  useInterval(async () => {
    await fetchLeaderboard();
  }, scaffoldConfig.pollingInterval);
  */

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Questions Leaderboard</h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <Board leaderboard={leaderboard} isLoading={loading} />
      </div>
    </div>
  );
};

export default Leaderboard;
