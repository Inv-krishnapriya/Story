import React from 'react';
import { IconProps } from './IconProps';

export function PointToIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || '#0A1826';
  return (
    <svg
      className="MintIcon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1996 5.68805C12.5972 5.31089 12.6174 4.68381 12.2448 4.28187L10.4261 2.32012C10.046 1.91021 9.40394 1.89142 9.00062 2.27842L2.3081 8.70007C2.1115 8.88872 2.00034 9.14945 2.00033 9.42198L2 20.9996C1.99998 21.5521 2.4477 22 3 22H13C13.5523 22 14 21.5521 14 20.9996V13.9971H21C21.5523 13.9971 22 13.5493 22 12.9968V9.99577C22 9.44328 21.5522 8.99539 20.9999 8.99541L8.7119 8.99584L12.1996 5.68805Z"
        fill={color}
      />
    </svg>
  );
}
