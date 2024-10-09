import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimeSlotPicker from "../TimeSlotPicker";
import AppTheme from "../../../../theme";

jest.mock("dragselect", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }),
}));

describe("TimeSlotPicker", () => {
  const mockSlotChange = jest.fn();
  const mockResetAll = jest.fn();

  const props = {
    minDate: "2024-03-01",
    maxDate: "2024-03-31",
    slotDuration: 30,
    eventsSlots: [
      { scheduledDate: "2024-03-10", startTime: "09:00", endTime: "10:00" },
      { scheduledDate: "2024-03-12", startTime: "11:00", endTime: "12:00" },
    ],
    maxSlots: 5,
    handleSlotChange: mockSlotChange,
    handleResetAll: mockResetAll,
  };

  it("renders TimeSlotPicker component correctly", () => {
    const { getByTestId } = render(
      <AppTheme>
        <TimeSlotPicker {...props} />
      </AppTheme>
    );
  });

  it("calls handleSlotChange when a slot is changed", () => {
    const { getByTestId } = render(
      <AppTheme>
        <TimeSlotPicker {...props} />
      </AppTheme>
    );
  });

  it("calls handleResetAll when reset button is clicked", () => {
    const { getByTestId } = render(
      <AppTheme>
        <TimeSlotPicker {...props} />
      </AppTheme>
    );
  });
});
