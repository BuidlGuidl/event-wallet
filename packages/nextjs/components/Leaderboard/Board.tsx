import { Address } from "../scaffold-eth";
import { Row } from "./Row";
import scaffoldConfig from "~~/scaffold.config";

export const Board = ({
  leaderboard,
  isLoading,
  vips,
}: {
  leaderboard: any[];
  isLoading: boolean;
  vips: readonly string[] | undefined;
}) => {
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
  //filter out the vips from the leaderboard
  const newLeaders = leaderboard.filter(leaderboard => {
    return !vips?.includes(leaderboard.address);
  });

  const vipDisplay = vips?.map((vip, index) => {
    return <Address address={vip} key={JSON.stringify(vip) + index} />;
  });

  return (
    <div className="flex flex-col">
      <div className="p-8 justify-center max-w-4xl bg-yellow-100 mb-8">
        <div className="font-bold text-2xl text-center">VIP Lounge </div>
        <div className="text-xl pb-8 text-center">(hackers that minted all the NFTs by watching onchain 😅)</div>
        <div className="flex gap-4 flex-wrap ">{vipDisplay}</div>
      </div>
      <div className="flex gap-x-20 justify-center">
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
            {newLeaders.slice(0, 10).map((data, index) => (
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
            {newLeaders.slice(10, 20).map((data, index) => (
              <Row data={data} index={10 + index} key={JSON.stringify(leaderboard[0]) + index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
