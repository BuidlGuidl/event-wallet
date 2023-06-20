import { useState } from "react";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";
import { winners } from "~~/winners";

export const Claim = () => {
  const { address } = useAccount();
  const [toAddress, setToAddress] = useState("");
  const [processing, setProcessing] = useState(false);

  const amount = address && winners[address];

  const handleClick = async () => {
    setProcessing(true);
    if (!address) {
      return;
    }
    if (!isAddress(toAddress)) {
      toast.error("Please enter a valid address");
    }

    try {
      // Initialize Web3 provider
      const burnerPK = loadBurnerSK();
      const signer = new ethers.Wallet(burnerPK);

      // Sign the message
      const signature = await signer.signMessage(address);

      // Post the signed message to the API
      const response = await fetch("/api/claim-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature, signerAddress: address, destinationAddress: toAddress }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      toast.success("Claimed DAI! You should receive it shortly in your destination address.");
      setToAddress("");
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <p>🎉</p>
      <p className="text-center text-xl font-bold">Winner! ({amount} DAI)</p>
      <div>
        <p>
          Get more info{" "}
          <a className="link" target="_blank" href="https://test.edcon.io/wallet" rel="noreferrer">
            here
          </a>{" "}
          on how you can off-ramp your DAI.
        </p>
        <p>Enter the address when you want to receive your DAI:</p>
        <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
      </div>
      <button
        className={`btn btn-primary w-full mt-4 ${processing ? "loading" : ""}`}
        disabled={processing}
        onClick={handleClick}
      >
        Claim DAI
      </button>
    </div>
  );
};
