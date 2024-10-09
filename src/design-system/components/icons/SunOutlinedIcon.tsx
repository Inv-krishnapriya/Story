import React from 'react';
import { IconProps } from './IconProps';

export function SunOutlinedIcon(props: IconProps) {
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
      <path d="M13 5V2H11V5H13Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        fill={color}
      />
      <path d="M2 11H5V13H2V11Z" fill={color} />
      <path d="M19 11H22V13H19V11Z" fill={color} />
      <path d="M13 22V19H11V22H13Z" fill={color} />
      <path
        d="M5.63599 4.22168L7.75731 6.343L6.34309 7.75721L4.22177 5.63589L5.63599 4.22168Z"
        fill={color}
      />
      <path
        d="M19.7782 18.3635L17.6569 16.2422L16.2426 17.6564L18.364 19.7777L19.7782 18.3635Z"
        fill={color}
      />
      <path
        d="M4.22217 18.3633L6.34349 16.242L7.7577 17.6562L5.63638 19.7775L4.22217 18.3633Z"
        fill={color}
      />
      <path
        d="M18.364 4.22145L16.2427 6.34277L17.6569 7.75699L19.7782 5.63567L18.364 4.22145Z"
        fill={color}
      />
    </svg>
  );
}
