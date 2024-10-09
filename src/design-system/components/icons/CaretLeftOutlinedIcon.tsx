import React from 'react';
import { IconProps } from './IconProps';

export function CaretLeftOutlinedIcon(props: IconProps) {
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
        d="M14 15.5172V8.48283C14 7.60897 12.9394 7.17135 12.3191 7.78926L8.78839 11.3064C8.40387 11.6895 8.40387 12.3105 8.78839 12.6936L12.3191 16.2107C12.9394 16.8287 14 16.391 14 15.5172Z"
        fill={color}
      />
    </svg>
  );
}
