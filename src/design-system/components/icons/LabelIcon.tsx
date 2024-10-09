import React from 'react';
import { IconProps } from './IconProps';

export function LabelIcon(props: IconProps) {
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
        d="M6.52648 5.00704C6.17069 5.00721 5.84162 5.1952 5.66167 5.50107L2.13776 11.4909C1.95288 11.8051 1.95417 12.1947 2.14112 12.5077L5.72682 18.5116C5.90833 18.8155 6.23745 19.0012 6.59232 19L20.9883 18.9491C21.5405 18.9471 21.9873 18.5007 21.9878 17.9505L22 6.00064C22.0006 5.44797 21.551 4.99973 20.9965 5L6.52648 5.00704ZM8.96132 13.9961C10.0693 13.9961 10.9674 13.101 10.9674 11.9969C10.9674 10.8927 10.0693 9.99762 8.96132 9.99762C7.85338 9.99762 6.95521 10.8927 6.95521 11.9969C6.95521 13.101 7.85338 13.9961 8.96132 13.9961Z"
        fill={color}
      />
    </svg>
  );
}
