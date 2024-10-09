import React from 'react';
import { IconProps } from './IconProps';

export function FilterOutlinedIcon(props: IconProps) {
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
      <path d="M21 5V7L3 7V5H21Z" fill={color} />
      <path d="M18.5 13V11H5.5V13H18.5Z" fill={color} />
      <path d="M15 19V17H9V19H15Z" fill={color} />
    </svg>
  );
}
