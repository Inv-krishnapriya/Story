import React from 'react';
import { IconProps } from './IconProps';

export function CrownOutlinedIcon(props: IconProps) {
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
        d="M16.8296 12.236C16.3685 12.5712 15.7208 12.4537 15.4068 11.9779L12.0005 6.81506L8.59291 11.9779C8.2789 12.4537 7.63133 12.5711 7.17027 12.2359L4 9.931V18.0007H20V9.931L16.8296 12.236ZM12.8355 4.44927C12.4403 3.85031 11.5613 3.85023 11.166 4.44912L7.5 10.0034L3.58817 7.15943C2.9272 6.67889 2 7.15088 2 7.96789V18.0007C2 19.1049 2.89543 20 4 20H20C21.1046 20 22 19.1049 22 18.0007V7.96789C22 7.15088 21.0728 6.67889 20.4118 7.15943L16.5 10.0034L12.8355 4.44927Z"
        fill={color}
      />
    </svg>
  );
}
