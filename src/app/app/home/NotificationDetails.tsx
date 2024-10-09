"use client";

import { MintBadge, MintTypography, errorToast } from "@/design-system";
import { Box, Divider, ListItem, useTheme } from "@mui/material";
import moment from "moment";
import "moment/locale/ja";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { GetNotificationDetails } from "@/common/types";
import { useDispatch } from "react-redux";
import { actions } from "@/stores/campaign/reducer";
import { customerService } from "@/common/apiUrls";
import { getErrorMessage } from "@/utils";
import { CategoryTypes, NotificationType } from "@/utils/common.data";

const NotificationDetails = ({
  fromHome,
  data,
}: {
  data: GetNotificationDetails;
  fromHome: boolean;
}) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const setIsDrawerOpen = (data: boolean) =>
    dispatch(actions.setIsDrawerOpen(data));
  const setMonitorData = (data: IMonitorData) =>
    dispatch(actions.setMonitorData(data));
  const setValue = (data: number) => dispatch(actions.setValue(data));

  const toLocalDateFormat = (dateString: string) => {
    const localDate = moment
      .utc(dateString)
      .local()
      .locale("ja")
      .format("YYYY/MM/DD (ddd) HH:mm");
    return localDate;
  };

  const handleNotificationSelection = async (
    id: string,
    category: number,
    interviewId: string,
    notificationType: number,
    sender: string
  ) => {
    console.log("clickss");
    console.log(id);
    const individual_notification_types = [
      NotificationType.MONITOR_CHAT,
      NotificationType.MONITOR_CANCELLATION,
      NotificationType.MONITOR_CONFIRMATION,
    ];
    if (category == CategoryTypes.SYSTEM_MESSAGE) {
      router.push("/app/home/notification/" + id);
    } else if (individual_notification_types.includes(notificationType)) {
      await customerService
        .getFilterData(interviewId, { monitorId: data.sender })
        .then((response: any) => {
          const campaignDetails = response?.data?.data;

          const data = response?.data?.data?.monitors?.find(
            ({ id }: { id: string }) => id == sender
          );

          const answers = data?.answer;
          const questions = campaignDetails?.screening?.question;
          const timeslotsList = campaignDetails?.timeslotsList;
          const questionWithAnswer = questions
            ? questions.map((question: any, index: number) => ({
                questionText: question.questionText,
                answer: answers[index],
              }))
            : [];
          setMonitorData({
            campaignId: campaignDetails?.id,
            id: data.id,
            name: data.nickName,
            status: data.monitorStatus,
            confirmedStatus: data?.timeSlotDetails?.consumedStatus,
            answers: questionWithAnswer,
            timeslotsList: timeslotsList,
            monitorDetail: {
              memo: data.memo,
              gender: data.gender,
              age: data.age,
              occupation: data.occupation,
              prefecture: data.prefecture,
            },
            meetingDetails: {
              url: data?.meetingDetails?.link,
              id: data?.meetingDetails?.id,
              passcode: data?.meetingDetails?.passCode,
              meetingId: data?.meetingDetails?.meetingId,
            },
            unreadCount: data?.unreadCount,
            scheduleConfirmationDetails: data?.timeSlotDetails,
          });
          const value = 0;
          setIsDrawerOpen(true);
          setValue(value);
          router.push("/app/campaign/details/" + interviewId);
        })
        .catch((error) => {
          console.log("Error occured: ", error);
          router.push("/app/campaign");
          errorToast(getErrorMessage(error?.response?.data));
        });
    } else {
      router.push("/app/campaign/details/" + interviewId);
    }
  };
  return (
    <>
      <ListItem disablePadding>
        <Box
          display={"flex"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          data-testid={data.id}
          padding={theme.mint.spacing.xxs}
          gap={theme.mint.spacing.xxs}
          onClick={() =>
            handleNotificationSelection(
              data.id,
              data.category,
              data.interviewId,
              data.notificationType,
              data.sender
            )
          }
        >
          <Box visibility={!data.readStatus ? "visible" : "hidden"}>
            <MintBadge color="error" />
          </Box>
          <Box>
            <Box>
              <MintTypography size="head-xs" color={theme.mint.color.text.high}>
                {data?.title}
              </MintTypography>
            </Box>
            {data.category == 2 && (
              <Box
                sx={{
                  display: "-webkit-box",
                  "-webkit-box-orient": "vertical",
                  "-webkit-line-clamp": "1",
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  lineBreak: "anywhere",
                }}
              >
                <MintTypography
                  size="caption"
                  color={theme.mint.color.text.medium}
                  sx={{ width: "100%" }}
                >
                  {fromHome && `${t("notification.interviewTitle")} : `}
                  {data?.interviewTitle}
                </MintTypography>
              </Box>
            )}

            <Box>
              <MintTypography
                size="caption"
                color={theme.mint.color.text.medium}
              >
                {toLocalDateFormat(data?.createdAt)}
              </MintTypography>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default NotificationDetails;
