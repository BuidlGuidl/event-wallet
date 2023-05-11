import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

/**
 * History Event row
 */
export const EventRow = ({ event }: { event: any }) => {
  const { address } = useAccount();
  const eventData = event.args;

  return (
    <div className="flex flex-col gap-2">
      {eventData.from === address && (
        <div className="flex gap-2 mb-4 items-center">
          <div className="text-2xl">{scaffoldConfig.tokenEmoji}</div>
          <div className="flex flex-col">
            <span>
              you <span className="font-bold">sent</span> {ethers.utils.formatEther(eventData.value || "0")}
            </span>
            <div className="flex gap-2">
              to
              <Address address={eventData.to} disableAddressLink={true} />
            </div>
          </div>
        </div>
      )}
      {eventData.to === address && (
        <div className="flex gap-2 mb-4 items-center">
          <div className="text-2xl">{scaffoldConfig.tokenEmoji}</div>
          <div className="flex flex-col">
            <span>
              you <span className="font-bold">received</span> {ethers.utils.formatEther(eventData.value || "0")}
            </span>
            <div className="flex gap-2">
              from
              <Address address={eventData.from} disableAddressLink={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
