import { useState } from "react";
import type { NextPage } from "next";
import { useInterval } from "usehooks-ts";
import { Board } from "~~/components/CheckedIn/Board";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

const Leaderboard: NextPage = () => {
  const [loadingCheckedIn, setLoadingCheckedIn] = useState(true);
  const [checkedInAddresses, setCheckedInAddresses] = useState<string[]>([]);

  const fetchPeopleCheckedIn = async () => {
    try {
      const response = await fetch("/api/admin/checked-in", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCheckedInAddresses(data);
      } else {
        notification.error(data.error);
      }
    } catch (e) {
      console.log("Error fetching checked in addresses", e);
    } finally {
      setLoadingCheckedIn(false);
    }
  };

  useInterval(async () => {
    await fetchPeopleCheckedIn();
  }, scaffoldConfig.pollingInterval);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <h1 className="text-4xl font-bold">People Checked-in</h1>
      </div>
      <div className="flex flex-col pt-2 gap-[100px] md:flex-row">
        <Board addresses={checkedInAddresses} isLoading={loadingCheckedIn} />
      </div>
    </div>
  );
};

export default Leaderboard;
