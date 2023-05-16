import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { GemHistory } from "~~/components/screens/Send/GemsHistory";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

/**
 * Send Screen
 */
export const Send = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const payload = useAppStore(state => state.screenPayload);

  useEffect(() => {
    if (payload?.toAddress) {
      setToAddress(payload?.toAddress);
    }
  }, [payload]);

  const { writeAsync: transfer, isMining } = useScaffoldContractWrite({
    contractName: "EventGems",
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
    <div className="flex flex-col gap-2">
      <div>
        <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
      </div>
      <div>
        <InputBase type="number" value={amount} onChange={v => setAmount(v)} placeholder="Amount" />
      </div>
      <div>
        <button onClick={handleSend} className={`btn btn-primary w-full mt-4 ${isMining ? "loading" : ""}`}>
          <PaperAirplaneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Send
        </button>
      </div>
      <div className="mt-4 w-full">
        <GemHistory />
      </div>
    </div>
  );
};
