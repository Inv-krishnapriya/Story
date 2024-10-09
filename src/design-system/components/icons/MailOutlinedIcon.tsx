import React from 'react';
import { IconProps } from './IconProps';

export function MailOutlinedIcon(props: IconProps) {
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
        d="M2 17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5H4C2.89543 5 2 5.89543 2 7V17ZM4 7H20V8.01215L11.9994 12.6313L4 8.0129V7ZM4 10.3222L11 14.3634C11.6188 14.7207 12.3812 14.7206 13 14.3634L20 10.3216V17H4V10.3222Z"
        fill={color}
      />
    </svg>
  );
}
