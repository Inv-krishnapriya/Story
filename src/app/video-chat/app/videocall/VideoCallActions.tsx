"use client";
import {
  CommentOutlinedIcon,
  DotsVertOutlinedIcon,
  FullScreenExitOutlinedIcon,
  FullScreenOutlinedIcon,
  MicOffOutlinedIcon,
  MicOutlinedIcon,
  MintIconButton,
  MintTypography,
  ParticipantsIcon,
  PersonIcon,
  ScreenShareOutlinedIcon,
  VideoOutlinedIcon,
} from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import {
  IcontrolsProps,
  setControls,
  setDrawerOpenStatusChange,
  updateFullscreenStatus,
} from "@/stores/videocall/reducer";
import { Box, SelectChangeEvent, useTheme } from "@mui/material";
import React, { RefObject, forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MonitorDrawer from "./drawer/MonitorDrawer";
import ParticipantsDrawer from "./drawer/ParticipantsDrawer";
import { TCurrentUserProfile } from "@/common/types";
import ChatDrawer from "./drawer/ChatDrawer";
import { VideoCamOffOutlinedIcon } from "@/design-system";
import SettingsModal from "./modal/SettingsModal";
import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { VideoCallUserType } from "@/utils/common.data";
import { isMonitorExist } from "@/utils";
import Screenshare from "./ScreenShare";
import { t } from "i18next";

interface IVideoCallActionsProps {
  currentUser: TCurrentUserProfile | undefined;
  channelInfo: any;
  controls: IcontrolsProps;
  chatHistory: any[];
  updateHistory: (
    tabChange: boolean,
    data: any,
    timestamp: string,
    chatRootContainerRef: RefObject<HTMLDivElement> | null
  ) => void;
  audioTrack: IMicrophoneAudioTrack | null;
  videoTrack: ICameraVideoTrack | null;
  setBackgroundBlur: (videoTrack: ICameraVideoTrack | null) => void;
  removeBackgroundBlur: (videoTrack: ICameraVideoTrack | null) => void;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<TCurrentUserProfile | undefined>
  >;
}

const VideoCallActions = forwardRef(
  (
    {
      currentUser,
      channelInfo,
      controls,
      chatHistory,
      updateHistory,
      audioTrack,
      videoTrack,
      setBackgroundBlur,
      removeBackgroundBlur,
      setCurrentUser,
    }: IVideoCallActionsProps,
    ref: any
  ) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const remoteUsers = useSelector(
      (state: RootState) => state.videocall.remoteUsers
    );
    const remoteUsersInfo = useSelector(
      (state: RootState) => state.videocall.remoteUsersInfo
    );

    console.log(
      "Remote data from videoCallAction: ",
      remoteUsers,
      remoteUsersInfo,
      useSelector((state: RootState) => state.videocall.meetingData)
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
    const [isMonitorInfo, setIsMonitorInfo] = useState<boolean>(true);
    const [isParticipantsInfo, setIsParticipantsInfo] =
      useState<boolean>(false);
    const [isChatOpened, setIsChatOpened] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [speakerDevices, setSpeakerDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
    const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
    const [selectedSpeakerDevice, setSelectedSpeakerDevice] =
      useState<string>("");
    const [screenSharingEnabled, setScreenSharingEnabled] =
      useState<boolean>(false);
    const [isScreenShared, setIsScreenShared] = useState<boolean>(false);
    const videoRef = ref!.current;
    console.log(videoRef);

    useEffect(() => {
      console.log("Init");
      return () => {
        // screenClient?.leave();
        // stopScreenSharing();
      };
    }, []);

    const userType = useSelector(
      (state: RootState) => state.videocall.meetingData.userType
    );

    const devices = useSelector(
      (state: RootState) => state.videocall.meetingData.devices
    );

    useEffect(() => {
      console.log(
        "Remote user added - actions: ",
        remoteUsers,
        remoteUsersInfo
      );
    }, [remoteUsers, remoteUsersInfo]);

    const monitorData = useSelector(
      (state: RootState) => state.videocall.monitorInfo
    );

    const screeningData = useSelector(
      (state: RootState) => state.videocall.screening
    );

    const isCreator = useSelector(
      (state: RootState) => state.videocall.isScreenCreator
    );

    console.log("Screenshare user status from videocall actions : ", isCreator);

    const handleDrawerChange = (index: number) => {
      if (index === 0) {
        if (isParticipantsInfo) {
          handleDrawerClose(1);
        } else if (isChatOpened) {
          handleDrawerClose(2);
        }
        if (isFullScreen) {
          setIsFullScreen(!isFullScreen);
          dispatch(updateFullscreenStatus(!isFullScreen));
        }

        if (
          !isMonitorInfo ||
          isParticipantsInfo === true ||
          isChatOpened === true
        ) {
          setIsDrawerOpen(true);
          dispatch(setDrawerOpenStatusChange(true));
        } else {
          setIsDrawerOpen(false);
          dispatch(setDrawerOpenStatusChange(false));
        }
        setIsMonitorInfo(!isMonitorInfo);
      } else if (index === 1) {
        if (isMonitorInfo) {
          handleDrawerClose(0);
        } else if (isChatOpened) {
          handleDrawerClose(2);
        }

        if (isFullScreen) {
          setIsFullScreen(!isFullScreen);
          dispatch(updateFullscreenStatus(!isFullScreen));
        }

        if (
          isMonitorInfo === true ||
          !isParticipantsInfo ||
          isChatOpened === true
        ) {
          setIsDrawerOpen(true);
          dispatch(setDrawerOpenStatusChange(true));
        } else {
          setIsDrawerOpen(false);
          dispatch(setDrawerOpenStatusChange(false));
        }
        setIsParticipantsInfo(!isParticipantsInfo);
      } else if (index === 2) {
        if (isMonitorInfo) {
          handleDrawerClose(0);
        } else if (isParticipantsInfo) {
          handleDrawerClose(1);
        }

        if (isFullScreen) {
          setIsFullScreen(!isFullScreen);
          dispatch(updateFullscreenStatus(!isFullScreen));
        }

        if (
          isMonitorInfo === true ||
          isParticipantsInfo === true ||
          !isChatOpened
        ) {
          setIsDrawerOpen(true);
          dispatch(setDrawerOpenStatusChange(true));
        } else {
          setIsDrawerOpen(false);
          dispatch(setDrawerOpenStatusChange(false));
        }
        setIsChatOpened(!isChatOpened);
      } else if (index === 3) {
        if (isMonitorInfo) {
          handleDrawerClose(0);
        } else if (isParticipantsInfo) {
          handleDrawerClose(1);
        } else if (isChatOpened) {
          handleDrawerClose(2);
        }
        setIsDrawerOpen(false);
        dispatch(setDrawerOpenStatusChange(false));
        setIsFullScreen(!isFullScreen);
        dispatch(updateFullscreenStatus(!isFullScreen));
      }
    };

    const getPixel = () => {
      let containerwidth = window.innerWidth;
      console.log("Container width : ", containerwidth);
      let availableWidth = containerwidth - 360;
      return availableWidth / 2 + "px";
    };

    const handleDrawerClose = (index: number) => {
      if (index === 0) {
        if (isParticipantsInfo === false && isChatOpened === false) {
          dispatch(setDrawerOpenStatusChange(false));
          setIsDrawerOpen(false);
        } else {
          dispatch(setDrawerOpenStatusChange(true));
          setIsDrawerOpen(true);
        }
        setIsMonitorInfo(false);
      } else if (index === 1) {
        if (isMonitorInfo === false && isChatOpened === false) {
          dispatch(setDrawerOpenStatusChange(false));
          setIsDrawerOpen(false);
        } else {
          dispatch(setDrawerOpenStatusChange(true));
          setIsDrawerOpen(true);
        }
        setIsParticipantsInfo(false);
      } else if (index === 2) {
        if (isMonitorInfo === false && isParticipantsInfo === false) {
          dispatch(setDrawerOpenStatusChange(false));
          setIsDrawerOpen(false);
        } else {
          dispatch(setDrawerOpenStatusChange(true));
          setIsDrawerOpen(true);
        }
        setIsChatOpened(false);
      }
    };

    const handleMicChange = async (status: boolean) => {
      console.log(
        "Inside mic status change : ",
        audioTrack?.enabled,
        audioTrack
      );
      if (audioTrack === null) {
        dispatch(
          setControls({
            micStatus: true,
            cameraStatus: controls.cameraStatus,
            blurStatus: controls.blurStatus,
            isSettingsOpen: controls.isSettingsOpen,
          })
        );
      }
      if (audioTrack !== null) {
        const enabled = !audioTrack?.enabled;
        console.log("track enable status : ", enabled);
        await audioTrack?.setEnabled(enabled);
        audioTrack.stop();
        console.log(audioTrack, "after toggle");
        dispatch(setControls({ micStatus: enabled }));
      }
    };

    const handleCameraChange = async (status: boolean) => {
      console.log("Camera change detected : ", videoTrack?.enabled, videoTrack);
      if (videoTrack === null) {
        dispatch(
          setControls({
            micStatus: controls.micStatus,
            cameraStatus: true,
            blurStatus: controls.blurStatus,
            isSettingsOpen: controls.isSettingsOpen,
          })
        );
      }
      if (videoTrack !== null) {
        const enabled = !videoTrack!?.enabled;
        console.log("Enable status: ", enabled);
        await videoTrack?.setEnabled(enabled);
        dispatch(setControls({ cameraStatus: enabled }));
      }
    };

    useEffect(() => {
      const fetchDevices = async () => {
        const inputDevices = await AgoraRTC.getDevices();
        const audioInputDevices = inputDevices.filter(
          (item) => item.kind === "audioinput"
        );
        console.log(audioInputDevices);

        const videoInputDevices = inputDevices.filter(
          (item) => item.kind === "videoinput"
        );
        console.log(videoInputDevices);

        const audioOutputDevices = inputDevices.filter(
          (item) => item.kind === "audiooutput"
        );

        console.log(audioOutputDevices);

        setAudioDevices(audioInputDevices);
        setVideoDevices(videoInputDevices);
        setSpeakerDevices(audioOutputDevices);

        if (audioInputDevices.length > 0) {
          audioTrack?.setDevice(devices?.audioInput);
          setSelectedAudioDevice(
            devices?.audioInput ?? audioInputDevices[0].deviceId
          );
        }
        if (videoInputDevices.length > 0) {
          videoTrack?.setDevice(devices?.videoInput);
          setSelectedVideoDevice(
            devices?.videoInput ?? videoInputDevices[0].deviceId
          );
        }
        if (audioOutputDevices.length > 0) {
          audioTrack?.setDevice(devices?.audioOutput);
          setSelectedSpeakerDevice(
            devices?.audioOutput ?? audioOutputDevices[0].deviceId
          );
        }
      };
      fetchDevices();
    }, []);

    const handleAudioDeviceChange = (e: SelectChangeEvent) => {
      audioTrack?.setDevice(e.target.value);
      setSelectedAudioDevice(e.target.value);
    };

    const handleVideoDeviceChange = (e: SelectChangeEvent) => {
      videoTrack?.setDevice(e.target.value);
      setSelectedVideoDevice(e.target.value);
    };

    const handleSpeakerDeviceChange = (e: SelectChangeEvent) => {
      audioTrack?.setDevice(e.target.value);
      setSelectedSpeakerDevice(e.target.value);
    };

    const handleScreenSharing = () => {
      if (screenSharingEnabled === false) {
        console.log("Initiating screen sharing");
        setScreenSharingEnabled(true);
      } else {
        console.log("Ending screen sharing");
        setScreenSharingEnabled(false);
      }
    };

    return (
      <Box
        id="interviewFooter"
        sx={{
          display: "flex",
          height: "78px",
          padding: "8px 16px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          alignSelf: "stretch",
          borderTop: `2px solid transparent`,
          borderImage: "linear-gradient(45deg,#05A0ED,#7690C1,#F27E91)",
          borderImageSlice: 1,
          background: theme.mint.color.surfaceAccent.primaryNavigation.primary,
          position: "fixed",
          bottom: 0,
          width: isDrawerOpen ? `calc(100% - 376px)` : "100%",
        }}
      >
        <Box
          id="mainControls"
          sx={{
            display: "flex",
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            position: "absolute",
            width: isDrawerOpen ? getPixel : "60%",
            zIndex: 99999,
          }}
        >
          <Box
            id="micControl"
            sx={{
              display: "flex",
              cursor: "pointer",
              width: "48px",
              minWidth: "48px",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "9999px",
                background: controls.micStatus
                  ? "#0C1A5E"
                  : theme.mint.color.system.error.error,
              }}
            >
              {controls.micStatus ? (
                <MintIconButton
                  onClick={() => handleMicChange(!controls.micStatus)}
                  disabled={userType === VideoCallUserType.BACKROOM_MEMBER}
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "unset",
                    },
                  }}
                  data-testid="mick-button"
                >
                  <MicOutlinedIcon size={24} color="white" />
                </MintIconButton>
              ) : (
                <MintIconButton
                  onClick={() => handleMicChange(!controls.micStatus)}
                  disabled={userType === VideoCallUserType.BACKROOM_MEMBER}
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "unset",
                    },
                  }}
                  data-testid="mick-button"
                >
                  <MicOffOutlinedIcon size={20} color="white" fillOpacity={1} />
                </MintIconButton>
              )}
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.text.fixedWhite}
            >
              {t("video-call-action.microphone")}
            </MintTypography>
          </Box>
          <Box
            id="videoControl"
            sx={{
              display: "flex",
              cursor: "pointer",
              width: "48px",
              minWidth: "48px",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "9999px",
                background: controls.cameraStatus
                  ? "#0C1A5E"
                  : theme.mint.color.system.error.error,
              }}
            >
              {controls.cameraStatus ? (
                <MintIconButton
                  onClick={() => handleCameraChange(!controls.cameraStatus)}
                  disabled={userType === VideoCallUserType.BACKROOM_MEMBER}
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "unset",
                    },
                  }}
                >
                  <VideoOutlinedIcon size={24} color="white" />
                </MintIconButton>
              ) : (
                <MintIconButton
                  onClick={() => handleCameraChange(!controls.cameraStatus)}
                  disabled={userType === VideoCallUserType.BACKROOM_MEMBER}
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "unset",
                    },
                  }}
                >
                  <VideoCamOffOutlinedIcon size={24} color="white" />
                </MintIconButton>
              )}
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.text.fixedWhite}
            >
              {t("video-call-action.camera")}
            </MintTypography>
          </Box>
          {userType !== VideoCallUserType.BACKROOM_MEMBER && (
            <Box
              id="shareControl"
              sx={{
                display: "flex",
                cursor: "pointer",
                width: "48px",
                minWidth: "48px",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "9999px",
                  background: screenSharingEnabled ? "#055CB2" : "#0C1A5E",
                }}
              >
                <MintIconButton
                  onClick={handleScreenSharing}
                  disabled={
                    remoteUsersInfo?.filter(
                      (item) =>
                        item.role === VideoCallUserType.SCREEN_SHARE_USER
                    )?.length > 0 || screenSharingEnabled
                      ? true
                      : false
                  }
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "unset",
                    },
                  }}
                >
                  <ScreenShareOutlinedIcon size={24} color="white" />
                </MintIconButton>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-action.screen-shared")}
              </MintTypography>
            </Box>
          )}
          <Box
            id="moreControl"
            sx={{
              display: "flex",
              cursor: "pointer",
              width: "48px",
              minWidth: "48px",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "9999px",
                background: "#0C1A5E",
              }}
            >
              <MintIconButton
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <DotsVertOutlinedIcon size={24} color="white" />
              </MintIconButton>
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.text.fixedWhite}
            >
              {t("video-call-action.others")}
            </MintTypography>
          </Box>
        </Box>

        <Box
          id="basicControls"
          sx={{
            position: "absolute",
            right: "10px",
            width: "fit-content",
            display: "flex",
            padding: "16px 0px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Box
              id="monitorInfo"
              sx={{
                display: "flex",
                width: "48px",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "999px",
                  background: isMonitorInfo
                    ? theme.mint.color.extendedColors.ultramarine.ex1
                    : "#0C1A5E",
                }}
              >
                <MintIconButton
                  onClick={() => handleDrawerChange(0)}
                  data-testid="drawer-0"
                >
                  <PersonIcon
                    size={24}
                    color={isMonitorInfo ? "#0A1826" : "white"}
                  />
                </MintIconButton>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-action.answer-info")}
              </MintTypography>
            </Box>
            <Box
              id="participants"
              sx={{
                display: "flex",
                width: "48px",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "999px",
                  background: isParticipantsInfo
                    ? theme.mint.color.extendedColors.ultramarine.ex1
                    : "#0C1A5E",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "24px",
                    height: "24px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <MintIconButton
                    onClick={() => handleDrawerChange(1)}
                    data-testid="drawer-1"
                  >
                    <ParticipantsIcon
                      size={24}
                      color={isParticipantsInfo ? "#0A1826" : "white"}
                    />
                  </MintIconButton>
                </Box>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-action.participant")}
              </MintTypography>
            </Box>
            <Box
              id="chat"
              sx={{
                display: "flex",
                cursor: "pointer",
                width: "48px",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "999px",
                  background: isChatOpened
                    ? theme.mint.color.extendedColors.ultramarine.ex1
                    : "#0C1A5E",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "24px",
                    height: "24px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <MintIconButton
                    onClick={() => handleDrawerChange(2)}
                    data-testid="drawer-2"
                  >
                    <CommentOutlinedIcon
                      size={24}
                      color={isChatOpened ? "#0A1826" : "white"}
                    />
                  </MintIconButton>
                </Box>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-action.chat")}
              </MintTypography>
            </Box>
            <Box
              id="fullScreen"
              sx={{
                display: "flex",
                width: "48px",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "999px",
                  background: "#0C1A5E",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "24px",
                    height: "24px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <MintIconButton
                    onClick={() => handleDrawerChange(3)}
                    disabled={!isMonitorExist(remoteUsers, remoteUsersInfo)}
                    sx={{
                      "&.Mui-disabled": {
                        pointerEvents: "unset",
                      },
                    }}
                    data-testid="drawer-3"
                  >
                    {isFullScreen ? (
                      <FullScreenExitOutlinedIcon size={24} color="white" />
                    ) : (
                      <FullScreenOutlinedIcon size={24} color="white" />
                    )}
                  </MintIconButton>
                </Box>
              </Box>
              <MintTypography
                size="caption"
                weight="400"
                color={theme.mint.color.text.fixedWhite}
              >
                {t("video-call-action.fullscreen")}
              </MintTypography>
            </Box>
          </Box>
        </Box>

        {isMonitorInfo && (
          <MonitorDrawer
            open={isMonitorInfo}
            onClose={() => handleDrawerClose(0)}
            data={monitorData}
            screeningData={screeningData}
            remoteUsersInfo={remoteUsersInfo}
          />
        )}
        {isParticipantsInfo && (
          <ParticipantsDrawer
            currentUser={currentUser}
            open={isParticipantsInfo}
            onClose={() => handleDrawerClose(1)}
            remoteUsers={remoteUsers}
            remoteUsersInfo={remoteUsersInfo}
          />
        )}

        {isChatOpened && (
          <ChatDrawer
            open={isChatOpened}
            onClose={() => handleDrawerClose(2)}
            remoteUsers={remoteUsers}
            nickName={monitorData.name}
            updateHistory={updateHistory}
            remoteUsersInfo={remoteUsersInfo}
          />
        )}

        {isSettingsOpen && (
          <SettingsModal
            open={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            audioDevices={audioDevices}
            videoDevices={videoDevices}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            speakerDevices={speakerDevices}
            selectedAudioDevice={selectedAudioDevice}
            selectedVideoDevice={selectedVideoDevice}
            selectedSpeakerDevice={selectedSpeakerDevice}
            handleAudioDeviceChange={handleAudioDeviceChange}
            handleVideoDeviceChange={handleVideoDeviceChange}
            handleSpeakerDeviceChange={handleSpeakerDeviceChange}
            setBackgroundBlur={setBackgroundBlur}
            removeBackgroundBlur={removeBackgroundBlur}
          />
        )}

        {screenSharingEnabled && (
          <Screenshare
            isScreenShared={isScreenShared}
            screenSharingEnabled={screenSharingEnabled}
            setScreenSharingEnabled={setScreenSharingEnabled}
            setIsScreenShared={setIsScreenShared}
          />
        )}
      </Box>
    );
  }
);

export default VideoCallActions;
