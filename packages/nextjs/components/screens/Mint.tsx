import { ASSETS } from "~~/assets";
import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

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

  const nft = ASSETS[nftId as keyof typeof ASSETS];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <img src={`/assets/${nftId}.jpg`} alt={`${nft.name}`} className="mb-4" />
        <span className="text-8xl mb-10"></span>
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
