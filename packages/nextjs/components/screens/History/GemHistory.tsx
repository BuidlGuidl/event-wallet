import { EventRow } from "~~/components/screens/History/EventRow";

/**
 * Show all the gems transfers
 */
export const GemHistory = ({ events }: { events: any[] }) => {
  if (events.length === 0) {
    return (
      <div>
        <p>No history yet</p>
      </div>
    );
  }

  return (
    <>
      {events.map(event => (
        <EventRow key={event.log.blockhash} event={event} />
      ))}
    </>
  );
};
