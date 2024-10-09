import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import WaitingScreen from "../WaitingScreen";
import AppTheme from "../../../../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { act } from "react-dom/test-utils";
import AgoraRTC from "agora-rtc-react";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("agora-rtm-sdk", () => {
  return {
    AgoraRTM: {
      RTM: jest.fn(),
      getDevices: jest.fn().mockResolvedValue([
        { kind: "audioinput", deviceId: "mock-audio-device-id" },
        { kind: "videoinput", deviceId: "mock-video-device-id" },
      ]),
    },
    RTMClient: jest.fn(),
    RTMEvents: jest.fn(),
  };
});
jest.mock("agora-rtc-react", () => {
  return {
    getDevices: jest.fn().mockResolvedValue([
      { kind: "audioinput", deviceId: "mock-audio-device-id" },
      { kind: "videoinput", deviceId: "mock-video-device-id" },
    ]),
    ICameraVideoTrack: jest.fn().mockReturnValue({
      stop: jest.fn(),
      close: jest.fn(),
    }),
    setArea: jest.fn(),
    IMicrophoneAudioTrack: jest.fn(),
    createCameraVideoTrack: jest.fn(() => Promise.resolve("")),
    createMicrophoneAudioTrack: jest.fn(() => Promise.resolve("")),
    registerExtensions: jest.fn(),
    createProcessor: jest.fn(),
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
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const now = moment(); // Current time
const startTime = now.clone().subtract(5, "minutes"); // 5 minutes ago
const endTime = now.clone().add(5, "minutes"); // 5 minutes ahead

const temporaryChannelInfo = {
  appId: "765b5fbbb5f4496cbdf8128646dd8fbd",
  channelName: "633742310",
  token:
    "006765b5fbbb5f4496cbdf8128646dd8fbdIADVDepf98bns9nZZxWxLzrW5+e6JEQX92/DVlAL/C5/pQkzvvjkxtslIgBJa/wEpXXhZQQAAQA1MuBlAgA1MuBlAwA1MuBlBAA1MuBl",
  startTime: startTime.toISOString(),
  endTime: endTime.toISOString(),
  meetingId:
    "88bd82f30e614df39c1568d7b8d0215b-c0abef3c9cdd49aaa89e89e9fccb9e5e",
  participantId: "6c0167a7a0a348a69108a0382aa0d6c3",
  campaignId: "88bd82f30e614df39c1568d7b8d0215b",
};

describe("WaitingScreen component", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
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
              localTracks: {
                audioTrack: {
                  _events: {
                    "update-track-source": [
                      {
                        once: false,
                      },
                    ],
                    "transceiver-updated": [],
                    "@need_close": [],
                    closed: [],
                  },
                  _ID: "track-mic-1b4ef28f",
                  _hints: [],
                  _isClosed: true,
                  _originMediaStreamTrack: null,
                  _mediaStreamTrack: {},
                  _external: {},
                  _enabled: true,
                  _muted: false,
                  _isExternalTrack: false,
                  _enabledMutex: null,
                  trackMediaType: "audio",
                  _encoderConfig: {
                    sampleRate: 48000,
                    stereo: false,
                  },
                  _trackSource: {
                    _events: {
                      update_source: [
                        {
                          once: false,
                        },
                      ],
                    },
                    outputNode: {},
                    isPlayed: false,
                    context: {},
                    audioOutputLevel: 0,
                    volumeLevelAnalyser: {
                      context: {},
                      analyserNode: {},
                      sourceNode: {},
                    },
                    playNode: {},
                    isDestroyed: true,
                    isNoAudioInput: false,
                    _noAudioInputCount: 0,
                    sourceNode: {},
                    track: {},
                    audioElement: {},
                    isCurrentTrackCloned: false,
                    isRemoteTrack: false,
                  },
                  _volume: 100,
                  _useAudioElement: false,
                  _bypassWebAudio: false,
                  _processorContext: {
                    _events: {},
                    constraintsMap: {},
                    statsRegistry: [],
                    audioContext: {},
                    trackId: "track-mic-1b4ef28f",
                    direction: "local",
                    usageRegistry: [],
                    _chained: false,
                  },
                  _processorDestination: {
                    _events: {},
                    name: "AudioProcessorDestination",
                    ID: "0",
                    audioProcessorContext: {
                      _events: {},
                      constraintsMap: {},
                      statsRegistry: [],
                      audioContext: {},
                      trackId: "track-mic-1b4ef28f",
                      direction: "local",
                      usageRegistry: [],
                      _chained: false,
                    },
                  },
                  _getOriginVolumeLevel: false,
                  _config: {
                    encoderConfig: "music_standard",
                  },
                  _deviceName: "Default",
                  _constraints: {
                    channelCount: 1,
                    sampleRate: 48000,
                  },
                  _originalConstraints: {
                    channelCount: 1,
                    sampleRate: 48000,
                  },
                },
                videoTrack: {
                  pipe: () => ({
                    pipe: () => {},
                  }),
                  _events: {
                    "transceiver-updated": [],
                    "@need_close": [],
                    closed: [],
                  },
                  _ID: "track-cam-c87cfbff",
                  _hints: [],
                  _isClosed: true,
                  _originMediaStreamTrack: null,
                  _mediaStreamTrack: {},
                  _external: {},
                  _enabled: true,
                  _muted: false,
                  _isExternalTrack: false,
                  _enabledMutex: null,
                  trackMediaType: "video",
                  isUseScaleResolutionDownBy: false,
                  _videoVisibleTimer: null,
                  _statsTimer: null,
                  _encoderConfig: {
                    width: 640,
                    height: 480,
                    frameRate: 15,
                    bitrateMin: 100,
                    bitrateMax: 500,
                  },
                  _scalabilityMode: {
                    numSpatialLayers: 1,
                    numTemporalLayers: 1,
                  },
                  _videoHeight: 480,
                  _videoWidth: 640,
                  processorDestination: {
                    _events: {},
                    name: "VideoProcessorDestination",
                    ID: "0",
                    videoContext: {
                      _events: {},
                      constraintsMap: {},
                      statsRegistry: [],
                      usageRegistry: [],
                      trackId: "track-cam-c87cfbff",
                      direction: "local",
                      _chained: false,
                    },
                  },
                  _processorContext: {
                    _events: {},
                    constraintsMap: {},
                    statsRegistry: [],
                    usageRegistry: [],
                    trackId: "track-cam-c87cfbff",
                    direction: "local",
                    _chained: false,
                  },
                  _config: {},
                  _originalConstraints: {
                    width: 640,
                    height: 480,
                    frameRate: 15,
                  },
                  _constraints: {
                    width: 640,
                    height: 480,
                    frameRate: 15,
                  },
                  _deviceName: "Integrated Webcam (0c45:6730)",
                },
              },
              userType: "",
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
            screening: [
              {
                question: "",
                answers: [],
                type: "",
              },
            ],
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
          },
        })
    );
    (AgoraRTC.createMicrophoneAudioTrack as any).mockResolvedValue("Test77");
    (AgoraRTC.createCameraVideoTrack as any).mockResolvedValue("Test77");
  });

  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });

  it("renders without crashing", () => {
    act(() => {
      render(
        <AppTheme>
          <WaitingScreen />
        </AppTheme>
      );
    });
  });

  it("toggles background blur when background blur switch is toggled", () => {
    (AgoraRTC.createMicrophoneAudioTrack as any).mockResolvedValue("Test77");
    (AgoraRTC.createCameraVideoTrack as any).mockResolvedValue("Test77");
    render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );

    const mintSwitch = screen.getByLabelText("controlled-camera");

    fireEvent.click(mintSwitch);
  });

  it("toggles video camera ", () => {
    render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );

    const mintSwitch = screen.getByLabelText("controlled-blur");
    fireEvent.click(mintSwitch);
    fireEvent.click(mintSwitch);
  });

  it("toggles mic camera ", () => {
    const { getByTestId } = render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );
    const mintSwitch = screen.getByLabelText("controlled-mic");
  });

  it("change nick name and submit mic camera ", () => {
    render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );

    const inputElement = screen.getByTestId("nickname");
    const joinButton = screen.getByTestId("video-join-button");
    fireEvent.change(inputElement, { target: { value: "NewNickname" } });
    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.change(inputElement, { target: { value: "NewNickname" } });
    fireEvent.click(joinButton);
  });

  it("Join video as back room member", () => {
    render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );

    const inputElement = screen.getByTestId("nickname");
    const joinButton = screen.getByTestId("video-join-button-back-room");
    fireEvent.change(inputElement, { target: { value: "NewNickname" } });
    fireEvent.click(joinButton);
  });

  it(" submit with empty data", () => {
    render(
      <AppTheme>
        <WaitingScreen />
      </AppTheme>
    );

    const joinButton = screen.getByTestId("video-join-button");
    fireEvent.click(joinButton);
  });

  // Add more tests for interaction handling, such as settings modal opening/closing, joining interview room, etc.
});
