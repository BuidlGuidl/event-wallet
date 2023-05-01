import ScanIcon from "~~/icons/ScanIcon";
import { useAppStore } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const setIsQrReaderOpen = useAppStore(state => state.setIsQrReaderOpen);

  return (
    <div className="fixed text-center bottom-0 mb-8 left-0 right-0">
      <button className="bg-primary inline-block p-4 rounded-full" onClick={() => setIsQrReaderOpen(true)}>
        <ScanIcon width="2.5rem" height="2.5rem" className="text-white" />
      </button>
    </div>
  );
};
