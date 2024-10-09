import React from 'react';
import { IconProps } from './IconProps';

export function TrashOutlinedIcon(props: IconProps) {
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
      <path d="M10.6667 10V18H8.66666L8.66666 10H10.6667Z" fill={color} />
      <path d="M15.3333 18V10H13.3333V18H15.3333Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33334 2C7.22877 2 6.33334 2.89543 6.33334 4V6H2V8H4L4 19.9993C4 21.1039 4.89543 21.9993 6 21.9993H18C19.1046 21.9993 20 21.1039 20 19.9993V8H22V6H17.6667V4C17.6667 2.89543 16.7712 2 15.6667 2H8.33334ZM15.6667 6V4H8.33334V6H15.6667ZM6 8H18V19.9993H6L6 8Z"
        fill={color}
      />
    </svg>
  );
}
