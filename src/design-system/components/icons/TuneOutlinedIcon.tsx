import React from 'react';
import { IconProps } from './IconProps';

export function TuneOutlinedIcon(props: IconProps) {
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
      <path d="M4 3H6V12H4V3Z" fill={color} />
      <path d="M2 14V16H4V21H6V16H8V14H2Z" fill={color} />
      <path d="M11 3H13V6H11V3Z" fill={color} />
      <path d="M11 21V10H9V8L15 8V10H13V21H11Z" fill={color} />
      <path d="M20 3H18V14H20V3Z" fill={color} />
      <path d="M16 16H22V18H20V21H18V18H16V16Z" fill={color} />
    </svg>
  );
}
