import { useState } from "react";
import { ethers } from "ethers";
import Blockies from "react-blockies";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth/Input";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork, notification } from "~~/utils/scaffold-eth";

type TAddressProps = {
  address?: string;
  disableAddressLink?: boolean;
  format?: "short" | "long";
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const AddressMain = ({ address, disableAddressLink, format }: TAddressProps) => {
  const [addressCopied, setAddressCopied] = useState(false);
  const [aliasModalOpen, setAliasModalOpen] = useState(false);
  const [aliasValue, setAliasValue] = useState("");

  const { data: alias } = useScaffoldContractRead({
    contractName: "EventAliases",
    functionName: "aliases",
    args: [address],
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EventAliases",
    functionName: "setName",
    args: [aliasValue],
  });

  // Skeleton UI
  if (!address) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!ethers.utils.isAddress(address)) {
    return <span className="text-error">Wrong address</span>;
  }

  const blockExplorerAddressLink = getBlockExplorerAddressLink(getTargetNetwork(), address);
  let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);

  if (alias) {
    displayAddress = alias.slice(0, 15) + (alias.length > 15 ? "..." : "");
  } else if (format === "long") {
    displayAddress = address;
  }

  const handleUpdateAlias = () => {
    if (aliasValue.length < 3) {
      notification.error("Alias must be at least 3 characters");
      return;
    }
    setAliasModalOpen(false);
    setAliasValue("");
    writeAsync();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0">
          <Blockies className="mx-auto rounded-full" size={8} seed={address.toLowerCase()} scale={10} />
        </div>
        <div className="flex items-center mt-2">
          {disableAddressLink ? (
            <span className="ml-1.5 text-2xl font-normal">{displayAddress}</span>
          ) : (
            <a
              className="ml-1.5 text-2xl font-normal"
              target="_blank"
              href={blockExplorerAddressLink}
              rel="noopener noreferrer"
            >
              {displayAddress}
            </a>
          )}
          {addressCopied ? (
            <CheckCircleIcon
              className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <>
              <CopyToClipboard
                text={address}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <DocumentDuplicateIcon
                  className="ml-1.5 text-xl font-normal text-gray-500 h-5 w-5 cursor-pointer"
                  aria-hidden="true"
                />
              </CopyToClipboard>
              <PencilSquareIcon
                onClick={() => setAliasModalOpen(true)}
                className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
      <div
        className={`modal z-20 ${aliasModalOpen ? "modal-open" : ""}`}
        onClick={e => {
          if (e.target === e.currentTarget) setAliasModalOpen(false);
        }}
      >
        <div className="modal-box z-50" onClick={e => e.preventDefault()}>
          <label onClick={() => setAliasModalOpen(false)} className="btn btn-secondary btn-sm absolute right-2 top-2">
            ✕
          </label>
          <h3 className="font-bold text-lg">Set your Alias</h3>
          <p>Set your display alias for this event. This will be visible to all participants.</p>
          <p>
            <span className="font-bold">Current Alias</span>: {alias ? alias : "<Not set>"}
          </p>
          <div>
            <InputBase
              value={aliasValue}
              onChange={v => {
                setAliasValue(v);
              }}
              placeholder={alias ? alias : "Enter your alias"}
            />
          </div>
          <div className="text-center mt-2">
            <button className="btn btn-primary" onClick={handleUpdateAlias}>
              Set Alias
            </button>
          </div>
        </div>
      </div>
      {aliasModalOpen && (
        <div className="fixed inset-0 z-10 bg-white bg-opacity-80" onClick={() => setAliasModalOpen(false)} />
      )}
    </>
  );
};
