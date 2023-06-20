import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains } from "wagmi";
import * as chains from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { isBurnerWalletloaded } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { burnerWalletConfig } from "~~/services/web3/wagmi-burner/burnerWalletConfig";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const configuredNetwork = getTargetNetwork();
const burnerConfig = scaffoldConfig.burnerWallet;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
const enabledChains =
  (configuredNetwork.id as number) === 1 ? [configuredNetwork] : [configuredNetwork, chains.mainnet];

/**
 * Chains for the app
 */
export const appChains = configureChains(
  enabledChains,
  [
    jsonRpcProvider({
      rpc: chain => {
        if (chain.id === chains.gnosis.id) {
          return {
            http: "https://rpc.eu-central-2.gateway.fm/v4/gnosis/non-archival/mainnet?apiKey=Kl9rMDPptvWGpaY1WNUGsHr0jr4G2uRW.hc18qxYscJg926Ax",
          };
        }
        return null;
      },
      priority: 0,
    }),
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
      priority: 1,
    }),
    publicProvider({ priority: 2 }),
  ],
  {
    stallTimeout: 3_000,
    // Sets pollingInterval if using chain's other than local hardhat chain
    ...(configuredNetwork.id !== chains.hardhat.id
      ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
      : {}),
  },
);

const wallets = [
  metaMaskWallet({ chains: appChains.chains, shimDisconnect: true }),
  walletConnectWallet({ chains: appChains.chains }),
  ledgerWallet({ chains: appChains.chains }),
  braveWallet({ chains: appChains.chains }),
  coinbaseWallet({ appName: "scaffold-eth", chains: appChains.chains }),
  rainbowWallet({ chains: appChains.chains }),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets:
      burnerConfig.enabled && isBurnerWalletloaded()
        ? [...wallets, burnerWalletConfig({ chains: [appChains.chains[0]] })]
        : wallets,
  },
]);
