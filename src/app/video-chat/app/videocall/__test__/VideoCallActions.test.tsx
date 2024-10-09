import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import VideoCallActions from "../VideoCallActions";
import { useDispatch, useSelector } from "react-redux";
import { videoChatService } from "@/common/apiUrls";
import moment from "moment";
import AppTheme from "@/theme";

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
    ICameraVideoTrack: jest.fn().mockReturnValue({
      stop: jest.fn(),
      close: jest.fn(),
    }),
    IMicrophoneAudioTrack: jest.fn(),
    createCameraVideoTrack: jest.fn(),
    createMicrophoneAudioTrack: jest.fn(),
    registerExtensions: jest.fn(),
    createProcessor: jest.fn(),
    getDevices: jest.fn().mockResolvedValue([
      { kind: "audioinput", deviceId: "mock-audio-device-id" },
      { kind: "videoinput", deviceId: "mock-video-device-id" },
    ]),
    TrackBoundary: jest.fn(() => <></>),
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
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;
jest.mock("@/common/apiUrls", () => ({
  videoChatService: {
    getAgoraChatHistory: jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    ),
  },
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

jest.mock("../modal/SettingsModal", () => {
  const MockComponent = () => <div>Settings Modal</div>;
  return MockComponent;
});

describe("VideoCallActions", () => {
  beforeAll(async () => {
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
    await act(async () => {
      (videoChatService.getAgoraChatHistory as any).mockResolvedValue({
        data: {},
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });

  // Mock props
  const currentUser = {
    hasAudio: true,
    hasVideo: true,
    audio: null,
    video: null,
    id: "mock-id",
    type: "mock-type",
    name: "mock-name",
  };

  const channelInfo = {
    // Mock channelInfo data
  };

  const controls = {
    micStatus: true,
    cameraStatus: true,
    blurStatus: false,
    isSettingsOpen: false,
  };
  const chatHistory = [
    {
      senderId: "b53291bad03a4509b7d654202200d8f8",
      message: "fdgdfh",
      timestamp: "2024-03-01T10:18:42.598179",
      chatType: "1",
      messageId: "54ebbfaa7d934da7bd752b4a2d43e91b",
      senderName: "dcfxbvb",
      senderType: "1",
      messageType: 0,
      ng: false,
    },
    {
      senderId: "b53291bad03a4509b7d654202200d8f8",
      message: "fdgdfh",
      timestamp: "2024-03-01T10:18:42.598179",
      chatType: "1",
      messageId: "54ebbfaa7d934da7bd752b4a2d43e91b",
      senderName: "dcfxbvb",
      senderType: "10",
      messageType: 0,
      ng: false,
    },
    {
      senderId: "b53291bad03a4509b7d654202200d8f8",
      message: "dgfdg",
      timestamp: "2024-03-01T10:18:40.793165",
      chatType: "1",
      messageId: "a4aeb50dcdfd4e9eaa4324aaa14a3257",
      senderName: "dcfxbvb",
      senderType: "2",
      messageType: 0,
      ng: false,
    },
    {
      senderId: "b53291bad03a4509b7d654202200d8f8",
      message: "fgfdg",
      timestamp: "2024-03-01T10:18:39.426535",
      chatType: "1",
      messageId: "28e91671b6284afab399a098eb1e57e2",
      senderName: "dcfxbvb",
      senderType: "0",
      messageType: 0,
      ng: false,
    },
    {
      senderId: "b53291bad03a4509b7d654202200d8f8",
      message: "gfdg",
      timestamp: "2024-03-01T10:18:37.875333",
      chatType: "1",
      messageId: "e12aa48adebe4340bc09c90c3fea8e11",
      senderName: "dcfxbvb",
      senderType: "0",
      messageType: 0,
      ng: false,
    },
    {
      senderId: "6c0167a7a0a348a69108a0382aa0d6c3",
      message: "gfdg",
      timestamp: "2024-03-01T10:18:37.875333",
      chatType: "1",
      messageId: "e12aa48adebe4340bc09c90c3fea8e11",
      senderName: "dcfxbvb",
      senderType: "1",
      messageType: 0,
      ng: true,
    },
  ];
  const updateHistory = jest.fn(); // Mock function

  const audioTrack = null; // Mock audioTrack data
  const videoTrack = null; // Mock videoTrack data

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <VideoCallActions
          currentUser={currentUser}
          channelInfo={channelInfo}
          controls={controls}
          chatHistory={chatHistory}
          updateHistory={updateHistory}
          audioTrack={audioTrack}
          videoTrack={videoTrack}
          setBackgroundBlur={jest.fn()}
          removeBackgroundBlur={jest.fn()}
          setCurrentUser={jest.fn()}
          ref={{ current: null }}
        />
      </AppTheme>
    );
  });

  it("Drawer change ", () => {
    render(
      <AppTheme>
        <VideoCallActions
          currentUser={currentUser}
          channelInfo={channelInfo}
          controls={controls}
          chatHistory={chatHistory}
          updateHistory={updateHistory}
          audioTrack={audioTrack}
          videoTrack={videoTrack}
          setBackgroundBlur={jest.fn()}
          removeBackgroundBlur={jest.fn()}
          setCurrentUser={jest.fn()}
          ref={{ current: null }}
        />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("drawer-1"));
    fireEvent.click(screen.getByTestId("drawer-2"));
    fireEvent.click(screen.getByTestId("drawer-0"));
    fireEvent.click(screen.getByTestId("drawer-3"));
  });

  it("should be able to click all buttons", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoCallActions
            currentUser={currentUser}
            channelInfo={channelInfo}
            controls={controls}
            chatHistory={chatHistory}
            updateHistory={updateHistory}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
            setCurrentUser={jest.fn()}
            ref={{ current: null }}
          />
        </AppTheme>
      );
    });

    const buttons = screen.getAllByRole("button");
    await waitFor(() => {
      buttons.forEach((button) => {
        fireEvent.click(button);
      });
    });
  });

  it("micStatus false", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoCallActions
            currentUser={currentUser}
            channelInfo={channelInfo}
            controls={{ ...controls, micStatus: false }}
            chatHistory={chatHistory}
            updateHistory={updateHistory}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
            setCurrentUser={jest.fn()}
            ref={{ current: null }}
          />
        </AppTheme>
      );
    });
  });

  it("cameraStatus false", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoCallActions
            currentUser={currentUser}
            channelInfo={channelInfo}
            controls={{ ...controls, cameraStatus: false }}
            chatHistory={chatHistory}
            updateHistory={updateHistory}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
            setCurrentUser={jest.fn()}
            ref={{ current: null }}
          />
        </AppTheme>
      );
    });
  });

  it("blurStatus true", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoCallActions
            currentUser={currentUser}
            channelInfo={channelInfo}
            controls={{ ...controls, blurStatus: true }}
            chatHistory={chatHistory}
            updateHistory={updateHistory}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
            setCurrentUser={jest.fn()}
            ref={{ current: null }}
          />
        </AppTheme>
      );
    });
  });

  it("isSettingsOpen true", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <VideoCallActions
            currentUser={currentUser}
            channelInfo={channelInfo}
            controls={{ ...controls, isSettingsOpen: true }}
            chatHistory={chatHistory}
            updateHistory={updateHistory}
            audioTrack={audioTrack}
            videoTrack={videoTrack}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
            setCurrentUser={jest.fn()}
            ref={{ current: null }}
          />
        </AppTheme>
      );
    });
  });

  // Add more test cases for other functionalities as needed
});
