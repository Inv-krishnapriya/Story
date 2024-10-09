import React from "react";
import { IconProps } from "./IconProps";

export function TicketOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      className="MintIcon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 11H17V13H15V11Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 19C2.89543 19 2 18.1046 2 17V14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4ZM4 8.53513V7H15V9H17V7H20V17H17V15H15V17H4V15.4649C5.1956 14.7733 6 13.4806 6 12C6 10.5194 5.1956 9.22675 4 8.53513Z"
        fill={color}
      />
    </svg>
  );
}
