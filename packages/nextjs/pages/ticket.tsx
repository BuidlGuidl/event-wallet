import { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useAppStore } from "~~/services/store/store";
import { redirectToScreenFromCode } from "~~/utils/redirectToScreenFromCode";

/**
 * Redirect to Pk/Ticket
 */
const Ticket: NextPage = () => {
  const router = useRouter();
  const setScreen = useAppStore(state => state.setScreen);

  useEffect(() => {
    const code = router.asPath.replace("/", "");
    redirectToScreenFromCode(code, setScreen, router, false);
    router.push("/").then(() => {
      router.reload();
    });
  }, [router, setScreen, router.asPath, router.push]);

  return null;
};
export default Ticket;
