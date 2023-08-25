import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BurnerSigner } from "~~/components/scaffold-eth/BurnerSigner";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

/**
 * Main Screen
 */
export const Main = () => {
  const { address } = useAccount();
  const [processing, setProcessing] = useState(false);
  const [loadingCheckedIn, setLoadingCheckedIn] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);

  const message = {
    action: "user-checkin",
    address: address,
  };

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
    if (!address) {
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
        body: JSON.stringify({ signature, signerAddress: address }),
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

  return (
    <>
      <div className="flex flex-col gap-2 max-w-[300px] text-center m-auto">
        <p className="font-bold mb-0">Welcome to {scaffoldConfig.eventName}!</p>
        <p>
          The <span className="font-bold">{scaffoldConfig.eventName} Wallet</span> is your wallet for gaming!
        </p>

        <BurnerSigner
          className={`btn btn-primary w-full mt-4 ${processing || loadingCheckedIn ? "loading" : ""}`}
          disabled={processing || loadingCheckedIn || checkedIn}
          message={message}
          handleSignature={handleSignature}
        >
          {loadingCheckedIn ? "..." : checkedIn ? "Checked-in" : "Check-in"}
        </BurnerSigner>
      </div>
    </>
  );
};
