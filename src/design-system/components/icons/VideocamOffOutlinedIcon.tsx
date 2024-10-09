import React from "react";
import { IconProps } from "./IconProps";

export function VideoCamOffOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.41663 2.84277L2.00317 4.25646L4.58481 6.8385H3.99894C2.89495 6.8385 2 7.7336 2 8.83775V16.8348C2 17.9389 2.89495 18.834 3.99894 18.834H14.9931C15.4396 18.834 15.8519 18.6876 16.1846 18.4402L20.5865 22.8428L22 21.4291L3.41663 2.84277ZM6.58374 8.83775H3.99894V16.8348H14.5795L6.58374 8.83775Z"
        fill="white"
      />
      <path
        d="M14.9931 8.83775V11.5933L16.992 13.5925V11.2825L19.9904 10.4598V15.2252L18.1206 14.7213L20.5458 17.1468C21.3628 16.9092 21.9894 16.1572 21.9894 15.2252V10.4598C21.9894 9.14026 20.7338 8.18265 19.4615 8.53177L16.992 9.20942V8.83775C16.992 8.3595 16.8241 7.92048 16.5441 7.57642C16.1775 7.12613 15.6189 6.8385 14.9931 6.8385H10.2391L12.238 8.83775H14.9931Z"
        fill="white"
      />
    </svg>
  );
}
