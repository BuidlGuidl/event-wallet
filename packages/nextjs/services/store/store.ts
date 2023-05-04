import create from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this AppStore, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TWalletScreens = "main" | "send" | "receive" | "history" | "mint";

type TScreenPayload = {
  toAddress?: string;
  nftId?: string;
};

type TAppStore = {
  ethPrice: number;
  setEthPrice: (newEthPriceState: number) => void;
  isQrReaderOpen: boolean;
  setIsQrReaderOpen: (newValue: boolean) => void;
  screen: TWalletScreens;
  setScreen: (newValue: TWalletScreens, payload?: TScreenPayload | null) => void;
  screenPayload: TScreenPayload | null | undefined;
};

export const useAppStore = create<TAppStore>(set => ({
  ethPrice: 0,
  setEthPrice: (newValue: number): void => set(() => ({ ethPrice: newValue })),
  isQrReaderOpen: false,
  setIsQrReaderOpen: (newValue: boolean): void => set(() => ({ isQrReaderOpen: newValue })),
  screen: "main",
  setScreen: (newValue: TWalletScreens, payload: TScreenPayload | null | undefined): void =>
    set(() => ({ screen: newValue, screenPayload: payload })),
  screenPayload: null,
}));
