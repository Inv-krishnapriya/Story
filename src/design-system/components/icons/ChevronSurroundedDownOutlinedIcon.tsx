import React from 'react';
import { IconProps } from './IconProps';

export function ChevronSurroundedDownOutlinedIcon(props: IconProps) {
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
        d="M15.2928 9.29297L11.9999 12.5859L8.70703 9.29297L7.29282 10.7072L10.5857 14.0001C11.3668 14.7811 12.6331 14.7811 13.4141 14.0001L16.707 10.7072L15.2928 9.29297Z"
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
