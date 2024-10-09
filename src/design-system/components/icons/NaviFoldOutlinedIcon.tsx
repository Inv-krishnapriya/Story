import React from 'react';
import { IconProps } from './IconProps';

export function NaviFoldOutlinedIcon(props: IconProps) {
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
      <path d="M11 4H21V6H11V4Z" fill={color} />
      <path d="M11 18H21V20H11V18Z" fill={color} />
      <path
        d="M3.58579 13.4141L7.58579 17.4141L9 15.9998L6.00001 12.9999L21 12.9995V10.9995L6 10.9999L8.99998 7.99989L7.58577 6.58568L3.58579 10.5857C2.80474 11.3667 2.80474 12.633 3.58579 13.4141Z"
        fill={color}
      />
    </svg>
  );
}
