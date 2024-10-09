import React from 'react';
import { IconProps } from './IconProps';

export function TreadingUpOutlinedIcon(props: IconProps) {
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
        d="M7.64184 10.9612C8.42925 10.1745 9.69766 10.1655 10.4746 10.9412L13.0459 13.5084L18.5262 8.01418L14.9833 8.01213L14.9971 6.01243L20.1322 6.00005C21.2383 5.99246 22.0095 6.85069 22.0019 7.95509L21.9675 12.9543L19.9647 12.9681L19.9699 9.48127L14.4768 15.0371C13.6893 15.8234 12.3968 15.7077 11.62 14.9322L9.04875 12.365L3.40887 18L2.00195 16.5962L7.64184 10.9612Z"
        fill={color}
      />
    </svg>
  );
}
