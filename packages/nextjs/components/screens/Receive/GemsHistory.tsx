import { useEffect, useState } from "react";
import { GemHistoryData } from "./GemHistoryData";
import { BigNumber } from "ethers";
import { useAccount, useBlockNumber } from "wagmi";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";

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
  const [selectedToken, setSelectedToken] = useState<ContractName>(
    scaffoldConfig.saltToken.contractName as ContractName,
  );

  // Starting block to fetch events from
  // NEXT_PUBLIC_DEPLOY_BLOCK > blockNumber - 1000 > 0
  const fromBlock = process.env.NEXT_PUBLIC_DEPLOY_BLOCK
    ? Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK)
    : blockNumber
    ? blockNumber - 1000
    : 0;

  const { data: inboundTransferEvents, isLoading: isLoadingInboundTransferEvents } = useScaffoldEventHistory({
    contractName: selectedToken,
    eventName: "Transfer",
    fromBlock,
    filters: { to: address },
  });

  useEffect(() => {
    setIsLoading(true);
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
  }, [address, isLoadingInboundTransferEvents, inboundTransferEvents, selectedToken]);

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
      <div className="flex gap-4 text-3xl">
        {[scaffoldConfig.saltToken].concat(scaffoldConfig.tokens).map(token => (
          <label
            key={token.name}
            className={`p-2 cursor-pointer ${
              selectedToken === token.contractName ? "bg-primary outline outline-2 outline-black" : ""
            }`}
          >
            <input
              type="radio"
              name="token"
              value={token.contractName}
              className="w-0 h-0"
              onChange={t => setSelectedToken(t.target.value as ContractName)}
            />
            {token.emoji}
          </label>
        ))}
      </div>
      <GemHistoryData events={newInboundTransferEvents} />
    </div>
  );
};
