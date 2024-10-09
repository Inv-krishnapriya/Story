import React from 'react';
import { IconProps } from './IconProps';

export function CopyIcon(props: IconProps) {
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
        d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V3C18 2.44772 17.5523 2 17 2H3Z"
        fill={color}
      />
      <path
        d="M20 7V19C20 19.5523 19.5523 20 19 20H7V22H20C21.1046 22 22 21.1046 22 20V7H20Z"
        fill={color}
      />
    </svg>
  );
}
