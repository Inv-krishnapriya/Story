import React from "react";
import { IconProps } from "./IconProps";

export function PencilIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.36342 11.8272C1.37036 11.482 1.51088 11.1528 1.75555 10.9086L10.958 1.72508C11.4812 1.20297 12.3295 1.20297 12.8527 1.72508L14.2744 3.14394C14.7973 3.66575 14.7977 4.51166 14.2752 5.0339L5.05752 14.2481C4.81225 14.4932 4.48118 14.6338 4.13407 14.6402L2.69788 14.6666C1.9379 14.6806 1.31853 14.0615 1.33377 13.3031L1.36342 11.8272ZM10.9659 3.60802L11.9053 2.67046L13.3271 4.08931L12.3884 5.02766L10.9659 3.60802ZM10.0185 4.55339L2.70287 11.854L2.67322 13.3299L4.10941 13.3035L11.4419 5.97382L10.0185 4.55339Z"
        fill="#0A1826"
        fill-opacity="0.71"
      />
    </svg>
  );
}
