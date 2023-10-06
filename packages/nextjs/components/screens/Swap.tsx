import { TokenSwap } from "~~/components/TokenSwap";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const Swap = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 text-3xl m-8">
        {scaffoldConfig.tokens.map(token => (
          <TokenSwap
            key={token.contractName}
            token={token.contractName as ContractName}
            defaultAmountIn="1"
            defaultAmountOut="1"
          />
        ))}
      </div>
    </div>
  );
};
