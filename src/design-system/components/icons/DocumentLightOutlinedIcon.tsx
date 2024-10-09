import React from "react";
import { IconProps } from './IconProps';

const DocumentLightOutlinedIcon = (props: IconProps) => {
    const size = props.size || 24;
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <path d="M51.5762 56.002V39.002L32.5762 56.002H51.5762Z" fill="#F5F5F5" />
      <path d="M43.5762 19.002H21.5762V21.002H43.5762V19.002Z" fill="#D9D9D9" />
      <path d="M21.5762 29.002H43.5762V31.002H21.5762V29.002Z" fill="#D9D9D9" />
      <path d="M32.5762 40.002H21.5762V42.002H32.5762V40.002Z" fill="#D9D9D9" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5762 9.00195C12.5762 7.89738 13.4716 7.00195 14.5762 7.00195H50.5762C51.6807 7.00195 52.5762 7.89738 52.5762 9.00195V55.002C52.5762 56.1065 51.6807 57.002 50.5762 57.002H14.5762C13.4716 57.002 12.5762 56.1065 12.5762 55.002V9.00195ZM14.5762 9.00195H50.5762V55.002H14.5762V9.00195Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export {DocumentLightOutlinedIcon};
