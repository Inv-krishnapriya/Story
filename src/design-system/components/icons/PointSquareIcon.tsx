import React from 'react';
import { IconProps } from './IconProps';

export function PointSquareIcon(props: IconProps) {
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
        d="M11.0512 11.6429V8.72857H12.2418C12.7869 8.72857 13.2172 8.85238 13.5328 9.1C13.8484 9.3381 14.0061 9.7 14.0061 10.1857C14.0061 10.6619 13.8484 11.0238 13.5328 11.2714C13.2172 11.519 12.7869 11.6429 12.2418 11.6429H11.0512Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM9 17V7H12.2418C13.0355 7 13.7097 7.12857 14.2643 7.38571C14.8286 7.64286 15.2589 8.00952 15.5553 8.48571C15.8518 8.96191 16 9.52857 16 10.1857C16 10.8333 15.8518 11.4 15.5553 11.8857C15.2589 12.3619 14.8286 12.7286 14.2643 12.9857C13.7097 13.2429 13.0355 13.3714 12.2418 13.3714H11.0512V17H9Z"
        fill={color}
      />
    </svg>
  );
}
