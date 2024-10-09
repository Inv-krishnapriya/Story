import React from 'react';
import { IconProps } from './IconProps';

export function StatisticsIcon(props: IconProps) {
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
        d="M2 2H4V5H14C14.5523 5 15 5.44772 15 6V10C15 10.5523 14.5523 11 14 11H4V13H21C21.5523 13 22 13.4477 22 14V18C22 18.5523 21.5523 19 21 19H4V22H2V2Z"
        fill={color}
      />
    </svg>
  );
}
