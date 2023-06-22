import { useEffect, useState } from "react";
import { GemHistoryData } from "./GemHistoryData";
import { BigNumber } from "ethers";
import { useAccount, useBlockNumber } from "wagmi";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

/**
 * GemHistory
 */
export const GemHistory = ({ tokenContract }: { tokenContract: ContractName }) => {
  const { data: blockNumber } = useBlockNumber();
  const { address } = useAccount();

  type EventData = {
    from: string;
    to: string;
    value: BigNumber;
  };

  const [newOutboundTransferEvents, setNewOutboundTransferEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Starting block to fetch events from
  // NEXT_PUBLIC_DEPLOY_BLOCK > blockNumber - 1000 > 0
  const fromBlock = process.env.NEXT_PUBLIC_DEPLOY_BLOCK
    ? Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK)
    : blockNumber
    ? blockNumber - 1000
    : 0;

  const { data: outboundTransferEvents, isLoading: isLoadingOutboundTransferEvents } = useScaffoldEventHistory({
    contractName: tokenContract,
    eventName: "Transfer",
    fromBlock,
    filters: { from: address },
  });

  useEffect(() => {
    setIsLoading(true);
    if (!isLoadingOutboundTransferEvents && outboundTransferEvents) {
      const events: EventData[] = [];
      for (let i = 0; i < outboundTransferEvents.length; i++) {
        const event = outboundTransferEvents[i];
        const eventData = event.args;
        events.push({ from: eventData.from, to: eventData.to, value: eventData.value });
      }
      setNewOutboundTransferEvents(events);
      setIsLoading(false);
    }
  }, [address, isLoadingOutboundTransferEvents, outboundTransferEvents, tokenContract]);

  if (isLoading) {
    return (
      <div className="text-center">
        <p className="font-bold">
          Loading history<span className=" loading-dots">...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <GemHistoryData events={newOutboundTransferEvents} />
    </div>
  );
};
