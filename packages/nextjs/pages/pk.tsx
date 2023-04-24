import { useEffect } from "react";
import { useRouter } from "next/router";
import { Wallet } from "ethers";
import type { NextPage } from "next";
import { burnerStorageKey } from "~~/hooks/scaffold-eth";

/**
 * This page is used to import a private key into the burner wallet
 * and redirects to the main page.
 */
const Pk: NextPage = () => {
  const { asPath, push } = useRouter();

  useEffect(() => {
    try {
      const pk = asPath.split("#")[1];
      if (typeof window != "undefined" && window != null) {
        const wallet = new Wallet(pk);
        window?.localStorage?.setItem(burnerStorageKey, wallet.privateKey);
      }
    } catch (e) {
      console.log("Invalid PK", e);
    } finally {
      push("/");
    }
  }, [asPath, push]);

  return null;
};

export default Pk;
