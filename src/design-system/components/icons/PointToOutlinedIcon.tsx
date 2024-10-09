import React from 'react';
import { IconProps } from './IconProps';

export function PointToOutlinedIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || '#0A1826';
  return (
    <svg
      className="MintIcon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 13.0203H19.9999V11.0248L8.2167 11.035C7.3257 11.0358 6.87864 9.96129 7.50824 9.33226L11.4263 5.4177L9.88668 3.99549L4.00029 9.85706L4 20.0045L11.9999 20.0045V13.0203ZM12.6663 6.98334C13.6296 6.22382 13.686 4.78567 12.785 3.95344L11.2454 2.53122C10.4574 1.80331 9.23395 1.8262 8.47386 2.58308L2.58747 8.44465C2.21156 8.81897 2.00031 9.3271 2.00029 9.857L2 20.0045C1.99997 21.1066 2.89541 22 4 22H11.9999C13.1045 22 13.9999 21.1066 13.9999 20.0045V15.0158H19.9999C21.1045 15.0158 21.9999 14.1224 21.9999 13.0203V11.0248C21.9999 9.92274 21.1045 9.02933 19.9999 9.02933H10.5L12.6663 6.98334Z"
        fill={color}
      />
    </svg>
  );
}
