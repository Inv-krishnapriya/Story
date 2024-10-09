import React from "react";
import { IconProps } from "./IconProps";

export function CrossOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  const onClick = props.onClick;
  return (
    <svg
      className="MintIcon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M13.4165 12L20.0017 18.5826L18.5884 19.999L12.0013 13.4145L5.41329 20L4 18.5836L10.5862 12L4.00009 5.41644L5.41338 4L12.0013 10.5854L18.5883 4.00098L20.0016 5.41741L13.4165 12Z"
        fill={color}
      />
    </svg>
  );
}
