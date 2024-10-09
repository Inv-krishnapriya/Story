import React from "react";
import { IconProps } from "./IconProps";

export function CopyOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4ZM4 4H16V16H4V4Z"
        fill={color}
      />
      <path
        d="M20 7V19C20 19.5523 19.5523 20 19 20H7V22H20C21.1046 22 22 21.1046 22 20V7H20Z"
        fill={color}
      />
    </svg>
  );
}
