import { Row } from "./Row";
import scaffoldConfig from "~~/scaffold.config";

export const Board = ({ leaderboard, isLoading }: { leaderboard: any[]; isLoading: boolean }) => {
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
        <p>No mints yet</p>
      </div>
    );
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>NFTs</th>
          <th>{scaffoldConfig.tokenEmoji}</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((data, index) => (
          <Row data={data} index={index} key={JSON.stringify(leaderboard[0]) + index} />
        ))}
      </tbody>
    </table>
  );
};
