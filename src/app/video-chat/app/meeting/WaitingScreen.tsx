"use client";
import {
  BackgroundBlurIcon,
  CalendarOutlinedIcon,
  MicIcon,
  MicOffIcon,
  MintButton,
  MintSwitch,
  MintTextField,
  MintTypography,
  SettingIcon,
  VideoIcon,
  VideoOffIcon,
  errorToast,
} from "@/design-system";
import { Box, SelectChangeEvent, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SettingsModal from "./modal/SettingsModal";
import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import moment from "moment";
import "moment/locale/ja";
import InterviewPolicyModal from "./modal/InterviewPolicyModal";
import { videoChatService } from "@/common/apiUrls";
import { VideoCallUserType } from "@/utils/common.data";
import { useRouter } from "next/navigation";
import {
  setControls,
  setMeetingDetails,
  setMonitorInfo,
  setScreeningData,
  updateFeedbackStatus,
  updateRecordingStatus,
  updateReportStatus,
} from "@/stores/videocall/reducer";
import { getErrorMessage, trimAllValues } from "@/utils";
import { useTranslation } from "react-i18next";
import useVirtualBackground from "@/hooks/useVirtualBackground";

let areaCodeValue: any = "JAPAN";

AgoraRTC.setArea({
  areaCode: areaCodeValue,
});

export default function WaitingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const controls = useSelector((state: RootState) => state.videocall.controls);
  const [formData, setFormData] = useState<{
    micStatus: boolean;
    cameraStatus: boolean;
    blurStatus: boolean;
    isSettingsOpen: boolean;
  }>({
    micStatus: false,
    cameraStatus: false,
    blurStatus: false,
    isSettingsOpen: false,
  });
  const dispatch = useDispatch();

  const channelInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [speakerDevices, setSpeakerDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedSpeakerDevice, setSelectedSpeakerDevice] =
    useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [policyModal, setPolicyModal] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>();

  const [localTracks, setLocalTracks] = useState<{
    videoTrack: ICameraVideoTrack | null;
    audioTrack: IMicrophoneAudioTrack | null;
  }>({
    videoTrack: null,
    audioTrack: null,
  });

  const { setBackgroundBlur, removeBackgroundBlur } = useVirtualBackground();

  useEffect(() => {
    const fetchDevices = async () => {
      const inputDevices = await AgoraRTC.getDevices()
        .then((value: MediaDeviceInfo[]) => {
          console.log("Media available");
          return value;
        })
        .catch((error: any) => {
          console.log("Media not available : ", error.code);
          if (error.code === "NOT_SUPPORTED") {
            setLocalTracks({
              audioTrack: null,
              videoTrack: null,
            });
            setFormData({
              cameraStatus: false,
              micStatus: false,
              blurStatus: formData.blurStatus,
              isSettingsOpen: formData.isSettingsOpen,
            });
          }
        });
      const audioInputDevices = inputDevices!?.filter(
        (item) => item.kind === "audioinput"
      );

      const videoInputDevices = inputDevices!?.filter(
        (item) => item.kind === "videoinput"
      );

      const audioOutputDevices = inputDevices!?.filter(
        (item) => item.kind === "audiooutput"
      );

      setAudioDevices(audioInputDevices);
      setVideoDevices(videoInputDevices);
      setSpeakerDevices(audioOutputDevices);

      if (audioInputDevices.length > 0) {
        setSelectedAudioDevice(audioInputDevices[0].deviceId);
      }
      if (videoInputDevices.length > 0) {
        setSelectedVideoDevice(videoInputDevices[0].deviceId);
      }
      if (audioOutputDevices.length > 0) {
        setSelectedSpeakerDevice(audioOutputDevices[0].deviceId);
      }
    };
    fetchDevices();
    (async () => {
      let camStatus: boolean = true;
      let micStatus: boolean = true;
      let videoTrack: ICameraVideoTrack | null;
      let audioTrack: IMicrophoneAudioTrack | null;
      await AgoraRTC.createCameraVideoTrack()
        .then(async (videoTracks: ICameraVideoTrack | null) => {
          videoTrack = videoTracks;
          const inputDevices = await AgoraRTC.getDevices().then(
            (value: MediaDeviceInfo[]) => {
              console.log("Media available");
              return value;
            }
          );
          const videoInputDevices = inputDevices!?.filter(
            (item) => item.kind === "videoinput"
          );
          if (videoInputDevices.length > 0) {
            videoTracks?.setDevice(videoInputDevices[0].deviceId);
          }
          videoTracks?.play(videoRef.current!);
        })
        .catch((error: any) => {
          console.log("Camera track creation failed : ", error.code);
          if (error.code === "PERMISSION_DENIED") {
            camStatus = false;
          }
        }),
        await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: "music_standard",
        })
          .then(async (audioTracks: IMicrophoneAudioTrack | null) => {
            audioTrack = audioTracks;
            const inputDevices = await AgoraRTC.getDevices().then(
              (value: MediaDeviceInfo[]) => {
                console.log("Media available");
                return value;
              }
            );
            const audioInputDevices = inputDevices!?.filter(
              (item) => item.kind === "audioinput"
            );
            if (audioInputDevices.length > 0) {
              audioTracks?.setDevice(audioInputDevices[0].deviceId);
            }
            const speakerInputDevices = inputDevices!?.filter(
              (item) => item.kind === "audioinput"
            );
            if (speakerInputDevices.length > 0) {
              audioTracks?.setDevice(speakerInputDevices[0].deviceId);
            }
          })
          .catch((error: any) => {
            console.log("Microphone track creation failed: ", error.code);
            if (error.code === "PERMISSION_DENIED") {
              micStatus = false;
            }
          }),
        setLocalTracks({
          audioTrack: micStatus ? audioTrack! : null,
          videoTrack: camStatus ? videoTrack! : null,
        });
      setFormData({
        micStatus: micStatus,
        cameraStatus: camStatus,
        blurStatus: formData.blurStatus,
        isSettingsOpen: formData.isSettingsOpen,
      });
    })();
    return () => {
      localTracks.videoTrack?.stop();
      localTracks.audioTrack?.stop();
      localTracks.audioTrack?.close();
      localTracks.videoTrack?.close();
      localTracks.videoTrack?.unpipe();
      setLocalTracks({
        audioTrack: null,
        videoTrack: null,
      });
    };
  }, []);

  useEffect(() => {
    if (controls.blurStatus) {
      console.log("BLUR STATUS : ", controls.blurStatus);
      if (typeof window !== "undefined")
        setBackgroundBlur(localTracks.videoTrack);
    }
  }, [controls]);

  useEffect(() => {
    if (videoDevices?.length > 0) {
      localTracks?.videoTrack?.setDevice(videoDevices[0]?.deviceId);
    }
    if (audioDevices?.length > 0) {
      localTracks?.audioTrack?.setDevice(audioDevices[0]?.deviceId);
    }
    if (speakerDevices?.length > 0) {
      localTracks?.audioTrack?.setDevice(speakerDevices[0]?.deviceId);
    }
  }, [localTracks]);

  const handleBackgroundBlurChange = () => {
    console.log(!formData.blurStatus, "Background blur enabled");
    setFormData({
      ...formData,
      blurStatus: !formData.blurStatus,
    });
    if (!formData.blurStatus === true) {
      setBackgroundBlur(localTracks.videoTrack);
    } else {
      removeBackgroundBlur(localTracks.videoTrack);
    }
  };

  const settingsModalSetup = () => {
    setFormData({
      ...formData,
      isSettingsOpen: true,
    });
  };

  const handleCameraChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData({
      ...formData,
      cameraStatus: checked,
    });
    await localTracks?.videoTrack?.setEnabled(checked);
  };

  const handleMicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData({
      ...formData,
      micStatus: checked,
    });
    await localTracks.audioTrack?.setEnabled(checked);
  };

  const handleAudioDeviceChange = (e: SelectChangeEvent) => {
    localTracks.audioTrack?.setDevice(e.target.value);
    setSelectedAudioDevice(e.target.value);
  };

  const handleVideoDeviceChange = (e: SelectChangeEvent) => {
    localTracks.videoTrack?.setDevice(e.target.value);
    setSelectedVideoDevice(e.target.value);
  };

  const handleSpeakerDeviceChange = (e: SelectChangeEvent) => {
    localTracks.audioTrack?.setPlaybackDevice(e.target.value);
    setSelectedSpeakerDevice(e.target.value);
  };

  const isMeetingStarted = () => {
    const { startTime, endTime } = channelInfo;
    const startsAtLocal = moment(startTime).subtract(5, "minutes");
    const endsAtLocal = moment(endTime);
    let isBetween = moment().isBetween(startsAtLocal, endsAtLocal);
    return isBetween;
  };

  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNickName(e.target.value);
    if (e.target.value.length === 0 || e.target.value.trim().length > 20) {
      setNicknameError(t("waiting-screen.enter-20-characters-or-less"));
    } else {
      setNicknameError("");
    }
  };

  const handleOnsubmit = (userType: number) => {
    if (
      trimAllValues(nickName).length === 0 ||
      trimAllValues(nickName).length > 20
    ) {
      setNicknameError(t("waiting-screen.enter-20-characters-or-less"));
      return;
    } else {
      console.log("Inside nickname validation ");
      const emojiRegex =
        /(?:[\uD83C-\uD83E][\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/; // Matches emojis
      if (emojiRegex.test(trimAllValues(nickName))) {
        setNicknameError(t("waiting-screen.emojis-not-allowed"));
        return;
      }
    }
    if (userType === 0) {
      setUserType(VideoCallUserType.INTERVIEWER);
      setPolicyModal(true);
    } else {
      localTracks.audioTrack?.setEnabled(false);
      localTracks.videoTrack?.setEnabled(false);
      setFormData({
        ...formData,
        micStatus: false,
        cameraStatus: false,
      });
      setUserType(VideoCallUserType.BACKROOM_MEMBER);
      setPolicyModal(true);
    }
  };

  const joinInterviewRoom = () => {
    let data = JSON.stringify({
      name: nickName,
      role: userType ?? VideoCallUserType.BACKROOM_MEMBER,
      participantId: channelInfo.participantId,
    });
    videoChatService
      .joinInterviewRoom(channelInfo.meetingId, data)
      .then((response) => {
        console.log("Successfully joined to interview : ", response);

        dispatch(updateFeedbackStatus(response?.data?.data?.feedbackStatus));
        dispatch(updateReportStatus(response?.data?.data?.reportStatus));

        const date = moment(response.data.data.meeting.startTime)
          .locale("ja")
          .format("M月D日");
        const startTime = moment
          .utc(response.data.data.meeting.startTime)
          .local()
          .format("HH:mm");
        const endTime = moment
          .utc(response.data.data.meeting.endTime)
          .local()
          .format("HH:mm");
        let meetingData: any = {
          appId: response.data.data?.meeting?.agoraAppId,
          channelName: response.data.data.meeting.meetingId,
          rtcToken: response.data.data.meeting.rtcToken,
          rtmToken: response.data.data.meeting.rtmToken,
          userId: response.data.data.meeting.agoraUserId,
          campaignTitle: response.data.data.meeting.meetingName,
          implementationPeriod: `${date} ${startTime}~${endTime}`,
          interviewDuration: response.data.data.meeting.duration,
          userName: nickName,
          userType: userType,
          devices: {
            audioInput: selectedAudioDevice,
            videoInput: selectedVideoDevice,
            audioOutput: selectedSpeakerDevice,
          },
        };
        dispatch(
          updateRecordingStatus(response.data.data?.meeting?.recordingStatus)
        );
        dispatch(setMeetingDetails(meetingData));
        dispatch(setControls(formData));
        dispatch(setMonitorInfo(response.data?.data?.monitor));
        dispatch(setScreeningData(response.data?.data?.screening));
        localTracks.videoTrack?.close();
        videoRef.current!.srcObject = null;
        localTracks.videoTrack?.stop();
        localTracks.audioTrack?.close();
        localTracks.audioTrack?.stop();
        router.push("/video-chat/app/videocall");
        setPolicyModal(false);
      })
      .catch((error: any) => {
        console.log("Error occured during interview join : ", error);
        setPolicyModal(false);
        errorToast(getErrorMessage(error?.response?.data));
      });
  };
  const getLocalMeetingDuration = (startTime: string, endTime: string) => {
    const localStartsAt = moment
      .utc(startTime)
      .local()
      .locale("ja")
      .format("M月D日(ddd) HH:mm");
    const localEndsAt = moment
      .utc(endTime)
      .local()
      .locale("ja")
      .format("HH:mm");
    return `${localStartsAt}~${localEndsAt}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: "80px",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: "8px 0px 0px",
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "0px",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: "764px",
            padding: "0px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                width: "740px",
                height: "416px",
                borderRadius: "8px",
                background: "#2F3B47",
              }}
            >
              <video
                id="localVideo"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                ref={videoRef}
                autoPlay={true}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
              position: "relative",
            }}
            id="actions"
          >
            <Box
              sx={{
                display: "flex",
                padding: "8px 0px",
                justifyContent: "space-between",
                alignItems: "center",
                flex: "8px 0px 0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "0px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "40px",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  id="mic"
                >
                  {formData.micStatus ? <MicIcon /> : <MicOffIcon />}
                  <MintSwitch
                    size="medium"
                    checked={formData.micStatus}
                    onChange={(e) => handleMicChange(e)}
                    inputProps={{ "aria-label": "controlled-mic" }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  id="camera"
                >
                  {formData.cameraStatus ? <VideoIcon /> : <VideoOffIcon />}
                  <MintSwitch
                    size="medium"
                    checked={formData.cameraStatus}
                    onChange={(e) => handleCameraChange(e)}
                    inputProps={{ "aria-label": "controlled-camera" }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  id="backgroundBlur"
                >
                  <BackgroundBlurIcon />
                  <MintSwitch
                    size="medium"
                    checked={formData.blurStatus}
                    onChange={handleBackgroundBlurChange}
                    inputProps={{ "aria-label": "controlled-blur" }}
                    disabled={!formData.cameraStatus}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "0px",
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                alignSelf: "stretch",
                position: "absolute",
                cursor: "pointer",
              }}
              id="settings"
              onClick={() => settingsModalSetup()}
            >
              <SettingIcon />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "448px",
            maxWidth: "448px",
            padding: "16px 24px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: theme.mint.spacing.l,
              alignSelf: "stretch",
            }}
          >
            <Box
              gap={theme.mint.spacing.s}
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                alignSelf: "stretch",
                flex: "8px 0px 0px",
              }}
              id="heading"
            >
              <MintTypography
                sx={{
                  textAlign: "left",
                }}
                size="head-m"
                weight="700"
                textAlign="center"
                width="100%"
                color={theme.mint.color.text.high}
              >
                {channelInfo.meetingName}
              </MintTypography>
              {channelInfo.startTime && (
                <Box
                  display={"flex"}
                  gap={`${theme.mint.spacing.x3s}`}
                  alignItems={"center"}
                >
                  <CalendarOutlinedIcon size={16} />
                  <MintTypography color={theme.mint.color.text.high}>
                    {getLocalMeetingDuration(
                      channelInfo.startTime,
                      channelInfo.endTime
                    )}
                  </MintTypography>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "220px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
              }}
              id="details"
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "0px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <MintTypography
                  size="body"
                  weight="400"
                  color={(theme) => theme.mint.color.text.high}
                >
                  {t("waiting-screen.your-name")}
                </MintTypography>
                <p style={{ color: "red" }}>*</p>
              </Box>
              <MintTextField
                sx={{
                  "&.MuiTextField-root": {
                    padding: "unset",
                  },
                  display: "flex",
                  padding: "8px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
                placeholder={t("waiting-screen.tanaka")}
                value={nickName}
                onChange={(e) => handleNicknameChange(e)}
                inputProps={{ "data-testid": "nickname" }}
              ></MintTextField>
              {nicknameError! && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {nicknameError}
                </p>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "0px",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              flexDirection: "column",
            }}
          >
            <Box
              id="actionButtons"
              sx={{ display: "flex", flexDirection: "row", gap: "16px" }}
            >
              <MintButton
                size="medium"
                variant={isMeetingStarted() ? "contained" : "outlined"}
                disabled={!isMeetingStarted()}
                onClick={() => handleOnsubmit(0)}
                data-testid="video-join-button"
              >
                <MintTypography size="body" weight="500">
                  {t("waiting-screen.enter-interview")}
                </MintTypography>
              </MintButton>
              <MintButton
                size="medium"
                variant="outlined"
                sx={{ color: (theme) => theme.mint.color.text.accent }}
                disabled={!isMeetingStarted()}
                onClick={() => handleOnsubmit(1)}
                data-testid="video-join-button-back-room"
              >
                <MintTypography size="body" weight="500">
                  {t("waiting-screen.enter-backroom")}
                </MintTypography>
              </MintButton>
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <MintTypography
                size="body"
                weight="400"
                color={(theme) => theme.mint.color.text.high}
              >
                {t("waiting-screen.you-can-enter-5-min-latter")}
              </MintTypography>
            </Box>
          </Box>
        </Box>
        {formData.isSettingsOpen && (
          <SettingsModal
            open={formData.isSettingsOpen}
            audioDevices={audioDevices}
            videoDevices={videoDevices}
            speakerDevices={speakerDevices}
            selectedAudioDevice={selectedAudioDevice}
            selectedVideoDevice={selectedVideoDevice}
            selectedSpeakerDevice={selectedSpeakerDevice}
            handleAudioDeviceChange={handleAudioDeviceChange}
            handleVideoDeviceChange={handleVideoDeviceChange}
            handleSpeakerDeviceChange={handleSpeakerDeviceChange}
            onClose={() =>
              setFormData({
                ...formData,
                isSettingsOpen: false,
              })
            }
          />
        )}
        {policyModal && (
          <InterviewPolicyModal
            open={policyModal}
            onClose={() => setPolicyModal(false)}
            onAgree={joinInterviewRoom}
          />
        )}
      </Box>
    </Box>
  );
}
