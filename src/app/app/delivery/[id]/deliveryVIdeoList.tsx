"use client;";

import { MintTypography } from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";
import { IVideo } from "../interface";

const DeliveryVIdeoList = ({
  data,
  selectVideo,
  selectedVideoId,
}: {
  data: IVideo[];
  selectVideo: any;
  selectedVideoId: any;
}) => {
  const theme = useTheme();
  const toLocalDate = (date: string) => {
    return moment.utc(date).local().format("YYYY/MM/DD");
  };

  const getMinutesToSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remaingSeconds = seconds % 60;
    // return `${minutes}:${remaingSeconds}`

    if (hours) {
      return `${hours}:${minutes}:${remaingSeconds}`;
    } else if (minutes) {
      return `${minutes}:${remaingSeconds}`;
    } else {
      return `0:${seconds}`;
    }
  };

  return (
    <Box
      bgcolor={theme.mint.color.background.containerBg.layer1}
      width={"304px"}
      height={"476px"}
      borderRadius={theme.mint.cornerRadius.s}
      padding={`${theme.mint.spacing.s} ${theme.mint.spacing.xxs}`}
    >
      <Box
        height={"100%"}
        overflow={"auto"}
        px={theme.mint.spacing.xxs}
        id="video-list"
      >
        {data.map((res: IVideo) => {
          return (
            <Box
              marginTop={theme.mint.spacing.x3s}
              key={res.recordingId}
              id={res.recordingId}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              height={"48px"}
              display={"flex"}
              onClick={() => selectVideo(res.recordingId)}
              bgcolor={
                selectedVideoId == res.recordingId
                  ? theme.mint.color.surfaceAccent.primary.bright
                  : ""
              }
            >
              <Stack
                width={"100%"}
                px={theme.mint.spacing.xxs}
                justifyContent={"center"}
              >
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
                  <MintTypography weight="700" size="body">
                    {res.monitorName}
                  </MintTypography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <MintTypography
                      color={theme.mint.color.text.low}
                      size="caption"
                    >
                      {getMinutesToSeconds(res.recordingDuration)}分
                    </MintTypography>
                  </Box>
                  <Box>
                    <MintTypography
                      color={theme.mint.color.text.low}
                      size="caption"
                    >
                      {toLocalDate(res.recordingStartTime)}
                    </MintTypography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DeliveryVIdeoList;
