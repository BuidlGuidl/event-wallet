import scaffoldConfig from "~~/scaffold.config";

/**
 * Main Screen
 */
export const Main = () => {
  return (
    <>
      <div className="flex flex-col gap-2 max-w-[300px] text-center">
        <p className="font-bold mb-0">Welcome to {scaffoldConfig.eventName}!</p>
        <p>
          The <span className="font-bold">{scaffoldConfig.eventName} wallet</span> will help you collect soulbound NFTs of each speaker. You
          can also collect and trade {scaffoldConfig.tokenEmoji} gems, a pop up currency for the event.
        </p>
      </div>
    </>
  );
};
