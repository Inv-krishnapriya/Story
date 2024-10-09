import React from 'react';
import { IconProps } from './IconProps';

export function FourBracketsOutlinedIcon(props: IconProps) {
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
      <path d="M5 9H3V5C3 3.89543 3.89543 3 5 3H9V5L5 5V9Z" fill={color} />
      <path d="M5 15H3V19C3 20.1046 3.89543 21 5 21H9V19H5V15Z" fill={color} />
      <path
        d="M20.9999 15H18.9999V19H15V21H18.9999C20.1044 21 20.9999 20.1046 20.9999 19V15Z"
        fill={color}
      />
      <path
        d="M18.9999 9H20.9999V5C20.9999 3.89543 20.1044 3 18.9999 3H15V5H18.9999V9Z"
        fill={color}
      />
    </svg>
  );
}
