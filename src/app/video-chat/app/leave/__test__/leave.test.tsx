import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import UserLeftScreen from "../page";
import moment from "moment";
import AppTheme from "@/theme";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
const now = moment(); // Current time
const startTime = now.clone().subtract(5, "minutes"); // 5 minutes ago
const endTime = now.clone().add(30, "minutes"); // 30 minutes ahead

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

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Leave page", () => {
  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks
  });

  describe("UserLeftScreen", () => {
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
                interviewDuration: 30,
              },
            },
          })
      );
    });

    it("renders correctly", () => {
      renderWithTheme(<UserLeftScreen />);

      expect(
        screen.getByText("インタビュールームから退出しました")
      ).toBeInTheDocument();
    });

    it('rejoins when "再入室" button is clicked', () => {
      renderWithTheme(<UserLeftScreen />);

      Object.defineProperty(window, "location", {
        value: { href: "/video-chat/app/meeting" },
        writable: true,
      });

      fireEvent.click(screen.getByText("再入室"));
      expect(window.location.href).toBe("/video-chat/app/meeting");
    });

    it("report button", () => {
      renderWithTheme(<UserLeftScreen />);
      const reportButton = screen.getByText("問題を報告する");
      fireEvent.click(reportButton);
    });
  });
});
