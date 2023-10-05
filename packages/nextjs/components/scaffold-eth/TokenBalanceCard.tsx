import { ethers } from "ethers";
import { TTokenBalance, TTokenInfo } from "~~/types/wallet";

type TTokenBalanceProps = {
  tokenInfo: TTokenInfo;
  tokenBalance?: TTokenBalance;
  handleShowBuy: (selectedToken: TTokenInfo) => void;
  handleShowSell: (selectedToken: TTokenInfo) => void;
  loading?: boolean;
};

/**
 * Display row with balance of a token
 */
export const TokenBalanceCard = ({
  tokenInfo,
  tokenBalance,
  handleShowBuy,
  handleShowSell,
  loading,
}: TTokenBalanceProps) => {
  return (
    <div className="flex items-center">
      <div>{tokenInfo.emoji}</div>
      <td>
        {loading
          ? "..."
          : tokenBalance &&
            tokenBalance.price &&
            ethers.utils.formatEther(tokenBalance.price.sub(tokenBalance.price.mod(1e14)))}
      </td>
      <td>
        {loading
          ? "..."
          : tokenBalance &&
            tokenBalance.balance &&
            ethers.utils.formatEther(tokenBalance.balance.sub(tokenBalance.balance.mod(1e14)))}
      </td>
      <td>
        {loading
          ? "..."
          : tokenBalance &&
            tokenBalance.value &&
            ethers.utils.formatEther(tokenBalance.value.sub(tokenBalance.value.mod(1e14)))}
      </td>
      <td className="flex">
        <button onClick={() => handleShowBuy(tokenInfo)} className="btn btn-primary btn-sm" disabled={loading}>
          Buy
        </button>
        <button onClick={() => handleShowSell(tokenInfo)} className="btn btn-primary btn-sm ml-2" disabled={loading}>
          Sell
        </button>
      </td>
    </div>
  );
};
