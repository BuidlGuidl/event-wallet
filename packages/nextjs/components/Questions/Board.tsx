import { Address } from "~~/components/scaffold-eth";
import { useAliases } from "~~/hooks/wallet";
import { QuestionsLeaderboard } from "~~/types/question";

export const Board = ({ leaderboard, isLoading }: { leaderboard: QuestionsLeaderboard[]; isLoading: boolean }) => {
  const aliases = useAliases({});

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
        <p>No answers yet</p>
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
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((ranking, index) => (
              <tr className="text-center" key={ranking.address}>
                <td>{index + 1}</td>
                <td>
                  <Address address={ranking.address} alias={aliases[ranking.address]} />
                </td>
                <td>{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};