import React from 'react';
import { IconProps } from './IconProps';

export function PresentBoxOutlinedIcon(props: IconProps) {
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
        d="M12 4.05051C11.3647 3.40223 10.4793 3 9.5 3C7.567 3 6 4.567 6 6.5C6 7.0368 6.12085 7.54537 6.33682 8H5C3.89543 8 3 8.89543 3 10V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V10C21 8.89543 20.1046 8 19 8H17.6632C17.8792 7.54537 18 7.0368 18 6.5C18 4.567 16.433 3 14.5 3C13.5207 3 12.6353 3.40223 12 4.05051ZM9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8H11V6.5C11 5.67157 10.3284 5 9.5 5ZM13 10V12H19V10H13ZM11 10H5V12H11V10ZM14.5 8C15.3284 8 16 7.32843 16 6.5C16 5.67157 15.3284 5 14.5 5C13.6716 5 13 5.67157 13 6.5V8H14.5ZM11 14H5L5 20H11L11 14ZM13 20L13 14H19V20H13Z"
        fill={color}
      />
    </svg>
  );
}
