import React from 'react';
import { IconProps } from './IconProps';

export function DocumentIcon(props: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V3C20 2.44772 19.5523 2 19 2H5ZM7.91846 6.66699H16.0817V8.66699H7.91846V6.66699ZM7.91846 10.667H14.1225V12.667H7.91846V10.667ZM7.91846 14.667H11.8368V16.667H7.91846V14.667Z"
        fill={color}
      />
    </svg>
  );
}
