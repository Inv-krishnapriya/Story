import React from "react";
import { IconProps } from "./IconProps";

export const HomeoutlinedIcon = (props: IconProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 14.6694C9 13.5655 9.89543 12.6705 11 12.6705H13C14.1046 12.6705 15 13.5655 15 14.6694V18.6671H19V8.84723L12 4.66489L5 8.84723L5 18.6671H9V14.6694ZM5 20.666H9C10.1046 20.666 11 19.7711 11 18.6671V14.6694H13V18.6671C13 19.7711 13.8954 20.666 15 20.666H19C20.1046 20.666 21 19.7711 21 18.6671V8.84723C21 8.14396 20.6302 7.49243 20.0262 7.13156L13.0262 2.94922C12.3942 2.57161 11.6058 2.57162 10.9738 2.94922L3.97377 7.13157C3.36979 7.49243 3 8.14396 3 8.84723V18.6671C3 19.7711 3.89543 20.666 5 20.666Z"
        fill={color}
        fillOpacity="0.9"
      />
    </svg>
  );
};
