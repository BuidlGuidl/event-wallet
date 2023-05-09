import NftAsset from "~~/components/NftAsset";
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

  return (
    <div className="flex flex-col gap-2">
      <NftAsset id={nftId} />
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
