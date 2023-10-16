import { BigNumber, ethers } from "ethers";
import CashIcon from "~~/icons/CashIcon";

type TTokenBalanceProps = {
  emoji?: string;
  amount?: BigNumber;
};

/**
 * Display Balance of a token
 */
export const TokenBalance = ({ amount }: TTokenBalanceProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <>
        <span className="text-3xl font-bold mr-1">
          <CashIcon width="53" height="35" />
        </span>
        <div className="flex flex-col">
          <span className="text-2xl font-medium">
            {amount && ethers.utils.formatEther(amount.sub(amount.mod(1e14)))}
          </span>
        </div>
      </>
    </div>
  );
};
