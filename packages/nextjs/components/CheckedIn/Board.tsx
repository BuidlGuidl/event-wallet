import { Address } from "~~/components/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";

export const Board = ({ addresses, isLoading }: { addresses: string[]; isLoading: boolean }) => {
  const aliases = useAliases({});

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
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr className="text-center" key={address}>
                <td>{index + 1}</td>
                <td>
                  <Address address={address} alias={aliases[address]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
