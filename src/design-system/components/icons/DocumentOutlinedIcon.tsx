import React from 'react';
import { IconProps } from './IconProps';

export function DocumentOutlinedIcon(props: IconProps) {
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
      <path d="M16 6.66699H8V8.66699H16V6.66699Z" fill={color} />
      <path d="M8 10.667H14V12.667H8V10.667Z" fill={color} />
      <path d="M12 14.667H8V16.667H12V14.667Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM6 4H18V20H6V4Z"
        fill={color}
      />
    </svg>
  );
}
