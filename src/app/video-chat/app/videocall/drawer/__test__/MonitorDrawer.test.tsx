import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MonitorDrawer from "../MonitorDrawer";
import AppTheme from "../../../../../../theme";

describe("MonitorDrawer", () => {
  const onCloseMock = jest.fn();
  const mockData = {
    name: "Test User",
    gender: "1",
    prefecture: "Tokyo",
  };
  const mockScreeningData = [
    {
      question: "Question 1",
      answers: ["Answer 1", "Answer 2"],
    },
    {
      question: "Question 2",
      answers: ["Answer 3", "Answer 4"],
    },
  ];
  const mockRemoteUsersInfo = [
    {
      agoraUserId: "123",
      displayName: "John Doe",
      role: "participant",
    },
    {
      agoraUserId: "123",
      displayName: "John Doe",
      role: "3",
    },
  ];

  test("renders MonitorDrawer component", () => {
    const { getByText } = render(
      <AppTheme>
        <MonitorDrawer
          open={true}
          onClose={onCloseMock}
          data={mockData}
          screeningData={mockScreeningData}
          remoteUsersInfo={mockRemoteUsersInfo}
        />
      </AppTheme>
    );

    expect(getByText("monitor-drawer.profile")).toBeInTheDocument();
    expect(getByText(/Test User/i)).toBeInTheDocument();
    expect(getByText(/Tokyo/i)).toBeInTheDocument();
    expect(getByText("monitor-drawer.screening")).toBeInTheDocument();
  });
  test("renders MonitorDrawer component", () => {
    const { getByText } = render(
      <AppTheme>
        <MonitorDrawer
          open={true}
          onClose={onCloseMock}
          data={{
            name: "Test User",
            gender: "2",
            prefecture: "Tokyo",
          }}
          screeningData={[
            {
              question: "Question 1",
              answers: ["Answer 1"],
            },
            {
              question: "Question 2",
              answers: ["Answer 3"],
            },
          ]}
          remoteUsersInfo={mockRemoteUsersInfo}
        />
      </AppTheme>
    );
    const closeButton = screen.getByTestId("drawer-close");
    fireEvent.click(closeButton);
  });
  test("renders MonitorDrawer component", () => {
    const { getByText } = render(
      <AppTheme>
        <MonitorDrawer
          open={true}
          onClose={onCloseMock}
          data={{
            name: "Test User",
            gender: null,
            prefecture: "Tokyo",
          }}
          screeningData={[
            {
              question: "Question 1",
              answers: ["Answer 1"],
            },
            {
              question: "Question 2",
              answers: ["Answer 3"],
            },
          ]}
          remoteUsersInfo={mockRemoteUsersInfo}
        />
      </AppTheme>
    );
    const closeButton = screen.getByTestId("drawer-close");
    fireEvent.click(closeButton);
  });
  test("renders MonitorDrawer component", () => {
    const { getByText } = render(
      <AppTheme>
        <MonitorDrawer
          open={true}
          onClose={onCloseMock}
          data={{
            name: "Test User",
            gender: "4",
            prefecture: "Tokyo",
          }}
          screeningData={[
            {
              question: "Question 1",
              answers: ["Answer 1"],
            },
            {
              question: "Question 2",
              answers: ["Answer 3"],
            },
          ]}
          remoteUsersInfo={[
            {
              agoraUserId: "123",
              displayName: "John Doe",
              role: "participant",
            },
          ]}
        />
      </AppTheme>
    );
    const closeButton = screen.getByTestId("drawer-close");
    fireEvent.click(closeButton);
  });
});
