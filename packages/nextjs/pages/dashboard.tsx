import type { NextPage } from "next";
import PriceChart from "~~/components/PriceChart";
import PricesBoxes from "~~/components/PricesBoxes";
import { SwapEvents } from "~~/components/SwapEvents";
import { TokenLeaderboard } from "~~/components/TokenLeaderboard";
import scaffoldConfig from "~~/scaffold.config";

const Dashboard: NextPage = () => {
  const tokens = scaffoldConfig.tokens;

  return (
    <div className="flex flex-row p-2">
      <div className="flex flex-col justify-start py-2 w-[45%]">
        <PricesBoxes />
        <div className="flex flex-row w-[100%]">
          <div className="flex flex-col items-stretch place-content-start content-start w-[50%]">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-center">Leaderboard</h1>
            </div>
            <TokenLeaderboard />
          </div>
          <div className="flex flex-col items-stretch place-content-start content-start w-[50%]">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-center">Swaps</h1>
            </div>
            <SwapEvents />
          </div>
        </div>
      </div>
      <div className="w-[55%]">
        <div className="flex flex-wrap">
          {tokens.map(token => (
            <div className="w-[495px]" key={token.name}>
              <PriceChart key={token.name} tokenName={token.name} tokenEmoji={token.emoji} height={350} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
