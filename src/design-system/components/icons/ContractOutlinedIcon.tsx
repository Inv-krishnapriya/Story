import React from 'react';
import { IconProps } from './IconProps';

export function ContractOutlinedIcon(props: IconProps) {
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
      <path d="M15.5 6.33301H8.5V8.33301H15.5V6.33301Z" fill={color} />
      <path d="M8.5 11H15.5V13H8.5V11Z" fill={color} />
      <path d="M15.5 15.667H8.5V17.667H15.5V15.667Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4ZM18 4H6V20H18V4Z"
        fill={color}
      />
    </svg>
  );
}
