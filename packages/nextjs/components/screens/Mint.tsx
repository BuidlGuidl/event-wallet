import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import NftAsset from "~~/components/NftAsset";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";

/**
 * Mint Screen
 */
export const Mint = () => {
  const payload = useAppStore(state => state.screenPayload);
  const setScreen = useAppStore(state => state.setScreen);

  const { address } = useAccount();

  const nftId = payload?.nftId;

  const { writeAsync, isMining } = useScaffoldContractWrite({
    contractName: "EventSBT",
    functionName: "mint",
    args: [address, BigNumber.from(nftId)],
  });

  const handleMint = async () => {
    await writeAsync();
    setScreen("collectibles");
  };

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
      <p className="font-bold max-w-[300px] text-center">Are you sure you want to mint this soulbound NFT?</p>
      <div>
        <button onClick={handleMint} className="btn btn-primary w-full mb-4" disabled={isMining}>
          Yes, mint
        </button>
      </div>
      <NftAsset id={nftId} />
    </div>
  );
};
