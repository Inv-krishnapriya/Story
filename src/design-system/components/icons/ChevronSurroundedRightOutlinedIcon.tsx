import React from 'react';
import { IconProps } from './IconProps';

export function ChevronSurroundedRightOutlinedIcon(props: IconProps) {
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
        d="M9.29297 8.70718L12.5859 12.0001L9.29297 15.293L10.7072 16.7072L14.0001 13.4143C14.7811 12.6332 14.7811 11.3669 14.0001 10.5859L10.7072 7.29297L9.29297 8.70718Z"
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
