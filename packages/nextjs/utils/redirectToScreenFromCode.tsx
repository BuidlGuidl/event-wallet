// qrHandler.ts
import { NextRouter } from "next/router";
import { Wallet, ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { burnerStorageKey } from "~~/hooks/scaffold-eth";
import { TScreenPayload, TWalletScreens } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

// ToDo. Notification not working on external scanner / direct # url
export const redirectToScreenFromCode = (
  code: string,
  setScreen: (action: TWalletScreens, payload?: TScreenPayload | null | undefined) => void,
  router: NextRouter,
) => {
  // Remove liveUrl from the result
  const [action, payload] = code.split("#");

  switch (action) {
    case "send":
      if (ethers.utils.isAddress(payload)) {
        setScreen("send", { toAddress: payload });
        notification.info(
          <>
            <p className="mt-0">Address scanned!</p> <Address address={payload} />{" "}
          </>,
        );
      }
      break;
    case "mint":
      setScreen("mint", { nftId: payload });
      notification.info(
        <>
          <p className="my-0">NFT scanned!</p>
        </>,
      );
      break;
    case "pk":
      const privateKey = payload;
      try {
        if (typeof window != "undefined" && window != null) {
          console.log("setting pk", privateKey);
          const wallet = new Wallet(privateKey ?? "");
          window?.localStorage?.setItem(burnerStorageKey, wallet.privateKey);
        }
      } catch (e) {
        console.log("Invalid PK", e);
      }
      notification.loading(
        <>
          <p className="my-0">Loading Burner Wallet!</p>
        </>,
      );
      setScreen("main");
      // ToDo. Find a better way to reload the wallet.
      router.reload();
      break;
    default:
      notification.error(`Unknown QR ${action}`);
  }
};
