"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import BackgroundImage from "./BackgroundImage.svg";
import { useSelector } from "react-redux";
import { userActiveStatusSelector } from "@/stores/global/selector";
import { MintAppBar, MintTypography } from "@/design-system";
import { useTranslation } from "react-i18next";
import AppToolbar from "@/components/UI/app-bar/AppToolBar";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { RootState } from "@/stores/rootReducer";

function GuestAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const { t } = useTranslation();
  const params = useSearchParams();
  const meetingId = params.get("meetingId");
  const isActiveUser = useSelector(
    (state: RootState) => state.global.clientData.accessToken
  );

  console.log(isActiveUser);
  const theme = useTheme();

  useLayoutEffect(() => {
    setIsPageReady(true);
  }, []);

  useEffect(() => {
    if (!isActiveUser) {
      if (meetingId) {
        // redirect(`/video-chat/auth/login?meetingId=${meetingId}`);
      } else {
        redirect("auth/login");
      }
    }
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      {isPageReady && (
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

export default GuestAuthLayout;
