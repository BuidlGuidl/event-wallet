import { useAccount } from "wagmi";
import { Claim } from "~~/components/screens/Main/Claim";
import { winners } from "~~/winners";

/**
 * Main Screen
 */
export const Main = () => {
  const { address } = useAccount();
  return (
    <>
      <div className="flex flex-col gap-2 max-w-[300px] text-center">
        {address && winners[address] ? (
          <div>
            <Claim />
          </div>
        ) : (
          <>
            <p className="font-bold mb-0">Welcome to EDCON!</p>
            <p>
              The <span className="font-bold">EDCON wallet</span> will help you collect soulbound NFTs of each speaker.
              You can also collect and trade 💎 gems, a pop up currency for the event.
            </p>
          </>
        )}
      </div>
    </>
  );
};
