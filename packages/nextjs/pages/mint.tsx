import { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useAppStore } from "~~/services/store/store";
import { redirectToScreenFromCode } from "~~/utils/redirectToScreenFromCode";

/**
 * Redirect to Mint
 */
const Mint: NextPage = () => {
  const router = useRouter();
  const setScreen = useAppStore(state => state.setScreen);

  useEffect(() => {
    const code = router.asPath.replace("/", "");
    redirectToScreenFromCode(code, setScreen, router);
    router.push("/");
  }, [router.asPath, router.push]);

  return null;
};
export default Mint;
