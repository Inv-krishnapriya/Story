"use client";
import {
  CalendarOutlinedIcon,
  ClockOutlinedIcon,
  EllipseIcon,
  MintButton,
  MintTypography,
} from "@/design-system";
import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import VideoCallDuration from "./VideoCallDuration";
import UserLeaveModal from "./modal/UserLeaveModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { VideoCallUserType } from "@/utils/common.data";
import { useTranslation } from "react-i18next";

interface IVideoCallHeaderProps {
  meetingData: any;
  handleUserLeft: () => void;
  isUserLeft: boolean;
}

export default function VideoCallHeader(props: IVideoCallHeaderProps) {
  const { meetingData, handleUserLeft, isUserLeft } = props;
  const channelInfo = useSelector(
    (state: RootState) => state.videocall.meetingData
  );
  const interviewInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );
  const theme = useTheme();
  const { t } = useTranslation();
  const [isUserLefts, setIsUserLefts] = useState<boolean>(false);
  const recordingStatus: any = useSelector(
    (state: RootState) => state.videocall.isRecording
  );

  console.log("Recording status from header: ", recordingStatus);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "8px 16px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        background: theme.mint.color.background.uiBackground,
      }}
      id="interviewHeader"
    >
      <Box
        id="basicInfo"
        sx={{
          display: "flex",
          padding: 0,
          alignItems: "center",
          gap: "12px",
        }}
      >
        {recordingStatus && (
          <Box
            id="recordingIcon"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "2px",
                alignItems: "flex-start",
                borderRadius: "999px",
                border: `1px solid rgba(10, 24, 38, 0.26)`,
              }}
            >
              <EllipseIcon />
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.text.high}
            >
              {t("video-call-header.recording")}
            </MintTypography>
          </Box>
        )}
        <Box id="userType" sx={{ display: "flex", alignItems: "flex-start" }}>
          <Box
            sx={{
              display: "flex",
              height: "28px",
              padding: "4px 8px",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              background:
                channelInfo.userType === VideoCallUserType.INTERVIEWER
                  ? "#2D45BA"
                  : "#1F784F",
            }}
          >
            {channelInfo.userType === VideoCallUserType.INTERVIEWER ? (
              <MintTypography
                size="body"
                weight="500"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-header.interviewer")}
              </MintTypography>
            ) : (
              <MintTypography
                size="body"
                weight="500"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-header.back-room")}
              </MintTypography>
            )}
          </Box>
        </Box>
        <Box
          id="campaignTitle"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MintTypography
            size="head-m"
            weight="700"
            color={theme.mint.color.text.high}
          >
            {meetingData.campaignTitle}
          </MintTypography>
        </Box>
      </Box>
      <Box
        id="meetingInfo"
        sx={{
          display: "flex",
          padding: 0,
          alignItems: "center",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Box
            id="dateInfo"
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <CalendarOutlinedIcon size={16} />
                <MintTypography
                  size="caption"
                  weight="400"
                  color={theme.mint.color.text.high}
                >
                  {t("video-call-header.implementation-date")}
                </MintTypography>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.high}
              >
                {meetingData.implementationPeriod}
              </MintTypography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              id="timeInfo"
              sx={{
                display: "flex",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: 0,
                    alignItems: "flex-start",
                    gap: "4px",
                  }}
                >
                  <ClockOutlinedIcon size={16} />
                  <MintTypography
                    size="caption"
                    weight="400"
                    color={theme.mint.color.text.high}
                  >
                    {t("video-call-header.implementation-time")}
                  </MintTypography>
                </Box>
                <MintTypography size="caption" weight="400">
                  {meetingData.interviewDuration}分
                </MintTypography>
              </Box>
              <Box
                sx={{
                  width: "1px",
                  height: "16px",
                  background: theme.mint.color.border.medium,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "center",
                gap: "12px",
              }}
            >
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.high}
              >
                {t("video-call-header.elapsed-time")}
              </MintTypography>
              <VideoCallDuration
                startTime={interviewInfo.startTime}
                duration={meetingData.interviewDuration}
              />
            </Box>
          </Box>
        </Box>

        <MintButton
          sx={{
            "&.MuiButton-containedPrimary": {
              backgroundColor: theme.mint.color.system.error.error,
              ":hover": {
                background: theme.mint.color.system.error.hover,
              },
            },

            display: "flex",
            height: "40px",
            padding: "12px",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,

            borderRadius: 1,
          }}
          onClick={() => setIsUserLefts(true)}
        >
          <MintTypography
            size="body"
            weight="500"
            color={theme.mint.color.text.highInverse}
          >
            {t("video-call-header.exit")}
          </MintTypography>
        </MintButton>
      </Box>
      {isUserLefts && (
        <UserLeaveModal
          open={isUserLefts}
          onClose={() => setIsUserLefts(false)}
          onAgree={handleUserLeft}
          isUserLeft={isUserLeft}
        />
      )}
    </Box>
  );
}
