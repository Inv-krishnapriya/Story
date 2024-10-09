import React from 'react';
import { IconProps } from './IconProps';

export function ReportIcon(props: IconProps) {
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
        d="M22 4.00388C22 2.89717 21.1046 2 20 2H4C2.89543 2 2 2.89717 2 4.00388V18.198C2 19.3048 2.89543 20.2019 4 20.2019H9.5L11.3633 21.7661C11.7357 22.0787 12.2785 22.0779 12.65 21.7642L14.5 20.2019H20C21.1046 20.2019 22 19.3048 22 18.198L22 4.00388ZM11 6.3424H13V11.6861H11V6.3424ZM11 13.6887H13V15.6925H11V13.6887Z"
        fill={color}
      />
    </svg>
  );
}
