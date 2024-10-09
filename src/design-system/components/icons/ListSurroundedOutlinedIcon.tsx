import React from 'react';
import { IconProps } from './IconProps';

export function ListSurroundedOutlinedIcon(props: IconProps) {
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
        d="M19 5H5L5 19H19V5ZM5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z"
        fill={color}
      />
      <path d="M9 7H7V9H9V7Z" fill={color} />
      <path d="M9 11H7V13H9V11Z" fill={color} />
      <path d="M7 15H9V17H7V15Z" fill={color} />
      <path d="M17 7H11V9H17V7Z" fill={color} />
      <path d="M11 11H17V13H11V11Z" fill={color} />
      <path d="M17 15H11V17H17V15Z" fill={color} />
    </svg>
  );
}
