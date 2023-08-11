import { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useAutoConnect } from "~~/hooks/scaffold-eth";
import { loadBurnerSK } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

type TSignature = {
  signature: string;
};

interface IHandleSignature {
  (arg0: TSignature): void;
}

type TBurnerSignerProps = {
  children: React.ReactNode;
  className: string;
  disabled: boolean;
  message: object;
  handleSignature: IHandleSignature;
  confirmation?: boolean;
};

export const BurnerSigner = ({
  children,
  className,
  disabled,
  message,
  handleSignature,
  confirmation,
}: TBurnerSignerProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useAutoConnect();
  const { address } = useAccount();

  const handleSign = async () => {
    try {
      // Initialize Web3 provider
      const burnerPK = loadBurnerSK();
      const signer = new ethers.Wallet(burnerPK);

      // Sign the message
      const messageString = JSON.stringify(message);
      const signature = await signer.signMessage(messageString);
      setShowModal(false);
      handleSignature({ signature });
    } catch (e) {
      console.log("Error signing: ", e);
      return false;
    }
  };

  const handleClick = async () => {
    // If confirmation is undefined, use the scaffold config as default
    if (confirmation === undefined) {
      confirmation = scaffoldConfig?.burnerWallet?.signConfirmation;
    }

    if (confirmation) {
      setShowModal(true);
    } else {
      handleSign();
    }
  };

  return (
    <div>
      <button className={className} onClick={handleClick} disabled={!address || !message || disabled}>
        {children}
      </button>
      <input
        type="checkbox"
        id="burner-signer-modal"
        className="modal-toggle"
        checked={showModal}
        onChange={() => setShowModal(!showModal)}
      />
      <label htmlFor="burner-signer-modal" className="modal cursor-pointer">
        <label className="max-w-2xl modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">Sign Message</h3>
          <label className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3" onClick={() => setShowModal(false)}>
            ✕
          </label>
          <div className="space-y-3">
            <div className="flex flex-col place-items-center space-y-3">
              <span className="text-sm font-bold">Address</span>
              <Address address={address} />
            </div>
            <div className="flex flex-col space-y-3">
              <span className="text-sm font-bold">Message To Sign</span>
              <code className="text-left">
                <pre>{JSON.stringify(message, null, 2)}</pre>
              </code>
            </div>
            <div className="flex flex-row-reverse items-end space-y-3">
              <button className={`h-10 btn btn-primary btn-sm px-2 rounded-full`} onClick={handleSign}>
                <PencilSquareIcon className="h-6 w-6" />
                <span>Sign Message</span>
              </button>
              <button className={`h-10 btn btn-sm px-2 rounded-full mr-3`} onClick={() => setShowModal(false)}>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
