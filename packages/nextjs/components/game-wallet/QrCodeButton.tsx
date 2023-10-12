import QrCodeIcon from "~~/icons/QrcodeIcon";
import { useAppStore } from "~~/services/store/store";

/**
 * Open QrCode modal which lets you connect to the wallet .
 */
export const QrCodeButton = () => {
  const setIsQrReaderOpen = useAppStore(state => state.setIsQrReaderOpen);

  return (
    <div onClick={() => setIsQrReaderOpen(true)}>
      <button className="btn bg-black btn-sm px-2  rounded-full mr-1">
        <QrCodeIcon className="h-4 w-4" width="18" height="18" />
      </button>
    </div>
  );
};
