import { useEffect, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowDownTrayIcon, HomeIcon, PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Balance, FaucetButton } from "~~/components/scaffold-eth";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { Collectibles, Main, Receive, Send } from "~~/components/screens";
import { Mint } from "~~/components/screens/Mint";
import { NotAllowed } from "~~/components/screens/NotAllowed";
import { isBurnerWalletloaded, useAutoConnect, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { useAppStore } from "~~/services/store/store";

const screens = {
  main: <Main />,
  send: <Send />,
  receive: <Receive />,
  collectibles: <Collectibles />,
  mint: <Mint />,
};

const Home: NextPage = () => {
  useAutoConnect();

  const [isLoadingBurnerWallet, setIsLoadingBurnerWallet] = useState(true);

  const screen = useAppStore(state => state.screen);
  const setScreen = useAppStore(state => state.setScreen);

  const { address, isConnected } = useAccount();
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

  const screenRender = screens[screen];
  const isBurnerWalletSet = isBurnerWalletloaded();

  useEffect(() => {
    // Check if isBurnerWalletSet is true OR false
    if (isBurnerWalletSet || isBurnerWalletSet === false) {
      setIsLoadingBurnerWallet(false);
    }
  }, [isBurnerWalletSet]);

  if (!isBurnerWalletSet && !isLoadingBurnerWallet) {
    return <NotAllowed />;
  }

  return (
    <>
      <Head>
        <title>Edcon Wallet 2023</title>
        <meta name="description" content="Edcon Burner Wallet experience" />
      </Head>

      <div className="flex flex-col items-center justify-center py-2">
        <div className="max-w-96 p-8">
          <img
            src="bg.png"
            alt="EVENT WALLET"
            className="max-w-[40px] absolute top-0 left-0 m-5"
          />
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
            {!isConnected && isLoadingBurnerWallet ? (
              <div className="flex flex-col items-center justify-center my-16">
                <span className="animate-bounce text-8xl">{scaffoldConfig.tokenEmoji}</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-6 gap-4">
                  <AddressMain address={address} disableAddressLink={true} />
                  <div className="flex gap-4 items-center">
                    <TokenBalance amount={balance} />
                    <span className="text-xl">/</span>
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
                    className={`${
                      screen === "collectibles" ? "bg-primary" : "bg-secondary"
                    } text-white rounded-full p-3`}
                    onClick={() => setScreen("collectibles")}
                  >
                    <PhotoIcon className="w-8" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div>{screenRender}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
