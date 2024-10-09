import React from 'react';
import { IconProps } from './IconProps';

export function TagIcon(props: IconProps) {
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
        d="M12.2894 2.28368C12.1064 2.09885 11.8552 1.99671 11.5918 2H2.99406C2.44921 2.00681 2.00198 2.45369 1.99514 2.99812V11.5959C1.99184 11.8587 2.09368 12.1093 2.27804 12.2921L11.8228 21.7226C12.2037 22.1002 12.8263 22.0912 13.2153 21.7025L21.6973 13.2267C22.086 12.8384 22.0954 12.2171 21.7185 11.8363L12.2894 2.28368ZM7.99319 9.99185C9.09652 9.99185 9.99095 9.09809 9.99095 7.99559C9.99095 6.89308 9.09652 5.99932 7.99319 5.99932C6.88986 5.99932 5.99543 6.89308 5.99543 7.99559C5.99543 9.09809 6.88986 9.99185 7.99319 9.99185Z"
        fill={color}
      />
    </svg>
  );
}
