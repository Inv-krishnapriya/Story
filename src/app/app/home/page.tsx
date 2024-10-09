"use client";

import { Box, useTheme } from "@mui/material";
import React from "react";
import NotificationList from "./NotificationList";
import TodaysFeedList from "./TodaysFeedList"

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      width={"100%"}
      height= "calc(100vh - 136px)"
      gap={theme.mint.spacing.m}
    >
      <NotificationList />
      <TodaysFeedList/>

    </Box>
  );
};

export default Home;
