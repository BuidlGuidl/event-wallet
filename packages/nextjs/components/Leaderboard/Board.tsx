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
    <div className="flex flex-col">
      <div className="flex gap-x-20 justify-center">
        <table className="table table-zebra self-start">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Address</th>
              <th>NFTs</th>
              <th>{scaffoldConfig.tokens[0].emoji}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 10).map((data, index) => (
              <Row data={data} index={index} key={JSON.stringify(leaderboard[0]) + index} />
            ))}
          </tbody>
        </table>
        <table className="table table-zebra self-start">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Address</th>
              <th>NFTs</th>
              <th>{scaffoldConfig.tokenEmoji}</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(10, 20).map((data, index) => (
              <Row data={data} index={10 + index} key={JSON.stringify(leaderboard[0]) + index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
