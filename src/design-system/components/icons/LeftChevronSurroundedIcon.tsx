import React from 'react';
import { IconProps } from './IconProps';

export function LeftChevronSurroundedIcon(props: IconProps) {
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
        d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM14.707 8.70718L11.4141 12.0001L14.707 15.293L13.2928 16.7072L9.99993 13.4143C9.21888 12.6332 9.21887 11.3669 9.99992 10.5859L13.2928 7.29297L14.707 8.70718Z"
        fill={color}
      />
    </svg>
  );
}
