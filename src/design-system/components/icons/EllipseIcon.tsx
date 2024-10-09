import React from "react";
import { IconProps } from "./IconProps";

export function EllipseIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#DB2352";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill="#DB2352" />
    </svg>
  );
}
