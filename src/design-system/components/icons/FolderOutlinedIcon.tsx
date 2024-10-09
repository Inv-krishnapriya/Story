import React from "react";
import { IconProps } from "./IconProps";

export function FolderOutlinedIcon(props: IconProps) {
  const size = props.size || 20;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.64234 5.83317H3.33341V14.9998H16.6667V7.49984H10.0001C8.91157 7.49984 7.98553 6.80416 7.64234 5.83317ZM8.33342 4.1665C8.79365 4.1665 9.16675 4.5396 9.16675 4.99984C9.16675 5.46007 9.53984 5.83317 10.0001 5.83317H16.6667C17.5872 5.83317 18.3334 6.57936 18.3334 7.49984V14.9998C18.3334 15.9203 17.5872 16.6665 16.6667 16.6665H3.33342C2.41294 16.6665 1.66675 15.9203 1.66675 14.9998V5.83317C1.66675 4.9127 2.41294 4.1665 3.33341 4.1665H8.33342Z"
        fill="#0A1826"
        fillOpacity="0.71"
      />
    </svg>
  );
}
