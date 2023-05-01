import Head from "next/head";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowDownTrayIcon, HomeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { Main } from "~~/components/screens/Main";
import { Receive } from "~~/components/screens/Receive";
import { Send } from "~~/components/screens/Send";
import { useAutoConnect, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { useAppStore } from "~~/services/store/store";

const Home: NextPage = () => {
  useAutoConnect();

  const screen = useAppStore(state => state.screen);
  const setScreen = useAppStore(state => state.setScreen);

  const { address, isConnected } = useAccount();
  const { data: balance } = useScaffoldContractRead({
    contractName: "EventGems",
    functionName: "balanceOf",
    args: [address],
  });

  let screenRender = <></>;
  switch (screen) {
    case "main":
      screenRender = <Main />;
      break;
    case "send":
      screenRender = <Send />;
      break;
    case "receive":
      screenRender = <Receive />;
      break;
  }

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex flex-col items-center justify-center py-2">
        <div className="max-w-96 p-8">
          <img
            src="https://ueth.org/_nuxt/img/logo.7b7e59b.png"
            alt="EDCON WALLET"
            className="max-w-[40px] absolute top-0 left-0 m-5"
          />
          <div className="flex flex-col gap-2 pt-2">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center my-16">
                <span className="animate-bounce text-8xl">{scaffoldConfig.tokenEmoji}</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-2 gap-4">
                  <AddressMain address={address} />
                  <TokenBalance amount={balance} />
                </div>
                <div className="flex gap-6 justify-center mb-8">
                  <button className="bg-secondary text-white rounded-full p-3" onClick={() => setScreen("main")}>
                    <HomeIcon className="w-8" />
                  </button>
                  <button className="bg-secondary text-white rounded-full p-3" onClick={() => setScreen("receive")}>
                    <ArrowDownTrayIcon className="w-8" />
                  </button>
                  <button className="bg-secondary text-white rounded-full p-3" onClick={() => setScreen("send")}>
                    <PaperAirplaneIcon className="w-8" />
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
