import React from 'react';
import { IconProps } from './IconProps';

export function CaretDownOutlinedIcon(props: IconProps) {
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
        d="M8.48283 10L15.5172 10C16.391 10 16.8287 11.0606 16.2107 11.6809L12.6936 15.2116C12.3105 15.5961 11.6895 15.5961 11.3064 15.2116L7.78926 11.6809C7.17134 11.0606 7.60897 10 8.48283 10Z"
        fill={color}
      />
    </svg>
  );
}
