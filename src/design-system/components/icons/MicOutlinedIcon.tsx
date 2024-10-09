import React from "react";
import { IconProps } from "./IconProps";

export function MicOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#162331";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2C9.79086 2 8 3.79086 8 6V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V6C16 3.79086 14.2091 2 12 2ZM14 10V6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6V10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10Z"
        fill={color}
      />
      <path
        d="M13 17.9381V22H11V17.9381C7.05369 17.446 4 14.0796 4 10H5.77778C5.77778 13.4364 8.56356 16.2222 12 16.2222C15.4364 16.2222 18.2222 13.4364 18.2222 10H20C20 14.0796 16.9463 17.446 13 17.9381Z"
        fill={color}
      />
    </svg>
  );
}
