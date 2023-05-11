import NftAsset from "~~/components/NftAsset";
import { useAppStore } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";

/**
 * Mint Screen
 */
export const Mint = () => {
  const payload = useAppStore(state => state.screenPayload);

  const { address } = useAccount();

  const nftId = payload?.nftId;

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EventSBT",
    functionName: "mint",
    args: [address, BigNumber.from(nftId)],
    onSuccess() {
      notification.success("Minted!");
    }
  });

  if (nftId === undefined) {
    return (
      <div className="text-center">
        <p className="font-bold">Invalid NFT</p>
      </div>
    );
  }

  // ToDo. Check if the NFT is already minted
  return (
    <div className="flex flex-col gap-2">
      <NftAsset id={nftId} />
      <div>
        <button
          onClick={writeAsync}
          className="btn btn-primary w-full mt-4"
          disabled={isLoading}
        >
          Mint
        </button>
      </div>
    </div>
  );
};
