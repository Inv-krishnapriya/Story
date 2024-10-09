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

function GuestAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const { t } = useTranslation();
  const params = useSearchParams();
  const meetingId = params.get("meetingId");
  console.log(meetingId, "meetingId");

  const isActiveUser = useSelector(
    (state: RootState) => state.global.clientData.accessToken
  )
    ? true
    : false;
  const theme = useTheme();
  console.log("APP LAYOUT : ", isActiveUser);
  useLayoutEffect(() => {
    setIsPageReady(true);
  }, []);
  console.log(isPageReady, "isPageReady");

  useEffect(() => {
    if (!isActiveUser) {
      if (meetingId) {
        redirect(`/video-chat/auth/login?meetingId=${meetingId}`);
      } else {
        redirect(`/auth/login`);
      }
    }
  }, [isActiveUser]);

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      {isPageReady && (
        <>
          <MintAppBar position="static">
            <AppToolbar appName="dashboard.header" />
          </MintAppBar>
          <Box
            sx={{
              padding: theme.mint.spacing.xxs,
              bgcolor: theme.mint.color.background.containerBg.layer2,
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              sx={{ width: "100%" }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={theme.mint.spacing.xxs}
                // width={"373px"}
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

export default GuestAppLayout;
