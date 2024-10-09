import React from 'react';
import { IconProps } from './IconProps';

export function CalendarOutlinedIcon(props: IconProps) {
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
      <path d="M6 14V12H8V14H6Z" fill={color} />
      <path d="M8 18V16H6V18H8Z" fill={color} />
      <path d="M13 14V12H11V14H13Z" fill={color} />
      <path d="M13 18V16H11V18H13Z" fill={color} />
      <path d="M18 14V12H16V14H18Z" fill={color} />
      <path d="M18 18V16H16V18H18Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3C5 2.44772 5.44772 2 6 2C6.55228 2 7 2.44772 7 3V4H11V3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4H17V3C17 2.44772 17.4477 2 18 2C18.5523 2 19 2.44772 19 3V4H20C21.1046 4 22 4.89543 22 6V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V6C2 4.89543 2.89543 4 4 4H5V3ZM20 8V6H4V8H20ZM20 20V10H4V20H20Z"
        fill={color}
      />
    </svg>
  );
}
