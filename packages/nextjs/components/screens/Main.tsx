import { useEffect, useState } from "react";
import { InputBase } from "../scaffold-eth";
import { BigNumber, ethers } from "ethers";
import { useInterval } from "usehooks-ts";
import { useAccount } from "wagmi";
import { BackwardIcon } from "@heroicons/react/24/outline";
import PriceChart from "~~/components/PriceChart";
import { TokenBuy } from "~~/components/TokenBuy";
import { TokenSell } from "~~/components/TokenSell";
import { BurnerSigner } from "~~/components/scaffold-eth/BurnerSigner";
import { TokenBalanceRow } from "~~/components/scaffold-eth/TokenBalanceRow";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { TTokenBalance, TTokenInfo } from "~~/types/wallet";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

/**
 * Main Screen
 */
export const Main = () => {
  const tokens = scaffoldConfig.tokens;

  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);
  const [loadingCheckedIn, setLoadingCheckedIn] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);
  const [alias, setAlias] = useState("");
  const [swapToken, setSwapToken] = useState<TTokenInfo>(scaffoldConfig.tokens[0]);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [selectedTokenName, setSelectedTokenName] = useState<string>(tokens[0].name);
  const [tokensData, setTokensData] = useState<{ [key: string]: TTokenBalance }>({});
  const [loadingTokensData, setLoadingTokensData] = useState<boolean>(true);
  const [totalNetWorth, setTotalNetWorth] = useState<BigNumber>(BigNumber.from("0"));

  const message = {
    action: "user-checkin",
    address: address,
    alias: alias,
  };

  const { data: balanceSalt } = useScaffoldContractRead({
    contractName: "SaltToken",
    functionName: "balanceOf",
    args: [address],
  });

  const tokenContracts: { [key: string]: ethers.Contract } = {};
  const dexContracts: { [key: string]: ethers.Contract } = {};

  const saltEmoji = scaffoldConfig.saltToken.emoji;

  tokens.forEach(token => {
    const contractName: ContractName = `${token.name}Token` as ContractName;
    const contractDexName: ContractName = `BasicDex${token.name}` as ContractName;

    // The tokens array should not change, so this should be safe. Anyway, we can refactor this later.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useScaffoldContract({ contractName });
    if (data) {
      tokenContracts[token.name] = data;
    }

    // The tokens array should not change, so this should be safe. Anyway, we can refactor this later.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: dex } = useScaffoldContract({ contractName: contractDexName });
    if (dex) {
      dexContracts[token.name] = dex;
    }
  });

  const updateTokensData = async () => {
    const newTokenData: { [key: string]: TTokenBalance } = {};
    let total = balanceSalt || BigNumber.from("0");

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenContract = tokenContracts[token.name];
      const dexContract = dexContracts[token.name];

      if (tokenContract && dexContract) {
        const balance = await tokenContract.balanceOf(address);
        const price = await dexContract.assetOutPrice(ethers.utils.parseEther("1"));
        const priceIn = await dexContract.assetInPrice(ethers.utils.parseEther("1"));
        const value = price.mul(balance).div(ethers.utils.parseEther("1"));

        newTokenData[token.name] = {
          balance: balance,
          price: price,
          priceIn: priceIn,
          value: value,
        };

        total = total.add(value);
      }
    }

    setTokensData(newTokenData);
    setTotalNetWorth(total);
    setLoadingTokensData(false);
  };

  useEffect(() => {
    (async () => {
      if (Object.keys(tokenContracts).length === tokens.length && Object.keys(dexContracts).length === tokens.length) {
        await updateTokensData();
      }
    })();
  }, [Object.keys(tokenContracts).length, Object.keys(dexContracts).length]);

  useInterval(async () => {
    if (Object.keys(tokenContracts).length === tokens.length && Object.keys(dexContracts).length === tokens.length) {
      await updateTokensData();
    }
  }, scaffoldConfig.pollingInterval);

  useEffect(() => {
    const updateCheckedIn = async () => {
      try {
        setLoadingCheckedIn(true);
        const response = await fetch(`/api/users/${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setCheckedIn(true);
        }
      } catch (e) {
        console.log("Error checking if user is checked in", e);
      } finally {
        setLoadingCheckedIn(false);
      }
    };

    if (address) {
      updateCheckedIn();
    }
  }, [address]);

  const handleSignature = async ({ signature }: { signature: string }) => {
    setProcessing(true);
    if (!address || !alias) {
      setProcessing(false);
      return;
    }

    try {
      // Post the signed message to the API
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature, signerAddress: address, alias: alias }),
      });

      if (response.ok) {
        setCheckedIn(true);
        notification.success("Checked in!");
      } else {
        const result = await response.json();
        notification.error(result.error);
      }
    } catch (e) {
      console.log("Error checking in the user", e);
    } finally {
      setProcessing(false);
    }
  };

  const handleShowBuy = (selectedToken: TTokenInfo) => {
    console.log("selectedToken emoji: ", selectedToken.emoji);
    setSwapToken(selectedToken);
    setShowBuy(true);
  };

  const handleShowSell = (selectedToken: TTokenInfo) => {
    console.log("selectedToken emoji: ", selectedToken.emoji);
    setSwapToken(selectedToken);
    setShowSell(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-center m-auto overflow-x-hidden">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl"> Your Tokens </h1>
        </div>
        <div className="flex flex-col gap-2 max-w-[430px] text-center mx-auto w-full">
          <p className="font-medium text-lg flex w-4/5 justify-between mx-auto">
            <span> Total Net Worth:</span>
            {saltEmoji}{" "}
            {loadingTokensData ? "..." : ethers.utils.formatEther(totalNetWorth.sub(totalNetWorth.mod(1e14)))}
          </p>

          {!checkedIn && !loadingCheckedIn && (
            <div>
              <h2>Sign Up to Play the Game</h2>
              <div>
                <InputBase
                  value={alias}
                  onChange={v => {
                    setAlias(v);
                  }}
                  placeholder={alias ? alias : "Username"}
                />
              </div>

              <BurnerSigner
                className={`btn btn-primary w-full mt-4 ${processing || loadingCheckedIn ? "loading" : ""}`}
                disabled={processing || loadingCheckedIn || checkedIn}
                message={message}
                handleSignature={handleSignature}
              >
                {loadingCheckedIn ? "..." : checkedIn ? "Checked-in" : "Check-in"}
              </BurnerSigner>
            </div>
          )}

          {checkedIn && !showBuy && !showSell && (
            <>
              <div className="rounded-xl w-full overflow-x-auto">
                <table className="table-auto text-xs md:text-sm border-seperate w-full">
                  <thead className="bg-grey-light text-grey-dark">
                    <tr>
                      <th>Token</th>
                      <th>Price</th>
                      <th>Balance</th>
                      <th>Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map(token => (
                      <TokenBalanceRow
                        key={token.name}
                        tokenInfo={token}
                        tokenBalance={tokensData[token.name]}
                        handleShowBuy={handleShowBuy}
                        handleShowSell={handleShowSell}
                        loading={loadingTokensData}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {scaffoldConfig.showChart && (
                <>
                  <div className="flex gap-4 text-3xl mt-8">
                    {tokens.map(token => (
                      <label
                        key={token.name}
                        className={`p-2 cursor-pointer ${
                          selectedTokenName === token.name ? "bg-primary outline outline-2 outline-black" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="token"
                          value={token.name}
                          className="w-0 h-0"
                          onChange={t => setSelectedTokenName(t.target.value)}
                        />
                        {token.emoji}
                      </label>
                    ))}
                  </div>

                  <PriceChart tokenName={selectedTokenName} />
                </>
              )}
            </>
          )}

          {checkedIn && showBuy && (
            <div className="bg-grey-light rounded-xl p-4">
              <button className="btn btn-primary" onClick={() => setShowBuy(false)}>
                <BackwardIcon className="h-5 w-5 mr-2" /> Go Back
              </button>
              <TokenBuy
                token={swapToken.contractName as ContractName}
                defaultAmountOut={"1"}
                defaultAmountIn={ethers.utils.formatEther(
                  tokensData[swapToken.name].price.sub(tokensData[swapToken.name].price.mod(1e14)).add(1e14),
                )}
                balanceSalt={balanceSalt || BigNumber.from("0")}
                close={() => setShowBuy(false)}
              />
            </div>
          )}

          {checkedIn && showSell && (
            <div className="bg-grey-light rounded-xl p-4">
              <button className="btn btn-primary" onClick={() => setShowSell(false)}>
                <BackwardIcon className="h-5 w-5 mr-2" /> Go Back
              </button>
              <TokenSell
                token={swapToken.contractName as ContractName}
                defaultAmountOut={ethers.utils.formatUnits(tokensData[swapToken.name].priceIn)}
                defaultAmountIn={"1"}
                balanceToken={tokensData[swapToken.name].balance}
                close={() => setShowSell(false)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
