import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

const PricesBoxes = () => {
  type TokenPrices = {
    [key: string]: string;
  };

  const [prices, setPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState(true);

  const tokens = scaffoldConfig.tokens;
  const saltEmoji = scaffoldConfig.saltToken.emoji;

  const fetchPrices = async () => {
    try {
      const response = await fetch("/api/prices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPrices(data);
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
      await fetchPrices();
    })();
  }, []);

  useInterval(async () => {
    await fetchPrices();
  }, scaffoldConfig.tokenLeaderboardPollingInterval);

  return (
    <div className="flex flex-col pt-2 gap-[20px] md:flex-row">
      {tokens.map(token => (
        <div className="bg-base-300 rounded-xl w-[120px] p-4 text-center text-xl font-bold" key={token.name}>
          <h2>{token.emoji}</h2>
          <p className="pt-8">{isLoading ? "..." : `${saltEmoji} ${prices[token.name]}`}</p>
        </div>
      ))}
    </div>
  );
};

export default PricesBoxes;
