import React from 'react';
import { IconProps } from './IconProps';

export function SiteStructureOutlinedIcon(props: IconProps) {
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
        d="M11 9H10C8.89543 9 8 8.10457 8 7V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V7C16 8.10457 15.1046 9 14 9H13V11H17C18.1046 11 19 11.8954 19 13V15H20C21.1046 15 22 15.8954 22 17V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V17C14 15.8954 14.8954 15 16 15H17V13H7V15H8C9.10457 15 10 15.8954 10 17V20C10 21.1046 9.10457 22 8 22H4C2.89543 22 2 21.1046 2 20V17C2 15.8954 2.89543 15 4 15H5V13C5 11.8954 5.89543 11 7 11H11V9ZM10 4H14V7H10V4ZM16 17H20V20H16V17ZM8 17H4V20H8V17Z"
        fill={color}
      />
    </svg>
  );
}
