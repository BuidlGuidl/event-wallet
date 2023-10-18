import type { AppProps } from "next/app";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { QrCodeReader } from "~~/components/QrCodeReader";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <NextNProgress />
      <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar} theme={lightTheme()}>
        <div>
          {scaffoldConfig.hideHeader ? "" : <Header />}
          <main className="relative flex flex-col flex-1 pb-32">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
        <QrCodeReader />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
