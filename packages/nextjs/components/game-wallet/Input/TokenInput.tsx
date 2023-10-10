import { ChangeEvent, ReactNode, useCallback } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";

type TokenInputProps<T> = CommonInputProps<T> & {
  error?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  defaultValue?: string;
  value: string;
};

export const TokenInput = <T extends { toString: () => string } = string>({
  name,
  disabled,
  defaultValue,
  onChange,
  value,
}: TokenInputProps<T>) => {
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
      <input
        className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-300"
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="Amount"
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
};
