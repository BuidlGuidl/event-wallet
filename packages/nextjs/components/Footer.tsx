import { useRouter } from "next/router";
import ScanIcon from "~~/Icons/ScanIcon";
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
    <>
      <button
        className="fixed bg-primary inline-block p-4 rounded-full bottom-0 mb-8 left-0 right-0 w-[72px] m-auto"
        onClick={() => setIsQrReaderOpen(true)}
      >
        <ScanIcon width="2.5rem" height="2.5rem" className="text-white" />
      </button>
      <div className="fixed bottom-0 flex gap-1 justify-center w-full text-xs mb-2 text-gray-400">
        <span className="italic">powered by</span>
        <span>BuidlGuidl</span>
      </div>
    </>
  );
};
