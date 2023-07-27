import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Balance, FaucetButton } from "~~/components/scaffold-eth";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { Collectibles, Main, Receive, Send } from "~~/components/screens";
import { Mint } from "~~/components/screens/Mint";
import { QuestionShow } from "~~/components/screens/QuestionShow";
import { useAutoConnect, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";
import { UserData } from "~~/types/question";
import { notification } from "~~/utils/scaffold-eth";

const screens = {
  main: <Main />,
  send: <Send />,
  receive: <Receive />,
  collectibles: <Collectibles />,
  mint: <Mint />,
  questionShow: <QuestionShow />,
};

const Home: NextPage = () => {
  useAutoConnect();

  const screen = useAppStore(state => state.screen);
  const setScreen = useAppStore(state => state.setScreen);

  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userData, setUserData] = useState<UserData>();

  const { address } = useAccount();
  const { data: balance } = useScaffoldContractRead({
    contractName: "EventGems",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: balanceSBT } = useScaffoldContractRead({
    contractName: "EventSBT",
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
        <div className="max-w-96 p-8">
          <Image src="/bg.png" alt="Event Wallet Logo" width={30} height={43} className="absolute top-0 left-0 m-5" />
          <div className="absolute top-0 right-0 m-5">
            <div className="flex items-center">
              <div className="flex items-center">
                <Balance className="pr-1" address={address} />
                <span className="text-sm">⛽</span>
              </div>
              <FaucetButton />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <>
              <div className="flex flex-col items-center mb-6 gap-4">
                <AddressMain address={address} disableAddressLink={true} />
                <div className="flex gap-4 items-center">
                  <TokenBalance amount={balance} />
                  <div className="text-xl font-bold flex gap-1">
                    <AcademicCapIcon className="w-4" />
                    {loadingUserData ? (
                      "..."
                    ) : (
                      <>
                        {userData ? userData.score : 0}
                        {userData && userData.checkin ? <CheckIcon className="w-4 text-green-800" /> : null}
                      </>
                    )}
                  </div>
                  <div className="text-xl font-bold flex gap-1">
                    <PhotoIcon className="w-4" />
                    {balanceSBT?.toString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 justify-center mb-8">
                <button
                  className={`${screen === "main" ? "bg-primary" : "bg-secondary"} text-white rounded-full p-3`}
                  onClick={() => setScreen("main")}
                >
                  <HomeIcon className="w-8" />
                </button>
                <button
                  className={`${screen === "receive" ? "bg-primary" : "bg-secondary"} text-white rounded-full p-3`}
                  onClick={() => setScreen("receive")}
                >
                  <ArrowDownTrayIcon className="w-8" />
                </button>
                <button
                  className={`${screen === "send" ? "bg-primary" : "bg-secondary"} text-white rounded-full p-3`}
                  onClick={() => setScreen("send")}
                >
                  <PaperAirplaneIcon className="w-8" />
                </button>
                <button
                  className={`${screen === "collectibles" ? "bg-primary" : "bg-secondary"} text-white rounded-full p-3`}
                  onClick={() => setScreen("collectibles")}
                >
                  <PhotoIcon className="w-8" />
                </button>
              </div>
            </>
          </div>

          <div>{screenRender}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
