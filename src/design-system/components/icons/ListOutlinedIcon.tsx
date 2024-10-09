import React from 'react';
import { IconProps } from './IconProps';

export function ListOutlinedIcon(props: IconProps) {
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
      <path d="M6 5H4V7H6V5Z" fill={color} />
      <path d="M21 5H8V7H21V5Z" fill={color} />
      <path d="M4 11H6V13H4V11Z" fill={color} />
      <path d="M6 17H4V19H6V17Z" fill={color} />
      <path d="M8 11H21V13H8V11Z" fill={color} />
      <path d="M21 17H8V19H21V17Z" fill={color} />
    </svg>
  );
}
