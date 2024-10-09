import React from "react";
import { render, screen } from "@testing-library/react";

import { useDispatch, useSelector } from "react-redux";
import VideoCallScreen from "../VideoCallScreen";
import AgoraRTC, {
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import moment from "moment";
import AppTheme from "@/theme";
import { act } from "react-dom/test-utils";

jest.mock("agora-rtc-react", () => {
  return {
    setArea: jest.fn(),
    AgoraRTCProvider: jest.fn(({ children }: any) => <>{children}</>),
    IAgoraRTCClient: jest.fn(),
    LocalVideoTrack: jest.fn(),
    RemoteUser: jest.fn(),
    TrackBoundary: jest.fn(),
    useClientEvent: jest.fn(),
    useJoin: jest.fn().mockReturnValue(() => ({ isLoading: false })),
    useLocalCameraTrack: jest
      .fn()
      .mockReturnValue(() => ({ isLoading: false })),
    useLocalMicrophoneTrack: jest.fn(),
    usePublish: jest.fn(),
    useRTCClient: jest.fn(),
    useRemoteAudioTracks: jest
      .fn()
      .mockReturnValue(() => ({ audioTracks: [] })),
    useRemoteUsers: jest.fn(),
    createClient: () => jest.fn().mockReturnValue(() => ({})),
    getDevices: jest.fn().mockResolvedValue([
      {
        deviceId: "mocked-device-id",
        groupId: "mocked-group-id",
        kind: "mocked-kind",
        label: "mocked-label",
      },
    ]),
  };
});

jest.mock("agora-rtm-sdk", () => {
  const mockRTMClient = {
    __esModule: true,
    default: jest.fn(),
    current: jest.fn().mockReturnValue(() => ({
      removeEventListener: jest.fn(),
    })),
  };
  const mockedAreaCode = {
    ASIA: "ASIA",
  };

  const mockedConstantsType = {
    AreaCode: mockedAreaCode,
  };
  const mockRTMEvents = {
    __esModule: true,
    default: jest.fn(),
    setArea: jest.fn(),
  };

  const mockRTMConstructor = jest.fn().mockReturnValue({
    logout: jest.fn(),
    login: jest.fn(),
    subscribe: jest.fn(),
    addEventListener: jest.fn(function (eventName: string, callback: Function) {
      if (this.addEventListener) {
        this.addEventListener.mockImplementationOnce(
          (event: string, cb: Function) => {
            callback({
              customType: "",
              message: JSON.stringify({
                nickName: "Test user444",
                messageType: 0,
              }),
            });
          }
        );
      }
    }),
    removeEventListener: jest.fn(function (
      eventName: string,
      callback: Function
    ) {}),
  });

  return {
    AgoraRTM: {
      RTM: jest.fn().mockReturnValue({
        prototype: jest.fn(),
      }),
    },
    RTM: mockRTMConstructor,
    RTMClient: mockRTMClient,
    RTMEvents: mockRTMEvents,
    constantsType: mockedConstantsType,
    setArea: jest.fn(),
  };
});

jest.mock("agora-extension-virtual-background", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    checkCompatibility: jest.fn().mockReturnValue(true),
    createProcessor: () => ({
      setOptions: jest.fn(),
      enable: jest.fn(),
      init: jest.fn(),
      disable: jest.fn(),
    }),
  })),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"),
  }),
}));

jest.mock("@/common/apiUrls", () => ({
  videoChatService: {
    updateUserConfirmation: jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    ),
    getRemoteUserProfile: jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    ),
    leaveInterviewRoom: jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    ),
  },
}));

const now = moment();
const startTime = now.clone().subtract(5, "minutes");
const endTime = now.clone().add(5, "minutes");

const temporaryChannelInfo = {
  appId: "mocked-app-id",
  channelName: "mocked-channel-name",
  token: "mocked-token",
  startTime: startTime.toISOString(),
  endTime: endTime.toISOString(),
  meetingId: "mocked-meeting-id",
  participantId: "mocked-participant-id",
  campaignId: "mocked-campaign-id",
};

describe("VideoCallLayout", () => {
  beforeEach(() => {
    const mockLocalTrack = {
      stop: jest.fn(),
      close: jest.fn(),
    };

    const mockLoadingMic = false;
    const mockMicError = null;

    (useLocalMicrophoneTrack as any).mockReturnValue({
      isLoading: mockLoadingMic,
      localMicrophoneTrack: {
        ...mockLocalTrack,
        setDevice: jest.fn(),
      },
      error: mockMicError,
    });
    (useRemoteAudioTracks as any).mockReturnValue({
      audioTracks: [],
    });
    (useLocalCameraTrack as any).mockReturnValue({
      isLoading: mockLoadingMic,
      localCameraTrack: {
        mockLocalMicrophoneTrack: mockLocalTrack,
        setDevice: jest.fn(),
      },
      error: mockMicError,
    });

    (useRemoteUsers as jest.Mock).mockReturnValue([]);
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            temporaryChannelInfo: temporaryChannelInfo,
          },
          videocall: {
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
              userType: "2",
            },
            videoCallParams: {
              isTimeExceeded: false,
              isDrawerOpened: true,
            },
            controls: {
              micStatus: false,
              cameraStatus: false,
              blurStatus: false,
              isSettingsOpen: false,
            },
            isRecording: false,
            isFullscreen: false,
            isScreenCreator: false,
            feedbackStatus: false,
            reportStatus: false,
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
          },
        })
    );
  });

  it("should render properly", async () => {
    jest.spyOn(AgoraRTC, "setArea").mockReturnValue();

    await act(async () => {
      render(
        <AppTheme>
          <VideoCallScreen />
        </AppTheme>
      );
    });

    expect(
      screen.getByText("video-call-header.implementation-time")
    ).toBeInTheDocument();
  });
});
