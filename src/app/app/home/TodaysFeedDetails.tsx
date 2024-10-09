"use client";
import { customerService } from "@/common/apiUrls";
import { GetTodaysCampaignDetails } from "@/common/types";
import { MintTypography, errorToast } from "@/design-system";
import { Box, useTheme } from "@mui/material";
import moment from "moment";
import { actions } from "@/stores/campaign/reducer";

import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "@/utils";

const TodaysFeedDetails = ({ data }: { data: GetTodaysCampaignDetails }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const setMonitorData = (data: IMonitorData) =>
    dispatch(actions.setMonitorData(data));

  const setIsDrawerOpen = (data: boolean) =>
    dispatch(actions.setIsDrawerOpen(data));
  const setValue = (data: number) => dispatch(actions.setValue(data));

  const toLocalTime = (startsAt: string, endsAt: string) => {
    const localStartsAt = moment.utc(startsAt).local().format("HH:mm");
    const localEndsAt = moment.utc(endsAt).local().format("HH:mm");

    return `${localStartsAt}-${localEndsAt}`;
  };
  const goToScheduleDetails = async (
    interviewId: string,
    monitorId: string
  ) => {
    await customerService
      .getFilterData(interviewId, { monitorId: monitorId })
      .then((response: any) => {
        const campaignDetails = response?.data?.data;

        const data = response?.data?.data?.monitors?.find(
          ({ id }: { id: string }) => id == monitorId
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
        const value = 1;
        setIsDrawerOpen(true);
        setValue(value);
        router.push("/app/campaign/details/" + interviewId);
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        router.push("/app/campaign");
        errorToast(getErrorMessage(error?.response?.data));
      });
  };
  return (
    <Box
      onClick={() => goToScheduleDetails(data?.id, data?.monitorId)}
      data-testid="go-to-schedule"
      sx={{
        background: theme.mint.color.background.containerBg.layer2,
        borderRadius: `${theme.mint.cornerRadius.s}px`,
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box
        padding={theme.mint.spacing.xxs}
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        gap={theme.mint.spacing.xxs}
      >
        <Box
          sx={{
            minWidth: "72px",
          }}
        >
          <MintTypography
            width={"100%"}
            size="caption"
            color={theme.mint.color.text.accent}
            weight="700"
          >
            {toLocalTime(data.startsAt, data.endsAt)}
          </MintTypography>
        </Box>

        <Box width={"100%"}>
          <Box>
            <MintTypography size="body" color={theme.mint.color.text.high}>
              {data.nickName}
            </MintTypography>
          </Box>
          <Box
            sx={{
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "1",
              overflow: "hidden",
              "text-overflow": "ellipsis",
            }}
          >
            <MintTypography size="caption" color={theme.mint.color.text.medium}>
              {data.title}
            </MintTypography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TodaysFeedDetails;
