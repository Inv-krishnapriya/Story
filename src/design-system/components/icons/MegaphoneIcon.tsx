import React from 'react';
import { IconProps } from './IconProps';

export function MegaphoneIcon(props: IconProps) {
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
        d="M15.866 6.00007L19.3302 4L20.3302 5.73205L16.866 7.73213L15.866 6.00007Z"
        fill={color}
      />
      <path d="M17 11.0001H21V13.0001H17V11.0001Z" fill={color} />
      <path
        d="M19.4641 20.0001L16 18.0001L17 16.268L20.4641 18.268L19.4641 20.0001Z"
        fill={color}
      />
      <path
        d="M3 9.72089C3 9.29046 3.27543 8.90832 3.68377 8.77221L10.6838 6.43888C11.3313 6.22303 12 6.705 12 7.38756V16.6127C12 17.2953 11.3313 17.7772 10.6838 17.5614L3.68377 15.2281C3.27543 15.0919 3 14.7098 3 14.2794V9.72089Z"
        fill={color}
      />
    </svg>
  );
}
