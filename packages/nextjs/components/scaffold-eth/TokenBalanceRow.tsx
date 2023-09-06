import { ethers } from "ethers";
import { TTokenBalance, TTokenInfo } from "~~/types/wallet";

type TTokenBalanceProps = {
  tokenInfo: TTokenInfo;
  tokenBalance?: TTokenBalance;
  handleShowSwap: (selectedToken: TTokenInfo) => void;
};

/**
 * Display row with balance of a token
 */
export const TokenBalanceRow = ({ tokenInfo, tokenBalance, handleShowSwap }: TTokenBalanceProps) => {
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
      <td>
        <button onClick={() => handleShowSwap(tokenInfo)} className="btn btn-primary">
          Swap
        </button>
      </td>
    </tr>
  );
};
