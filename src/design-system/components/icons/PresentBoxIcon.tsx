import React from 'react';
import { IconProps } from './IconProps';

export function PresentBoxIcon(props: IconProps) {
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
        d="M9.5 3C10.4793 3 11.3647 3.40223 12 4.05051C12.6353 3.40223 13.5207 3 14.5 3C16.433 3 18 4.567 18 6.5C18 7.0368 17.8792 7.54537 17.6632 8H20C20.5523 8 21 8.44772 21 9V12H13V10H11V12H3V9C3 8.44772 3.44772 8 4 8H6.33682C6.12085 7.54537 6 7.0368 6 6.5C6 4.567 7.567 3 9.5 3ZM8 6.5C8 5.67157 8.67157 5 9.5 5C10.3284 5 11 5.67157 11 6.5V8H9.5C8.67157 8 8 7.32843 8 6.5ZM16 6.5C16 7.32843 15.3284 8 14.5 8H13V6.5C13 5.67157 13.6716 5 14.5 5C15.3284 5 16 5.67157 16 6.5Z"
        fill={color}
      />
      <path d="M3 14V21C3 21.5523 3.44772 22 4 22H11L11 14H3Z" fill={color} />
      <path
        d="M13 22H20C20.5523 22 21 21.5523 21 21V14H13L13 22Z"
        fill={color}
      />
    </svg>
  );
}
