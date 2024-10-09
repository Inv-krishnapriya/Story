import React from 'react';
import { IconProps } from './IconProps';

export function ChevronSurroundedUpOutlinedIcon(props: IconProps) {
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
        d="M8.70718 14.707L12.0001 11.4141L15.293 14.707L16.7072 13.2928L13.4143 9.99992C12.6332 9.21887 11.3669 9.21888 10.5859 9.99992L7.29297 13.2928L8.70718 14.707Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 5H19V19H5L5 5Z"
        fill={color}
      />
    </svg>
  );
}
