import React from "react";
import { IconProps } from "./IconProps";

export function PCOutlinedIcon(props: IconProps) {
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 4C2.89543 4 2 4.89543 2 6V15C2 16.1046 2.89543 17 4 17H9.66667L9 19H4V21H20V19H15L14.3333 17H20C21.1046 17 22 16.1046 22 15V6C22 4.89543 21.1046 4 20 4H4ZM20 6H4V15H20V6Z"
        fill="#162331"
      />
    </svg>
  );
}
