import React from 'react';
import { IconProps } from './IconProps';

export function PointCircleIcon(props: IconProps) {
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
        d="M11.002 8.694V11.55H12.164C12.696 11.55 13.116 11.4287 13.424 11.186C13.732 10.9433 13.886 10.5887 13.886 10.122C13.886 9.646 13.732 9.29133 13.424 9.058C13.116 8.81533 12.696 8.694 12.164 8.694H11.002Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 7V16.8H11.002V13.244H12.164C12.9387 13.244 13.5967 13.118 14.138 12.866C14.6887 12.614 15.1087 12.2547 15.398 11.788C15.6873 11.312 15.832 10.7567 15.832 10.122C15.832 9.478 15.6873 8.92267 15.398 8.456C15.1087 7.98933 14.6887 7.63 14.138 7.378C13.5967 7.126 12.9387 7 12.164 7H9Z"
        fill={color}
      />
    </svg>
  );
}
