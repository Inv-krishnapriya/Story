import React from 'react';
import { IconProps } from './IconProps';

export function CategoryIcon(props: IconProps) {
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
        d="M11.1425 2.48414C11.5309 1.83862 12.4691 1.83862 12.8575 2.48414L17.0913 9.52066C17.4912 10.1853 17.0111 11.0309 16.2338 11.0309H7.76619C6.9889 11.0309 6.50878 10.1853 6.9087 9.52066L11.1425 2.48414Z"
        fill={color}
      />
      <path
        d="M2 14.5211C2 13.9703 2.44772 13.5239 3 13.5239H9.5C10.0523 13.5239 10.5 13.9703 10.5 14.5211V21.0028C10.5 21.5535 10.0523 22 9.5 22H3C2.44772 22 2 21.5535 2 21.0028V14.5211Z"
        fill={color}
      />
      <path
        d="M17.5 13.0253C15.0147 13.0253 13 15.0343 13 17.5126C13 19.9909 15.0147 22 17.5 22C19.9853 22 22 19.9909 22 17.5126C22 15.0343 19.9853 13.0253 17.5 13.0253Z"
        fill={color}
      />
    </svg>
  );
}
