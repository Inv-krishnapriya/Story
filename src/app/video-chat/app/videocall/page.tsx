"use client";
import React from "react";
import dynamic from "next/dynamic";

export default function Page() {
  const VideoCallScreen = dynamic(() => import("./VideoCallScreen"), {
    ssr: false,
  });
  return (
    <>
      <VideoCallScreen />
    </>
  );
}
