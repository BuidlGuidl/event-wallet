import React from "react";
import { TokenLeaderboard } from "~~/components/TokenLeaderboard";

export default function Medals() {
  return (
    <div className="flex flex-col place-items-center gap-2 text-center m-auto overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Leaderboard</h1>
      </div>
      <TokenLeaderboard />
    </div>
  );
}
