import React from "react";
import { IconProps } from "./IconProps";

export function MicIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  const opacity = props.fillOpacity || "0.71";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C9.79086 2 8 3.79086 8 6V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V6C16 3.79086 14.2091 2 12 2Z"
        fill={color}
        fillOpacity={opacity}
      />
      <path
        d="M4 10C4 14.0796 7.05369 17.446 11 17.9381V22H13V17.9381C16.9463 17.446 20 14.0796 20 10H18.2222C18.2222 13.4364 15.4364 16.2222 12 16.2222C8.56356 16.2222 5.77778 13.4364 5.77778 10H4Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}
