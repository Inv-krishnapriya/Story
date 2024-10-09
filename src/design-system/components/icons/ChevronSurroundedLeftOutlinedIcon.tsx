import React from 'react';
import { IconProps } from './IconProps';

export function ChevronSurroundedLeftOutlinedIcon(props: IconProps) {
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
        d="M14.707 8.70718L11.4141 12.0001L14.707 15.293L13.2928 16.7072L9.99992 13.4143C9.21887 12.6332 9.21888 11.3669 9.99992 10.5859L13.2928 7.29297L14.707 8.70718Z"
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
