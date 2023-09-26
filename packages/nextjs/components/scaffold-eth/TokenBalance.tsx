import { BigNumber, ethers } from "ethers";

type TTokenBalanceProps = {
  emoji?: string;
  amount?: BigNumber;
};

/**
 * Display Balance of a token
 */
export const TokenBalance = ({ emoji, amount }: TTokenBalanceProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <>
        <span className="text-3xl font-bold mr-1">{emoji}</span>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{amount && ethers.utils.formatEther(amount.sub(amount.mod(1e14)))}</span>
        </div>
      </>
    </div>
  );
};
