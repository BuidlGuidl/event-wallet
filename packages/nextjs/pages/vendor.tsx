import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { NTFS } from "~~/components/screens/Mint";
import scaffoldConfig from "~~/scaffold.config";

/**
 * Example vendor page
 */
const Vendor: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Example Vendor</h1>
        <p className="text-center text-xl">Mint your NFT</p>
      </div>
      <div className="flex flex-col gap-2 pt-2 gap-[100px] md:flex-row">
        {Object.values(NTFS).map((emoji, i) => (
          <div className="flex flex-col items-center justify-center" key={i}>
            <span className="text-8xl mb-10">{emoji}</span>
            <QRCode size={150} value={`${scaffoldConfig.liveUrl}/mint#${i}`} viewBox="0 0 150 150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendor;
