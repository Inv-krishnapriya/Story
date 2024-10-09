import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ChatDrawer from "../ChatDrawer";
import AppTheme from "../../../../../../theme";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChatMessageSection from "../ChatMessageSection";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
// IntersectionObserver isn't available in test environment
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

Object.defineProperty(IntersectionObserver.prototype, "root", {
  get: jest.fn().mockReturnValue(null),
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
describe("ChatDrawer", () => {
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
              userType: "2",
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
              blurStatus: true,
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
            chatHistory: [
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
            ],

            feedbackStatus: false,
            reportStatus: false,
          },
        })
    );
  });

  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });
  const onCloseMock = jest.fn();
  const updateHistoryMock = jest.fn();

  const defaultProps = {
    open: true,
    onClose: onCloseMock,
    remoteUsers: [],
    nickName: "Test User",
    updateHistory: updateHistoryMock,
    remoteUsersInfo: [],
  };

  test("renders correctly", () => {
    const { getByText } = render(
      <AppTheme>
        <ChatMessageSection status={0} updateHistory={jest.fn()} />
      </AppTheme>
    );
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { value: "hi" },
    });
    const sendButton = screen.getByTestId("sent-message");
    fireEvent.click(sendButton);
  });
  test("renders correctly", () => {
    const { getByText } = render(
      <AppTheme>
        <ChatMessageSection status={1} updateHistory={jest.fn()} />
      </AppTheme>
    );
  });
  test("renders correctly", () => {
    const { getByText } = render(
      <AppTheme>
        <ChatMessageSection status={2} updateHistory={jest.fn()} />
      </AppTheme>
    );
  });
  test("renders correctly", () => {
    const { getByText } = render(
      <AppTheme>
        <ChatMessageSection status={10} updateHistory={jest.fn()} />
      </AppTheme>
    );
  });

  // Add more tests as needed to cover different functionalities of the component
});
