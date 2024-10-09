import React from 'react';
import { IconProps } from './IconProps';

export function CompanyIcon(props: IconProps) {
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
        d="M4 3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V20H22V22H2V20H4V3ZM13 20H16V16H13V20ZM11 6H8V9H11V6ZM11 11H8V14H11V11ZM16 6H13V9H16V6Z"
        fill={color}
      />
    </svg>
  );
}
