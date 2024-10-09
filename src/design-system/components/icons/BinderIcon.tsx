import React from 'react';
import { IconProps } from './IconProps';

export function BinderIcon(props: IconProps) {
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
        d="M14.8668 3.50073L15.1556 4H15.7324H19V21H5V4H8.26756H8.84436L9.13317 3.50073C9.30758 3.19922 9.63112 3 10 3H11C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5C15 3.89543 14.1046 3 13 3H14C14.3689 3 14.6924 3.19922 14.8668 3.50073ZM8 9H7V10V12V13V14V16V17H8H13H14V16V14V13H16H17V12V10V9H16H8Z"
        fill={color}
        width={color}
        strokeWidth="2"
      />
    </svg>
  );
}
