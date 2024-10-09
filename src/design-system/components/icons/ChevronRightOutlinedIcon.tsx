import React from 'react';
import { IconProps } from './IconProps';

export function ChevronRightOutlinedIcon(props: IconProps) {
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
        d="M8.93949 4L7.5 5.41401L14.2047 12L7.5 18.586L8.93949 20L15.6441 13.414L15.6452 13.415L15.6762 13.3826C16.4164 12.6088 16.4159 11.3893 15.6751 10.6162L15.6452 10.585L15.6441 10.586L8.93949 4Z"
        fill={color}
      />
    </svg>
  );
}
