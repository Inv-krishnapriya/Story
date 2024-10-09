import React from 'react';
import { IconProps } from './IconProps';

export function CheckOutlinedIcon(props: IconProps) {
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
        d="M9.59603 15.9982L18.5863 7L20 8.41498L11.009 17.4139C10.2281 18.1955 8.96204 18.1954 8.18129 17.4136L4 13.2272L5.41373 11.8122L9.59603 15.9982Z"
        fill={color}
      />
    </svg>
  );
}
