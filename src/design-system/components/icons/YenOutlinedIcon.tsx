import React from 'react';
import { IconProps } from './IconProps';

export function YenOutlinedIcon(props: IconProps) {
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
        d="M12 11.0002L7.27301 3.00195L5.5 4.00195L9.63599 11.0002L5.85812 11.0002L5.85812 13.0002H10.9764V15.0002H5.85812L5.85812 17.0002H10.9764V21.0002H13.0236V17.0002H18.1419V15.0002H13.0236V13.0002H18.1419V11.0002H14.364L18.5 4.00195L16.727 3.00195L12 11.0002Z"
        fill={color}
      />
    </svg>
  );
}
