import React from "react";
import { IconProps } from "./IconProps";

export function VideoOffIcon(props: IconProps) {
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
        d="M3.41663 2.00293L2.00317 3.41662L4.58481 5.99866H2.99947C2.44748 5.99866 2 6.44621 2 6.99828V16.9945C2 17.5466 2.44748 17.9942 2.99947 17.9942H15.9925C16.1621 17.9942 16.3218 17.9519 16.4617 17.8774L20.5865 22.0029L22 20.5892L3.41663 2.00293Z"
        fill="#0A1826"
        fillOpacity="0.71"
      />
      <path
        d="M20.9267 16.688C21.4879 16.725 21.9894 16.2795 21.9894 15.6899V8.30911C21.9894 7.64935 21.3616 7.17055 20.7254 7.34511L16.992 8.36957V6.99828C16.992 6.44621 16.5445 5.99866 15.9925 5.99866H10.2391L20.9267 16.688Z"
        fill="#0A1826"
        fillOpacity="0.71"
      />
    </svg>
  );
}
