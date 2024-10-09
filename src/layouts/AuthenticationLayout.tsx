"use client";

import { Box, useTheme } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  hasBasicAccessSelector,
  userActiveStatusSelector,
} from "@/stores/global/selector";
import { MintAppBar } from "@/design-system";
import AppToolbar from "@/components/UI/app-bar/AppToolBar";
import { redirect, usePathname } from "next/navigation";

function AuthenticationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useTheme();
  const pathname = usePathname();
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const isActiveUser = useSelector(userActiveStatusSelector);
  const hasBasicAccess = useSelector(hasBasicAccessSelector);
  const isPathAcceptPolicy = pathname.includes("accept-app-policy");

  useLayoutEffect(() => {
    setIsPageReady(true);
  }, []);

  useEffect(() => {
    if (!hasBasicAccess && isPathAcceptPolicy) {
      console.log(
        "Basic access in authentication layout : ",
        !hasBasicAccess,
        isPathAcceptPolicy
      );

      redirect("/auth/login");
    } else if (isActiveUser) {
      redirect("/app/home");
    }
  }, [isActiveUser]);
  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      {!isActiveUser && isPageReady && (
        <>
          <MintAppBar position="static">
            <AppToolbar appName="dashboard.header" />
          </MintAppBar>
          <Box
            sx={{
              padding: theme.mint.spacing.xl,
              bgcolor: theme.mint.color.background.containerBg.layer2,
              flexGrow: 1,
            }}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={theme.mint.spacing.m}
                width={"373px"}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AuthenticationLayout;
