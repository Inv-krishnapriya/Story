import React from "react";
import { IconProps } from "./IconProps";

export function CheckCircleOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.1795 25.9755L32.0623 43.0927C30.0359 45.1191 26.7505 45.1192 24.7241 43.0928L14.8184 33.1872L20.9335 27.072L28.3932 34.5315L43.0643 19.8604L49.1795 25.9755Z"
        fill="#F5F5F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6045 33.2035L20.7964 27.0115L28.3498 34.5648L43.2052 19.7093L49.3972 25.9013L32.065 43.2335C30.0132 45.2853 26.6865 45.2854 24.6346 43.2335L14.6045 33.2035ZM28.3498 37.4287L43.2052 22.5733L46.5332 25.9013L30.633 41.8015C29.372 43.0625 27.3276 43.0625 26.0666 41.8016L17.4684 33.2035L20.7964 29.8755L28.3498 37.4287Z"
        fill="#D9D9D9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.002 32C59.002 46.9117 46.9136 59 32.002 59C17.0903 59 5.00195 46.9117 5.00195 32C5.00195 17.0883 17.0903 5 32.002 5C46.9136 5 59.002 17.0883 59.002 32ZM56.9768 32C56.9768 45.7932 45.7952 56.9749 32.002 56.9749C18.2087 56.9749 7.02707 45.7932 7.02707 32C7.02707 18.2068 18.2087 7.02512 32.002 7.02512C45.7952 7.02512 56.9768 18.2068 56.9768 32Z"
        fill="#D9D9D9"
      />
    </svg>
  );
}
