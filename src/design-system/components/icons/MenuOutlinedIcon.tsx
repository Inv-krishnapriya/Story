import React from 'react';
import { IconProps } from './IconProps';

export function MenuOutlinedIcon(props: IconProps) {
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
      <path d="M3 5H21V7H3V5Z" fill={color} />
      <path d="M3 11H21V13H3V11Z" fill={color} />
      <path d="M21 17H3V19H21V17Z" fill={color} />
    </svg>
  );
}
