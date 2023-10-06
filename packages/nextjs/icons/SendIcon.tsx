const SendIcon = ({ className, width, height, fill }: { className?: string; width: string; height: string, fill: string }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.783798 7.43971C0.305298 7.27929 0.301632 7.02171 0.793882 6.85762L18.2894 1.02671C18.7743 0.865373 19.052 1.13671 18.9164 1.61154L13.9178 19.107C13.7794 19.592 13.4998 19.6085 13.2945 19.1483L9.99996 11.7334L15.5 4.40004L8.16663 9.90004L0.783798 7.43971Z" fill={fill || "#0D0D0D"} />
    </svg>
  );
};

export default SendIcon;

