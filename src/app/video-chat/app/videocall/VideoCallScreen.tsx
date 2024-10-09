"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import WaitingModal from "./modal/WaitingModal";
import AgoraRTM, { RTMClient, RTMConfig, RTMEvents } from "agora-rtm-sdk";
import { Box, useTheme } from "@mui/material";
import AgoraRTC, {
  AgoraRTCProvider,
  ConnectionDisconnectedReason,
  ConnectionState,
  IAgoraRTCClient,
  NetworkQuality,
  useClientEvent,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { videoChatService } from "@/common/apiUrls";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  resetMeetingDetails,
  setCallParams,
  setControls,
  updateChatHistory,
  updateRecordingStatus,
  updateRemoteUsers,
  updateRemoteUsersInfo,
} from "@/stores/videocall/reducer";
import VideoCallHeader from "./VideoCallHeader";
import VideoCallActions from "./VideoCallActions";
import VideoCallLayout from "./VideoCallLayout";
import {
  TCurrentUserProfile,
  IRemoteProfile,
  TChatHistoryType,
} from "@/common/types";
import { VideoCallUserType } from "@/utils/common.data";
import ScreenShareHeader from "./ScreenShareHeader";
import { errorToast, successToast } from "@/design-system";
import { useTranslation } from "react-i18next";
import useVirtualBackground from "@/hooks/useVirtualBackground";

const VideoCallScreen = () => {
  const router = useRouter();
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "h264", mode: "rtc" })
  );

  const meetingData = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const handlePopstate = (event: PopStateEvent) => {
    event.preventDefault();
    if (meetingData?.campaignId !== undefined) {
      router!?.push(`/app/campaign/details/${meetingData.campaignId}`);
    } else if (meetingData.campaignId === undefined) {
      router!?.push(
        `/video-chat/auth/login?meetingId=${meetingData.meetingId}`
      );
    }
  };

  window.addEventListener("popstate", handlePopstate);

  useEffect(() => {
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <>
      <AgoraRTCProvider client={client}>
        <VideoCall client={client} />
      </AgoraRTCProvider>
    </>
  );
};

const { RTM } = AgoraRTM;
const location: any = ["ASIA"];

AgoraRTC.setArea({
  areaCode: location,
});

function VideoCall(props: { client: IAgoraRTCClient }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const rtm = useRef<RTMClient | null>(null);
  const [isTimeExceeded, setIsTimeExceeded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TCurrentUserProfile>();
  const [remoteUsersInfo, setRemoteUsersInfo] = useState<IRemoteProfile[]>([]);
  const [isUserLeft, setIsUserLeft] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [nickName, setNickName] = useState<any>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  let localUserCount = 0;
  const localTrackRef = useRef<HTMLDivElement>(null);

  console.log("trackRef :", localTrackRef.current);

  const controls = useSelector((state: RootState) => state.videocall.controls);

  const {
    isLoading: isLoadingMic,
    localMicrophoneTrack,
    error: hasMicError,
  } = useLocalMicrophoneTrack(controls.micStatus);

  const { t } = useTranslation();

  const {
    isLoading: isLoadingCam,
    localCameraTrack,
    error: hasVideoError,
  } = useLocalCameraTrack(controls.cameraStatus, { encoderConfig: "180p_1" });

  const channelInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const userType = useSelector(
    (state: RootState) => state.videocall.meetingData.userType
  );

  const chatHistory: TChatHistoryType[] = useSelector(
    (state: RootState) => state.videocall.chatHistory
  );

  const isCreator = useSelector(
    (state: RootState) => state.videocall.isScreenCreator
  );

  const isRecordingStatus = useSelector(
    (state: RootState) => state.videocall.isRecording
  );

  console.log("Recording status from videocall screen : ", isRecordingStatus);

  const data = useSelector((state: RootState) => state.videocall.meetingData);

  const isDrawerOpen = useSelector(
    (state: RootState) => state.videocall.videoCallParams.isDrawerOpened
  );

  const remoteUsers = useRemoteUsers();
  console.log("Remote users hooks: ", remoteUsers);

  const devices = useSelector(
    (state: RootState) => state.videocall.meetingData.devices
  );

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  const { setBackgroundBlur, removeBackgroundBlur } = useVirtualBackground();

  console.log(localMicrophoneTrack, localCameraTrack);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const { data: joinId } = useJoin({
    appid: data?.appId,
    channel: data.channelName,
    token: data.rtcToken,
    uid: parseInt(data.userId),
  });

  audioTracks.forEach((track) => track?.play());

  useEffect(() => {
    if (hasMicError) {
      dispatch(
        setControls({
          ...controls,
          micStatus: false,
        })
      );
      errorToast(t("video-call.microphone-permission-reset"));
    }
    if (hasVideoError) {
      dispatch(
        setControls({
          ...controls,
          cameraStatus: false,
        })
      );
      errorToast(t("video-call.camera-permission-reset"));
    }
  }, [hasMicError, hasVideoError]);

  useEffect(() => {
    localCameraTrack?.setDevice(devices?.videoInput);
    localMicrophoneTrack?.setDevice(devices?.audioInput);
    localMicrophoneTrack?.setDevice(devices?.audioOutput);
    if (controls.blurStatus && localCameraTrack) {
      setBackgroundBlur(localCameraTrack);
    }
  }, [devices, localCameraTrack]);

  useEffect(() => {
    if (joinId && localUserCount === 0) {
      console.log("Inside confrimation call!!");

      videoChatService
        .updateUserConfirmation(channelInfo.meetingId)
        .then(async (response) => {
          localUserCount++;
          console.log(response, controls, "controls666");
          localUserCount++;

          console.log("User successfully joined to system!", response);
          if (userType === VideoCallUserType.BACKROOM_MEMBER) {
            await localCameraTrack?.setEnabled(false);
            await localMicrophoneTrack?.setEnabled(false);
          }

          setCurrentUser({
            hasAudio:
              userType === VideoCallUserType.BACKROOM_MEMBER
                ? false
                : localMicrophoneTrack?.enabled
                  ? true
                  : false,
            hasVideo:
              userType === VideoCallUserType.BACKROOM_MEMBER
                ? false
                : localCameraTrack?.enabled
                  ? true
                  : false,
            audio:
              userType === VideoCallUserType.BACKROOM_MEMBER
                ? null
                : localMicrophoneTrack,
            video:
              userType === VideoCallUserType.BACKROOM_MEMBER
                ? null
                : localCameraTrack,
            id: data.userId,
            type: userType,
            name: data.userName,
          });
        })
        .catch((error) => {
          console.log("Error occured in system joining: ", error);
        });
    }
  }, [joinId]);

  useClientEvent(props.client, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(props.client, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  useClientEvent(props.client, "user-unpublished", (user) => {
    console.log("the user ", user.uid, "has unpublished media in the channel");
  });

  useClientEvent(props.client, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
    setRemoteUsersInfo((prev) => {
      return prev.filter(
        (item) => item.agoraUserId.toString() !== user.uid.toString()
      );
    });
  });

  useClientEvent(props.client, "network-quality", (stats: NetworkQuality) => {
    console.log(
      "Network Quality of Current user: Uplink Quality : ",
      stats.uplinkNetworkQuality,
      " Downlink Quality : ",
      stats.downlinkNetworkQuality
    );
  });

  useClientEvent(
    props.client,
    "connection-state-change",
    async (
      curState: ConnectionState,
      revState: ConnectionState,
      reason?: ConnectionDisconnectedReason
    ) => {
      console.log(
        "Reason for connection state change: ",
        curState,
        revState,
        reason
      );

      if (curState === "RECONNECTING") {
        errorToast("ネットワーク接続を確認してください。");
        await props.client.unpublish();
      } else {
        if (
          reason! === "NETWORK_ERROR" ||
          (revState === "RECONNECTING" && curState === "CONNECTED")
        ) {
          successToast("ネットワークに再接続しました。");
        }
      }
    }
  );

  useEffect(() => {
    initRTM();
    return () => {
      handleLeave();
      setIsUserLeft(false);
    };
  }, []);

  const initRTM = async () => {
    // AgoraRTM.setArea({ areaCodes: location });
    let rtmConfig: RTMConfig = {
      token: data?.rtmToken,
      cloudProxy: true,
    };

    console.log("APPID:", data?.appId);

    rtm.current = new RTM(data?.appId!, data.userId, rtmConfig);

    try {
      await rtm.current.login();
      const channel = data.channelName;
      const subscribeResult = await rtm.current.subscribe(channel);
      // Events channel
      if (userType === VideoCallUserType.INTERVIEWER) {
        console.log("Inside interviewer");
        await rtm.current.subscribe(
          `${channel}-${VideoCallUserType.INTERVIEWER}`
        );
        await rtm.current.subscribe(`${channel}-${VideoCallUserType.MONITOR}`);
      } else if (userType === VideoCallUserType.BACKROOM_MEMBER) {
        const MIChannel = await rtm.current.subscribe(
          `${channel}-${VideoCallUserType.MONITOR}`
        );
        const IBChannel = await rtm.current.subscribe(
          `${channel}-${VideoCallUserType.INTERVIEWER}`
        );
        const BBChannel = await rtm.current.subscribe(
          `${channel}-${VideoCallUserType.BACKROOM_MEMBER}`
        );
        console.log(MIChannel, IBChannel, BBChannel);
      }

      console.log({ subscribeResult });
      rtm.current.addEventListener("message", onMessageEvent);
      rtm.current.addEventListener("presence", onPresenceEvent);
    } catch (error) {
      console.error("Error initiating channel settings", error);
    }
  };

  useEffect(() => {
    console.log(
      "Remote usrs & remoteUsrsInfo hooks: ",
      remoteUsers,
      remoteUsersInfo
    );
    const participants = remoteUsers.map((user) => user.uid.toString());
    if (participants.length > 0) {
      videoChatService
        .getRemoteUserProfile(channelInfo.meetingId, {
          agoraUserIds: participants,
        })
        .then((response) => {
          console.log("Profile api success: ", response);
          setRemoteUsersInfo(response?.data?.data);
          dispatch(updateRemoteUsersInfo(response?.data?.data));
          dispatch(updateRemoteUsers(remoteUsers));
        })
        .catch((error) => {
          console.log("Error occured : ", error);
        });
      console.log(
        "Remote users updation to store : ",
        remoteUsers,
        remoteUsersInfo
      );
    } else {
      dispatch(updateRemoteUsers(remoteUsers));
      dispatch(updateRemoteUsersInfo([]));
    }
    const videoelements = document.getElementsByTagName("video");
    const videoElementsArray = [...videoelements];
    if (videoElementsArray) {
      videoElementsArray.map((item) => {
        item.style.borderRadius = "8px";
        item.style.objectFit = "contain";
        item.style.backgroundColor = "rgba(10, 24, 38, 0.71)";
      });
    }
  }, [remoteUsers]);

  const onMessageEvent = (event: RTMEvents.MessageEvent) => {
    console.log(
      "message trigger: ",
      event,
      isWaiting,
      isRecording,
      isRecordingStatus
    );
    if (event.customType === "REQUEST_TO_JOIN") {
      let data = JSON.parse(event.message.toString());
      if (userType === VideoCallUserType.INTERVIEWER) {
        setNickName(data?.nickName);
        setIsWaiting(true);
      }
    } else if (event.customType === "REQUEST_ACCEPTED") {
      if (userType === VideoCallUserType.INTERVIEWER) setIsWaiting(false);
    } else if (event.customType === "") {
      let messageContent = JSON.parse(event.message.toString());
      if (messageContent.messageType === 0) {
        console.log("Chat confirmation: ", messageContent);
        updateHistoryData(false, messageContent, "", null);
        document.getElementById("backroomChatArea")!.scrollTop = 0;
      } else {
        if (messageContent.message === "RECORDING_OFF") {
          setIsRecording(false);
          dispatch(updateRecordingStatus(false));
        } else {
          if (messageContent.message === "RECORDING_ON") {
            setIsRecording(true);
            dispatch(updateRecordingStatus(true));
          }
        }
      }
    }
  };

  useEffect(() => {
    const roles = remoteUsersInfo.map((user) => user.role);
    const monitorCount =
      roles?.filter((role) => role === VideoCallUserType.MONITOR)?.length === 0;
    const interviewCount =
      roles?.filter((role) => role === VideoCallUserType.INTERVIEWER)
        ?.length === 0;

    const isBackroom = userType === VideoCallUserType?.BACKROOM_MEMBER;
    const onlyBackRoomMemberExit =
      isBackroom && isRecordingStatus && monitorCount && interviewCount;
    console.log(onlyBackRoomMemberExit, "onlyBackRoomMemberExit");
    if (onlyBackRoomMemberExit) {
      const forceStopRecording = () => {
        videoChatService
          .recordForceStop(channelInfo.meetingId)
          .then((response) => {
            console.log("Recording stopped forcefully!!!", response);
          })
          .catch((error) => {
            console.log("Error occured : ", error);
          });
      };
      setTimeout(forceStopRecording, 60000);
    }
  }, [remoteUsersInfo, userType]);

  const onPresenceEvent = (event: RTMEvents.PresenceEvent) => {
    console.table({ precence: event });
  };

  const updateHistoryData = (
    tabChange: boolean,
    data: TChatHistoryType,
    timestamp: string,
    chatRootContainerRef: RefObject<HTMLDivElement> | null
  ) => {
    console.log("Inside history data update ", data, tabChange, chatHistory);
    if (tabChange) {
      console.log("Inside if");
      dispatch(
        updateChatHistory({ type: tabChange, timestamp: timestamp, data: data })
      );
    } else {
      console.log("Inside else");
      dispatch(
        updateChatHistory({ type: tabChange, timestamp: timestamp, data: data })
      );
    }
  };

  const options = {
    customType: "REQUEST_ACCEPTED",
  };

  const handleRequest = () => {
    console.log("Inside agree");
    rtm
      .current!?.publish(
        data.channelName,
        JSON.stringify({ userId: data.userId! }),
        options
      )
      .then((response) => {
        console.log("response : ", response);
      })
      .catch((error) => {
        console.log("Error occured : ", error);
      });
    setIsWaiting(false);
  };

  const handleLeave = () => {
    setIsUserLeft(true);
    dispatch(setCallParams(isTimeExceeded));
    videoChatService
      .leaveInterviewRoom(channelInfo.meetingId)
      .then((response) => {
        props.client.leave();
        props.client.removeAllListeners();
        rtm?.current?.logout();
        localMicrophoneTrack?.stop();
        localMicrophoneTrack?.close();
        localCameraTrack?.stop();
        localCameraTrack?.close();
        dispatch(resetMeetingDetails());
        console.log("User successfully left", response);
        router.push("/video-chat/app/leave");
      })
      .catch((error) => {
        console.log("Error occured in user left API : ", error);
        setIsUserLeft(false);
      });
  };
  return (
    <>
      <VideoCallHeader
        meetingData={data}
        handleUserLeft={handleLeave}
        isUserLeft={isUserLeft}
      />
      {remoteUsersInfo?.filter(
        (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
      )?.length > 0 && (
        <ScreenShareHeader
          remoteUsersInfo={remoteUsersInfo}
          isCreator={isCreator}
        />
      )}
      <Box
        id="mainFrame"
        sx={{
          display: "flex",
          width: "100vw",
          padding: 0,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          background: theme.mint.color.background.uiBackground,
          flexGrow: 1,
          marginBottom:
            (remoteUsers.length === 0 ||
              (remoteUsersInfo?.filter(
                (item) => item.role === VideoCallUserType.MONITOR
              ).length === 1 &&
                remoteUsersInfo?.filter(
                  (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
                ).length === 0)) &&
            !isDrawerOpen
              ? "unset"
              : "85px",
        }}
      >
        <VideoCallLayout
          userName={data.userName}
          localAudioTrack={
            userType === VideoCallUserType?.BACKROOM_MEMBER
              ? null
              : localMicrophoneTrack
          }
          localVideoTrack={
            userType === VideoCallUserType.BACKROOM_MEMBER
              ? null
              : localCameraTrack
          }
          currentUser={currentUser}
          ref={localTrackRef}
        />

        {isWaiting && (
          <WaitingModal
            open={isWaiting}
            nickName={nickName}
            onClose={() => setIsWaiting(false)}
            onAgree={handleRequest}
          />
        )}
      </Box>
      <VideoCallActions
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        channelInfo={channelInfo}
        controls={controls}
        chatHistory={chatHistory}
        updateHistory={updateHistoryData}
        audioTrack={
          userType === VideoCallUserType?.BACKROOM_MEMBER
            ? null
            : localMicrophoneTrack
        }
        videoTrack={
          userType === VideoCallUserType.BACKROOM_MEMBER
            ? null
            : localCameraTrack
        }
        ref={localTrackRef}
        setBackgroundBlur={setBackgroundBlur}
        removeBackgroundBlur={removeBackgroundBlur}
      />
    </>
  );
}

export default VideoCallScreen;
