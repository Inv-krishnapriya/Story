import React from 'react';
import { IconProps } from './IconProps';

export function TrophyIcon(props: IconProps) {
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
        d="M17.5 4V4.5H18C19.0781 4.5 19.9776 4.77094 20.6041 5.39937C21.2303 6.02753 21.5 6.92899 21.5 8.00943C21.5 9.15081 21.0661 10.0482 20.3111 10.6485C19.6062 11.2089 18.667 11.4749 17.6478 11.4983L17.3027 11.5062L17.1878 11.8317C16.7642 13.0314 15.9354 14.0412 14.8654 14.6957C13.6905 15.4143 12.5 16.6181 12.5 18.2008C12.5 19.4706 13.5294 20.5 14.7992 20.5H16C16.2761 20.5 16.5 20.7239 16.5 21V21.5H7.5V21C7.5 20.7239 7.72386 20.5 8 20.5H9.20079C10.4706 20.5 11.5 19.4706 11.5 18.2008C11.5 16.6181 10.3095 15.4143 9.13464 14.6957C8.06458 14.0412 7.23582 13.0314 6.81224 11.8317L6.69732 11.5062L6.35223 11.4983C5.33302 11.4749 4.39382 11.2089 3.68885 10.6485L3.37771 11.0398L3.68885 10.6485C2.93386 10.0482 2.5 9.15081 2.5 8.00943C2.5 6.92899 2.76971 6.02753 3.39589 5.39937C4.02235 4.77094 4.92189 4.5 6 4.5H6.5V4V3C6.5 2.72386 6.72386 2.5 7 2.5H17C17.2761 2.5 17.5 2.72386 17.5 3V4ZM17.5 9.97384V10.5313L18.0542 10.4709C18.7251 10.3978 19.2834 10.188 19.6889 9.86567C20.1831 9.47272 20.5 8.8753 20.5 8.00943C20.5 7.08172 20.2688 6.47942 19.8959 6.10537C19.5233 5.73162 18.9238 5.5 18 5.5H17.5V6V9.97384ZM6.5 6V5.5H6C5.07619 5.5 4.47668 5.73162 4.10411 6.10537C3.73123 6.47942 3.5 7.08172 3.5 8.00943C3.5 8.8753 3.81686 9.47272 4.31115 9.86567C4.71663 10.188 5.27489 10.3978 5.94583 10.4709L6.5 10.5313V9.97384V6Z"
        fill={color}
        width={color}
      />
    </svg>
  );
}
