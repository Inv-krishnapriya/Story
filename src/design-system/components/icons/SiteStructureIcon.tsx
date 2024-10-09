import React from 'react';
import { IconProps } from './IconProps';

export function SiteStructureIcon(props: IconProps) {
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
        d="M9 2C8.44772 2 8 2.44772 8 3V8C8 8.55228 8.44772 9 9 9H11V11H7C5.89543 11 5 11.8954 5 13V15H3C2.44772 15 2 15.4477 2 16V21C2 21.5523 2.44772 22 3 22H9C9.55228 22 10 21.5523 10 21V16C10 15.4477 9.55228 15 9 15H7V13H17V15H15C14.4477 15 14 15.4477 14 16V21C14 21.5523 14.4477 22 15 22H21C21.5523 22 22 21.5523 22 21V16C22 15.4477 21.5523 15 21 15H19V13C19 11.8954 18.1046 11 17 11H13V9H15C15.5523 9 16 8.55228 16 8V3C16 2.44772 15.5523 2 15 2H9Z"
        fill={color}
      />
    </svg>
  );
}
