import React from "react";
import { IconProps } from "./IconProps";

export function FullScreenExitOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#162331";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M9 21H7V17H3V15H7C8.10457 15 9 15.8954 9 17V21Z" fill={color} />
      <path d="M9 3H7V7L3 7V9H7C8.10457 9 9 8.10457 9 7V3Z" fill={color} />
      <path
        d="M15 21H17V17H20.9999V15H17C15.8954 15 15 15.8954 15 17V21Z"
        fill={color}
      />
      <path
        d="M15 3H17V7H20.9999V9H17C15.8954 9 15 8.10457 15 7V3Z"
        fill={color}
      />
    </svg>
  );
}
