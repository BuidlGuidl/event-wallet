import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const Row = ({ data, index }: { data: any; index: number }) => {
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>
        <Address address={data.address} />
      </td>
      <td>{data.nftCount}</td>
      <td>{ethers.utils.formatEther(data.balance || "0")}</td>
    </tr>
  );
};
