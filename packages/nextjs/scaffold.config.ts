import * as chains from "wagmi/chains";

export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  liveUrl: string;
  tokenEmoji: string;
  eventName: string;
  hideHeader: boolean;
  burnerWallet: {
    enabled: boolean;
    onlyLocal: boolean;
    signConfirmation: boolean;
  };
  walletAutoConnect: boolean;
};

const scaffoldConfig = {
  // The network where your DApp lives in
  targetNetwork: chains.sepolia,
  liveUrl: process.env.NEXT_PUBLIC_LIVE_URL || "http://localhost:3000",

  // The interval at which your front-end polls the RPC servers and backend API for new data
  pollingInterval: 15000,

  tokenEmoji: "💎",
  eventName: "THE TALK",
  hideHeader: true,

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
    signConfirmation: true,
  },

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
} satisfies ScaffoldConfig;

export default scaffoldConfig;
