import React from 'react';
import { IconProps } from './IconProps';

export function DownChevronSurroundedIcon(props: IconProps) {
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
        d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM15.2928 9.29297L11.9999 12.5859L8.70703 9.29297L7.29282 10.7072L10.5857 14.0001C11.3668 14.7811 12.6331 14.7811 13.4141 14.0001L16.707 10.7072L15.2928 9.29297Z"
        fill={color}
      />
    </svg>
  );
}
