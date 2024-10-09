import React from 'react';
import { IconProps } from './IconProps';

export function TilePlateIcon(props: IconProps) {
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
        d="M21 11.9207C21.5523 11.9207 22 11.4694 22 10.9127V8.29487C22 7.93624 21.8109 7.60462 21.5035 7.42404L12.5035 2.1371C12.1923 1.9543 11.8077 1.9543 11.4965 2.1371L2.49646 7.42404C2.18906 7.60462 2 7.93624 2 8.29487V10.9127C2 11.4694 2.44772 11.9207 3 11.9207H4V18.9762C4 19.5329 4.44772 19.9841 5 19.9841H9V20.9921C9 21.5487 9.44772 22 10 22H14C14.5523 22 15 21.5487 15 20.9921V19.9841H19C19.5523 19.9841 20 19.5329 20 18.9762V11.9207H21ZM8 9.90479H16V11.9207H8V9.90479ZM8 13.9365H16V15.9524H8V13.9365Z"
        fill={color}
      />
    </svg>
  );
}
