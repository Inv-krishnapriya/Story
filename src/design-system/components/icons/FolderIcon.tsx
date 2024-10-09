import React from 'react';
import { IconProps } from './IconProps';

export function FolderIcon(props: IconProps) {
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
        d="M11 6C11 5.44772 10.5523 5 10 5H3C2.44772 5 2 5.44772 2 6V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V8C22 7.44772 21.5523 7 21 7H12C11.4477 7 11 6.55228 11 6Z"
        fill={color}
      />
    </svg>
  );
}
