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
export const TokenBalanceRow = ({
  tokenInfo,
  tokenBalance,
  handleShowBuy,
  handleShowSell,
  loading,
}: TTokenBalanceProps) => {
  return (
    <tr>
      <td>{tokenInfo.emoji}</td>
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
        <button
          onClick={() => handleShowBuy(tokenInfo)}
          className="btn bg-black btn-xs text-[0.75rem] btn-ghost text-[#5DE347] min-h-6 h-6 capitalize"
          disabled={loading}
        >
          Buy
        </button>
        <button
          onClick={() => handleShowSell(tokenInfo)}
          className="btn btn-secondary btn-xs ml-2 text-[0.75rem] bg-[#B5B5B5] btn-ghost min-h-6 h-6 capitalize"
          disabled={loading}
        >
          Sell
        </button>
      </td>
    </tr>
  );
};
