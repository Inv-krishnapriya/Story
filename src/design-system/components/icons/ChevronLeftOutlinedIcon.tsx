import React from 'react';
import { IconProps } from './IconProps';

export function ChevronLeftOutlinedIcon(props: IconProps) {
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
        d="M15.0605 4L16.5 5.41401L9.79535 12L16.5 18.586L15.0605 20L8.35586 13.414L8.35484 13.415L8.32379 13.3826C7.58356 12.6088 7.58406 11.3893 8.32491 10.6162L8.35484 10.585L8.35586 10.586L15.0605 4Z"
        fill={color}
      />
    </svg>
  );
}
