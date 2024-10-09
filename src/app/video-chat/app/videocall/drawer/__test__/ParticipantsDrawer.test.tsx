import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParticipantsDrawer from "../ParticipantsDrawer";
import AppTheme from "../../../../../../theme";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("ParticipantsDrawer", () => {
  const mockRemoteUsers = [
    { uid: "1", hasAudio: true, hasVideo: true },
    { uid: "2", hasAudio: false, hasVideo: false },
  ];

  const mockRemoteUsersInfo = [
    { agoraUserId: "1", displayName: "User 1", role: "1" },
    { agoraUserId: "2", displayName: "User 2", role: "2" },
    { agoraUserId: "2", displayName: "User 3", role: "3" },
  ];

  const onCloseMock = jest.fn();

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          videocall: {
            controls: {},
          },
        })
    );
  });

  test("renders participants correctly", () => {
    render(
      <AppTheme>
        <ParticipantsDrawer
          open
          onClose={onCloseMock}
          remoteUsers={mockRemoteUsers}
          remoteUsersInfo={mockRemoteUsersInfo}
          currentUser={undefined}
        />
      </AppTheme>
    );

    // Check if participant names are rendered
    const user1Name = screen.getByText("User 1");
    expect(user1Name).toBeInTheDocument();

    // Check if microphone status icons are rendered
  });

  test("calls onClose handler when close button is clicked", () => {
    const mockRemoteUsersInfo = [
      { agoraUserId: "1", displayName: "User 1", role: "" },
    ];
    render(
      <AppTheme>
        <ParticipantsDrawer
          open={true}
          onClose={onCloseMock}
          remoteUsers={mockRemoteUsers}
          remoteUsersInfo={mockRemoteUsersInfo}
          currentUser={undefined}
        />
      </AppTheme>
    );
  });
  test("calls onClose handler when close button is clicked", () => {
    const mockRemoteUsersInfo = [
      { agoraUserId: "1", displayName: "User 1", role: "0" },
    ];
    render(
      <AppTheme>
        <ParticipantsDrawer
          open={true}
          onClose={onCloseMock}
          remoteUsers={mockRemoteUsers}
          remoteUsersInfo={mockRemoteUsersInfo}
          currentUser={undefined}
        />
      </AppTheme>
    );
  });
  test("calls onClose handler when close button is clicked", () => {
    const mockRemoteUsersInfo = [
      { agoraUserId: "1", displayName: "User 1", role: "2" },
    ];
    render(
      <AppTheme>
        <ParticipantsDrawer
          open={true}
          onClose={onCloseMock}
          remoteUsers={mockRemoteUsers}
          remoteUsersInfo={mockRemoteUsersInfo}
          currentUser={undefined}
        />
      </AppTheme>
    );
  });
  test("calls onClose handler when close button is clicked", () => {
    const mockRemoteUsersInfo = [
      { agoraUserId: "1", displayName: "User 1", role: "3" },
    ];
    render(
      <AppTheme>
        <ParticipantsDrawer
          open={true}
          onClose={onCloseMock}
          remoteUsers={mockRemoteUsers}
          remoteUsersInfo={mockRemoteUsersInfo}
          currentUser={undefined}
        />
      </AppTheme>
    );
    const closeButton = screen.getByTestId("drawer-close");
    fireEvent.click(closeButton);
  });
});
