import React from 'react';
import { IconProps } from './IconProps';

export function MoonIcon(props: IconProps) {
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
        d="M19.3437 12.3243C18.4378 13.2227 17.2184 13.779 15.6346 13.797C12.6441 13.797 10.2198 11.3783 10.2198 8.39472C10.2198 6.85319 10.7127 5.66786 11.6979 4.72109C12.4903 4.03562 12.1137 3.00434 11.2516 3C6.82031 3.00391 3 7.02358 3 11.9962C3 16.9689 7.04051 21 12.0247 21C17.0089 21 21.007 17.5887 21 12.7561C20.9729 12.008 19.9407 11.7322 19.3437 12.3243Z"
        fill={color}
      />
    </svg>
  );
}
