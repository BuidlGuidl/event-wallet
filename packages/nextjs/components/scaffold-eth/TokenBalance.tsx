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
        <span className="text-xs font-bold mr-1">{scaffoldConfig.tokenEmoji}</span>
        <span>{amount && ethers.utils.formatEther(amount)}</span>
      </>
    </div>
  );
};
