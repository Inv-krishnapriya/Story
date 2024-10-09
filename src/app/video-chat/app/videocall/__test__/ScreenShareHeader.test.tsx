import { render } from "@testing-library/react";
import ScreenShareHeader from "../ScreenShareHeader";
import AppTheme from "@/theme";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("ScreenShareHeader", () => {
  const mockRemoteUsersInfo = [
    { agoraUserId: "userId1", displayName: "User1", role: "0" },
    { agoraUserId: "userId2", displayName: "User2", role: "1" },
    { agoraUserId: "userId2", displayName: "User2", role: "2" },
    { agoraUserId: "userId2", displayName: "User2", role: "3" },
  ];
  beforeAll(() => {
    const mockDispatch = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {},
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
  it("renders screen sharing info correctly", () => {
    render(
      <AppTheme>
        <ScreenShareHeader
          remoteUsersInfo={mockRemoteUsersInfo}
          isCreator={false}
        />
      </AppTheme>
    );
  });

  it("renders stop screen sharing button if user is creator", () => {
    const { getByText } = render(
      <AppTheme>
        <ScreenShareHeader
          remoteUsersInfo={mockRemoteUsersInfo}
          isCreator={true}
        />
      </AppTheme>
    );
    const stopButton = getByText("screenshare-header.stop-screen-sharing");
    expect(stopButton).toBeInTheDocument();
  });

  it("does not render stop screen sharing button if user is not creator", () => {
    const { queryByText } = render(
      <AppTheme>
        <ScreenShareHeader
          remoteUsersInfo={mockRemoteUsersInfo}
          isCreator={false}
        />
      </AppTheme>
    );
    const stopButton = queryByText("screenshare-header.stop-screen-sharing");
    expect(stopButton).toBeNull();
  });
});
