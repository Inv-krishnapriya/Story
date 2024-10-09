import React from 'react';
import { IconProps } from './IconProps';

export function GraghIcon(props: IconProps) {
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
        d="M7.5 9C7.5 8.44772 7.05228 8 6.5 8H4C3.44772 8 3 8.44772 3 9V21C3 21.5523 3.44772 22 4 22H6.5C7.05228 22 7.5 21.5523 7.5 21V9Z"
        fill={color}
      />
      <path
        d="M9.5 21C9.5 21.5523 9.94772 22 10.5 22H13.5C14.0523 22 14.5 21.5523 14.5 21V5C14.5 4.44772 14.0523 4 13.5 4H10.5C9.94772 4 9.5 4.44772 9.5 5V21Z"
        fill={color}
      />
      <path
        d="M17.5 12C16.9477 12 16.5 12.4477 16.5 13V21C16.5 21.5523 16.9477 22 17.5 22H20.1977C20.75 22 21.1977 21.5523 21.1977 21V13C21.1977 12.4477 20.75 12 20.1977 12H17.5Z"
        fill={color}
      />
    </svg>
  );
}
