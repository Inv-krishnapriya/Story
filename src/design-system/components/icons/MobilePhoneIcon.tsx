import React from 'react';
import { IconProps } from './IconProps';

export function MobilePhoneIcon(props: IconProps) {
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
        d="M7 3L9 3C9 4.10457 9.89543 5 11 5H13C14.1046 5 15 4.10457 15 3H17V21H7L7 3ZM12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16Z"
        fill={color}
        width={color}
        strokeWidth="2"
      />
    </svg>
  );
}
