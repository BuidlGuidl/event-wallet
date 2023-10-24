import { useEffect, useState } from "react";
import { TokenInput, TokenListTypes } from "../game-wallet/Input/TokenInput";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { AddressInput } from "~~/components/scaffold-eth";
import { GemHistory } from "~~/components/screens/Send/GemsHistory";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

/**
 * Send Screen
 */
export const Send = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<ContractName>(
    scaffoldConfig.saltToken.contractName as ContractName,
  );
  const payload = useAppStore(state => state.screenPayload);

  useEffect(() => {
    if (payload?.toAddress) {
      setToAddress(payload?.toAddress);
    }
  }, [payload]);

  const { writeAsync: transfer, isMining } = useScaffoldContractWrite({
    contractName: selectedToken,
    functionName: "transfer",
    args: [toAddress, ethers.utils.parseEther(amount || "0")],
  });

  const handleSend = async () => {
    if (!isAddress(toAddress)) {
      notification.error("Please enter a valid address");
      return;
    }

    const parsedAmount = ethers.utils.parseEther(amount || "0");
    if (parsedAmount.lte(0)) {
      notification.error("Please enter an amount");
      return;
    }

    await transfer();
    setAmount("");
  };

  return (
    <div className="flex flex-col gap-2 text-center m-auto overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl"> Send Tokens </h1>
      </div>
      <div>
        <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
      </div>
      <div>
        <TokenInput
          name="tokenInput"
          onChange={v => {
            setAmount(v);
          }}
          value={amount}
          onTokenChange={value => setSelectedToken(value as ContractName)}
          tokens={[scaffoldConfig.saltToken].concat(scaffoldConfig.tokens) as TokenListTypes[]}
        />
      </div>
      <div>
        <button onClick={handleSend} className={`btn btn-primary w-full mt-4 text-white ${isMining ? "loading" : ""}`}>
          Send
        </button>
      </div>
      <div className="mt-4 w-full">
        <GemHistory tokenContract={selectedToken} />
      </div>
    </div>
  );
};
