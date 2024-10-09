import React from 'react';
import { IconProps } from './IconProps';

export function UpChevronSurroundedIcon(props: IconProps) {
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
        d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM8.70718 14.707L12.0001 11.4141L15.293 14.707L16.7072 13.2928L13.4143 9.99993C12.6332 9.21888 11.3669 9.21887 10.5859 9.99992L7.29297 13.2928L8.70718 14.707Z"
        fill={color}
      />
    </svg>
  );
}
