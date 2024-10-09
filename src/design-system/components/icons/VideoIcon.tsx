import React from "react";
import { IconProps } from "./IconProps";

export function VideoIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 6C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H16C16.5523 18 17 17.5523 17 17V15.6528L20.7398 16.6605C21.3753 16.8317 22 16.353 22 15.6949V8.31136C22 7.65136 21.3719 7.17237 20.7354 7.347L17 8.37185V7C17 6.44772 16.5523 6 16 6H3Z"
        fill="#0A1826"
        fillOpacity={0.71}
      />
    </svg>
  );
}
