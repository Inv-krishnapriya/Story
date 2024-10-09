import React from 'react';
import { IconProps } from './IconProps';

export function CaretRightOutlinedIcon(props: IconProps) {
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
        d="M10 15.5172V8.48283C10 7.60897 11.0606 7.17135 11.6809 7.78926L15.2116 11.3064C15.5961 11.6895 15.5961 12.3105 15.2116 12.6936L11.6809 16.2107C11.0606 16.8287 10 16.391 10 15.5172Z"
        fill={color}
      />
    </svg>
  );
}
