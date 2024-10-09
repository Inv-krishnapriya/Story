import React from "react";
import { IconProps } from "./IconProps";

export function PictureIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <path
        d="M12 9.5C12 10.8807 10.8807 12 9.5 12C8.11929 12 7 10.8807 7 9.5C7 8.11929 8.11929 7 9.5 7C10.8807 7 12 8.11929 12 9.5Z"
        fill={color}
        fillOpacity="0.71"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM19 5H5L5 19H6.00002L9.05769 15.9423C9.42032 15.5797 10.0083 15.5797 10.3709 15.9423L11.5714 17.1429L15.5577 13.1566C15.9203 12.794 16.5083 12.794 16.8709 13.1566L19 15.2857V5Z"
        fill={color}
        fillOpacity="0.71"
      />
    </svg>
  );
}
