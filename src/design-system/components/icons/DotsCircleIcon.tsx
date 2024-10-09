import React from 'react';
import { IconProps } from './IconProps';

export function DotsCircleIcon(props: IconProps) {
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
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM8.66667 12C8.66667 12.7364 8.06971 13.3333 7.33333 13.3333C6.59695 13.3333 6 12.7364 6 12C6 11.2636 6.59695 10.6667 7.33333 10.6667C8.06971 10.6667 8.66667 11.2636 8.66667 12ZM13.3333 12C13.3333 12.7364 12.7364 13.3333 12 13.3333C11.2636 13.3333 10.6667 12.7364 10.6667 12C10.6667 11.2636 11.2636 10.6667 12 10.6667C12.7364 10.6667 13.3333 11.2636 13.3333 12ZM18 12C18 12.7364 17.403 13.3333 16.6667 13.3333C15.9303 13.3333 15.3333 12.7364 15.3333 12C15.3333 11.2636 15.9303 10.6667 16.6667 10.6667C17.403 10.6667 18 11.2636 18 12Z"
        fill={color}
      />
    </svg>
  );
}
