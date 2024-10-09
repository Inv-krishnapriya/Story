import React from "react";
import { IconProps } from "./IconProps";

const PlayIcon = (props: IconProps) => {
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
        d="M5.00529 3.98918L5.00293 20.0105C5.00282 20.7715 5.83636 21.2469 6.50244 20.8656L20.5044 12.8519C21.1692 12.4714 21.1691 11.5222 20.5041 11.1418L6.50457 3.13424C5.8386 2.75331 5.0054 3.22843 5.00529 3.98918Z"
        fill={color}
      />
    </svg>
  );
};

export  {PlayIcon};
