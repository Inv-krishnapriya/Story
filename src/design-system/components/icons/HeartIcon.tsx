import React from 'react';
import { IconProps } from './IconProps';

export function HeartIcon(props: IconProps) {
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
        d="M7.56707 3C8.66453 3 9.72946 3.41 10.5987 4.03773C11.1683 4.44902 11.7964 5.3848 12.0095 6C12.1865 5.3848 12.8611 4.45561 13.43 4.04359C14.2977 3.41511 15.3547 3 16.4519 3C19.5187 3 22.1042 5.46767 21.9968 8.89388C21.9968 13.132 14.7189 19.1295 12.5845 20.7973C12.2387 21.0675 11.7669 21.0676 11.4211 20.7974C9.28613 19.1297 2.00593 13.132 2.00593 8.89388C1.85796 5.47197 4.50023 3 7.56707 3Z"
        fill={color}
      />
    </svg>
  );
}
