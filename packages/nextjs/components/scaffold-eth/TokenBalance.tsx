import { BigNumber, ethers } from "ethers";
import scaffoldConfig from "~~/scaffold.config";

type TTokenBalanceProps = {
  amount?: BigNumber;
};

/**
 * Display Balance of token
 */
export const TokenBalance = ({ amount }: TTokenBalanceProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <>
        <span className="text-3xl font-bold mr-1">{scaffoldConfig.tokenEmoji}</span>
        <div className="flex flex-col">
          <span className="text-md font-bold ">{amount && ethers.utils.formatEther(amount)}</span>
        </div>
      </>
    </div>
  );
};
