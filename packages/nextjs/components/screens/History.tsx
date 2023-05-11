import { useState, useEffect } from "react";
import { useAccount, useBlockNumber } from "wagmi";
import { EventRow } from "~~/components/screens/History/EventRow";
import { useScaffoldEventHistory, useScaffoldContractRead, useScaffoldContract } from "~~/hooks/scaffold-eth";
import untypedMetadataHashes from "~~/metadataHashes.json";
import { ASSETS } from "~~/assets";
import { BigNumber } from "ethers";

/**
 * History Screen
 */
export const History = () => {
  const { data: blockNumber } = useBlockNumber();
  const { address } = useAccount();

  // Starting block to fetch events from
  // NEXT_PUBLIC_DEPLOY_BLOCK > blockNumber - 1000 > 0
  const fromBlock = process.env.NEXT_PUBLIC_DEPLOY_BLOCK
    ? Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK)
    : blockNumber
      ? blockNumber - 1000
      : 0;

  const { data: outboundTransferEvents, isLoading: isLoadingOutBoundTransferEvents } = useScaffoldEventHistory({
    contractName: "EventGems",
    eventName: "Transfer",
    fromBlock,
    filters: { from: address },
  });

  const { data: inboundTransferEvents, isLoading: isLoadingInboundTransferEvents } = useScaffoldEventHistory({
    contractName: "EventGems",
    eventName: "Transfer",
    fromBlock,
    filters: { to: address },
  });

  type MetadataHashes = {
    [key: string]: string
  }

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
      const metadataHashes: MetadataHashes = untypedMetadataHashes
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

            const nft: Nft = { id: tokenId, uri: tokenURI, owner: address!, tokenType: tokenType, name: nftData.name, talk: nftData.talk };

            nftUpdate.push(nft);
          } catch (e) {
            console.log(e);
          }
        }
      }
      console.log("nfUpdate: ", nftUpdate);
      setYourNfts(nftUpdate.reverse());
      setIsLoadingNfts(false);
    };
    updateYourNfts();
  }, [address, balance, nftContract]);

  if (isLoadingOutBoundTransferEvents || isLoadingInboundTransferEvents) {
    return (
      <div className="text-center">
        <p className="font-bold">
          Loading history<span className=" loading-dots">...</span>
        </p>
      </div>
    );
  }

  let allTransferEvents: any[] = [];
  if (outboundTransferEvents && inboundTransferEvents) {
    allTransferEvents = outboundTransferEvents.concat(inboundTransferEvents);
    allTransferEvents.sort((a, b) => b.log.blockNumber - a.log.blockNumber);
  }

  if (allTransferEvents.length === 0) {
    return (
      <div className="text-center">
        <p className="font-bold">No history yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {allTransferEvents.map(event => (
        <EventRow key={event.log.blockhash} event={event} />
      ))}
      {isLoadingNfts ? <div className="text-center">Loading NFTs<span className=" loading-dots">...</span></div> : yourNfts.map(nft => (
        <img key={nft.tokenType} src={`/assets/nfts/${nft.tokenType}.jpg`} alt={`${nft.name} - ${nft.talk}`} />
      ))}
    </div>
  );
};
