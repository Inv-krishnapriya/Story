import React from 'react';
import { IconProps } from './IconProps';

export function TrashIcon(props: IconProps) {
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
        d="M6.33334 3C6.33334 2.44772 6.78106 2 7.33334 2H16.6667C17.219 2 17.6667 2.44772 17.6667 3V6H22V8H19.6668L19.6668 21.0007C19.6668 21.5529 19.2191 22.0007 18.6668 22.0007H5.3335C4.78121 22.0007 4.3335 21.5529 4.3335 21.0007L4.3335 8H2V6H6.33334V3ZM15.6667 4V6H8.33334V4H15.6667ZM10.3333 10V18H8.33334V10H10.3333ZM15.6667 10V18H13.6667V10H15.6667Z"
        fill={color}
      />
    </svg>
  );
}
