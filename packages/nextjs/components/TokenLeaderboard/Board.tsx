import { Address } from "~~/components/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";
import scaffoldConfig from "~~/scaffold.config";

export const Board = ({ leaderboard, isLoading }: { leaderboard: any[]; isLoading: boolean }) => {
  const aliases = useAliases({ enablePolling: false });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div>
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-20 justify-center">
        <table className="table table-zebra self-start">
          <tbody>
            {leaderboard.map((data, index) => (
              <tr key={JSON.stringify(leaderboard[0]) + index} className="text-center">
                <td>{index + 1}</td>
                <td>
                  <Address address={data.address} alias={aliases[data.address]} />
                </td>
                <td className="text-right">
                  {scaffoldConfig.saltToken.emoji} {data.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
