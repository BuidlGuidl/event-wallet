import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

/**
 * Main Screen
 */
export const Main = () => {
  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);
  const [loadingCheckedIn, setLoadingCheckedIn] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    const updateCheckedIn = async () => {
      if (address) {
        setLoadingCheckedIn(true);
        const response = await fetch(`/api/checked-in/${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setCheckedIn(true);
        }

        setLoadingCheckedIn(false);
      }
    };
    updateCheckedIn();
  }, [address]);

  const handleClick = async () => {
    setProcessing(true);
    if (!address) {
      return;
    }

    try {
      // Initialize Web3 provider
      const burnerPK = loadBurnerSK();
      const signer = new ethers.Wallet(burnerPK);

      // Sign the message
      const signature = await signer.signMessage(address);

      // Post the signed message to the API
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature, signerAddress: address }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      toast.success("Checked in!");
      setCheckedIn(true);
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 max-w-[300px] text-center">
        <p className="font-bold mb-0">Welcome to {scaffoldConfig.eventName}!</p>
        <p>
          The <span className="font-bold">{scaffoldConfig.eventName} wallet</span> will help you collect soulbound NFTs
          of each speaker. You can also collect and trade {scaffoldConfig.tokenEmoji} gems, a pop up currency for the
          event.
        </p>
        <button
          className={`btn btn-primary w-full mt-4 ${processing || loadingCheckedIn ? "loading" : ""}`}
          disabled={processing || loadingCheckedIn || checkedIn}
          onClick={handleClick}
        >
          {loadingCheckedIn ? "..." : checkedIn ? "Checked-in" : "Check-in"}
        </button>
      </div>
    </>
  );
};
