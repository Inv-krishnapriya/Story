import React from 'react';
import { IconProps } from './IconProps';

export function ExclamationTriangleOutlinedIcon(props: IconProps) {
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
      <path d="M11 9H13V13H11V9Z" fill={color} />
      <path d="M13 15H11V17H13V15Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2701 3.04588L2.24164 18.0467C1.5284 19.3793 2.47967 21.0008 3.97472 21.0008L20.0253 21.0009C21.52 21.0009 22.4713 19.38 21.7587 18.0474L13.7366 3.04647C12.9906 1.65144 11.0166 1.65111 10.2701 3.04588ZM12.0032 4L3.97473 19.0008L20.0253 19.0009L12.0032 4Z"
        fill={color}
      />
    </svg>
  );
}
