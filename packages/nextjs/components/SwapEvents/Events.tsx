import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";
import scaffoldConfig from "~~/scaffold.config";

export const Events = ({ events }: { events: any[] }) => {
  const aliases = useAliases({ enablePolling: false });

  const saltEmoji = scaffoldConfig.saltToken.emoji;

  if (events.length === 0) {
    return (
      <div>
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-x-20 justify-center">
        {events.map((data, index) => (
          <div className="flex gap-2 animate-fadeIn" key={JSON.stringify(events[0]) + index}>
            <div className="flex gap-2 p-4 items-center">
              <div className="flex w-[380px]">
                <Address address={data.address} alias={aliases[data.address]} disableAddressLink={true} />
                {data.tradeDirection.eq(0) ? (
                  <span className="pl-2">
                    <span className="pr-2">
                      {saltEmoji}
                      {ethers.utils.formatEther(data.tokensSwapped.sub(data.tokensSwapped.mod(1e14)))}
                    </span>
                    -&gt;
                    <span className="pl-2">
                      {data.tokenEmoji}
                      {ethers.utils.formatEther(data.tokensReceived.sub(data.tokensReceived.mod(1e14)))}
                    </span>
                  </span>
                ) : (
                  <span className="pl-2">
                    <span className="pr-2">
                      {data.tokenEmoji}
                      {ethers.utils.formatEther(data.tokensSwapped.sub(data.tokensSwapped.mod(1e14)))}
                    </span>
                    -&gt;
                    <span className="pl-2">
                      {saltEmoji}
                      {ethers.utils.formatEther(data.tokensReceived.sub(data.tokensReceived.mod(1e14)))}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
