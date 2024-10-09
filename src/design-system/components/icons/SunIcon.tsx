import React from 'react';
import { IconProps } from './IconProps';

export function SunIcon(props: IconProps) {
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
        d="M13 5V2H11V5H13ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM5 11H2V13H5V11ZM19 11H22V13H19V11ZM13 19V22H11V19H13ZM5.63599 4.22168L7.75731 6.343L6.34309 7.75721L4.22177 5.63589L5.63599 4.22168ZM17.6569 16.2422L19.7782 18.3635L18.364 19.7777L16.2426 17.6564L17.6569 16.2422ZM4.22217 18.3633L6.34349 16.242L7.7577 17.6562L5.63638 19.7775L4.22217 18.3633ZM16.2427 6.34277L18.364 4.22145L19.7782 5.63567L17.6569 7.75699L16.2427 6.34277Z"
        fill={color}
      />
    </svg>
  );
}
