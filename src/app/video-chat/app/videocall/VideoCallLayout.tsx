import { TCurrentUserProfile } from "@/common/types";
import { MicIcon, MicOffIcon, MintTypography } from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { findUserRole, getUserName } from "@/utils";
import { UserType, VideoCallUserType } from "@/utils/common.data";
import { Box, useTheme } from "@mui/material";
import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  LocalVideoTrack,
  RemoteUser,
  TrackBoundary,
} from "agora-rtc-react";
import React, { forwardRef, useRef } from "react";
import { useSelector } from "react-redux";

interface IVideoCallLayoutProps {
  userName: string;
  localVideoTrack: ICameraVideoTrack | null;
  localAudioTrack: IMicrophoneAudioTrack | null;
  currentUser: TCurrentUserProfile | undefined;
}

const VideoCallLayout = forwardRef(
  (
    {
      userName,
      localVideoTrack,
      localAudioTrack,
      currentUser,
    }: IVideoCallLayoutProps,
    ref: any
  ) => {
    const theme = useTheme();
    const videoRef = useRef<HTMLDivElement>(null);
    console.log("layout ref : ", videoRef);

    const isDrawerOpen = useSelector(
      (state: RootState) => state.videocall.videoCallParams.isDrawerOpened
    );

    const controls = useSelector(
      (state: RootState) => state.videocall.controls
    );

    const remoteUsersInfo = useSelector(
      (state: RootState) => state.videocall.remoteUsersInfo
    );
    const remoteUsers = useSelector(
      (state: RootState) => state.videocall.remoteUsers
    );
    const isFullScreen = useSelector(
      (state: RootState) => state.videocall.isFullscreen
    );

    console.log(
      "Remote data from videoCallLayout :",
      remoteUsers,
      remoteUsersInfo,
      localAudioTrack,
      localVideoTrack,
      ref
    );

    const isScreenShareUSerExist = remoteUsersInfo.filter(
      (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
    ).length;

    const shareUser = remoteUsersInfo.filter(
      (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
    )?.[0];

    console.log(
      "Screen share user exist from videoCallLayout : ",
      isScreenShareUSerExist
    );

    const roleOrder: Record<string, number> = { "1": 0, "0": 1 };

    return (
      <TrackBoundary>
        <Box
          id="videocallMain"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            gap: 1,
            flex: "8px 0px 0px",
            alignSelf: "stretch",
            background: theme.mint.color.background.uiBackground,
            width: isDrawerOpen
              ? `calc(100% - 376px)`
              : remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length <= 5
                ? `calc(100% - 0px)`
                : "100%",
            pt: isDrawerOpen
              ? "10px"
              : (remoteUsers.length === 0 &&
                    currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER) ||
                  (remoteUsers.length === 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.MONITOR
                    ).length === 1)
                ? 16
                : "4px",
            pb: isDrawerOpen
              ? "10px"
              : (remoteUsers.length === 0 &&
                    currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER) ||
                  (remoteUsers.length === 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.MONITOR
                    ).length === 1)
                ? 16
                : "78px",
            flexGrow: 1,
            flexDirection:
              remoteUsersInfo?.filter(
                (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
              ).length > 0
                ? "row"
                : isDrawerOpen
                  ? "column"
                  : "row",
            px: "8px",
          }}
        >
          {remoteUsers?.length > 0 &&
            remoteUsers!?.map(
              (user, index) =>
                ((remoteUsers.length === 1 &&
                  (findUserRole(user.uid.toString(), remoteUsersInfo) ===
                    VideoCallUserType.MONITOR ||
                    findUserRole(user.uid.toString(), remoteUsersInfo) ===
                      VideoCallUserType.SCREEN_SHARE_USER)) ||
                  (remoteUsers.length > 1 &&
                    (isScreenShareUSerExist > 0
                      ? findUserRole(user.uid.toString(), remoteUsersInfo) ===
                        VideoCallUserType.SCREEN_SHARE_USER
                      : findUserRole(user.uid.toString(), remoteUsersInfo) ===
                        VideoCallUserType.MONITOR))) && (
                  <Box
                    key={user?.uid?.toString()}
                    id={user?.uid?.toString()}
                    sx={{
                      width:
                        (remoteUsers.length === 1 &&
                          remoteUsersInfo?.filter(
                            (item) =>
                              item.role !== VideoCallUserType.SCREEN_SHARE_USER
                          ).length === 1) ||
                        (remoteUsersInfo?.filter(
                          (item) =>
                            item.role !== VideoCallUserType.BACKROOM_MEMBER
                        ).length === 1 &&
                          remoteUsersInfo?.filter(
                            (item) =>
                              item.role === VideoCallUserType.SCREEN_SHARE_USER
                          ).length === 0)
                          ? isDrawerOpen
                            ? "517px"
                            : "620px"
                          : isDrawerOpen
                            ? remoteUsersInfo?.filter(
                                (item) =>
                                  item.role ===
                                  VideoCallUserType.SCREEN_SHARE_USER
                              ).length > 0
                              ? remoteUsersInfo?.filter(
                                  (item) =>
                                    item.role === VideoCallUserType.INTERVIEWER
                                ).length <= 4
                                ? "100%"
                                : "73%"
                              : "100%"
                            : remoteUsersInfo?.filter(
                                  (item) =>
                                    item.role === VideoCallUserType.INTERVIEWER
                                ).length > 4
                              ? `calc(100% - 376px)`
                              : `calc(100% - 200px)`,
                      height:
                        (remoteUsers.length === 1 &&
                          remoteUsersInfo?.filter(
                            (item) =>
                              item.role !== VideoCallUserType.SCREEN_SHARE_USER
                          ).length === 1) ||
                        (remoteUsersInfo?.filter(
                          (item) =>
                            item.role !== VideoCallUserType.BACKROOM_MEMBER
                        ).length === 1 &&
                          remoteUsersInfo?.filter(
                            (item) =>
                              item.role === VideoCallUserType.SCREEN_SHARE_USER
                          ).length === 0)
                          ? isDrawerOpen
                            ? "50%"
                            : "349px"
                          : "100%",
                      position: "relative",
                      paddingTop:
                        remoteUsers.length > 1 && !isDrawerOpen
                          ? remoteUsersInfo?.filter(
                              (item) =>
                                item.role === VideoCallUserType.INTERVIEWER
                            ).length > 4
                            ? 8
                            : "8px"
                          : "unset",
                      paddingBottom:
                        remoteUsers.length > 1 && !isDrawerOpen
                          ? remoteUsersInfo?.filter(
                              (item) =>
                                item.role === VideoCallUserType.INTERVIEWER
                            ).length > 4
                            ? 12
                            : "10px"
                          : "unset",
                      px:
                        remoteUsers.length > 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role !== VideoCallUserType.BACKROOM_MEMBER
                        ).length > 1
                          ? isDrawerOpen
                            ? remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length >= 4
                              ? remoteUsersInfo?.filter(
                                  (item) =>
                                    item.role ===
                                    VideoCallUserType.SCREEN_SHARE_USER
                                ).length > 0
                                ? "unset"
                                : 16
                              : remoteUsersInfo?.filter(
                                    (item) =>
                                      item.role ===
                                      VideoCallUserType.SCREEN_SHARE_USER
                                  ).length > 0
                                ? "unset"
                                : "64px"
                            : "4px"
                          : "unset",
                    }}
                  >
                    <RemoteUser
                      style={{
                        borderRadius: "8px",
                        backgroundColor: user.hasVideo ? "unset" : "#8C9399",
                        background: user.hasVideo ? "unset" : "#8C9399",
                      }}
                      playVideo={user.videoTrack !== undefined ? true : false}
                      playAudio
                      user={user}
                      id={
                        findUserRole(user?.uid?.toString(), remoteUsersInfo) ===
                        VideoCallUserType.MONITOR
                          ? "monitor"
                          : `others${index}`
                      }
                    />

                    {findUserRole(user.uid.toString(), remoteUsersInfo) ===
                      VideoCallUserType.MONITOR && (
                      <Box
                        id="othersname"
                        sx={{
                          maxWidth: "150px",
                          display: "flex",
                          width: "fit-content",
                          height: "26.357px",
                          padding: "4px",
                          alignItems: "center",
                          flexShrink: 0,
                          borderRadius: "2px",
                          background: theme.mint.color.extendedColors.gray.ex4,
                          position: "absolute",
                          bottom:
                            !isDrawerOpen && remoteUsers.length > 1
                              ? remoteUsersInfo?.filter(
                                  (item) =>
                                    item.role === VideoCallUserType.INTERVIEWER
                                ).length > 4
                                ? "96px"
                                : "10px"
                              : 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Box
                          id="monitorMicIcon"
                          sx={{
                            display: "flex",
                            height: "12px",
                            padding: "0.27px 2.4px 0.573px 2.4px",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          {user?.hasAudio ? (
                            <MicIcon size={16} color="white" fillOpacity={1} />
                          ) : (
                            <MicOffIcon
                              size={12}
                              color="white"
                              fillOpacity={1}
                            />
                          )}
                        </Box>
                        <MintTypography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          size="caption"
                          weight="400"
                          color={theme.mint.color.text.fixedWhite}
                        >
                          {getUserName(user?.uid?.toString(), remoteUsersInfo)}
                        </MintTypography>
                      </Box>
                    )}
                  </Box>
                )
            )}
          {/* nomonitor */}
          {((remoteUsers.length > 0 &&
            remoteUsersInfo.filter(
              (item) => item.role === VideoCallUserType.MONITOR
            ).length === 0) ||
            remoteUsers.length === 0) && (
            <Box
              id="nomonitor"
              sx={{
                display:
                  remoteUsersInfo.filter(
                    (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
                  ).length > 0
                    ? "none"
                    : remoteUsersInfo.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length > 0
                      ? "flex"
                      : "unset",
                flex:
                  remoteUsersInfo.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length > 0
                    ? 1
                    : "unset",
                width:
                  (remoteUsers.length > 0 &&
                    remoteUsersInfo.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length === 0) ||
                  (remoteUsers.length === 0 &&
                    currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER)
                    ? isDrawerOpen
                      ? "517px"
                      : "620px"
                    : isDrawerOpen
                      ? "100%"
                      : remoteUsersInfo.filter(
                            (item) =>
                              item.role === VideoCallUserType.INTERVIEWER
                          ).length <= 6
                        ? `calc(100% - 188px)`
                        : `calc(100% - 376px)`,
                height:
                  ((remoteUsers.length > 0 &&
                    remoteUsersInfo.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length === 0) ||
                    remoteUsers.length === 0) &&
                  isDrawerOpen &&
                  currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER
                    ? "50%"
                    : remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length === 0 &&
                        currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER
                      ? "349px"
                      : "100%",
                position: "relative",
                paddingTop:
                  remoteUsers.length > 1 &&
                  !isDrawerOpen &&
                  remoteUsersInfo.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length >= 4
                    ? 8
                    : "unset",
                paddingBottom:
                  remoteUsers.length > 1 &&
                  !isDrawerOpen &&
                  remoteUsersInfo.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length >= 4
                    ? 12
                    : "unset",
                px:
                  remoteUsers.length > 1
                    ? isDrawerOpen
                      ? 16
                      : "4px"
                    : "unset",
                background: "#8C9399",
                borderRadius: "8px",
              }}
            >
              <Box
                id="othersname"
                sx={{
                  display: "flex",
                  width: "106.051px",
                  height: "26.357px",
                  padding: "4px",
                  alignItems: "center",
                  flexShrink: 0,
                  borderRadius: "2px",
                  background: theme.mint.color.extendedColors.gray.ex4,
                  position: "absolute",
                  bottom:
                    !isDrawerOpen &&
                    remoteUsers.length > 1 &&
                    remoteUsersInfo.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length >= 5 &&
                    remoteUsersInfo.filter(
                      (item) => item.role === VideoCallUserType.MONITOR
                    ).length === 1
                      ? "96px"
                      : 0,
                  whiteSpace: "nowrap",
                  left: 0,
                }}
              >
                <Box
                  id="monitorMicIcon"
                  sx={{
                    display: "flex",
                    height: "12px",
                    padding: "0.27px 2.4px 0.573px 2.4px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <MicIcon size={16} color="white" fillOpacity={1} />
                </Box>
                <MintTypography
                  size="caption"
                  weight="400"
                  color={theme.mint.color.text.fixedWhite}
                >
                  未入室
                </MintTypography>
              </Box>
            </Box>
          )}

          {/* others */}
          {remoteUsersInfo?.filter(
            (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
          ).length === 0 ? (
            <Box
              id="others"
              sx={{
                display:
                  isFullScreen ||
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
                  ).length > 0
                    ? "none"
                    : remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length >= 5 && isDrawerOpen
                      ? "grid"
                      : "flex",
                alignSelf:
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length > 0 &&
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length <= 4 &&
                  !isDrawerOpen
                    ? "flex-start"
                    : "auto",
                gridTemplateColumns: isDrawerOpen ? "repeat(5, 1fr)" : "unset",
                gridTemplateRows: isDrawerOpen ? "unset" : "repeat(5,1fr)",
                flexDirection: isDrawerOpen ? "row" : "column",
                flexWrap: "wrap",
                justifyContent:
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length >= 5
                    ? "flex-start"
                    : isDrawerOpen
                      ? "center"
                      : "flex-start",
                gap: 1,
                height:
                  remoteUsers?.length === 1 ||
                  remoteUsers.length === 0 ||
                  remoteUsersInfo?.filter(
                    (item) => item.role !== VideoCallUserType.BACKROOM_MEMBER
                  ).length === 1 ||
                  (remoteUsers.length > 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length === 0)
                    ? isDrawerOpen
                      ? "unset"
                      : "349px"
                    : remoteUsers?.length > 1
                      ? isDrawerOpen
                        ? "unset"
                        : "unset"
                      : "100%",
                maxHeight: "615px",
                flexGrow:
                  (remoteUsers?.length === 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role !== VideoCallUserType.BACKROOM_MEMBER
                    ).length === 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length === 0) ||
                  (remoteUsers.length >= 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.BACKROOM_MEMBER
                    ).length >= 1 &&
                    remoteUsersInfo?.filter(
                      (item) => item.role === VideoCallUserType.INTERVIEWER
                    ).length === 0) ||
                  remoteUsers.length === 0
                    ? isDrawerOpen
                      ? 1
                      : 0
                    : 0,
                width: isDrawerOpen
                  ? "100%"
                  : remoteUsersInfo?.filter(
                        (item) => item.role === VideoCallUserType.INTERVIEWER
                      ).length > 4
                    ? "374px"
                    : remoteUsers?.length === 1 || remoteUsers.length === 0
                      ? "unset"
                      : "unset",
                padding: remoteUsers.length > 1 ? "10px" : "unset",
              }}
            >
              {remoteUsers?.length >= 1 &&
                (remoteUsersInfo?.filter(
                  (item) => item.role === VideoCallUserType.INTERVIEWER
                ).length >= 1 ||
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length === 1 ||
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.MONITOR
                  ).length === 1) &&
                remoteUsers!?.map(
                  (user, index) =>
                    (isScreenShareUSerExist > 0
                      ? findUserRole(user.uid.toString(), remoteUsersInfo) ===
                          VideoCallUserType.INTERVIEWER ||
                        findUserRole(user.uid.toString(), remoteUsersInfo) ===
                          VideoCallUserType.MONITOR
                      : findUserRole(user.uid.toString(), remoteUsersInfo) ===
                        VideoCallUserType.INTERVIEWER) && (
                      <Box
                        key={user?.uid.toString()}
                        id={user?.uid.toString()}
                        sx={{
                          width:
                            remoteUsersInfo?.filter(
                              (item) =>
                                item.role === VideoCallUserType.INTERVIEWER
                            ).length >= 5 && isDrawerOpen
                              ? "100%"
                              : "174px",
                          height: "98px",
                          position: "relative",
                          flexGrow: isDrawerOpen
                            ? remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length > 4
                              ? 1
                              : 0
                            : 0,
                          flexBasis: isDrawerOpen
                            ? remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length > 4
                              ? `calc(20% - 10px)`
                              : "unset"
                            : "unset",
                        }}
                      >
                        <RemoteUser
                          style={{
                            borderRadius: "8px",
                            background: user.hasVideo ? "unset" : "#8C9399",
                          }}
                          playVideo
                          user={user}
                          id={
                            findUserRole(
                              user.uid.toString(),
                              remoteUsersInfo
                            ) === VideoCallUserType.MONITOR
                              ? "monitor"
                              : `others${index}`
                          }
                        />
                        <Box
                          id="othersname"
                          sx={{
                            maxWidth: "150px",
                            display: "flex",
                            width: "fit-content",
                            height: "26.357px",
                            padding: "4px",
                            alignItems: "center",
                            flexShrink: 0,
                            borderRadius: "2px",
                            background:
                              theme.mint.color.extendedColors.gray.ex4,
                            position: "absolute",
                            bottom: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Box
                            id="monitorMicIcon"
                            sx={{
                              display: "flex",
                              height: "12px",
                              padding: "0.27px 2.4px 0.573px 2.4px",
                              justifyContent: "center",
                              alignItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            {user?.hasAudio ? (
                              <MicIcon
                                size={16}
                                color="white"
                                fillOpacity={1}
                              />
                            ) : (
                              <MicOffIcon
                                size={12}
                                color="white"
                                fillOpacity={1}
                              />
                            )}
                          </Box>
                          <MintTypography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            size="caption"
                            weight="400"
                            color={theme.mint.color.text.fixedWhite}
                          >
                            {getUserName(user.uid.toString(), remoteUsersInfo)}
                          </MintTypography>
                        </Box>
                      </Box>
                    )
                )}

              {currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER && (
                <Box
                  ref={ref}
                  id="interviewerContainer"
                  sx={{
                    backgroundColor: localVideoTrack?.enabled
                      ? "unset"
                      : "#8C9399",
                    width:
                      (remoteUsersInfo?.filter(
                        (item) => item.role === VideoCallUserType.MONITOR
                      ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role === VideoCallUserType.SCREEN_SHARE_USER
                        ).length === 0 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length === 0) ||
                      (remoteUsersInfo?.filter(
                        (item) =>
                          item.role === VideoCallUserType.SCREEN_SHARE_USER
                      ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role !== VideoCallUserType.BACKROOM_MEMBER
                        ).length === 1) ||
                      remoteUsersInfo?.filter(
                        (item) =>
                          item.role !== VideoCallUserType.BACKROOM_MEMBER
                      ).length === 0 ||
                      remoteUsers.length === 0
                        ? isDrawerOpen
                          ? "517px"
                          : "620px"
                        : (remoteUsers.length >= 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length >= 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length <= 4) ||
                            (remoteUsers.length > 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.MONITOR
                              ).length === 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role ===
                                  VideoCallUserType.SCREEN_SHARE_USER
                              ).length === 1)
                          ? "174px"
                          : isDrawerOpen
                            ? "100%"
                            : "174px",
                    height:
                      (remoteUsersInfo?.filter(
                        (item) => item.role === VideoCallUserType.MONITOR
                      ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role === VideoCallUserType.SCREEN_SHARE_USER
                        ).length === 0 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length === 0) ||
                      (remoteUsersInfo?.filter(
                        (item) =>
                          item.role === VideoCallUserType.SCREEN_SHARE_USER
                      ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role !== VideoCallUserType.BACKROOM_MEMBER
                        ).length === 1) ||
                      remoteUsersInfo?.filter(
                        (item) =>
                          item.role !== VideoCallUserType.BACKROOM_MEMBER
                      ).length === 0 ||
                      remoteUsers.length === 0
                        ? isDrawerOpen
                          ? "100%"
                          : "100%"
                        : (remoteUsers.length >= 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length >= 1) ||
                            (remoteUsers.length > 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.MONITOR
                              ).length === 1 &&
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role ===
                                  VideoCallUserType.SCREEN_SHARE_USER
                              ).length === 1)
                          ? "98px"
                          : "100%",
                    position: "relative",
                    borderRadius: 1,
                    flexGrow: isDrawerOpen
                      ? remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length > 4
                        ? 1
                        : 0
                      : 0,
                  }}
                >
                  <LocalVideoTrack
                    play={localVideoTrack! ? true : false}
                    style={{
                      borderRadius: "8px",
                      backgroundColor: localVideoTrack?.enabled
                        ? `unset`
                        : "#8C9399",
                      display: localVideoTrack?.enabled ? "flex" : "none",
                    }}
                    id="interviewer"
                    track={localVideoTrack}
                    className="w-full h-full"
                  />

                  <Box
                    id="interviewername"
                    sx={{
                      maxWidth: "150px",
                      display: "flex",
                      width: "fit-content",
                      height: "26.357px",
                      padding: "4px",
                      alignItems: "center",
                      flexShrink: 0,
                      borderRadius: "2px",
                      background: theme.mint.color.extendedColors.gray.ex4,
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <Box
                      id="monitorMicIcon"
                      sx={{
                        display: "flex",
                        width: "maxContent",
                        height: "12px",
                        padding: "0.27px 2.4px 0.573px 2.4px",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {controls.micStatus ? (
                        <MicIcon size={16} color="white" fillOpacity={1} />
                      ) : (
                        <MicOffIcon size={12} color="white" fillOpacity={1} />
                      )}
                    </Box>
                    <Box
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <MintTypography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        size="caption"
                        weight="400"
                        color={theme.mint.color.text.fixedWhite}
                      >
                        {userName}
                      </MintTypography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box
              id="screenshare_others"
              sx={{
                display:
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
                  ).length > 0 && !isFullScreen
                    ? "flex"
                    : "none",
                alignSelf: "flex-start",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent:
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length >= 5
                    ? "flex-start"
                    : isDrawerOpen
                      ? "flex-start"
                      : "flex-start",
                gap: 1,
                height: "unset",
                maxHeight: "615px",
                width:
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length > 4
                    ? "374px"
                    : remoteUsers?.length === 1
                      ? "174px"
                      : (remoteUsers.length > 0 &&
                            remoteUsersInfo?.filter(
                              (item) =>
                                item.role !== VideoCallUserType.BACKROOM_MEMBER
                            ).length <= 4) ||
                          remoteUsersInfo?.filter(
                            (item) =>
                              item.role !== VideoCallUserType.SCREEN_SHARE_USER
                          ).length <= 4
                        ? isDrawerOpen
                          ? "unset"
                          : "unset"
                        : "unset",
                padding: remoteUsers.length > 1 ? "10px" : "unset",
              }}
            >
              {remoteUsers?.length >= 1 &&
                (remoteUsersInfo?.filter(
                  (item) => item.role === VideoCallUserType.INTERVIEWER
                ).length >= 1 ||
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.INTERVIEWER
                  ).length === 1 ||
                  remoteUsersInfo?.filter(
                    (item) => item.role === VideoCallUserType.MONITOR
                  ).length === 1) &&
                [...remoteUsers]
                  ?.sort(
                    (a, b) =>
                      roleOrder[
                        findUserRole(a.uid.toString(), remoteUsersInfo)
                      ] -
                      roleOrder[findUserRole(b.uid.toString(), remoteUsersInfo)]
                  )
                  ?.map(
                    (user, index) =>
                      (isScreenShareUSerExist > 0
                        ? findUserRole(user.uid.toString(), remoteUsersInfo) ===
                            VideoCallUserType.INTERVIEWER ||
                          findUserRole(user.uid.toString(), remoteUsersInfo) ===
                            VideoCallUserType.MONITOR
                        : findUserRole(user.uid.toString(), remoteUsersInfo) ===
                          VideoCallUserType.INTERVIEWER) && (
                        <Box
                          key={user?.uid.toString()}
                          id={user?.uid.toString()}
                          sx={{
                            width:
                              remoteUsersInfo?.filter(
                                (item) =>
                                  item.role === VideoCallUserType.INTERVIEWER
                              ).length >= 5 && isDrawerOpen
                                ? "50%"
                                : "174px",
                            height: "98px",
                            position: "relative",
                          }}
                        >
                          <RemoteUser
                            style={{
                              borderRadius: "8px",
                              background: user.hasVideo ? "unset" : "#8C9399",
                            }}
                            playVideo
                            user={user}
                            id={
                              findUserRole(
                                user.uid.toString(),
                                remoteUsersInfo
                              ) === VideoCallUserType.MONITOR
                                ? "monitor"
                                : `others${index}`
                            }
                          />
                          <Box
                            id="othersname"
                            sx={{
                              maxWidth: "150px",
                              display: "flex",
                              width: "fit-content",
                              height: "26.357px",
                              padding: "4px",
                              alignItems: "center",
                              flexShrink: 0,
                              borderRadius: "2px",
                              background:
                                theme.mint.color.extendedColors.gray.ex4,
                              position: "absolute",
                              bottom: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Box
                              id="monitorMicIcon"
                              sx={{
                                display: "flex",
                                height: "12px",
                                padding: "0.27px 2.4px 0.573px 2.4px",
                                justifyContent: "center",
                                alignItems: "center",
                                flexShrink: 0,
                              }}
                            >
                              {user?.hasAudio ? (
                                <MicIcon
                                  size={16}
                                  color="white"
                                  fillOpacity={1}
                                />
                              ) : (
                                <MicOffIcon
                                  size={12}
                                  color="white"
                                  fillOpacity={1}
                                />
                              )}
                            </Box>
                            <MintTypography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              size="caption"
                              weight="400"
                              color={theme.mint.color.text.fixedWhite}
                            >
                              {getUserName(
                                user.uid.toString(),
                                remoteUsersInfo
                              )}
                            </MintTypography>
                          </Box>
                        </Box>
                      )
                  )}

              {currentUser?.type !== VideoCallUserType.BACKROOM_MEMBER && (
                <Box
                  id="interviewerContainer"
                  sx={{
                    backgroundColor: localVideoTrack?.enabled
                      ? "unset"
                      : "#8C9399",
                    width:
                      (remoteUsers.length >= 1 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length >= 1 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length <= 4) ||
                      (remoteUsers.length > 1 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.MONITOR
                        ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role === VideoCallUserType.SCREEN_SHARE_USER
                        ).length === 1)
                        ? "174px"
                        : isDrawerOpen
                          ? "174px"
                          : "174px",
                    height:
                      (remoteUsers.length >= 1 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.INTERVIEWER
                        ).length >= 1) ||
                      remoteUsersInfo?.filter(
                        (item) =>
                          item.role === VideoCallUserType.SCREEN_SHARE_USER
                      ).length === 1 ||
                      (remoteUsers.length > 1 &&
                        remoteUsersInfo?.filter(
                          (item) => item.role === VideoCallUserType.MONITOR
                        ).length === 1 &&
                        remoteUsersInfo?.filter(
                          (item) =>
                            item.role === VideoCallUserType.SCREEN_SHARE_USER
                        ).length === 1)
                        ? "98px"
                        : "100%",
                    position: "relative",
                    borderRadius: 1,
                  }}
                >
                  <LocalVideoTrack
                    ref={ref}
                    play={localVideoTrack! ? true : false}
                    style={{
                      borderRadius: "8px",
                      height: "98px",
                      backgroundColor: localVideoTrack?.enabled
                        ? `unset`
                        : "#8C9399",
                      display: localVideoTrack?.enabled ? "flex" : "none",
                    }}
                    id="interviewer"
                    track={localVideoTrack}
                    className="w-full h-full"
                  />

                  <Box
                    id="interviewername"
                    sx={{
                      maxWidth: "150px",
                      display: "flex",
                      width: "fit-content",
                      height: "26.357px",
                      padding: "4px",
                      alignItems: "center",
                      flexShrink: 0,
                      borderRadius: "2px",
                      background: theme.mint.color.extendedColors.gray.ex4,
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <Box
                      id="monitorMicIcon"
                      sx={{
                        display: "flex",
                        width: "maxContent",
                        height: "12px",
                        padding: "0.27px 2.4px 0.573px 2.4px",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {controls.micStatus ? (
                        <MicIcon size={16} color="white" fillOpacity={1} />
                      ) : (
                        <MicOffIcon size={12} color="white" fillOpacity={1} />
                      )}
                    </Box>
                    <Box
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <MintTypography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        size="caption"
                        weight="400"
                        color={theme.mint.color.text.fixedWhite}
                      >
                        {userName}
                      </MintTypography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </TrackBoundary>
    );
  }
);

export default VideoCallLayout;
