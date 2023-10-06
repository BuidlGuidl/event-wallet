const GasIcon = ({ className, width, height, fill }: { className?: string; width: string; height: string, fill: string }) => {
  return (
    <svg width={width} height={height} className={className} viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.084 0.223C7.12962 0.154449 7.19146 0.0982258 7.26403 0.0593231C7.3366 0.0204203 7.41766 4.25504e-05 7.5 0H10.5C10.6326 0 10.7598 0.0526785 10.8536 0.146447C10.9473 0.240215 11 0.367392 11 0.5V3.5C11.607 3.956 12 4.682 12 5.5V12.5C12 13.163 11.7366 13.7989 11.2678 14.2678C10.7989 14.7366 10.163 15 9.5 15H2.5C1.83696 15 1.20107 14.7366 0.732233 14.2678C0.263392 13.7989 0 13.163 0 12.5V5.5C0 4.83696 0.263392 4.20107 0.732233 3.73223C1.20107 3.26339 1.83696 3 2.5 3H2.915C2.81156 2.70742 2.61992 2.45413 2.36649 2.27503C2.11306 2.09593 1.81033 1.99984 1.5 2H0.5C0.367392 2 0.240215 1.94732 0.146447 1.85355C0.0526785 1.75979 0 1.63261 0 1.5C0 1.36739 0.0526785 1.24021 0.146447 1.14645C0.240215 1.05268 0.367392 1 0.5 1H1.5C2.07633 0.999882 2.63499 1.19889 3.08145 1.56335C3.52791 1.9278 3.83473 2.43532 3.95 3H5.232L7.084 0.223ZM10 1H7.768L6.434 3H9.5C9.671 3 9.838 3.017 10 3.05V1ZM8.854 6.146C8.80755 6.09944 8.75238 6.06249 8.69163 6.03729C8.63089 6.01208 8.56577 5.99911 8.5 5.99911C8.43423 5.99911 8.36911 6.01208 8.30837 6.03729C8.24762 6.06249 8.19245 6.09944 8.146 6.146L6 8.293L3.854 6.146C3.76011 6.05211 3.63278 5.99937 3.5 5.99937C3.36722 5.99937 3.23989 6.05211 3.146 6.146C3.05211 6.23989 2.99937 6.36722 2.99937 6.5C2.99937 6.63278 3.05211 6.76011 3.146 6.854L5.293 9L3.146 11.146C3.09951 11.1925 3.06264 11.2477 3.03748 11.3084C3.01232 11.3692 2.99937 11.4343 2.99937 11.5C2.99937 11.5657 3.01232 11.6308 3.03748 11.6916C3.06264 11.7523 3.09951 11.8075 3.146 11.854C3.23989 11.9479 3.36722 12.0006 3.5 12.0006C3.56574 12.0006 3.63084 11.9877 3.69158 11.9625C3.75232 11.9374 3.80751 11.9005 3.854 11.854L6 9.707L8.146 11.854C8.23989 11.9479 8.36722 12.0006 8.5 12.0006C8.63278 12.0006 8.76011 11.9479 8.854 11.854C8.94789 11.7601 9.00063 11.6328 9.00063 11.5C9.00063 11.3672 8.94789 11.2399 8.854 11.146L6.707 9L8.854 6.854C8.90056 6.80755 8.93751 6.75238 8.96271 6.69163C8.98792 6.63089 9.00089 6.56577 9.00089 6.5C9.00089 6.43423 8.98792 6.36911 8.96271 6.30837C8.93751 6.24762 8.90056 6.19245 8.854 6.146Z" fill={fill} />
    </svg>
  );
};

export default GasIcon;
