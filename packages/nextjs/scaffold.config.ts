import * as chains from "wagmi/chains";

export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  liveUrl: string;
  tokenEmoji: string;
  eventName: string;
  hideHeader: boolean;
  tokens: { contractName: string; name: string; symbol: string; emoji: string }[];
  burnerWallet: {
    enabled: boolean;
    onlyLocal: boolean;
  };
  walletAutoConnect: boolean;
};

const scaffoldConfig = {
  // The network where your DApp lives in
  targetNetwork: chains.hardhat,
  liveUrl: process.env.NEXT_PUBLIC_LIVE_URL || "http://localhost:3000",

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect on the local network
  pollingInterval: 5000,

  tokenEmoji: "💎",
  eventName: "EVENT",
  hideHeader: true,

  tokens: [
    { contractName: "SaltToken", name: "Salt", symbol: "SALT", emoji: "🧂" },
    { contractName: "AvocadoToken", name: "Avocado", symbol: "AVC", emoji: "🥑" },
    { contractName: "BananaToken", name: "Banana", symbol: "BNN", emoji: "🍌" },
    { contractName: "TomatoToken", name: "Tomato", symbol: "TMT", emoji: "🍅" },
  ],

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // Burner Wallet configuration
  burnerWallet: {
    // Set it to false to completely remove burner wallet from all networks
    enabled: true,
    // Only show the Burner Wallet when running on hardhat network
    onlyLocal: false,
  },

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
} satisfies ScaffoldConfig;

export default scaffoldConfig;
