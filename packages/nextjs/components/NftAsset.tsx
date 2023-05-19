import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Tilt from "react-parallax-tilt";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { ASSETS } from "~~/assets";

// Create the Asset component
const NftAsset = ({ id }: { id: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const asset = ASSETS[id as keyof typeof ASSETS];

  if (!asset) {
    return <div>Asset not found</div>;
  }

  return (
    <Tilt trackOnWindow={true}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="relative">
          <ArrowsRightLeftIcon className="w-5 h-5 absolute right-0 top-0 m-2 text-secondary pointer-events-none" />
          <img
            src={`/assets/nfts/${id}.jpg`}
            alt={asset.description}
            onClick={handleClick}
            className="cursor-pointer w-[300px] h-[300px]"
          />
        </div>
        <div onClick={handleClick} className="cursor-pointer w-[300px] h-[300px] bg-primary text-white p-10 relative">
          <ArrowsRightLeftIcon className="w-5 h-5 absolute right-0 top-0 m-2 text-white pointer-events-none" />
          <p className="font-bold text-xl mt-0">{asset.name}</p>
          <p>{asset.talk}</p>
        </div>
      </ReactCardFlip>
    </Tilt>
  );
};

export default NftAsset;
