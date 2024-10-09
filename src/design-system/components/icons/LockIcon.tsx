import React from 'react';
import { IconProps } from './IconProps';

export function LockIcon(props: IconProps) {
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
        d="M7.3335 6.66667V9H5C4.44772 9 4 9.44772 4 10V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V10C20 9.44772 19.5523 9 19 9H16.6668V6.66667C16.6668 4.08934 14.5775 2 12.0002 2C9.42283 2 7.3335 4.08934 7.3335 6.66667ZM12.0002 4C10.5274 4 9.3335 5.19391 9.3335 6.66667V9H14.6668V6.66667C14.6668 5.19391 13.4729 4 12.0002 4ZM11.9997 17.6673C12.9201 17.6673 13.6663 16.9211 13.6663 16.0007C13.6663 15.0802 12.9201 14.334 11.9997 14.334C11.0792 14.334 10.333 15.0802 10.333 16.0007C10.333 16.9211 11.0792 17.6673 11.9997 17.6673Z"
        fill={color}
      />
    </svg>
  );
}
