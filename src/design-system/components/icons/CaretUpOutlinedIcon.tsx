import React from 'react';
import { IconProps } from './IconProps';

export function CaretUpOutlinedIcon(props: IconProps) {
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
        d="M8.48283 14.5L15.5172 14.5C16.391 14.5 16.8287 13.4394 16.2107 12.8191L12.6936 9.2884C12.3105 8.90387 11.6895 8.90387 11.3064 9.2884L7.78926 12.8191C7.17134 13.4394 7.60897 14.5 8.48283 14.5Z"
        fill={color}
      />
    </svg>
  );
}
