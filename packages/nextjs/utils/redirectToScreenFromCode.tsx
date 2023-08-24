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
  reload = true,
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
    case "swap":
      setScreen("swap");
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
    case "ticket":
      let privateKey = payload;
      if (action === "ticket") {
        // Generates a deterministic private key from the ticket id
        privateKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(payload));
      }

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
      if (reload) router.reload();
      break;
    default:
      notification.error(`Unknown QR ${action}`);
  }
};
