import { IRemoteProfile, TChatHistoryType } from "@/common/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";

export type TTrackTypeProps = {
  videoTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
};

export type TTrackDevices = {
  audioInput: string;
  videoInput: string;
  audioOutput: string;
};

interface IMeetingData {
  appId: string;
  channelName: string;
  rtcToken: string;
  rtmToken: string;
  userId: string;
  campaignTitle: string;
  implementationPeriod: string;
  interviewDuration: string;
  userName: string;
  userType: string;
  devices: TTrackDevices;
}

interface IVideoCallProps {
  isTimeExceeded: boolean;
  isDrawerOpened: boolean;
}

interface IMnitorInfo {
  name: string;
  gender: string;
  prefecture: string;
}

interface IScreeningInfo {
  question: string;
  answers: any[];
  type: string;
}

export interface IcontrolsProps {
  micStatus: boolean;
  cameraStatus: boolean;
  blurStatus: boolean;
  isSettingsOpen: boolean;
}

interface IMeetingProps {
  meetingData: IMeetingData;
  videoCallParams: IVideoCallProps;
  monitorInfo: IMnitorInfo;
  screening: IScreeningInfo[];
  controls: IcontrolsProps;
  isRecording: boolean;
  remoteUsersInfo: IRemoteProfile[];
  remoteUsers: IAgoraRTCRemoteUser[];
  isFullscreen: boolean;
  isScreenCreator: boolean;
  chatHistory: TChatHistoryType[];
  feedbackStatus: boolean;
  reportStatus: boolean;
}

const initialState: IMeetingProps = {
  meetingData: {
    appId: "",
    channelName: "",
    rtcToken: "",
    rtmToken: "",
    userId: "",
    campaignTitle: "",
    implementationPeriod: "",
    interviewDuration: "",
    userName: "",
    userType: "",
    devices: {
      audioInput: "",
      videoInput: "",
      audioOutput: "",
    },
  },
  videoCallParams: {
    isTimeExceeded: false,
    isDrawerOpened: true,
  },
  monitorInfo: {
    name: "",
    gender: "",
    prefecture: "",
  },
  screening: [],
  controls: {
    micStatus: false,
    cameraStatus: false,
    blurStatus: false,
    isSettingsOpen: false,
  },
  isRecording: false,
  remoteUsersInfo: [
    {
      agoraUserId: "",
      displayName: "",
      role: "",
    },
  ],
  remoteUsers: [
    {
      uid: "",
      hasAudio: false,
      hasVideo: false,
      audioTrack: undefined,
      videoTrack: undefined,
    },
  ],
  isFullscreen: false,
  isScreenCreator: false,
  chatHistory: [],
  feedbackStatus: false,
  reportStatus: false,
};

const slice = createSlice({
  name: "videocall",
  initialState,
  reducers: {
    setMeetingDetails: (state, action) => {
      console.log(action.payload);
      state.meetingData = action.payload;
    },
    setCallParams: (state, action) => {
      state.videoCallParams.isTimeExceeded = action.payload;
    },
    setDrawerOpenStatusChange: (state, action) => {
      state.videoCallParams.isDrawerOpened = action.payload;
    },
    setMonitorInfo: (state, action) => {
      state.monitorInfo = action.payload;
    },
    setScreeningData: (state, action) => {
      state.screening = action.payload;
    },
    setControls: (state, action) => {
      console.log(action.payload);
      if (Object.keys(action.payload).length === 1) {
        let keyToUpdate = Object.keys(action.payload)[0];
        const value = action.payload[keyToUpdate];

        state.controls = { ...state.controls, [keyToUpdate]: value };
      } else {
        state.controls = action.payload;
      }
    },
    updateRecordingStatus: (state, action) => {
      state.isRecording = action.payload;
    },
    updateRemoteUsersInfo: (state, action) => {
      console.log("Payload info: ", action.payload);

      return {
        ...state,
        remoteUsersInfo: [...action.payload],
      };
    },
    updateRemoteUsers: (state, action) => {
      console.log("Payload users : ", action.payload);
      return {
        ...state,
        remoteUsers: [...action.payload],
      };
    },
    updateFullscreenStatus: (state, action) => {
      state.isFullscreen = action.payload;
    },
    updateScreenCreatorStatus: (state, action) => {
      state.isScreenCreator = action.payload;
    },
    updateChatHistory: (state, action) => {
      console.log("Message data from store: ", action.payload);
      if (action.payload.type === true) {
        return {
          ...state,
          chatHistory: action.payload.data,
        };
      } else {
        if (action.payload.timestamp !== "") {
          return {
            ...state,
            chatHistory: [...state.chatHistory, ...action.payload.data],
          };
        } else {
          return {
            ...state,
            chatHistory: [action.payload.data, ...state.chatHistory],
          };
        }
      }
    },
    updateFeedbackStatus: (state, action) => {
      state.feedbackStatus = action.payload;
    },
    updateReportStatus: (state, action) => {
      state.reportStatus = action.payload;
    },
    resetMeetingDetails: (state) => {
      state.videoCallParams = initialState.videoCallParams;
      state.monitorInfo = initialState.monitorInfo;
      state.screening = [];
      // state.isRecording = initialState.isRecording;
      state.remoteUsersInfo = initialState.remoteUsersInfo;
      state.remoteUsers = initialState.remoteUsers;
      state.isFullscreen = initialState.isFullscreen;
      state.isScreenCreator = initialState.isScreenCreator;
      state.chatHistory = initialState.chatHistory;
    },
    resetChatHistory: (state) => {
      state.chatHistory = initialState.chatHistory;
    },
  },
});

export const {
  setMeetingDetails,
  setCallParams,
  setDrawerOpenStatusChange,
  setMonitorInfo,
  setScreeningData,
  setControls,
  updateRecordingStatus,
  updateRemoteUsersInfo,
  updateRemoteUsers,
  updateFullscreenStatus,
  updateScreenCreatorStatus,
  updateChatHistory,
  updateFeedbackStatus,
  updateReportStatus,
  resetMeetingDetails,
  resetChatHistory,
} = slice.actions;
export default slice.reducer;
