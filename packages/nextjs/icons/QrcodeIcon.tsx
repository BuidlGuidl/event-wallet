const QrcodeIcon = ({ className, width, height }: { className?: string; width: string; height: string }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.666992 17.25V6.25L8.00033 0.75L15.3337 6.25V17.25H9.83366V10.8333H6.16699V17.25H0.666992Z" fill="#0D0D0D" />
    </svg>
  );
};

export default QrcodeIcon;

