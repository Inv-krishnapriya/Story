import React from 'react';
import { IconProps } from './IconProps';

export function ReportOutlinedIcon(props: IconProps) {
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
      <path d="M11 6.33398H13V11.6673H11V6.33398Z" fill={color} />
      <path d="M11 13.667H13V15.667H11V13.667Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 20.1667H14.6667L13.4142 21.4191C12.6332 22.2002 11.3668 22.2002 10.5858 21.4191L9.33333 20.1667H4C2.89543 20.1667 2 19.2712 2 18.1667V4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4L22 18.1667C22 19.2712 21.1046 20.1667 20 20.1667ZM20 18.1667H13.8382L12 20.0049L10.1618 18.1667H4V4L20 4L20 18.1667Z"
        fill={color}
      />
    </svg>
  );
}
