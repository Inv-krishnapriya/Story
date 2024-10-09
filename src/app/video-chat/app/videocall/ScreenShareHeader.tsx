import { IRemoteProfile } from "@/common/types";
import { MintButton, MintTypography, PCOutlinedIcon } from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { updateScreenCreatorStatus } from "@/stores/videocall/reducer";
import { VideoCallUserType } from "@/utils/common.data";
import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface IScreenSahreHeaderProps {
  remoteUsersInfo: IRemoteProfile[];
  isCreator: boolean;
}

export default function ScreenShareHeader(
  props: Readonly<IScreenSahreHeaderProps>
) {
  const { remoteUsersInfo, isCreator } = props;
  const [isScreenShareVideoVisible, setIsScreenShareVideoVisible] =
    useState<boolean>(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleStopScreenSharing = () => {
    dispatch(updateScreenCreatorStatus(false));
  };

  const screenUser = remoteUsersInfo.filter(
    (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
  )?.[0];

  const remoteUsers = useSelector(
    (state: RootState) => state.videocall.remoteUsers
  );

  const userType = useSelector(
    (state: RootState) => state.videocall.meetingData.userType
  );

  const isDrawerOpen = useSelector(
    (state: RootState) => state.videocall.videoCallParams.isDrawerOpened
  );

  useEffect(() => {
    let isScreenShareVideoVisible = remoteUsers
      .filter((item) => item.uid.toString() === screenUser.agoraUserId)
      .map((item) => item.videoTrack !== undefined)?.[0];

    setIsScreenShareVideoVisible(isScreenShareVideoVisible);
  }, []);

  console.log("isScreenShareVideoVisible :", isScreenShareVideoVisible);

  return (
    <Box
      id="mainContainer"
      sx={{
        display: "flex",
        padding: "0px 8px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        alignSelf: "stretch",
        background: "#F5F6F6",
        width: isDrawerOpen ? `calc(100% - 376px)` : "unset",
      }}
    >
      {
        <Box
          id="container"
          sx={{
            display: "flex",
            padding: "8px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: "4px",
            background:
              userType === VideoCallUserType.BACKROOM_MEMBER
                ? theme.mint.color.surfaceAccent.primary.bright
                : `rgba(10, 24, 38, 0.15)`,
          }}
        >
          <Box
            id="info"
            sx={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <PCOutlinedIcon />
            <MintTypography size="body" weight="500" color={"#000"}>
              {remoteUsersInfo
                .filter(
                  (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
                )
                .map((item) => item.displayName)}
              {t("screenshare-header.is-their-screen-shared")}
            </MintTypography>
          </Box>
          {isCreator && (
            <Box id="action">
              <MintButton
                variant="contained"
                size="small"
                sx={{ height: "32px" }}
                onClick={handleStopScreenSharing}
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={theme.mint.color.text.highInverse}
                >
                  {t("screenshare-header.stop-screen-sharing")}
                </MintTypography>
              </MintButton>
            </Box>
          )}
        </Box>
      }
    </Box>
  );
}
