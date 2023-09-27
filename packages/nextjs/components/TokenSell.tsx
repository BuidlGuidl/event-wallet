import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useDebouncedCallback } from "use-debounce";
import { useAccount } from "wagmi";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type TokenName = "Avocado" | "Banana" | "Tomato";

export const TokenSell = ({
  token,
  defaultAmountIn,
  defaultAmountOut,
  close,
  balanceToken,
}: {
  token: ContractName;
  defaultAmountIn: string;
  defaultAmountOut: string;
  close?: () => void;
  balanceToken: BigNumber;
}) => {
  const { address } = useAccount();
  const [amountIn, setAmountIn] = useState<string>(defaultAmountIn);
  const [amountOut, setAmountOut] = useState<string>(defaultAmountOut);
  const [priceLoading, setPriceLoading] = useState<boolean>(false);

  const tokenName: TokenName = token.replace("Token", "") as TokenName;
  const tokenEmoji = scaffoldConfig.tokens.find(t => token === t.contractName)?.emoji;
  const saltEmoji = scaffoldConfig.tokens[0].emoji;

  const dexContractName: ContractName = `BasicDex${tokenName}` as ContractName;

  const { data: dexContract, isLoading: isLoadingDex } = useScaffoldContract({ contractName: dexContractName });

  const { data: saltAllowance } = useScaffoldContractRead({
    contractName: "SaltToken",
    functionName: "allowance",
    args: [address, dexContract?.address],
  });

  console.log("saltAllowance", saltAllowance?.toString());

  const { data: tokenAllowance } = useScaffoldContractRead({
    contractName: token,
    functionName: "allowance",
    args: [address, dexContract?.address],
  });

  console.log("tokenAllowance", token, tokenAllowance?.toString());

  const slippage = BigNumber.from("105").div("100");

  const { writeAsync: assetToCredit, isMining: isMiningAssetToCredit } = useScaffoldContractWrite({
    contractName: dexContractName,
    functionName: "assetToCredit",
    args: [ethers.utils.parseEther(amountIn || "0").mul(slippage), ethers.utils.parseEther(amountOut || "0")],
  });

  const { writeAsync: approveToken, isMining: isMiningApproveToken } = useScaffoldContractWrite({
    contractName: token,
    functionName: "approve",
    args: [dexContract?.address, ethers.utils.parseEther("100000")],
  });

  const isLoading = isLoadingDex || isMiningAssetToCredit || isMiningApproveToken;
  const disabled =
    isLoading || amountIn === "" || amountOut === "" || ethers.utils.parseEther(amountIn || "0").gt(balanceToken);

  const changeAmountIn = async (amount: string) => {
    const parsedAmount = ethers.utils.parseEther(amount || "0");

    if (dexContract && parsedAmount.gt(0)) {
      let price = 0;
      price = await dexContract.assetInPrice(parsedAmount);

      setAmountIn(amount);
      setAmountOut(ethers.utils.formatUnits(price));
    } else {
      setAmountIn("");
      setAmountOut("");
    }
    setPriceLoading(false);
  };

  const handleSend = async () => {
    const parsedAmountOut = ethers.utils.parseEther(amountOut || "0");
    if (parsedAmountOut.lte(0)) {
      notification.error("Please enter an amount");
      return;
    }

    const parsedAmountIn = ethers.utils.parseEther(amountIn || "0");
    if (parsedAmountIn.lte(0)) {
      notification.error("Please enter an amount");
      return;
    }

    try {
      console.log("tokenAllowance: ", tokenAllowance?.toString());
      if (tokenAllowance && tokenAllowance.lt(parsedAmountIn)) {
        await approveToken();
      }
      await assetToCredit();

      setAmountIn("");
      setAmountOut("");
      if (close) {
        close();
      }
    } catch (e) {
      console.error("Error swapping tokens: ", e);
      notification.error("Error swapping tokens");
    }
  };

  const debouncedChangeAmountIn = useDebouncedCallback(async v => {
    if (v.length < 21) {
      await changeAmountIn(v);
    }
  }, 1000);

  return (
    <div className="flex flex-col gap-2 m-8">
      <div className="flex justify-center text-2xl">Sell {tokenEmoji}</div>
      <div className="flex justify-center">
        <div className="w-[200px]">
          <InputBase
            type="number"
            value={amountIn}
            onChange={v => {
              debouncedChangeAmountIn(v);
              setAmountIn(v);
              setPriceLoading(true);
            }}
            placeholder="0"
          />
        </div>
        <button
          className="ml-1 mt-3 text-primary"
          onClick={() => {
            if (balanceToken) {
              changeAmountIn(ethers.utils.formatUnits(balanceToken));
            } else {
              changeAmountIn("0");
            }
          }}
        >
          Max
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-[200px]">
          {saltEmoji}
          {priceLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className={`${ethers.utils.parseEther(amountIn || "0").gt(balanceToken) ? "text-red-600" : ""}`}>
              {amountOut.slice(0, amountOut.indexOf(".") + 5)}
            </span>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={handleSend}
          className={`btn btn-primary w-full mt-4 ${isLoading ? "loading" : ""}`}
          disabled={disabled}
        >
          <PaperAirplaneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Sell
        </button>
      </div>
    </div>
  );
};
