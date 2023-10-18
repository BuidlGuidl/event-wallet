const GameIcon = ({ className, width, height, fill }: { className?: string; width: string; height: string; fill: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} fill="none">
      <path
        fill={fill}
        d="M15.498.833a8.167 8.167 0 0 1 .28 16.329l-.28.005H8.502A8.166 8.166 0 0 1 8.222.838l.279-.005h6.997Zm-.29 8.75a1.458 1.458 0 1 0 0 2.917 1.458 1.458 0 0 0 0-2.917ZM7.333 5.5a.875.875 0 0 0-.867.756l-.008.119v1.748h-1.75a.875.875 0 0 0-.119 1.743l.12.008 1.75-.001v1.752a.875.875 0 0 0 1.741.119l.008-.119V9.873h1.75a.875.875 0 0 0 .12-1.741l-.12-.008-1.75-.001V6.375a.875.875 0 0 0-.875-.875Zm10.208 0a1.458 1.458 0 1 0 0 2.917 1.458 1.458 0 0 0 0-2.917Z"
      />
    </svg>

  );
};

export default GameIcon;
