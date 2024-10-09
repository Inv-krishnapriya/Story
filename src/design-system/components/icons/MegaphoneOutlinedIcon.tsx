import React from 'react';
import { IconProps } from './IconProps';

export function MegaphoneOutlinedIcon(props: IconProps) {
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
        d="M15.866 6.00007L19.3302 4L20.3302 5.73205L16.866 7.73213L15.866 6.00007Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10.3542C3 9.53639 3.4979 8.80097 4.25722 8.49724L10.2572 6.09724C11.5709 5.57175 13 6.53927 13 7.95419V16.0461C13 17.461 11.5709 18.4285 10.2572 17.903L4.25722 15.503C3.4979 15.1993 3 14.4639 3 13.6461V10.3542ZM5 10.3542L11 7.95419V16.0461L5 13.6461L5 10.3542Z"
        fill={color}
      />
      <path d="M21 11.0001H17V13.0001H21V11.0001Z" fill={color} />
      <path
        d="M19.4641 20.0001L16 18.0001L17 16.268L20.4641 18.268L19.4641 20.0001Z"
        fill={color}
      />
    </svg>
  );
}
