import type { NextPage } from "next";
import PriceChart from "~~/components/PriceChart";
import PricesBoxes from "~~/components/PricesBoxes";
import { TokenLeaderboard } from "~~/components/TokenLeaderboard";
import scaffoldConfig from "~~/scaffold.config";

const Dashboard: NextPage = () => {
  const tokens = scaffoldConfig.tokens;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center py-2 w-[40%]">
        <PricesBoxes />
        <div className="p-8">
          <h1 className="text-4xl font-bold">Leaderboard</h1>
        </div>
        <TokenLeaderboard />
      </div>
      <div className="w-[60%]">
        <div className="flex flex-wrap">
          {tokens.map(token => (
            <div className="w-[500px]" key={token.name}>
              <PriceChart key={token.name} tokenName={token.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
