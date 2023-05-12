import { EventRow } from "~~/components/screens/Receive/EventRow";

/**
 * Show all the gems transfers
 */
export const GemHistoryData = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <div>
        <p>No history yet</p>
      </div>
    );
  }

  return (
    <>
      {events.map((eventData, index) => (
        <EventRow eventData={eventData} key={JSON.stringify(events[0]) + index} />
      ))}
    </>
  );
};
