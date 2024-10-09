import React from 'react';
import { IconProps } from './IconProps';

export function ToggleButtonOutlinedIcon(props: IconProps) {
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
        d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 8.68629 4.68629 6 8 6H16C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18H8C4.68629 18 2 15.3137 2 12ZM8 8H16C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16H8C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8Z"
        fill={color}
      />
    </svg>
  );
}
