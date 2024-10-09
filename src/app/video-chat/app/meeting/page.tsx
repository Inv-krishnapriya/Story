"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const WaitingScreen = dynamic(() => import("./WaitingScreen"), {
    ssr: false,
  });
  return (
    <>
      <WaitingScreen />
    </>
  );
}
