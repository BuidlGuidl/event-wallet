import { useRouter } from "next/router";

/**
 * Site footer
 */
export const Footer = () => {
  const { pathname } = useRouter();

  if (pathname !== "/") {
    // We only want the QR scanner on the app
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 flex gap-1 justify-center w-full text-xs mb-2 text-gray-400">
        <span className="italic">powered by</span>
        <span>BuidlGuidl</span>
      </div>
    </>
  );
};
