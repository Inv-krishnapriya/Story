import React from 'react';
import { IconProps } from './IconProps';

export function PaperIcon(props: IconProps) {
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
        d="M5 2C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V7.80168C20 7.53831 19.8961 7.28558 19.7109 7.09836L14.9602 2.29668C14.7724 2.10683 14.5164 2 14.2493 2H5ZM14 4.99992V8.33325H17V10.3333H14C12.8954 10.3333 12 9.43782 12 8.33325V4.99992H14Z"
        fill={color}
      />
    </svg>
  );
}
