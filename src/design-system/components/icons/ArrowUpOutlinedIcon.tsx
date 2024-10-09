import React from 'react';
import { IconProps } from './IconProps';

export function ArrowUpOutlinedIcon(props: IconProps) {
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
        d="M4 10.245L10.5998 3.59389C11.3786 2.80898 12.6457 2.80692 13.4271 3.58928L20 10.1704L18.5883 11.5846L13.0094 6L13.0095 21L11.013 21L11.0129 5.99998L5.41173 11.6592L4 10.245Z"
        fill={color}
      />
    </svg>
  );
}
