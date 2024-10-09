import React from 'react';
import { IconProps } from './IconProps';

export function MailIcon(props: IconProps) {
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
        d="M2 8.16667V6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V8.16667L12.5001 13.6528C12.1906 13.8315 11.8094 13.8315 11.4999 13.6528L2 8.16667Z"
        fill={color}
      />
      <path
        d="M2 10.5V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V10.5L12.493 15.8873C12.1872 16.0606 11.8128 16.0606 11.507 15.8873L2 10.5Z"
        fill={color}
      />
    </svg>
  );
}
