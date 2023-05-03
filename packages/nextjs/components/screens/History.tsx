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

  const { data: outboundTransferEvents } = useScaffoldEventHistory({
    contractName: "EventGems",
    eventName: "Transfer",
    fromBlock,
    filters: { from: address },
  });

  const { data: inboundTransferEvents } = useScaffoldEventHistory({
    contractName: "EventGems",
    eventName: "Transfer",
    fromBlock,
    filters: { to: address },
  });

  let allTransferEvents: any[] = [];
  if (outboundTransferEvents && inboundTransferEvents) {
    allTransferEvents = outboundTransferEvents.concat(inboundTransferEvents);
    allTransferEvents.sort((a, b) => b.log.blockNumber - a.log.blockNumber);
    console.log("allTransferEvents", allTransferEvents);
  }

  return (
    <div className="flex flex-col gap-2">
      {allTransferEvents.map(event => (
        <EventRow key={event.log.blockhash} event={event} />
      ))}
    </div>
  );
};
