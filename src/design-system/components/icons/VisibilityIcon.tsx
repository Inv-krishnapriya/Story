import React from "react";
import { IconProps } from "./IconProps";

export function VisibilityIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.998 15C13.6559 15 15 13.6569 15 12C15 10.3431 13.6559 9 11.998 9C10.34 9 8.99594 10.3431 8.99594 12C8.99594 13.6569 10.34 15 11.998 15Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.8058 11.1601C17.5172 2.92657 6.49699 2.96715 2.1967 11.1588C1.92162 11.6828 1.93707 12.3109 2.23043 12.8249C6.94177 21.0794 17.0656 21.0378 21.7685 12.8233C22.062 12.3107 22.0786 11.684 21.8058 11.1601ZM17.0013 12C17.0013 14.7614 14.7612 17 11.9979 17C9.23458 17 6.99449 14.7614 6.99449 12C6.99449 9.23857 9.23458 6.99999 11.9979 6.99999C14.7612 6.99999 17.0013 9.23857 17.0013 12Z"
        fill={color}
      />
    </svg>
  );
}
