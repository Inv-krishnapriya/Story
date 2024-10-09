import React from 'react';
import { IconProps } from './IconProps';

export function PersonAddIcon(props: IconProps) {
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
        d="M18.9878 5V2H16.9796V5H13.9674V7H16.9796V10H18.9878V7H22V5H18.9878Z"
        fill={color}
      />
      <path
        d="M11.5082 16.4108C13.0876 15.5684 14.162 13.9092 14.162 12C14.162 9.23858 11.9143 7 9.14163 7C6.36895 7 4.12125 9.23858 4.12125 12C4.12125 13.8531 5.13344 15.4707 6.63723 16.3344C6.50689 16.3717 6.37989 16.412 6.25729 16.4553C5.40455 16.7569 4.62972 17.199 3.97707 17.7563C3.32441 18.3136 2.80669 18.9752 2.45347 19.7033C2.24984 20.1231 2.10318 20.5603 2.01548 21.0062C1.9089 21.5482 2.36799 22 2.92253 22L14.9715 22C15.526 22 15.9851 21.5482 15.8785 21.0062C15.7908 20.5603 15.6442 20.1231 15.4405 19.7033C15.0873 18.9752 14.5696 18.3136 13.9169 17.7563C13.2643 17.199 12.4894 16.7569 11.6367 16.4553C11.5936 16.4401 11.5508 16.4252 11.5082 16.4108Z"
        fill={color}
      />
    </svg>
  );
}
