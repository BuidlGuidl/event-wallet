import { ethers } from "ethers";
import { TTokenBalance, TTokenInfo } from "~~/types/wallet";

type TTokenBalanceProps = {
  tokenInfo: TTokenInfo;
  tokenBalance?: TTokenBalance;
  handleShowBuy: (selectedToken: TTokenInfo) => void;
  handleShowSell: (selectedToken: TTokenInfo) => void;
  loading?: boolean;
  paused?: boolean;
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
  paused,
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
      <td className="flex flex-row place-content-center">
        {paused ? (
          <div>PAUSED</div>
        ) : (
          <>
            <button
               onClick={() => handleShowBuy(tokenInfo)}
               className="btn bg-black btn-xs text-[0.75rem] btn-ghost text-custom-green min-h-6 h-7 capitalize px-4"
               disabled={loading}
             >
            <button
              onClick={() => handleShowSell(tokenInfo)}
              className="btn btn-secondary btn-xs ml-2 text-[0.75rem] bg-grey-btn btn-ghost min-h-6 h-7 capitalize px-4"
              disabled={loading}
            >
              Sell
            </button>
          </>
        )}
      </td>
    </tr>
  );
};
