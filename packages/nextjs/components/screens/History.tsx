import { useAccount, useBlockNumber } from "wagmi";
import { EventRow } from "~~/components/screens/History/EventRow";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

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
    </div>
  );
};
