import { useState } from "react";
import { BigNumber } from "ethers";
import { Events } from "~~/components/SwapEvents/Events";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const SwapEvents = () => {
  type SwapData = {
    tokenEmoji: string;
    address: string;
    tradeDirection: BigNumber;
    tokensSwapped: BigNumber;
    tokensReceived: BigNumber;
  };

  const [events, setEvents] = useState<SwapData[]>([]);

  scaffoldConfig.tokens.forEach(token => {
    // The tokens array should not change, so this should be safe. Anyway, we can refactor this later.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScaffoldEventSubscriber({
      contractName: `BasicDex${token.name}` as ContractName,
      eventName: "TokenSwap",
      listener: (address, tradeDirection, tokensSwapped, tokensReceived) => {
        console.log("📡 TokenSwap event", address, tradeDirection, tokensSwapped, tokensReceived);
        const tokenEmoji = token.emoji;
        const newEvent: SwapData = { tokenEmoji, address, tradeDirection, tokensSwapped, tokensReceived };
        setEvents(events => [newEvent, ...events]);
      },
    });
  });

  return (
    <div className="flex flex-row pt-2 gap-[100px]">
      <Events events={events} />
    </div>
  );
};
