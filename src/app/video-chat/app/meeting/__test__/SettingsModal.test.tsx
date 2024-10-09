import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SettingsModal from "../modal/SettingsModal";
import AppTheme from "@/theme";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("SettingsModal component", () => {
  const mockAudioDevices: MediaDeviceInfo[] = [
    {
      deviceId: "audio-device-1",
      groupId: "group-1",
      kind: "audioinput",
      label: "Audio Device 1",
      toJSON: jest.fn(), // Mock the toJSON method
    },
    {
      deviceId: "audio-device-2",
      groupId: "group-2",
      kind: "audioinput",
      label: "Audio Device 2",
      toJSON: jest.fn(), // Mock the toJSON method
    },
  ];

  const mockVideoDevices: MediaDeviceInfo[] = [
    {
      deviceId: "video-device-1",
      groupId: "group-1",
      kind: "videoinput",
      label: "Video Device 1",
      toJSON: jest.fn(), // Mock the toJSON method
    },
    {
      deviceId: "video-device-2",
      groupId: "group-2",
      kind: "videoinput",
      label: "Video Device 2",
      toJSON: jest.fn(), // Mock the toJSON method
    },
  ];

  const mockSpeakerDevices: MediaDeviceInfo[] = [
    {
      deviceId: "speaker-device-1",
      groupId: "group-1",
      kind: "audiooutput",
      label: "Speaker Device 1",
      toJSON: jest.fn(), // Mock the toJSON method
    },
    {
      deviceId: "speaker-device-2",
      groupId: "group-2",
      kind: "audiooutput",
      label: "Speaker Device 2",
      toJSON: jest.fn(), // Mock the toJSON method
    },
  ];

  const mockProps = {
    open: true,
    onClose: jest.fn(),
    audioDevices: mockAudioDevices,
    videoDevices: mockVideoDevices,
    speakerDevices: mockSpeakerDevices,
    selectedAudioDevice: "audio-device-1",
    selectedVideoDevice: "video-device-1",
    selectedSpeakerDevice: "speaker-device-1",
    handleAudioDeviceChange: jest.fn(),
    handleVideoDeviceChange: jest.fn(),
    handleSpeakerDeviceChange: jest.fn(),
  };

  it("renders with props", () => {
    const { getByText } = render(
      <AppTheme>
        <SettingsModal {...mockProps} />
      </AppTheme>
    );

    expect(getByText(/Video Device 1/i)).toBeInTheDocument();
  });

  it("calls onClose function when close button is clicked", () => {
    const { getByRole } = render(
      <AppTheme>
        <SettingsModal {...mockProps} />
      </AppTheme>
    );
    const closeButton = getByRole("button");

    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  // Add more test cases to cover interaction scenarios and edge cases
});
