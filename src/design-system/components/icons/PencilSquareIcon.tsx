import React from 'react';
import { IconProps } from './IconProps';

export function PencilSquareIcon(props: IconProps) {
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
        d="M20.2919 2.29778C19.9014 1.90728 19.2683 1.90725 18.8777 2.29771L10.2943 10.8795C10.1068 11.0671 10.0014 11.3214 10.0014 11.5867V13C10.0014 13.5522 10.4491 14 11.0014 14H12.4147C12.6799 14 12.9343 13.8946 13.1218 13.7071L21.7051 5.12538C22.0957 4.73486 22.0958 4.10165 21.7052 3.7111L20.2919 2.29778Z"
        fill={color}
      />
      <path
        d="M8.88034 9.46618L14.3475 4.00003H3C2.44772 4.00003 2 4.44774 2 5.00003V21C2 21.5523 2.44772 22 3 22H19C19.5523 22 20 21.5523 20 21V9.65946L14.536 15.1225C13.9734 15.685 13.2104 16.001 12.4148 16.001L11.0015 16.001C9.34461 16.001 8.00146 14.6578 8.00146 13.001V11.5877C8.00146 10.792 8.31761 10.0288 8.88034 9.46618Z"
        fill={color}
      />
    </svg>
  );
}
