import AppTheme from "../../../../../../theme";
import { fireEvent, getByRole, render } from "@testing-library/react";
import SettingsModal from "../SettingsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("agora-rtm-sdk", () => {
  return {
    AgoraRTM: {
      RTM: jest.fn(),
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
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const selectorOne = {
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
};

const selectorTwo = {
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
};

describe("Settings modal", () => {
  describe("SettingsModal Test", () => {
    beforeAll(() => {
      const mockDispatch = jest.fn();

      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) => selector(selectorTwo)
      );
    });

    afterAll(() => {
      jest.clearAllMocks(); // Clear all mocks
    });

    it("renders correctly with open prop", () => {
      const onClose = jest.fn();
      const audioDevices: any = [];
      const videoDevices: any = [];
      const speakerDevices: any = [];
      const selectedAudioDevice = "";
      const selectedVideoDevice = "";
      const selectedSpeakerDevice = "";
      const handleAudioDeviceChange = jest.fn();
      const handleVideoDeviceChange = jest.fn();
      const handleSpeakerDeviceChange = jest.fn();

      const { getByText, getByLabelText } = render(
        <AppTheme>
          <SettingsModal
            open
            onClose={onClose}
            audioDevices={audioDevices}
            videoDevices={videoDevices}
            speakerDevices={speakerDevices}
            selectedAudioDevice={selectedAudioDevice}
            selectedVideoDevice={selectedVideoDevice}
            selectedSpeakerDevice={selectedSpeakerDevice}
            handleAudioDeviceChange={handleAudioDeviceChange}
            handleVideoDeviceChange={handleVideoDeviceChange}
            handleSpeakerDeviceChange={handleSpeakerDeviceChange}
            audioTrack={null}
            videoTrack={null}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
          />
        </AppTheme>
      );

      expect(getByText("settings-modal.title")).toBeInTheDocument();
      expect(getByLabelText("controlled")).toBeInTheDocument();
      const mintSwitch = getByLabelText("controlled");
      fireEvent.click(mintSwitch);
    });
  });

  describe("SettingsModal Test un blur", () => {
    beforeAll(() => {
      const mockDispatch = jest.fn();

      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) => selector(selectorOne)
      );
    });
    afterAll(() => {
      jest.clearAllMocks(); // Clear all mocks
    });
    it("renders correctly with open prop", () => {
      const onClose = jest.fn();
      const audioDevices: any = [];
      const videoDevices: any = [];
      const speakerDevices: any = [];
      const selectedAudioDevice = "";
      const selectedVideoDevice = "";
      const selectedSpeakerDevice = "";
      const handleAudioDeviceChange = jest.fn();
      const handleVideoDeviceChange = jest.fn();
      const handleSpeakerDeviceChange = jest.fn();

      const { getByText, getByLabelText } = render(
        <AppTheme>
          <SettingsModal
            open
            onClose={onClose}
            audioDevices={audioDevices}
            videoDevices={videoDevices}
            speakerDevices={speakerDevices}
            selectedAudioDevice={selectedAudioDevice}
            selectedVideoDevice={selectedVideoDevice}
            selectedSpeakerDevice={selectedSpeakerDevice}
            handleAudioDeviceChange={handleAudioDeviceChange}
            handleVideoDeviceChange={handleVideoDeviceChange}
            handleSpeakerDeviceChange={handleSpeakerDeviceChange}
            audioTrack={null}
            videoTrack={null}
            setBackgroundBlur={jest.fn()}
            removeBackgroundBlur={jest.fn()}
          />
        </AppTheme>
      );

      expect(getByText("settings-modal.title")).toBeInTheDocument();
      expect(getByLabelText("controlled")).toBeInTheDocument();
      const mintSwitch = getByLabelText("controlled");
      fireEvent.click(mintSwitch);
    });
  });
});
