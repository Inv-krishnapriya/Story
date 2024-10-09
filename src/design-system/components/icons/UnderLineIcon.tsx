import React from "react";
import { IconProps } from "./IconProps";

export function UnderLineIcon(props: {
  width?: any;
  height?: number;
  color?: string;
}) {
  const width = props.width ?? 98;
  const color = props.color ?? "#36B2E2";
  const height = props.height ?? 2;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} 2`}
      fill="none"
    >
      <line y1="1" x2={width} y2="1" stroke={color} strokeOpacity="0.3" />
    </svg>
  );
}
