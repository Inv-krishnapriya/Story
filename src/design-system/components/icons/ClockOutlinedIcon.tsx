import React from "react";
import { IconProps } from "./IconProps";

export function ClockOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
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
        d="M7.33301 3.99967H8.66634V7.33301H11.9997V8.66634H8.66634C7.92996 8.66634 7.33301 8.06939 7.33301 7.33301V3.99967Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967ZM13.333 7.99967C13.333 10.9452 10.9452 13.333 7.99967 13.333C5.05416 13.333 2.66634 10.9452 2.66634 7.99967C2.66634 5.05416 5.05416 2.66634 7.99967 2.66634C10.9452 2.66634 13.333 5.05416 13.333 7.99967Z"
        fill={color}
      />
    </svg>
  );
}
