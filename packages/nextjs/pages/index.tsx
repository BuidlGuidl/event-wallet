import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { ArrowDownTrayIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput, InputBase } from "~~/components/scaffold-eth";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { Modal } from "~~/components/scaffold-eth/Modal";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { useAutoConnect, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

const Home: NextPage = () => {
  useAutoConnect();

  const { address, isConnected } = useAccount();
  const { data: balance } = useScaffoldContractRead({
    contractName: "EventGems",
    functionName: "balanceOf",
    args: [address],
  });

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { writeAsync: transfer, isMining } = useScaffoldContractWrite({
    contractName: "EventGems",
    functionName: "transfer",
    args: [toAddress, ethers.utils.parseEther(amount || "0")],
  });

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex flex-col items-center justify-center mt-8 py-2">
        <div className="card w-96 bg-base-100 shadow-xl p-8">
          <figure>
            <img
              src="https://edcon.io/_nuxt/img/edcon-banner.80a1b17.png"
              alt="EDCON WALLET"
              className="max-w-[150px]"
            />
          </figure>
          <div className="card-body pt-2">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center my-16">
                <span className="animate-bounce text-8xl">{scaffoldConfig.tokenEmoji}</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-8 gap-4">
                  <AddressMain address={address} />
                  <TokenBalance amount={balance} />
                </div>

                <div>
                  <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
                </div>
                <div>
                  <InputBase type="number" value={amount} onChange={v => setAmount(v)} placeholder="Amount" />
                </div>
                <div className="card-actions">
                  <button
                    onClick={async () => {
                      await transfer();
                      setAmount("");
                    }}
                    className={`btn btn-primary w-full mt-4 ${isMining ? "loading" : ""}`}
                  >
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Send
                  </button>
                </div>
                <div className="card-actions block">
                  <Modal
                    id="receive"
                    button={
                      <label htmlFor={"receive"} className={`btn btn-secondary w-full mt-4`}>
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Receive
                      </label>
                    }
                    content={
                      <div className="flex flex-col items-center justify-center p-8">
                        {address && (
                          <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={address}
                            viewBox={`0 0 256 256`}
                          />
                        )}
                        <div className="mt-4">
                          <Address address={address} />
                        </div>
                      </div>
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
