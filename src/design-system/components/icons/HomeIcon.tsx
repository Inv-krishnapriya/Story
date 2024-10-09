import React from 'react';
import { IconProps } from './IconProps';

export function HomeIcon(props: IconProps) {
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
        d="M9 21.0003H4C3.44772 21.0003 3 20.5525 3 20.0003V8.61803C3 8.26056 3.19081 7.93028 3.50049 7.75172L11.5062 3.13565C11.8156 2.95729 12.1965 2.9574 12.5057 3.13594L20.5 7.75163C20.8094 7.93026 21 8.26038 21 8.61764V20.0003C21 20.5525 20.5523 21.0003 20 21.0003H15C14.4477 21.0003 14 20.5525 14 20.0003V16.0003C14 15.448 13.5523 15.0003 13 15.0003H11C10.4477 15.0003 10 15.448 10 16.0003V20.0003C10 20.5525 9.55228 21.0003 9 21.0003Z"
        fill={color}
      />
    </svg>
  );
}
