import type { NextPage } from "next";
import QRCode from "react-qr-code";

/**
 * Example vendor page
 */
const Vendor: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Example Vendor page</h1>
        <p className="text-center text-xl">Mint your NFT</p>
      </div>
      <div className="flex gap-2 pt-2 gap-[100px]">
        <div className="flex flex-col items-center justify-center my-16">
          <span className="text-8xl mb-10">🦬</span>
          <QRCode
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value="mint#0"
            viewBox="0 0 150 150"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-16">
          <span className="text-8xl mb-10">🦓</span>
          <QRCode
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value="mint#1"
            viewBox="0 0 150 150"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-16">
          <span className="text-8xl mb-10">🦏</span>
          <QRCode
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value="mint#2"
            viewBox="0 0 150 150"
          />
        </div>
      </div>
    </div>
  );
};

export default Vendor;
