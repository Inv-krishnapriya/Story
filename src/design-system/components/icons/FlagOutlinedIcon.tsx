import React from 'react';
import { IconProps } from './IconProps';

export function FlagOutlinedIcon(props: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C4.89543 2 4 2.89543 4 4V22H6V14H9.19722C10.1753 14 11.1315 14.2895 11.9453 14.8321C13.0876 15.5936 14.4299 16 15.8028 16H18C19.1046 16 20 15.1046 20 14V6C20 4.89543 19.1046 4 18 4H15.8028C14.8247 4 13.8685 3.71049 13.0547 3.16795C11.9124 2.40639 10.5701 2 9.19722 2H6ZM18 14V6H15.8028C14.4299 6 13.0876 5.59361 11.9453 4.83205C11.1315 4.28951 10.1753 4 9.19722 4H6V12H9.19722C10.5701 12 11.9124 12.4064 13.0547 13.1679C13.8685 13.7105 14.8247 14 15.8028 14H18Z"
        fill={color}
      />
    </svg>
  );
}
