import React from 'react';
import { IconProps } from './IconProps';

export function SlashDoubleOutlinedIcon(props: IconProps) {
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
        d="M20 12.4238V15.2432L15.2405 19.9909H12.4126L20 12.4238Z"
        fill={color}
      />
      <path d="M19.9999 4V6.82397L6.82381 19.9962H4L19.9999 4Z" fill={color} />
    </svg>
  );
}
