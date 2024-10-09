
import React from 'react';
import { IconProps } from './IconProps';

export function DoorOutlineIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || '#0A1826';
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 11.9996C12 11.4473 12.4477 10.9996 13 10.9996C13.5523 10.9996 14 11.4473 14 11.9996C14 12.5519 13.5523 12.9996 13 12.9996C12.4477 12.9996 12 12.5519 12 11.9996Z"
      fill="#162331"
    />
    <path
       fillRule="evenodd"
       clipRule="evenodd"
      d="M5 19.9996H3V21.9996H21V5.99963C21 4.89506 20.1046 3.99963 19 3.99963H17.0038V3.99849C17.0043 2.7465 15.8675 1.80186 14.6367 2.03165L6.63292 3.52607C5.68627 3.70282 5 4.52909 5 5.49209V19.9996ZM7 5.49209L15.0038 3.99767L14.9973 19.9976H7V5.49209ZM17 13.4051L16.9973 19.9996H17V13.4051Z"
      fill={color}
    />
  </svg>
  );
}
