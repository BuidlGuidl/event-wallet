import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useSigner } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";
import { notification } from "~~/utils/scaffold-eth";

type LeaderboardData = {
  address: string;
  balance: BigNumber;
  salt: BigNumber;
};

type TSending = {
  [key: string]: boolean;
};

export const Board = ({ addresses, isLoading }: { addresses: LeaderboardData[]; isLoading: boolean }) => {
  const aliases = useAliases({ enablePolling: true });
  const { data: signer } = useSigner();
  const [sendingTip, setSendingTip] = useState<TSending>({});
  const [sendingSalt, setSendingSalt] = useState<TSending>({});

  const writeTx = useTransactor();

  const { data: saltContract } = useScaffoldContract({
    contractName: "SaltToken",
    signerOrProvider: signer || undefined,
  });

  const handleSendSalt = async (address: string) => {
    if (!isAddress(address)) {
      notification.error("Please enter a valid address");
      return;
    }
    setSendingSalt({ ...sendingSalt, [address]: true });
    // @ts-ignore
    await writeTx(saltContract?.transfer(address, ethers.utils.parseEther("25")));
    setSendingSalt({ ...sendingSalt, [address]: false });
  };

  const handleSendTip = async (address: string) => {
    if (!isAddress(address)) {
      notification.error("Please enter a valid address");
      return;
    }

    const tx = {
      to: address,
      value: ethers.utils.parseEther("0.1"),
    };

    setSendingTip({ ...sendingTip, [address]: true });
    await writeTx(tx);
    setSendingTip({ ...sendingTip, [address]: false });
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div>
        <p>No check-ins yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-20 justify-center">
        <table className="table table-zebra self-start">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Address</th>
              <th>Balance</th>
              <th>Salt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addressData, index) => (
              <tr className="text-center" key={addressData.address}>
                <td>{index + 1}</td>
                <td>
                  <Address address={addressData.address} alias={aliases[addressData.address]} />
                </td>
                <td>{ethers.utils.formatEther(addressData.balance.sub(addressData.balance.mod(1e14)))}</td>
                <td>{ethers.utils.formatEther(addressData.salt.sub(addressData.salt.mod(1e14)))}</td>
                <td>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={sendingTip[addressData.address]}
                    onClick={() => {
                      handleSendTip(addressData.address);
                    }}
                  >
                    Send Tip
                  </button>
                  <button
                    className="btn btn-outline btn-sm ml-2"
                    disabled={sendingSalt[addressData.address]}
                    onClick={() => {
                      handleSendSalt(addressData.address);
                    }}
                  >
                    Send Salt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
