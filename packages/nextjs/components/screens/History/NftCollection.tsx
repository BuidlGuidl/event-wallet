import NftAsset from "~~/components/NftAsset";

/**
 * NftCollection
 */
export const NftCollection = ({ nfts }: { nfts: any[] }) => {
  if (nfts.length === 0) {
    return (
      <div className="text-center">
        <p className="font-bold">No NFTs yet</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold mt-4 text-xl">Your NFTs</h2>
      {nfts.map(nft => (
        <NftAsset id={nft.tokenType} key={nft.tokenType} />
      ))}
    </>
  );
};
