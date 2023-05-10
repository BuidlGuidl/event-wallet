import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { AddressMain } from "~~/components/scaffold-eth/AddressMain";
import { TokenBalance } from "~~/components/scaffold-eth/TokenBalance";
import { History, Receive } from "~~/components/screens";
import { useAutoConnect, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

/**
 * Example vendor page
 */
const Nft: NextPage = () => {
  useAutoConnect();

  const { address } = useAccount();

  const { data: balance } = useScaffoldContractRead({
    contractName: "EventGems",
    functionName: "balanceOf",
    args: [address],
  });

  console.log("address", address);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        {" "}
        <div className="flex flex-col items-center mb-6 gap-4">
          <AddressMain address={address} />
          <TokenBalance amount={balance} />
        </div>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <Receive />
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <History />
      </div>
    </div>
  );
};

export default Nft;
