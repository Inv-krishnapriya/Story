import React from 'react';
import { IconProps } from './IconProps';

export function CrossSurroundedOutlinedIcon(props: IconProps) {
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
        d="M15.4854 7L11.9498 10.5355L8.41431 7L7.00009 8.41421L10.5356 11.9497L7.00007 15.4853L8.41428 16.8995L11.9498 13.3639L15.4854 16.8995L16.8996 15.4853L13.364 11.9497L16.8996 8.41421L15.4854 7Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
        fill={color}
      />
    </svg>
  );
}
