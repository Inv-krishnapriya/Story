import React from "react";
import { IconProps } from "./IconProps";

export function ChevronUpOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  const opacity = props.fillOpacity || 0.47;
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
        d="M20 15.0605L18.586 16.5L12 9.79535L5.41401 16.5L4 15.0605L10.586 8.35586L10.585 8.35484L10.6174 8.32379C11.3912 7.58356 12.6107 7.58406 13.3838 8.32491L13.415 8.35484L13.414 8.35586L20 15.0605Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}
