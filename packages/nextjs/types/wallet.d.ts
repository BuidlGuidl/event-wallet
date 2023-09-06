export type TTokenInfo = {
  contractName: string;
  name: string;
  symbol: string;
  emoji: string;
};

export type TTokenBalance = {
  balance?: BigNumber;
  price?: BigNumber;
  value?: BigNumber;
};
