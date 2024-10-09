import { render, act } from "@testing-library/react";
import React from "react";
import VideoCallDuration from "../VideoCallDuration";
import AppTheme from "../../../../../theme";
import moment from "moment";

jest.useFakeTimers();

describe("VideoCallDuration", () => {
  it("renders without crashing", () => {
    const now = moment(); // Current time
    const startTime = now.clone().subtract(5, "hours").subtract(20, "minutes"); // 5 hours from now

    render(
      <AppTheme>
        <VideoCallDuration startTime={startTime.toString()} duration={60} />
      </AppTheme>
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  it("displays the elapsed time correctly", () => {
    const startTime = moment(); // Current time
    const duration = 60;

    const { getByText } = render(
      <AppTheme>
        <VideoCallDuration
          startTime={startTime.toISOString()}
          duration={duration}
        />
      </AppTheme>
    );

    // Advance timers by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check if the rendered component displays the correct elapsed time
    // Add your assertion here
  });

  it("displays error color if elapsed time exceeds duration", () => {
    const startTime = "2024-02-29T10:00:00";
    const duration = 60;
    render(
      <AppTheme>
        <VideoCallDuration startTime={startTime} duration={duration} />
      </AppTheme>
    );
  });
});
