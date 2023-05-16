import { useRouter } from "next/router";
import ScanIcon from "~~/icons/ScanIcon";
import { useAppStore } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const setIsQrReaderOpen = useAppStore(state => state.setIsQrReaderOpen);
  const { pathname } = useRouter();

  if (pathname !== "/") {
    // We only want the QR scanner on the app
    return null;
  }

  return (
    <div className="fixed text-center bottom-0 mb-8 left-0 right-0">
      <button className="bg-primary inline-block p-4 rounded-full" onClick={() => setIsQrReaderOpen(true)}>
        <ScanIcon width="2.5rem" height="2.5rem" className="text-white" />
      </button>
    </div>
  );
};
