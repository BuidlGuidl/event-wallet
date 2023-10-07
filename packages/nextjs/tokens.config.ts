import { TTokenInfo } from "~~/types/wallet";

export type TokensConfig = TTokenInfo[];

const tokensConfig = [
  { contractName: "AvocadoToken", name: "Avocado", emoji: "🥑" },
  { contractName: "BananaToken", name: "Banana", emoji: "🍌" },
  { contractName: "TomatoToken", name: "Tomato", emoji: "🍅" },
  { contractName: "StrawberryToken", name: "Strawberry", emoji: "🍓" },
  { contractName: "AppleToken", name: "Apple", emoji: "🍏" },
  { contractName: "LemonToken", name: "Lemon", emoji: "🍋" },
] satisfies TokensConfig;

export default tokensConfig;
