import React from 'react';
import { IconProps } from './IconProps';

export function CalendarIcon(props: IconProps) {
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
        d="M12 2C11.4477 2 11 2.44772 11 3V4H7V3.00008C7 2.4478 6.55228 2.00008 6 2.00008C5.44772 2.00008 5 2.4478 5 3.00008V4H3C2.44772 4 2 4.44772 2 5V7.33398H22V5C22 4.44772 21.5523 4 21 4H19V3.00008C19 2.4478 18.5523 2.00008 18 2.00008C17.4477 2.00008 17 2.4478 17 3.00008V4H13V3C13 2.44772 12.5523 2 12 2Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 9.33398H2V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V9.33398ZM5.66666 14V12H7.66666V14H5.66666ZM5.66666 18.666V16.666H7.66666V18.666H5.66666ZM11 12H13V14H11V12ZM11 16.666H13V18.666H11V16.666ZM16.3333 12H18.3333V14H16.3333V12ZM16.3333 16.666H18.3333V18.666H16.3333V16.666Z"
        fill={color}
      />
    </svg>
  );
}
