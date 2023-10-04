import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useInterval } from "usehooks-ts";
import { Board } from "~~/components/TokenLeaderboard/Board";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

export const TokenLeaderboard = () => {
  type LeaderboardData = {
    address: string;
    balance: BigNumber;
  };

  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTokenLeaderboard = async () => {
    try {
      const response = await fetch("/api/admin/token-leaderboard", {
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
      console.log("Error fetching leaderboard", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTokenLeaderboard();
    })();
  }, []);

  useInterval(async () => {
    await fetchTokenLeaderboard();
  }, scaffoldConfig.tokenLeaderboardPollingInterval);

  return (
    <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
      <Board leaderboard={leaderboard} isLoading={isLoading} />
    </div>
  );
};
