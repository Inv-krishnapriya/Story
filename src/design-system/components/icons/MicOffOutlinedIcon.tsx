import React from "react";
import { IconProps } from "./IconProps";

export function MicOffOutlinedIcon(props: IconProps) {
  const size = props.size || 20;
  const color = props.color || "#162331";
  const opacity = props.fillOpacity || 0.71;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M1.41661 0.00277723L0.00292969 1.41627L5.99752 7.41002V7.9959C5.99752 10.2039 7.78771 11.9939 9.99602 11.9939C10.1821 11.9939 10.3653 11.9811 10.5447 11.9565L12.3447 13.7563C11.62 14.052 10.827 14.2149 9.99602 14.2149C6.56087 14.2149 3.77612 11.4306 3.77612 7.9959H1.99901C1.99901 12.0734 5.05156 15.4381 8.99639 15.9299V19.9898H10.9956V15.9299C11.9542 15.8104 12.86 15.5213 13.6821 15.0936L18.5892 20L20.0029 18.5865L15.3506 13.9349C15.3506 13.9349 15.3507 13.9348 15.3506 13.9349L14.092 12.6762C14.092 12.6762 14.0921 12.6761 14.092 12.6762L12.5157 11.1003C12.5157 11.1004 12.5158 11.1003 12.5157 11.1003L11.0868 9.67139C11.0868 9.67142 11.0869 9.67135 11.0868 9.67139L1.41661 0.00277723Z"
        fill={color}
      />
      <path
        d="M11.9953 7.75271V3.99795C11.9953 2.89395 11.1002 1.99898 9.99602 1.99898C8.96969 1.99898 8.12399 2.77223 8.00987 3.76786L6.42978 2.188C7.09028 0.88954 8.43925 0 9.99602 0C12.2043 0 13.9945 1.78994 13.9945 3.99795V7.9959C13.9945 8.51682 13.8949 9.01446 13.7136 9.47083L11.9953 7.75271Z"
        fill={color}
      />
      <path
        d="M15.3708 11.1278L16.6603 12.4171C17.5024 11.1508 17.993 9.63062 17.993 7.9959H16.2159C16.2159 9.1379 15.9081 10.208 15.3708 11.1278Z"
        fill={color}
      />
    </svg>
  );
}
