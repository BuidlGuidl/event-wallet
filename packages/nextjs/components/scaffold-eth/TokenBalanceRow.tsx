import { ethers } from "ethers";
import { TTokenBalance, TTokenInfo } from "~~/types/wallet";

type TTokenBalanceProps = {
  tokenInfo: TTokenInfo;
  tokenBalance?: TTokenBalance;
  handleShowBuy: (selectedToken: TTokenInfo) => void;
  handleShowSell: (selectedToken: TTokenInfo) => void;
};

/**
 * Display row with balance of a token
 */
export const TokenBalanceRow = ({ tokenInfo, tokenBalance, handleShowBuy, handleShowSell }: TTokenBalanceProps) => {
  return (
    <tr>
      <td>{tokenInfo.emoji}</td>
      <td>
        {tokenBalance &&
          tokenBalance.price &&
          ethers.utils.formatEther(tokenBalance.price.sub(tokenBalance.price.mod(1e14)))}
      </td>
      <td>
        {tokenBalance &&
          tokenBalance.balance &&
          ethers.utils.formatEther(tokenBalance.balance.sub(tokenBalance.balance.mod(1e14)))}
      </td>
      <td>
        {tokenBalance &&
          tokenBalance.value &&
          ethers.utils.formatEther(tokenBalance.value.sub(tokenBalance.value.mod(1e14)))}
      </td>
      <td className="flex">
        <button onClick={() => handleShowBuy(tokenInfo)} className="btn btn-primary btn-sm">
          Buy
        </button>
        <button onClick={() => handleShowSell(tokenInfo)} className="btn btn-primary btn-sm ml-2">
          Sell
        </button>
      </td>
    </tr>
  );
};
