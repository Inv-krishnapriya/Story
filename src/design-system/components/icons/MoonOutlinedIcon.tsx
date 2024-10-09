import React from 'react';
import { IconProps } from './IconProps';

export function MoonOutlinedIcon(props: IconProps) {
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
        d="M15.6449 15.5977H15.6346C11.6472 15.5977 8.41484 12.3728 8.41484 8.39472C8.41484 7.24621 8.63604 6.20328 9.08817 5.27305C6.68928 6.28675 4.80495 8.83472 4.80495 11.9962C4.80495 15.9743 8.03735 19.1992 12.0247 19.1992C15.3223 19.1992 17.853 17.5197 18.7968 14.8924C17.8778 15.3361 16.827 15.5843 15.6552 15.5976L15.6449 15.5977ZM15.6346 13.797C17.2184 13.779 18.4378 13.2227 19.3437 12.3243C19.9407 11.7322 20.9729 12.008 21 12.7561C21.007 17.5887 17.0089 21 12.0247 21C7.04051 21 3 16.9689 3 11.9962C3 7.02358 6.82031 3.00391 11.2516 3C12.1137 3.00434 12.4903 4.03562 11.6979 4.72109C10.7127 5.66786 10.2198 6.85319 10.2198 8.39472C10.2198 11.3783 12.6441 13.797 15.6346 13.797Z"
        fill={color}
      />
    </svg>
  );
}
