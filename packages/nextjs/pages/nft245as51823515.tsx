import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { ASSETS } from "~~/assets";
import NftAsset from "~~/components/NftAsset";
import scaffoldConfig from "~~/scaffold.config";

/**
 * Example vendor page
 */
const Nft: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">Example Talks</h1>
        <p className="text-center text-xl">Mint your NFT</p>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row flex-wrap">
        {Object.keys(ASSETS).map(id => (
          <div className="flex flex-col items-center justify-center" key={id}>
            <div className="mb-4">
              <NftAsset id={id} />
            </div>
            <QRCode size={150} value={`${scaffoldConfig.liveUrl}/mint#${id}`} viewBox="0 0 150 150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nft;
