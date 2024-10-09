import { videoChatService } from "@/common/apiUrls";
import { errorToast } from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { updateScreenCreatorStatus } from "@/stores/videocall/reducer";
import { getErrorMessage } from "@/utils";
import { ScreenShareStatusType } from "@/utils/common.data";
import AgoraRTC, {
  useJoin,
  useLocalScreenTrack,
  usePublish,
} from "agora-rtc-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface IScreenSharingProps {
  isScreenShared: boolean;
  screenSharingEnabled: boolean;
  setScreenSharingEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsScreenShared: React.Dispatch<React.SetStateAction<boolean>>;
}

const Screenshare: React.FC<IScreenSharingProps> = (props) => {
  const {
    screenSharingEnabled,
    setScreenSharingEnabled,
    setIsScreenShared,
    isScreenShared,
  } = props;
  const dispatch = useDispatch();
  const [screenSharing, setScreenSharing] = useState(screenSharingEnabled);
  const [screenToken, setScreenToken] = useState<string>("");
  const [screenUserId, setScreenUserId] = useState<string>("");
  const [isJoined, setIsJoined] = useState<boolean>(false);
  let screeUserCount = 0;
  const screenShareClient = useRef(
    AgoraRTC.createClient({ codec: "h264", mode: "rtc" })
  );

  const meetingInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );
  const isCreator = useSelector(
    (state: RootState) => state.videocall.isScreenCreator
  );
  useEffect(() => {
    let data = JSON.stringify({
      status: ScreenShareStatusType.STARTED,
    });
    videoChatService
      .createScreenshareUser(meetingInfo.meetingId, data)
      .then((responses) => {
        console.log("API successful : ", responses);
        setScreenToken(responses.data.data.rtcToken);
        setScreenUserId(responses?.data?.data?.userId);
        console.log("Stream created: ", screenTrack);
      })
      .catch((error) => {
        console.log("Error occured during screen share api call : ", error);
        stopScreenSharing();
        errorToast(getErrorMessage(error?.response?.data));
      });

    return () => {
      stopScreenSharing();
    };
  }, []);

  const { screenTrack, isLoading, error } = useLocalScreenTrack(
    true,
    { encoderConfig: "720p", optimizationMode: "motion" },
    "auto"
  );

  console.log("Screen track : ", screenTrack);

  const { data: joinId, isConnected } = useJoin(
    {
      appid: meetingInfo.appId,
      channel: meetingInfo.channelName,
      token: screenToken,
      uid: parseInt(screenUserId),
    },
    screenToken !== "" && screenTrack !== null,
    screenShareClient.current
  );

  useEffect(() => {
    if (error) {
      setScreenSharing(false);
      stopScreenSharing();
    }
  }, [error, setScreenSharing]);

  const { isLoading: publishLoading, error: PublishError } = usePublish(
    Array.isArray(screenTrack) ? screenTrack : [screenTrack],
    screenTrack !== null && isJoined,
    screenShareClient.current
  );

  useEffect(() => {
    if (joinId && screeUserCount === 0) {
      console.log("Agora join successful- screenshare user: ");
      dispatch(updateScreenCreatorStatus(true));
      let data = JSON.stringify({
        status: ScreenShareStatusType.CONFIRMED,
      });
      videoChatService
        .createScreenshareUser(meetingInfo.meetingId, data)
        .then((ressp) => {
          screeUserCount++;
          setIsJoined(true);
          console.log("Response from screenshare - confirmation API : ", ressp);
        })
        .catch((error) => {
          console.log(
            "Error occured in screenshare - confirmation API :",
            error
          );
          stopScreenSharing();
          errorToast(getErrorMessage(error?.response?.data));
        });
      if (screenTrack) {
        screenShareClient.current.on("exception", (event) => {
          if (event.msg === "SEND_VIDEO_BITRATE_TOO_LOW") {
            console.log("Exception handling : ", event.msg, event.uid);
            if (screenTrack instanceof Array) {
              console.log("Exception handling if: ", event.uid);
              if (screenTrack[0].enabled === false)
                screenTrack[0].setEnabled(true);
            } else {
              console.log("Exception handling else: ", event.uid);
              if (screenTrack!?.enabled === false)
                screenTrack!?.setEnabled(true);
            }
          }
        });
        console.log(screenTrack);
        setIsScreenShared(true);
      }
      //   setScreenClientCopy(screenShareClient);
    }
  }, [joinId]);

  useEffect(() => {
    console.log("INSIDE CREATOR", screenTrack, isJoined, isCreator);
    if (screenTrack && isJoined && isCreator === false) {
      console.log("Screen sharing ended", screenTrack);
      if (screenTrack && isJoined && !isCreator) {
        stopScreenSharing();
      }
      if (screenTrack instanceof Array) {
        screenTrack[0].on("track-ended", () => {
          console.log("stop screen sharing");

          stopScreenSharing();
        });
      } else {
        screenTrack.on("track-ended", () => {
          console.log("stop screen sharing");
          stopScreenSharing();
        });
      }
    }
  }, [isCreator]);
  const stopScreenSharing = async () => {
    console.log(
      "Stop screen sharing : Screen stream & clientcopy : ",
      screenTrack,
      screenShareClient
    );
    if (screenTrack!) {
      if (screenTrack instanceof Array) {
        screenTrack[0]!?.stop();
        screenTrack[0]!?.close();
        screenTrack[1]!?.stop();
        screenTrack[1]!?.close();
      } else {
        screenTrack!?.stop();
        screenTrack!?.close();
      }
    }

    if (screenShareClient.current !== undefined) {
      let data = JSON.stringify({
        status: ScreenShareStatusType.STOPPED,
      });
      await videoChatService.createScreenshareUser(meetingInfo.meetingId, data);
      screenShareClient?.current?.removeAllListeners();
      await screenShareClient?.current?.leave();
    }
    setScreenSharingEnabled(false);
    setScreenToken("");
    setScreenUserId("");
    setScreenSharing(false);
    setIsJoined(false);
    setIsScreenShared(false);

    dispatch(updateScreenCreatorStatus(false));
  };
  if (screenTrack instanceof Array) {
    screenTrack[0].on("track-ended", () => {
      console.log("stop screen sharing");

      stopScreenSharing();
    });
  } else {
    screenTrack!?.on("track-ended", () => {
      console.log("stop screen sharing");
      stopScreenSharing();
    });
  }

  if (isLoading) {
    return;
  }

  return <></>;
};
export default Screenshare;
