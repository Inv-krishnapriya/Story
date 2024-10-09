import React from "react";
import { IconProps } from "./IconProps";

export function ArrowLeftIcon(props: IconProps) {
  const size = props.size || 16;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M10.0395 2.66309L10.9992 3.60576L6.5294 7.99642L10.9992 12.3871L10.0395 13.3298L5.56974 8.93909L5.56906 8.93976V8.93976C5.06443 8.41229 5.064 7.58014 5.56906 7.05308V7.05308L5.56974 7.05375L10.0395 2.66309Z"
        fill={color}
      />
    </svg>
  );
}
