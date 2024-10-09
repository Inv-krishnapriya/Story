import React from "react";
import { IconProps } from "./IconProps";

export function ArrowRightIcon(props: IconProps) {
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
        d="M5.95868 2.66309L4.99902 3.60576L9.46879 7.99642L4.99902 12.3871L5.95868 13.3298L10.4284 8.93909L10.4291 8.93976C10.9338 8.41229 10.9342 7.58014 10.4291 7.05308L10.4284 7.05375L5.95868 2.66309Z"
        fill={color}
        fillOpacity="0.71"
      />
    </svg>
  );
}
