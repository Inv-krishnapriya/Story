import React from 'react';
import { IconProps } from './IconProps';

export function ContractIcon(props: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 2C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19ZM8.5 6.33301H15.5V8.33301H8.5V6.33301ZM8.5 11H15.5V13H8.5V11ZM8.5 15.667H15.5V17.667H8.5V15.667Z"
        fill={color}
      />
    </svg>
  );
}
