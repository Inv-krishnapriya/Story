import React from 'react';
import { IconProps } from './IconProps';

export function NaviOpenOutlinedIcon(props: IconProps) {
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
      <path d="M13 4H3V6H13V4Z" fill={color} />
      <path d="M13 18H3V20H13V18Z" fill={color} />
      <path
        d="M20.4142 13.4141L16.4142 17.4141L15 15.9998L18 12.9999L3 12.9995V10.9995L18 10.9999L15 7.99989L16.4142 6.58568L20.4142 10.5857C21.1953 11.3667 21.1953 12.633 20.4142 13.4141Z"
        fill={color}
      />
    </svg>
  );
}
