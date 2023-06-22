import { useEffect, useState } from "react";
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
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoadingClaimed, setIsLoadingClaimed] = useState(true);

  const amount = address && winners[address];

  useEffect(() => {
    const checkClaimed = async () => {
      try {
        const response = await fetch(`/api/check-claimed?address=${address}`);
        const result = await response.json();
        setIsClaimed(result.claimed);
      } catch (err) {
        console.error("Error checking claim status");
      } finally {
        setIsLoadingClaimed(false);
      }
    };

    if (address) {
      checkClaimed();
    }
  }, [address]);

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
      setIsClaimed(true);
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
          Get more information{" "}
          <a className="link" target="_blank" href="https://2023.edcon.io/wallet" rel="noreferrer">
            here
          </a>{" "}
          on how you can collect your DAI.
        </p>
        <p>
          Enter the <span className="font-bold">Mainnet Ethereum address</span> where you want to receive your DAI:
        </p>
        <AddressInput value={toAddress} onChange={v => setToAddress(v)} placeholder="To Address" />
      </div>
      <button
        className={`btn btn-primary w-full mt-4 ${processing || isLoadingClaimed ? "loading" : ""}`}
        disabled={processing || isLoadingClaimed || isClaimed}
        onClick={handleClick}
      >
        {isClaimed ? "Already Claimed" : "Claim DAI"}
      </button>
    </div>
  );
};
