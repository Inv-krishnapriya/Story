import React from "react";
import { IconProps } from "./IconProps";

export function HandleHorizontalIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <path
        d="M5.5 7C4.67157 7 4 7.67157 4 8.5C4 9.32843 4.67157 10 5.5 10C6.32843 10 7 9.32843 7 8.5C7 7.67157 6.32843 7 5.5 7Z"
        fill={color}
      />
      <path
        d="M5.5 14C4.67157 14 4 14.6716 4 15.5C4 16.3284 4.67157 17 5.5 17C6.32843 17 7 16.3284 7 15.5C7 14.6716 6.32843 14 5.5 14Z"
        fill={color}
      />
      <path
        d="M10.5 8.5C10.5 7.67157 11.1716 7 12 7C12.8284 7 13.5 7.67157 13.5 8.5C13.5 9.32843 12.8284 10 12 10C11.1716 10 10.5 9.32843 10.5 8.5Z"
        fill={color}
      />
      <path
        d="M12 14C11.1716 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1716 17 12 17C12.8284 17 13.5 16.3284 13.5 15.5C13.5 14.6716 12.8284 14 12 14Z"
        fill={color}
      />
      <path
        d="M17 8.5C17 7.67157 17.6716 7 18.5 7C19.3284 7 20 7.67157 20 8.5C20 9.32843 19.3284 10 18.5 10C17.6716 10 17 9.32843 17 8.5Z"
        fill={color}
      />
      <path
        d="M18.5 14C17.6716 14 17 14.6716 17 15.5C17 16.3284 17.6716 17 18.5 17C19.3284 17 20 16.3284 20 15.5C20 14.6716 19.3284 14 18.5 14Z"
        fill={color}
      />
    </svg>
  );
}
