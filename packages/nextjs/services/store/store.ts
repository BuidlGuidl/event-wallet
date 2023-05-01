import create from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this AppStore, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TWalletScreens = "main" | "send" | "receive";

type TAppStore = {
  ethPrice: number;
  setEthPrice: (newEthPriceState: number) => void;
  isQrReaderOpen: boolean;
  setIsQrReaderOpen: (newValue: boolean) => void;
  screen: TWalletScreens;
  setScreen: (newValue: TWalletScreens) => void;
};

export const useAppStore = create<TAppStore>(set => ({
  ethPrice: 0,
  setEthPrice: (newValue: number): void => set(() => ({ ethPrice: newValue })),
  isQrReaderOpen: false,
  setIsQrReaderOpen: (newValue: boolean): void => set(() => ({ isQrReaderOpen: newValue })),
  screen: "main",
  setScreen: (newValue: TWalletScreens): void => set(() => ({ screen: newValue })),
}));
