import type { NextPage } from "next";
import { TokenLeaderboard } from "~~/components/TokenLeaderboard";

const Leaderboard: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>
      <TokenLeaderboard />
    </div>
  );
};

export default Leaderboard;
