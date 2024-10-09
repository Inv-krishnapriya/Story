import React from 'react';
import { IconProps } from './IconProps';

export function FormatAlignLeftOutlinedIcon(props: IconProps) {
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
      <path d="M3 3H21V5H3V3Z" fill={color} />
      <path d="M3 7H15V9H3V7Z" fill={color} />
      <path d="M21 11H3V13H21V11Z" fill={color} />
      <path d="M3 15H15V17H3V15Z" fill={color} />
      <path d="M21 19H3V21H21V19Z" fill={color} />
    </svg>
  );
}
