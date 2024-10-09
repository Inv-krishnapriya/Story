"use client";
import { LightDoorIcon, MintButton, MintTypography } from "@/design-system";
import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedbackModal from "./modal/FeedbackModal";
import ReportModal from "./modal/ReportModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function UserLeftScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isReport, setIsReport] = useState<boolean>(false);
  const { startTime, endTime } = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const isMeetingJoinDisabled = () => {
    if (!startTime || !endTime) return true;

    const startsAtLocal = moment(startTime).subtract(5, "minutes");
    const endsAtLocal = moment(endTime);
    const isBetween = moment().isBetween(startsAtLocal, endsAtLocal);

    return !isBetween;
  };

  const meetingData = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const feedBackDone = useSelector(
    (state: RootState) => state.videocall.feedbackStatus
  );
  const reportDone = useSelector(
    (state: RootState) => state.videocall.reportStatus
  );

  const handleRejoin = () => {
    router.push("/video-chat/app/meeting");
  };

  const handlePopstate = (event: PopStateEvent) => {
    event.preventDefault();
    if (meetingData?.campaignId !== undefined) {
      router.push(`/app/campaign/details/${meetingData.campaignId}`);
    } else if (meetingData.campaignId === undefined) {
      router.push(`/video-chat/auth/login?meetingId=${meetingData.meetingId}`);
    }
  };
  window.addEventListener("popstate", handlePopstate);

  useEffect(() => {
    if (!feedBackDone && meetingData?.campaignId !== undefined) {
      setIsFeedbackOpen(true);
    }
  }, []);

  const handleWindowClose = () => {
    if (meetingData?.campaignId !== undefined) {
      // router.push(`/app/campaign/details/${meetingData.campaignId}`);
      window.close();
    } else if (meetingData?.campaignId === undefined) {
      // router.push(`/video-chat/auth/login?meetingId=${meetingData.meetingId}`);
      window.close();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "40px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: "8px 0px 0px",
        alignSelf: "stretch",
        background: theme.mint.color.background.uiBackground,
      }}
    >
      <Box
        id="interviewExit"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <Box
          id="content"
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            alignSelf: "stretch",
          }}
        >
          <LightDoorIcon size={63.996} />
          <Box
            id="heading"
            sx={{
              display: "flex",
              padding: "8px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              alignSelf: "stretch",
            }}
          >
            <MintTypography
              size="head-l"
              weight="700"
              color={theme.mint.color.text.high}
            >
              {t("leave-call.left-interview-room")}
            </MintTypography>
          </Box>
        </Box>
        <Box
          id="action"
          sx={{
            display: "flex",
            padding: 0,
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 1,
            alignSelf: "stretch",
          }}
        >
          {!isMeetingJoinDisabled() && (
            <MintButton
              variant="text"
              sx={{
                display: "flex",
                height: "40px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                borderRadius: 1,
              }}
              onClick={handleRejoin}
            >
              <MintTypography
                size="body"
                weight="500"
                color={theme.mint.color.text.accent}
              >
                {t("leave-call.re-enter")}
              </MintTypography>
            </MintButton>
          )}
          <Box
            sx={{
              display: "flex",
              padding: 0,
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MintButton
              sx={{ height: "40px", padding: "12px" }}
              onClick={handleWindowClose}
              data-testid="handle-close"
            >
              <MintTypography size="body" weight="500">
                {t("leave-call.close-screen")}
              </MintTypography>
            </MintButton>
          </Box>
        </Box>
      </Box>
      {meetingData?.campaignId !== undefined && (
        <Box
          id="interviewReport"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MintTypography size="caption" weight="500">
              {t("leave-call.run-into-problems")}
            </MintTypography>
            <Box
              sx={{
                display: "flex",
                padding: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MintButton
                disabled={reportDone}
                sx={{
                  height: "40px",
                  borderRadius: 1,
                  border: `1px solid ${theme.mint.color.system.error.error}`,
                  "&.MuiButton-containedPrimary": {
                    background: theme.mint.color.surfaceGray.componentBg.bg,
                    ":hover": {
                      background: theme.mint.color.system.error.brightHover,
                    },
                  },
                }}
                onClick={() => setIsReport(true)}
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={theme.mint.color.system.error.error}
                >
                  {t("leave-call.report-problem")}
                </MintTypography>
              </MintButton>
            </Box>
          </Box>
        </Box>
      )}
      {isFeedbackOpen && !feedBackDone && (
        <FeedbackModal
          open={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      )}
      {isReport && !reportDone && (
        <ReportModal open={isReport} onClose={() => setIsReport(false)} />
      )}
    </Box>
  );
}
