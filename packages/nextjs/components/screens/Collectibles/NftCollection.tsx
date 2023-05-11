import NftAsset from "~~/components/NftAsset";

/**
 * NftCollection
 */
export const NftCollection = ({ nfts }: { nfts: any[] }) => {
  if (nfts.length === 0) {
    return (
      <div className="text-center">
        <p>No NFTs yet</p>
      </div>
    );
  }

  return (
    <>
      {nfts.map(nft => (
        <NftAsset id={nft.tokenType} key={nft.tokenType} />
      ))}
    </>
  );
};
