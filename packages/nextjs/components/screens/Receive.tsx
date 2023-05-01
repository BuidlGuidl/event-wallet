import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

/**
 * Receive Screen
 */
export const Receive = () => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {address && (
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={address}
          viewBox={`0 0 256 256`}
        />
      )}
      <div className="mt-4">
        <Address address={address} />
      </div>
    </div>
  );
};
