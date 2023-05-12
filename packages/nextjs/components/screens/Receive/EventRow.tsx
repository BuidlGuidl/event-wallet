import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

/**
 * History Event row
 */
export const EventRow = ({ eventData }: { eventData: any }) => {
  return (
    <div className="flex flex-col gap-2 animate-fadeIn">
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
    </div>
  );
};
