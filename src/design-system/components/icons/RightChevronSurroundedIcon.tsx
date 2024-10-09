import React from 'react';
import { IconProps } from './IconProps';

export function RightChevronSurroundedIcon(props: IconProps) {
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
        d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM9.29297 8.70718L12.5859 12.0001L9.29297 15.293L10.7072 16.7072L14.0001 13.4143C14.7811 12.6332 14.7811 11.3669 14.0001 10.5859L10.7072 7.29297L9.29297 8.70718Z"
        fill={color}
      />
    </svg>
  );
}
