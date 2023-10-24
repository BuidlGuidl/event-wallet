import { ChangeEvent, useCallback } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

export type TokenListTypes = {
  name: string;
  emoji: string;
  contractName: string;
};

type TokenInputProps<T> = CommonInputProps<T> & {
  disabled?: boolean;
  value: string;
  name: string;
  tokens: TokenListTypes[];
  onTokenChange: (value: string) => void;
};

export const TokenInput = <T extends { toString: () => string } = string>({
  name,
  value,
  tokens,
  onTokenChange,
  onChange,
  disabled = false,
}: TokenInputProps<T>) => {
  console.log(tokens, "tokens");
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Protect underflow (e.g. 0.0000000000000000001)
      if (e.target.value.length < 21) {
        // set Value
        onChange(e.target.value as unknown as T);
      }
    },
    [onChange],
  );

  return (
    <div className={`flex border-2 items-center border border-base-300 bg-base-100 rounded-full text-black`}>
      <select
        defaultValue={scaffoldConfig.saltToken.contractName}
        disabled={disabled}
        onChange={e => onTokenChange(e.target.value)}
        className=" rounded-none mx-4 rounded-r-lg  focus:outline-0  w-3/8"
      >
        <option className="text-lg" disabled selected>
          Ξ Token Name
        </option>
        {tokens.map(token => (
          <option key={token.contractName} value={token.contractName} className="text-base">
            {token.emoji} {token.name}
          </option>
        ))}
      </select>
      <input
        className="w-5/8 input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-300"
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="Amount"
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
};
