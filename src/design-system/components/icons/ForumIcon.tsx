import React from 'react';
import { IconProps } from './IconProps';

export function ForumIcon(props: IconProps) {
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
        d="M10.0337 17.9476C14.4706 17.9476 18.0675 14.3776 18.0675 9.97382C18.0675 5.57 14.4706 2 10.0337 2C5.59682 2 2 5.57 2 9.97382C2 11.2214 2.28868 12.4021 2.80337 13.4537L2.02782 16.8947C1.85527 17.6603 2.5882 18.3179 3.32646 18.0599L6.28247 17.0268C7.40221 17.6147 8.67879 17.9476 10.0337 17.9476ZM7.97504 11C8.52503 11 8.97089 10.5523 8.97089 10C8.97089 9.44772 8.52503 9 7.97504 9C7.42504 9 6.97919 9.44772 6.97919 10C6.97919 10.5523 7.42504 11 7.97504 11ZM11.9585 11C12.5085 11 12.9543 10.5523 12.9543 10C12.9543 9.44772 12.5085 9 11.9585 9C11.4085 9 10.9626 9.44772 10.9626 10C10.9626 10.5523 11.4085 11 11.9585 11Z"
        fill={color}
      />
      <path
        d="M21.8888 12.1884L19.9522 12.7095C19.9892 12.9871 20.0083 13.27 20.0083 13.5571C20.0083 14.565 19.7757 15.514 19.3619 16.3595L19.0162 17.0657L19.8352 19.7929L17.338 18.8351L16.5427 19.2526C15.6358 19.7288 14.6001 20 13.4937 20C13.01 20 12.5391 19.9481 12.0865 19.8497L11.5705 21.7833C12.1885 21.9251 12.8323 22 13.4937 22C14.9283 22 16.28 21.6475 17.4656 21.025L19.1245 21.6613C20.6699 22.254 22.2197 20.806 21.7421 19.2155L21.1494 17.2417C21.6943 16.1283 22 14.8781 22 13.5571C22 13.0911 21.962 12.6339 21.8888 12.1884Z"
        fill={color}
      />
    </svg>
  );
}
