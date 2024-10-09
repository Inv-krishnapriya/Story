import React from 'react';
import { IconProps } from './IconProps';

export function UploadOutlinedIcon(props: IconProps) {
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
        d="M13.4142 3.58676L19.4142 9.58676L18 11.001L13 6.00098L13.0002 18.0004H11.0002L11 6.00098L6.00001 11.001L4.58579 9.58676L10.5858 3.58676C11.3668 2.80571 12.6332 2.80572 13.4142 3.58676Z"
        fill={color}
      />
      <path d="M21 20.0004H3V22.0004H21V20.0004Z" fill={color} />
    </svg>
  );
}
