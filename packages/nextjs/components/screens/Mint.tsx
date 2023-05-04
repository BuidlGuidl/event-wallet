import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

export const NTFS = {
  "0": "🦬",
  "1": "🦓",
  "2": "🦏",
};

/**
 * Mint Screen
 */
export const Mint = () => {
  const payload = useAppStore(state => state.screenPayload);

  const nftId = payload?.nftId;

  if (nftId === undefined) {
    return (
      <div className="text-center">
        <p className="font-bold">Invalid NFT</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <span className="text-8xl mb-10">{NTFS[nftId as keyof typeof NTFS]}</span>
      </div>
      <div>
        <button
          onClick={() => {
            notification.info("Not implemented yet :)");
          }}
          className="btn btn-primary w-full mt-4"
        >
          Mint
        </button>
      </div>
    </div>
  );
};
