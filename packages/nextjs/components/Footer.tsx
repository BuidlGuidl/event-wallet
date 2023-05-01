import ScanIcon from "~~/icons/ScanIcon";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="fixed text-center bottom-0 mb-3 left-0 right-0">
      <div className="bg-primary inline-block p-4 rounded-full">
        <ScanIcon width="2.5rem" height="2.5rem" className="text-white" />
      </div>
    </div>
  );
};
