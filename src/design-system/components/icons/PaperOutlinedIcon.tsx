import React from 'react';
import { IconProps } from './IconProps';

export function PaperOutlinedIcon(props: IconProps) {
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
        d="M13.6666 6V8.66667H16V10.6667H13.6666C12.5621 10.6667 11.6666 9.77124 11.6666 8.66667V6H13.6666Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C4 2.89543 4.89543 2 6 2H13.832C14.3661 2 14.8781 2.21366 15.2537 2.59336L19.4217 6.80613C19.7922 7.18057 20 7.68604 20 8.21277V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM6 4H13.832L18 8.21277V20H6V4Z"
        fill={color}
      />
    </svg>
  );
}
