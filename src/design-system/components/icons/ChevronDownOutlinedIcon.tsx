import React from "react";
import { IconProps } from "./IconProps";

export function ChevronDownOutlinedIcon(props: IconProps) {
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
        d="M20 8.93949L18.586 7.5L12 14.2047L5.41401 7.5L4 8.93949L10.586 15.6441L10.585 15.6452L10.6174 15.6762C11.3912 16.4164 12.6107 16.4159 13.3838 15.6751L13.415 15.6452L13.414 15.6441L20 8.93949Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}
