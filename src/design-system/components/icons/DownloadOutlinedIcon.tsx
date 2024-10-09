import React from 'react';
import { IconProps } from './IconProps';

export function DownloadOutlinedIcon(props: IconProps) {
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
        d="M13.4142 17.4137L19.4142 11.4137L18 9.99946L13 14.9995L13.0002 3H11.0002L11 14.9995L6.00001 9.99946L4.5858 11.4137L10.5858 17.4137C11.3668 18.1947 12.6332 18.1947 13.4142 17.4137Z"
        fill={color}
      />
      <path d="M21 20H3V22H21V20Z" fill={color} />
    </svg>
  );
}
