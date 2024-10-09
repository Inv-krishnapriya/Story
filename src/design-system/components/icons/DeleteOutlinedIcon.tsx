import React from "react";
import { IconProps } from "./IconProps";

export function DeleteOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.11127 6.66683V12.0002H5.77793L5.77793 6.66683H7.11127Z"
        fill="#0A1826"
        fill-opacity="0.71"
      />
      <path
        d="M10.2224 12.0002V6.66683H8.88906V12.0002H10.2224Z"
        fill="#0A1826"
        fill-opacity="0.71"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.55572 1.3335C4.81934 1.3335 4.22239 1.93045 4.22239 2.66683V4.00016H1.3335V5.3335H2.66683L2.66683 13.3331C2.66683 14.0694 3.26378 14.6664 4.00016 14.6664H12.0002C12.7365 14.6664 13.3335 14.0694 13.3335 13.3331V5.3335H14.6668V4.00016H11.7779V2.66683C11.7779 1.93045 11.181 1.3335 10.4446 1.3335H5.55572ZM10.4446 4.00016V2.66683H5.55573V4.00016H10.4446ZM4.00016 5.3335H12.0002V13.3331H4.00016L4.00016 5.3335Z"
        fill="#0A1826"
        fill-opacity="0.71"
      />
    </svg>
  );
}
