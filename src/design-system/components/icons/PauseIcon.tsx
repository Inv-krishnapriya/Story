import React from "react";
import { IconProps } from "./IconProps";

const PauseIcon = (props: IconProps) => {
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
        d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H9C9.55228 20 10 19.5523 10 19V5C10 4.44772 9.55228 4 9 4H6Z"
        fill={color}
      />
      <path
        d="M15 4C14.4477 4 14 4.44772 14 5V19C14 19.5523 14.4477 20 15 20H18C18.5523 20 19 19.5523 19 19V5C19 4.44772 18.5523 4 18 4H15Z"
        fill={color}
      />
    </svg>
  );
};

export  {PauseIcon};
