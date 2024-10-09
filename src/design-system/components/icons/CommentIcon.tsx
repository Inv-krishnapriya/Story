import React from 'react';
import { IconProps } from './IconProps';

export function CommentIcon(props: IconProps) {
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
        d="M22 11.9119C22 16.8338 17.5383 20.8238 12.0346 20.8238C10.3539 20.8238 8.77042 20.4517 7.38145 19.7947L3.27916 20.9599C2.53523 21.1712 1.84327 20.4942 2.03823 19.7458L3.06585 15.8012C2.42741 14.6259 2.06932 13.3063 2.06932 11.9119C2.06932 6.99 6.53094 3 12.0346 3C17.5383 3 22 6.99 22 11.9119ZM8.39987 11.9998C8.39987 12.6625 7.86261 13.1998 7.19987 13.1998C6.53713 13.1998 5.99987 12.6625 5.99987 11.9998C5.99987 11.3371 6.53713 10.7998 7.19987 10.7998C7.86261 10.7998 8.39987 11.3371 8.39987 11.9998ZM13.1999 11.9998C13.1999 12.6625 12.6627 13.1998 11.9999 13.1998C11.3372 13.1998 10.7999 12.6625 10.7999 11.9998C10.7999 11.3371 11.3372 10.7998 11.9999 10.7998C12.6627 10.7998 13.1999 11.3371 13.1999 11.9998ZM17.9998 11.9998C17.9998 12.6625 17.4626 13.1998 16.7998 13.1998C16.1371 13.1998 15.5998 12.6625 15.5998 11.9998C15.5998 11.3371 16.1371 10.7998 16.7998 10.7998C17.4626 10.7998 17.9998 11.3371 17.9998 11.9998Z"
        fill={color}
      />
    </svg>
  );
}
