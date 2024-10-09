import { cleanup, renderHook } from "@testing-library/react";

import AgoraRTC from "agora-rtc-react";
import VirtualBackgroundExtension from "agora-extension-virtual-background";
import useVirtualBackground from "../useVirtualBackground";

jest.mock("agora-extension-virtual-background", () => {
  const mockConstructor = jest.fn().mockImplementation(() => ({
    checkCompatibility: jest.fn(),
    createProcessor: jest.fn().mockReturnValue({
      init: jest.fn(),
      setOptions: jest.fn(),
      enable: jest.fn(),
      disable: jest.fn(),
    }),
  }));

  return mockConstructor;
});

jest.mock("agora-rtc-react", () => {
  return {
    AgoraRTC: {
      createClient: () => jest.fn().mockReturnValue(() => ({})),
    },
    registerExtensions: () => jest.fn().mockReturnValue(() => ({})),
    createCameraVideoTrack: () =>
      jest.fn().mockReturnValue(() => ({
        pipe: jest.fn(),
        processorDestination: jest.fn(),
      })),
  };
});

describe("useVirtualBackground hook", () => {
  beforeEach(() => {
    cleanup();
  });

  it("setBackgroundBlur", async () => {
    VirtualBackgroundExtension.prototype.checkCompatibility = jest
      .fn()
      .mockImplementation(() => true);
    const mockVideoTrack = await AgoraRTC.createCameraVideoTrack();

    const {
      result: {
        current: { setBackgroundBlur },
      },
    } = renderHook(() => useVirtualBackground());

    await setBackgroundBlur(mockVideoTrack);
  });

  it("removeBackgroundBlur", async () => {
    const mockVideoTrack = await AgoraRTC.createCameraVideoTrack();

    VirtualBackgroundExtension.prototype.checkCompatibility = jest
      .fn()
      .mockImplementation(() => true);

    const {
      result: {
        current: { removeBackgroundBlur },
      },
    } = renderHook(() => useVirtualBackground());

    await removeBackgroundBlur(mockVideoTrack);
  });
});
