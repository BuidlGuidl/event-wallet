import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";

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

  return (
    <div className="flex flex-col gap-2">
      <div>
        <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
      </div>
      <div>
        <InputBase type="number" value={amount} onChange={v => setAmount(v)} placeholder="Amount" />
      </div>
      <div>
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
    </div>
  );
};
