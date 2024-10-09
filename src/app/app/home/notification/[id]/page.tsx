"use client";

import { customerService } from "@/common/apiUrls";
import { ChevronLeftOutlinedIcon, MintTypography } from "@/design-system";
import { Box, useTheme } from "@mui/material";
import moment from "moment";
import "moment/locale/ja";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NotificationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();

  const [body, setBody] = useState<any>({});

  const getNotificationDetails = async () => {
    await customerService
      .getNotificationDetails(id)
      .then((res) => {
        console.log(res);
        setBody(res?.data?.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getNotificationDetails();
  }, []);
  const toLocalDateFormat = (dateString: string) => {
    const localDate = moment
      .utc(dateString)
      .local()
      .locale("ja")
      .format("YYYY/MM/DD (ddd) HH:mm");
    return localDate;
  };

  const navigateToNotification = () => {
    console.log(body);
    if (body?.category == 1) {
      router.push("/app/home/notification?tab=1");
    } else {
      router.push("/app/home/notification");
    }
  };
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        sx={{ "&:hover": { cursor: "pointer" } }}
        onClick={navigateToNotification}
      >
        <ChevronLeftOutlinedIcon size={16} color={theme.mint.color.text.link} />
        <MintTypography size="body" color={theme.mint.color.text.link}>
          お知らせ一覧に戻る
        </MintTypography>
      </Box>

      {body?.id && (
        <Box
          padding={theme.mint.spacing.m}
          marginTop={theme.mint.spacing.s}
          bgcolor={theme.mint.color.background.containerBg.layer1}
          borderRadius={theme.mint.cornerRadius.s}
          border={`1px solid ${theme.mint.color.border.low}`}
        >
          <Box>
            <MintTypography
              size="head-m"
              color={theme.mint.color.text.high}
              weight="700"
            >
              {body?.title}
            </MintTypography>
          </Box>
          <Box>
            <MintTypography size="caption" color={theme.mint.color.text.medium}>
              {toLocalDateFormat(body?.createdAt)}
            </MintTypography>
          </Box>
          <Box paddingTop={theme.mint.spacing.m}>
            <MintTypography size="body" color={theme.mint.color.text.high}>
              {body?.body}
            </MintTypography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NotificationDetails;
