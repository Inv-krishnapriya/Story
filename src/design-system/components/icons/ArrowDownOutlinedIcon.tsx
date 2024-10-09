import React from 'react';
import { IconProps } from './IconProps';

export function ArrowDownOutlinedIcon(props: IconProps) {
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
        d="M4 13.758L10.5998 20.409C11.3786 21.1939 12.6457 21.196 13.4271 20.4136L20 13.8325L18.5883 12.4183L13.0094 18.0029L13.0095 3.00293L11.013 3.00293L11.0129 18.0029L5.41173 12.3438L4 13.758Z"
        fill={color}
      />
    </svg>
  );
}
