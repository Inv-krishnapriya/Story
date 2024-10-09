import GuestAuthLayout from "@/layouts/GuestAuthLayout";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer app",
  description: "Quick interview customer application",
};

function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <GuestAuthLayout>{children}</GuestAuthLayout>;
}

export default AuthLayout;
