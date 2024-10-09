import React from "react";
import { IconProps } from "./IconProps";

export function LightDoorIcon(props: IconProps) {
  const size = props.size || 24;
  const color = props.color || "#0A1826";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M16 13.5585V57.5795H45.3316V8.97901C45.3316 7.09026 43.6072 5.6714 41.7538 6.03518L18.4222 10.6146C17.015 10.8909 16 12.1244 16 13.5585Z"
        fill="#D9D9D9"
      />
      <path
        d="M41.2403 33.0649C41.2403 36.0103 38.8526 38.398 35.9072 38.398C32.9619 38.398 30.5742 36.0103 30.5742 33.0649C30.5742 30.1196 32.9619 27.7319 35.9072 27.7319C38.8526 27.7319 41.2403 30.1196 41.2403 33.0649Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M41.2422 33.0649C41.2422 36.0103 38.8545 38.398 35.9092 38.398C32.9638 38.398 30.5762 36.0103 30.5762 33.0649C30.5762 30.1196 32.9638 27.7319 35.9092 27.7319C38.8545 27.7319 41.2422 30.1196 41.2422 33.0649ZM39.2422 33.0649C39.2422 34.9057 37.75 36.398 35.9092 36.398C34.0684 36.398 32.5762 34.9057 32.5762 33.0649C32.5762 31.2242 34.0684 29.7319 35.9092 29.7319C37.75 29.7319 39.2422 31.2242 39.2422 33.0649Z"
        fill="#A1A1A1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M46.3311 8.97885C46.3311 6.46051 44.0319 4.56871 41.5607 5.05375L18.2291 9.63321C16.3528 10.0015 14.9995 11.6462 14.9995 13.5583V56.5962H8V58.5962H57.3304V58.3075H57.4415V13.9102C57.4415 12.2533 56.0984 10.9102 54.4415 10.9102L46.3311 10.9102V8.97885ZM41.9459 7.0163C43.1815 6.77378 44.3311 7.71968 44.3311 8.97885V56.5794H16.9995V13.5583C16.9995 12.6023 17.6761 11.7799 18.6143 11.5958L41.9459 7.0163ZM55.4415 13.9102V56.5962H46.3311V12.9102L54.4415 12.9102C54.9938 12.9102 55.4415 13.3579 55.4415 13.9102Z"
        fill="#A1A1A1"
      />
    </svg>
  );
}
