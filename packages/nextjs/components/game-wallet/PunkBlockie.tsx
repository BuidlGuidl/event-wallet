import Blockies from "react-blockies";

const PUNK_SIZE = 118; // punk size with scale = 1
const ORIGINAL_PUNK_SIZE = 24; // punk size pixels in the original file
const PUNK_SIZE_RATIO = PUNK_SIZE / ORIGINAL_PUNK_SIZE;

// Component for Punk Blockies
export const PunkBlockie = ({
  address,
  size = 8,
  scale = 8,
  width = 11,
}: {
  address: string;
  size?: number;
  scale?: number;
  width?: number;
}) => {
  const part1 = address?.slice(2, 22);
  const part2 = address?.slice(-20);

  const x = parseInt(part1, 16) % 100;
  const y = parseInt(part2, 16) % 100;

  const scaleValue = (width * 5) / PUNK_SIZE;

  if (!address) {
    return null;
  }

  return (
    <div className=" flex justify-center items-center">
      <div className="relative z-0">
        <Blockies
          className={`mx-auto border border-black rounded-full `}
          size={size}
          seed={address.toLowerCase()}
          scale={scale}
        />
        <div
          className={`absolute w-14 h-14 inset-x-0 bottom-0 left-1.5 z-10 flex justify-center items-center rounded-full`}
          style={{
            backgroundImage: "url(/punks.png)",
            backgroundSize: `${2400 * PUNK_SIZE_RATIO * scaleValue}px ${2400 * PUNK_SIZE_RATIO * scaleValue}px`,
            backgroundPosition: `${-PUNK_SIZE * x * scaleValue}px ${-PUNK_SIZE * y * scaleValue}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
};
