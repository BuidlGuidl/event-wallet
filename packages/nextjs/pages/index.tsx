import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CheckCircleIcon, EllipsisHorizontalCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import GameIcon from "~~/Icons/GamesIcon";
import GasIcon from "~~/Icons/GasIcon";
import HomeIcon from "~~/Icons/HomeIcon";
import MedelsIcon from "~~/Icons/MedelsIcon";
import SendIcon from "~~/Icons/SendIcon";
import { Balance, FaucetButton } from "~~/components/scaffold-eth";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { CheckedIn, Collectibles, Main, Receive, Send, Swap } from "~~/components/screens";
import Games from "~~/components/screens/Games";
import Medals from "~~/components/screens/Medals";
import { Mint } from "~~/components/screens/Mint";
import { useAutoConnect, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

const screens = {
  main: <Main />,
  send: <Send />,
  games: <Games />,
  medals: <Medals />,
  receive: <Receive />,
  collectibles: <Collectibles />,
  mint: <Mint />,
  swap: <Swap />,
  checkedIn: <CheckedIn />,
};

type UserData = {
  checkin: string;
};

const Home: NextPage = () => {
  useAutoConnect();

  const screen = useAppStore(state => state.screen);
  const setScreen = useAppStore(state => state.setScreen);

  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userData, setUserData] = useState<UserData>();

  const { address } = useAccount();

  const saltToken = scaffoldConfig.saltToken;

  const { data: balance } = useScaffoldContractRead({
    contractName: "SaltToken",
    functionName: "balanceOf",
    args: [address],
  });

  const updateUserData = async () => {
    try {
      setLoadingUserData(true);
      const response = await fetch(`/api/users/${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        const result = await response.json();
        notification.error(result.error);
      }
    } catch (e) {
      console.log("Error getting user data", e);
    } finally {
      setLoadingUserData(false);
    }
  };

  useEffect(() => {
    if (address) {
      updateUserData();
    }
  }, [address]);

  const screenRender = screens[screen];

  return (
    <>
      <Head>
        <title>Event Wallet 2023</title>
        <meta name="description" content="Event Wallet experience" />
      </Head>

      <div className="flex flex-col items-center justify-center py-2">
        <div className="md:min-w-[24rem] p-8 my-16 w-full">
          <Image src="/bg.svg" alt="Event Wallet Logo" width={30} height={43} className="absolute top-0 left-0 m-5" />
          <div className="absolute top-0 right-0 m-5">
            <div className="flex items-center">
              <div className="flex items-center border border-[#000] rounded-full">
                <Balance className="pr-1" address={address} />
                <span className="text-sm pr-4">⛽</span>
              </div>
              <FaucetButton />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <>
              <div className="flex flex-col items-center mb-6 gap-4">
                <AddressMain address={address} disableAddressLink={true} />
                <div className="flex gap-4 items-center">
                  <TokenBalance key={saltToken.name} emoji={saltToken.emoji} amount={balance} />
                  <div className="text-xl font-bold flex gap-1">
                    {loadingUserData ? (
                      <EllipsisHorizontalCircleIcon className="w-4" />
                    ) : (
                      <>
                        {userData && userData.checkin ? (
                          <span title="Checked-in">
                            <CheckCircleIcon className="w-4 text-green-800" />
                          </span>
                        ) : (
                          <span title="Not checked-in">
                            <ExclamationCircleIcon className="w-4 text-red-800" />
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 justify-center mb-8">
                <button
                  className={`${screen === "main" ? "bg-white scale-110" : "bg-white "} text-[#0D0D0D] rounded-full p-3 `}
                  onClick={() => setScreen("main")}
                >
                  <HomeIcon width="22" height="22" fill={`${screen === "main" ? "#629FFC" : "#0D0D0D"}`} />
                </button>
                <button
                  className={`${screen === "send" ? "bg-white scale-110" : "bg-white"} text-[#0D0D0D] rounded-full p-3`}
                  onClick={() => setScreen("send")}
                >
                  <SendIcon width="22" height="22" fill={`${screen === "send" ? "#629FFC" : "#0D0D0D"}`} />
                </button>
                <button
                  className={`${screen === "games" ? "bg-white scale-110" : "bg-white"} text-[#0D0D0D] rounded-full p-3`}
                  onClick={() => setScreen("games")}
                >
                  <GameIcon width="24" height="22" fill={`${screen === "games" ? "#629FFC" : "#0D0D0D"}`} />
                </button>
                <button
                  className={`${screen === "medals" ? "bg-white scale-110" : "bg-white"} text-[#0D0D0D] rounded-full p-3`}
                  onClick={() => setScreen("medals")}
                >
                  <MedelsIcon width="22" height="22" fill={`${screen === "medals" ? "#629FFC" : "#0D0D0D"}`} />
                </button>
              </div>
            </>
          </div>

          <div className="fixed bottom-0 left-0 w-full pb-4 bg-white h-[50vh] overflow-y-scroll rounded-t-3xl p-4">
            {screenRender}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
