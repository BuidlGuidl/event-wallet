import { useEffect, useState } from "react";
import { GemHistoryData } from "./GemHistoryData";
import { BigNumber } from "ethers";
import { useAccount, useBlockNumber } from "wagmi";
import { useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

/**
 * GemHistory
 */
export const GemHistory = () => {
  const { data: blockNumber } = useBlockNumber();
  const { address } = useAccount();

  type EventData = {
    from: string;
    to: string;
    value: BigNumber;
  };

  const [newInboundTransferEvents, setNewInboundTransferEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Starting block to fetch events from
  // NEXT_PUBLIC_DEPLOY_BLOCK > blockNumber - 1000 > 0
  const fromBlock = process.env.NEXT_PUBLIC_DEPLOY_BLOCK
    ? Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK)
    : blockNumber
    ? blockNumber - 1000
    : 0;

  const { data: inboundTransferEvents, isLoading: isLoadingInboundTransferEvents } = useScaffoldEventHistory({
    contractName: "EventGems",
    eventName: "Transfer",
    fromBlock,
    filters: { to: address },
  });

  useScaffoldEventSubscriber({
    contractName: "EventGems",
    eventName: "Transfer",
    listener: (from, to, value) => {
      if (to.toLowerCase() === address?.toLowerCase()) {
        setNewInboundTransferEvents(prevState => [{ from, to, value }, ...prevState]);
      }
    },
  });

  useEffect(() => {
    if (!isLoadingInboundTransferEvents && inboundTransferEvents) {
      const events: EventData[] = [];
      for (let i = 0; i < inboundTransferEvents.length; i++) {
        const event = inboundTransferEvents[i];
        const eventData = event.args;
        events.push({ from: eventData.from, to: eventData.to, value: eventData.value });
      }
      setNewInboundTransferEvents(events);
      setIsLoading(false);
    }
  }, [address, isLoadingInboundTransferEvents, inboundTransferEvents]);

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
    <div className="flex flex-col gap-2 items-center mt-6">
      <GemHistoryData events={newInboundTransferEvents} />
    </div>
  );
};
