import React from "react";
import { IconProps } from "./IconProps";

export function VideoOutlinedIcon(props: IconProps) {
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
        d="M17 8.3718L19.4708 7.6939C20.7438 7.34465 22 8.30262 22 9.62263V14.3898C22 15.706 20.7506 16.6633 19.4797 16.3209L17 15.6528V16C17 16.4657 16.8408 16.8942 16.5739 17.2342C16.2078 17.7005 15.6389 18 15 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6H15C15.6261 6 16.1851 6.28773 16.5518 6.73819C16.832 7.08238 17 7.52157 17 8V8.3718ZM20 14.3898L17 13.5815V10.4457L20 9.62263V14.3898ZM15 16V8L4 8V16H15Z"
        fill={color}
      />
    </svg>
  );
}
