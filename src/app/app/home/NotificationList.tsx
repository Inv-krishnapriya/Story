"use client";

import {
  ChevronRightOutlinedIcon,
  MintTypography,
  DocumentLightOutlinedIcon,
} from "@/design-system";
import { Box, LinearProgress, List, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationDetails from "./NotificationDetails";
import { useRouter } from "next/navigation";
import { customerService } from "@/common/apiUrls";
import { GetNotificationDetails } from "@/common/types";
import { useDispatch } from "react-redux";
import { actions } from "@/stores/campaign/reducer";
import { t } from "i18next";

const NotificationList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const setIsUnreadExist = (data: boolean) =>
    dispatch(actions.setIsUnreadExist(data));
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigateToNotification = () => {
    router.push("/app/home/notification");
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = async () => {
    await customerService
      .getNotificationList({ page: "1" })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setIsUnreadExist(res?.data?.isUnreadExists);
        setNotificationList(res?.data?.data.slice(0, 8));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const theme = useTheme();

  return (
    <Box
      sx={{ width: "100%", padding: theme.mint.spacing.m }}
      bgcolor={theme.mint.color.background.containerBg.layer1}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <MintTypography
          size="head-s"
          color={theme.mint.color.text.high}
          weight="700"
        >
          {t("notification.latest-news")}
        </MintTypography>
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={navigateToNotification}
        >
          <MintTypography size="body" color={theme.mint.color.text.link}>
            {t("notification.see-all")}
          </MintTypography>
          <ChevronRightOutlinedIcon
            size={16}
            color={theme.mint.color.text.link}
          />
        </Box>
      </Box>
      <Box
        overflow={"auto"}
        height={"100%"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading && (
          <Stack
            justifyContent={"center"}
            height={"100px"}
            data-testid="progress-bar"
          >
            <LinearProgress />
          </Stack>
        )}
        {notificationList?.length > 0 &&
          notificationList.map((res: GetNotificationDetails) => {
            return (
              <List key={res.id}>
                <NotificationDetails fromHome={true} data={res} />
              </List>
            );
          })}
        {notificationList?.length == 0 && !loading && (
          <Box
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={theme.mint.spacing.xs}
          >
            <DocumentLightOutlinedIcon
              size={63.996}
              color={theme.mint.color.pallet.black200}
            />
            <Box>
              <MintTypography size="body" color={theme.mint.color.text.low}>
                {t("notification.no-new-announcement")}
              </MintTypography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NotificationList;
