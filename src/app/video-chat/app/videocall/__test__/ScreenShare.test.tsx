import React from "react";
import { render, waitFor } from "@testing-library/react";

import { useDispatch, useSelector } from "react-redux";
import Screenshare from "../ScreenShare";
import moment from "moment";
import AppTheme from "../../../../../theme";
import AgoraRTC, { useJoin, useLocalScreenTrack } from "agora-rtc-react";
// Mock the useDispatch and useSelector hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("agora-rtc-react", () => {
  return {
    AgoraRTC: {
      createClient: () =>
        jest.fn().mockReturnValue(() => ({ removeAllListeners: jest.fn() })),
    },
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
    usePublish: jest.fn().mockReturnValue(() => ({ isLoading: false })),
    useRTCClient: jest.fn(),
    useRemoteAudioTracks: jest
      .fn()
      .mockReturnValue(() => ({ audioTracks: [] })),
    useRemoteUsers: jest.fn(),
    useLocalScreenTrack: jest.fn().mockReturnValue(() => ({
      screenTrack: [],
      isLoading: false,
      error: "test",
    })),
    createClient: () => ({
      removeAllListeners: jest.fn(),
      leave: jest.fn(),

      on: jest.fn(function (eventName: string, callback: Function) {
        callback({
          msg: "SEND_VIDEO_BITRATE_TOO_LOW",
        });
      }),
    }),
    getDevices: jest.fn().mockResolvedValue([
      { kind: "audioinput", deviceId: "mock-audio-device-id" },
      { kind: "videoinput", deviceId: "mock-video-device-id" },
    ]),
  };
});

jest.mock("agora-rtm-sdk", () => {
  const mockRTMClient = {
    __esModule: true,
    default: jest.fn(),
  };

  const mockRTMEvents = {
    __esModule: true,
    default: jest.fn(),
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
  });

  return {
    RTM: mockRTMConstructor,
    RTMClient: mockRTMClient,
    RTMEvents: mockRTMEvents,
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
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});
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
describe("Screenshare component", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    (useJoin as any).mockReturnValue({ isConnected: true });
    (useLocalScreenTrack as any).mockReturnValue({
      screenTrack: {
        on: jest.fn(function (eventName: string, callback: Function) {
          callback({
            msg: "SEND_VIDEO_BITRATE_TOO_LOW",
          });
        }),

        stop: jest.fn(),
        close: jest.fn(),
      },
      isLoading: false,
      error: "test",
    });

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
  });
  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });
  test("renders properly", async () => {
    // Mock necessary Redux state and functions

    // Render the component
    const { getByText } = render(
      <AppTheme>
        <Screenshare
          isScreenShared={false}
          screenSharingEnabled={true}
          setScreenSharingEnabled={() => {}}
          setIsScreenShared={() => {}}
        />
      </AppTheme>
    );
  });
});
describe("Screenshare component", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    (useJoin as any).mockReturnValue({ isConnected: true });
    (useLocalScreenTrack as any).mockReturnValue({
      screenTrack: [
        {
          on: jest.fn(function (eventName: string, callback: Function) {
            callback({
              msg: "SEND_VIDEO_BITRATE_TOO_LOW",
            });
          }),
          stop: jest.fn(),
          close: jest.fn(),
          setEnabled: jest.fn(),
        },
        {
          on: jest.fn(function (eventName: string, callback: Function) {
            callback({
              msg: "SEND_VIDEO_BITRATE_TOO_LOW",
            });
          }),
          stop: jest.fn(),
          close: jest.fn(),
        },
      ],
      isLoading: true,
      error: "test",
    });

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
  });
  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });
  test("renders properly", async () => {
    // Mock necessary Redux state and functions

    // Render the component
    const { getByText } = render(
      <AppTheme>
        <Screenshare
          isScreenShared={false}
          screenSharingEnabled={true}
          setScreenSharingEnabled={() => {}}
          setIsScreenShared={() => {}}
        />
      </AppTheme>
    );
  });
});
describe("Screenshare component", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    (useJoin as any).mockReturnValue({ isConnected: true });
    (useLocalScreenTrack as any).mockReturnValue({
      screenTrack: [
        {
          on: jest.fn(function (eventName: string, callback: Function) {
            callback({
              msg: "SEND_VIDEO_BITRATE_TOO_LOW",
            });
          }),

          stop: jest.fn(),
          close: jest.fn(),
        },
      ],
      isLoading: false,
      error: "test",
    });

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
  });
  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });
  test("renders properly", async () => {
    // Mock necessary Redux state and functions

    // Render the component
    const { getByText } = render(
      <AppTheme>
        <Screenshare
          isScreenShared={false}
          screenSharingEnabled={true}
          setScreenSharingEnabled={() => {}}
          setIsScreenShared={() => {}}
        />
      </AppTheme>
    );
  });
});
