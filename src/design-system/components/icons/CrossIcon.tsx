import React from 'react';
import { IconProps } from './IconProps';

export function CrossIcon(props: IconProps) {
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.4853 6.99992L11.9498 10.5354L8.41424 6.99992L7.00002 8.41413L10.5355 11.9497L7 15.4852L8.41421 16.8994L11.9498 13.3639L15.4853 16.8994L16.8995 15.4852L13.364 11.9497L16.8995 8.41413L15.4853 6.99992Z"
        fill={color}
      />
    </svg>
  );
}
