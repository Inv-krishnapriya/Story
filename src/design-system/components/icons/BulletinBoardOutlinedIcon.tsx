import React from 'react';
import { IconProps } from './IconProps';

export function BulletinBoardOutlinedIcon(props: IconProps) {
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
      <path d="M16 9.80848V11.8405H8V9.80848H16Z" fill={color} />
      <path d="M16 15.9045V13.8725H8V15.9045H16Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 17.936C20 19.0583 19.1046 19.968 18 19.968H15C15 21.0902 14.1046 22 13 22H11C9.89543 22 9 21.0902 9 19.968H6C4.89543 19.968 4 19.0583 4 17.936V11.84C2.89543 11.84 2 10.9303 2 9.80805V8.76907C2 8.04608 2.37812 7.37754 2.99293 7.01348L10.9929 2.2764C11.6153 1.90787 12.3847 1.90787 13.0071 2.2764L21.0071 7.01348C21.6219 7.37754 22 8.04608 22 8.76907V9.80805C22 10.9303 21.1046 11.84 20 11.84V17.936ZM18 9.80805H20V8.76907L12 4.03199L4 8.76907V9.80805H6V17.936H11V19.968H13V17.936H18V9.80805Z"
        fill={color}
      />
    </svg>
  );
}
