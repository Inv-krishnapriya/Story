import React from "react";
import { IconProps } from "./IconProps";

export function ScreenShareOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "white";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M8 12.8484L12.0021 8.83974L16 12.8645L14.6048 14.2889L12.9959 12.6338L12.9959 16.8398H11.0084V12.6338L9.3952 14.2727L8 12.8484Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 6.83984C2 5.73527 2.89543 4.83984 4 4.83984H20C21.1046 4.83984 22 5.73527 22 6.83984V18.8398C22 19.9444 21.1046 20.8398 20 20.8398H4C2.89543 20.8398 2 19.9444 2 18.8398V6.83984ZM4 6.83984H20V18.8398H4V6.83984Z"
        fill={color}
      />
    </svg>
  );
}
