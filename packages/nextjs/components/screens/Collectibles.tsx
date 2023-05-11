import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { ASSETS } from "~~/assets";
import { NftCollection } from "~~/components/screens/Collectibles/NftCollection";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import untypedMetadataHashes from "~~/metadataHashes.json";

/**
 * History Screen
 */
export const Collectibles = () => {
  const { address } = useAccount();

  type MetadataHashes = {
    [key: string]: string;
  };

  type Nft = {
    id: BigNumber;
    uri: string;
    owner: string;
    tokenType: string;
    name: string;
    talk: string;
  };

  const [yourNfts, setYourNfts] = useState<Nft[]>([]);
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);

  const { data: balance } = useScaffoldContractRead({
    contractName: "EventSBT",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: nftContract } = useScaffoldContract({ contractName: "EventSBT" });

  useEffect(() => {
    const updateYourNfts = async () => {
      setIsLoadingNfts(true);
      const nftUpdate: Nft[] = [];
      const metadataHashes: MetadataHashes = untypedMetadataHashes;
      if (nftContract && balance && balance.toNumber && balance.toNumber() > 0) {
        for (let tokenIndex = 0; tokenIndex < balance.toNumber(); tokenIndex++) {
          try {
            const tokenId: BigNumber = await nftContract.tokenOfOwnerByIndex(address, tokenIndex);
            console.log("Getting NFT tokenId: ", tokenId.toNumber());
            const tokenURI: string = await nftContract.tokenURI(tokenId);
            console.log("tokenURI: ", tokenURI);
            const hash: string = tokenURI.split("/").pop()!;
            console.log("hash: ", hash);
            const tokenType = metadataHashes[hash];
            const nftData = ASSETS[tokenType as keyof typeof ASSETS];

            const nft: Nft = {
              id: tokenId,
              uri: tokenURI,
              owner: address!,
              tokenType: tokenType,
              name: nftData.name,
              talk: nftData.talk,
            };

            nftUpdate.push(nft);
          } catch (e) {
            console.log(e);
          }
        }
      }
      console.log("nfUpdate: ", nftUpdate);
      setYourNfts(nftUpdate.reverse());
      if (nftContract && balance) setIsLoadingNfts(false);
    };
    updateYourNfts();
  }, [address, balance, nftContract]);

  if (isLoadingNfts) {
    return (
      <div className="text-center">
        <p className="font-bold">
          Loading collectibles<span className=" loading-dots">...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold mt-4 text-xl">Your NFTs</h2>
      <NftCollection nfts={yourNfts} />
    </div>
  );
};
