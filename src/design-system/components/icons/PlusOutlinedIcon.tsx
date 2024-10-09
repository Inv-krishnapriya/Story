import React from 'react';
import { IconProps } from './IconProps';

export function PlusOutlinedIcon(props: IconProps) {
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
      <path d="M13 11V3H11V11H3V13H11V21H13V13H21V11H13Z" fill={color} />
    </svg>
  );
}
