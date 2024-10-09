import React from 'react';
import { IconProps } from './IconProps';

export function LogoutOutlinedIcon(props: IconProps) {
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
        d="M13 4C13 2.89543 12.1046 2 11 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H11C12.1046 22 13 21.1046 13 20V15H11V20H4V4L11 4V9H13V4Z"
        fill={color}
      />
      <path
        d="M22.0001 12.0021L16.9915 7L15.5671 8.3952L18.2061 11.0084H7L7 12.9959L18.2061 12.9959L15.551 15.6048L16.9753 17L22.0001 12.0021Z"
        fill={color}
      />
    </svg>
  );
}
