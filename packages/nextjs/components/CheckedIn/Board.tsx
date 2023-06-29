import { Address } from "~~/components/scaffold-eth";

export const Board = ({ addresses, isLoading }: { addresses: string[]; isLoading: boolean }) => {
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
                  <Address address={address} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
