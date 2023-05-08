/**
 * Not Allowed Screen
 */
export const NotAllowed = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-96 p-8">
        <img
          src="https://ueth.org/_nuxt/img/logo.7b7e59b.png"
          alt="EDCON WALLET"
          className="max-w-[40px] absolute top-0 left-0 m-5"
        />
        <div className="flex flex-col gap-2 pt-2">
          <p className="text-center text-5xl">⚠️</p>
          <p className="text-center text-xl">
            This is a <strong>burner wallet</strong> for a private event.
          </p>
          <p className="text-center text-xl">
            Make sure you have scanned your <strong>private key QR</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
