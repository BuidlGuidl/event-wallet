import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { Board } from "~~/components/TokenLeaderboard/Board";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

const Leaderboard: NextPage = () => {
  type LeaderboardData = {
    address: string;
    balance: BigNumber;
  };

  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCheckedIn, setLoadingCheckedIn] = useState(true);
  const [checkedInAddresses, setCheckedInAddresses] = useState<string[]>([]);

  const fetchPeopleCheckedIn = async () => {
    try {
      const response = await fetch("/api/admin/checked-in", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCheckedInAddresses(data);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching checked in addresses", e);
    } finally {
      setLoadingCheckedIn(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPeopleCheckedIn();
    })();
  }, []);

  const tokenContracts: any[] = [];
  const dexContracts: { [key: string]: any } = {};

  scaffoldConfig.tokens.forEach(token => {
    const tokenName = token.name;
    // eslint-disable-next-line react-hooks/rules-of-hooks -- I think it's safe, scaffoldConfig.tokens should not change, let disable it for now
    const { data: tokenContract } = useScaffoldContract({
      contractName: token.contractName as ContractName,
    });
    tokenContracts.push({ name: tokenName, contract: tokenContract });
    if (tokenName !== "Salt") {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- I think it's safe, scaffoldConfig.tokens should not change, let disable it for now
      const { data: dexContract } = useScaffoldContract({
        contractName: `BasicDex${tokenName}` as ContractName,
      });
      dexContracts[tokenName] = dexContract;
    }
  });

  useEffect(() => {
    const updateLeaderboard = async () => {
      if (
        !loadingCheckedIn &&
        tokenContracts &&
        tokenContracts.length > 0 &&
        checkedInAddresses &&
        checkedInAddresses.length > 0
      ) {
        let leaderboardData: LeaderboardData[] = [];
        for (let i = 0; i < checkedInAddresses.length; i++) {
          const address = checkedInAddresses[i];
          let balance = BigNumber.from(0);
          for (let j = 0; j < tokenContracts.length; j++) {
            const tokenName = tokenContracts[j].name;
            const tokenBalance: BigNumber = await tokenContracts[j].contract.balanceOf(address);
            console.log("tokenBalance", tokenName, tokenBalance.toString());
            if (tokenBalance.isZero()) continue;
            if (tokenName !== "Salt") {
              const dexContract = dexContracts[tokenName];
              const saltBalance: BigNumber = await dexContract.creditPrice(tokenBalance);
              console.log("saltBalance", saltBalance.toString());
              balance = balance.add(saltBalance);
            } else {
              balance = balance.add(tokenBalance);
            }
          }
          leaderboardData.push({ address, balance });
        }
        leaderboardData = leaderboardData.sort((a, b) => (b.balance.gte(a.balance) ? 1 : -1));
        setLeaderboard(leaderboardData);
        setIsLoading(false);
      }
    };
    updateLeaderboard();
  }, [loadingCheckedIn, tokenContracts.length, checkedInAddresses]);

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
