import React from 'react';
import { IconProps } from './IconProps';

export function graghOutlinedIcon(props: IconProps) {
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
        d="M15.8045 12V6C15.8045 4.89543 14.9091 4 13.8045 4H10.4045C9.29997 4 8.40454 4.89543 8.40454 6V8.00001L8.4 8H5C3.89543 8 3 8.89543 3 10V20C3 21.1046 3.89543 22 5 22H19.1976C20.3022 22 21.1976 21.1046 21.1976 20V14C21.1976 12.8954 20.3022 12 19.1976 12H15.8045ZM13.8045 6H10.4045V20H13.7976V14C13.7976 13.9435 13.7999 13.8876 13.8045 13.8323V6ZM15.8045 20V14H19.1976V20H15.8045ZM8.4 10H5L5 20H8.4V10Z"
        fill={color}
      />
    </svg>
  );
}
