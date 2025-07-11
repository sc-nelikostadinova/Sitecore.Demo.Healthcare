import React from 'react';

type StripedBlobProps = {
  shape?: 'blob' | 'circle';
} & React.HTMLAttributes<HTMLDivElement>;

const StripedBlob = ({ shape = 'blob', className }: StripedBlobProps) => {
  return (
    <div className={`text-background-secondary-dark dark:text-foreground-dark ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465.52 462.09" aria-hidden="true">
        <defs>
          <clipPath id="clip-blob">
            <path
              fill="none"
              d="M25.38,349.03C5.1,241.47-28.44,154.39,45.93,46.57c74.36-107.82,271.47-11.09,393,113.88,121.53,124.97-210.53,295.66-252.88,299.14s-132.41,19.58-160.66-110.55Z"
            />
          </clipPath>
          <clipPath id="clip-circle">
            <circle cx="232.76" cy="231.05" r="231" />
          </clipPath>
        </defs>
        <g clipPath={`url(#clip-${shape})`}>
          {Array.from({ length: 30 }).map((_, index) => {
            const x = -394.81 + index * 25.93;
            const rotate = -60;
            const translateX = -262 + index * 12.81;
            const translateY = 18.4 + index * 22.37;
            const transform = `translate(${translateX} ${translateY}) rotate(${rotate})`;

            return (
              <rect
                key={index}
                x={x}
                y="237.43"
                width="559.75"
                height="1"
                fill="currentColor"
                transform={transform}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default StripedBlob;
