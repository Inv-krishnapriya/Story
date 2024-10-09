import React from 'react';
import { IconProps } from './IconProps';

export function PCIcon(props: IconProps) {
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
        d="M2 5C2 4.44772 2.44772 4 3 4H21C21.5523 4 22 4.44772 22 5V16C22 16.5523 21.5523 17 21 17H14.3333L15 19H20V21H4V19H9L9.66667 17H3C2.44772 17 2 16.5523 2 16V5Z"
        fill={color}
      />
    </svg>
  );
}
