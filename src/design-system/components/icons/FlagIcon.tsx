import React from 'react';
import { IconProps } from './IconProps';

export function FlagIcon(props: IconProps) {
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
        d="M4 3C4 2.44772 4.44772 2 5 2H9.19722C10.5701 2 11.9124 2.40639 13.0547 3.16795C13.8685 3.71049 14.8247 4 15.8028 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H15.8028C14.4299 16 13.0876 15.5936 11.9453 14.8321C11.1315 14.2895 10.1753 14 9.19722 14H6V22H4V3Z"
        fill={color}
      />
    </svg>
  );
}
