import React from 'react';
import { IconProps } from './IconProps';

export function CrownIcon(props: IconProps) {
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
        d="M21 20H3C2.44772 20 2 19.5524 2 19.0003V7.96789C2 7.15088 2.9272 6.67889 3.58817 7.15943L7.5 10.0034L11.166 4.44912C11.5613 3.85023 12.4403 3.85031 12.8355 4.44927L16.5 10.0034L20.4118 7.15943C21.0728 6.67889 22 7.15088 22 7.96789V19.0003C22 19.5524 21.5523 20 21 20Z"
        fill={color}
      />
    </svg>
  );
}
