import { EventRow } from "~~/components/screens/History/EventRow";

/**
 * Show all the gems transfers
 */
export const GemHistory = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <div className="text-center">
        <p className="font-bold">No history yet</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold mt-4 text-xl">Your Gem History</h2>
      {events.map(event => (
        <EventRow key={event.log.blockhash} event={event} />
      ))}
    </>
  );
};
