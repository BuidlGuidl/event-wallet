import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useBlockNumber } from "wagmi";
import { Board } from "~~/components/Leaderboard/Board";
import { useScaffoldContract, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";

const Leaderboard: NextPage = () => {
  type LeaderboardData = {
    address: string;
    nftCount: number;
    balance: BigNumber;
  };

  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: blockNumber } = useBlockNumber();

  // Starting block to fetch events from
  // NEXT_PUBLIC_DEPLOY_BLOCK > blockNumber - 1000 > 0
  const fromBlock = process.env.NEXT_PUBLIC_DEPLOY_BLOCK
    ? Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK)
    : blockNumber
    ? blockNumber - 1000
    : 0;

  const { data: mintEvents, isLoading: isLoadingMintEvents } = useScaffoldEventHistory({
    contractName: "EventSBT",
    eventName: "Transfer",
    fromBlock,
  });

  const PAGE_SIZE = 100;

  const { data: tokenContract } = useScaffoldContract({
    contractName: scaffoldConfig.tokens[0].contractName as ContractName,
  });

  useEffect(() => {
    const updateLeaderboard = async () => {
      if (!isLoadingMintEvents && mintEvents && tokenContract) {
        let leaderboardData: LeaderboardData[] = [];
        const nftCountByAddress: { [key: string]: number } = {};
        for (let i = 0; i < mintEvents.length; i++) {
          const event = mintEvents[i];
          const address = event.args.to;
          if (!nftCountByAddress[address]) {
            nftCountByAddress[address] = 1;
          } else {
            nftCountByAddress[address] += 1;
          }
        }
        const topAddresses = Object.entries(nftCountByAddress)
          .sort((a, b) => b[1] - a[1])
          .slice(0, PAGE_SIZE);
        for (let i = 0; i < topAddresses.length; i++) {
          const address = topAddresses[i][0];
          const nftCount = topAddresses[i][1];
          const balance: BigNumber = await tokenContract.balanceOf(address);
          leaderboardData.push({ address, nftCount, balance });
        }
        leaderboardData = leaderboardData.sort((a, b) =>
          a.nftCount === b.nftCount ? (b.balance.gte(a.balance) ? 1 : -1) : b.nftCount - a.nftCount,
        );
        setLeaderboard(leaderboardData);
        setIsLoading(false);
      }
    };
    updateLeaderboard();
  }, [isLoadingMintEvents, tokenContract, mintEvents]);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <Board leaderboard={leaderboard} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Leaderboard;
