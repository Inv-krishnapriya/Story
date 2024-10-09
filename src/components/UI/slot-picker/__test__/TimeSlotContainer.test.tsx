import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AppTheme from "../../../../theme";
import TimeSlotContainer from "../TimeSlotContainer";
import moment from "moment";

jest.mock("dragselect", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }),
}));

describe("TimeSlotContainer", () => {
  const currentDate = moment();
  const futureDate = moment().add(7, "days"); // Adding 7 days to the current date

  const formatDate = (date: any) => date.format("YYYY-MM-DD");

  const mockProps = {
    minDate: formatDate(currentDate),
    maxDate: formatDate(futureDate),
    slotDuration: 30,
    eventsSlots: [
      {
        scheduledDate: formatDate(currentDate),
        startTime: "08:00",
        endTime: "09:00",
      },
      {
        scheduledDate: formatDate(futureDate),
        startTime: "09:00",
        endTime: "10:00",
      },
    ],
    maxSlots: 5,
    handleSlotChange: jest.fn(),
    handleResetAll: jest.fn(),
    targetRef: { current: null },
  };

  it("renders without crashing", () => {
    const { getByText } = render(
      <AppTheme>
        <TimeSlotContainer {...mockProps} />
      </AppTheme>
    );

    [...Array(27)]?.forEach((_, index) => {
      const slotItem = screen.getByTestId(`0-${index}`);
      fireEvent.click(slotItem);
    });
    const slotItem = screen.getByTestId(`active-slot-2`);
    fireEvent.click(slotItem);
  });

  it("selects a time slot", () => {
    const { getByTestId } = render(
      <AppTheme>
        <TimeSlotContainer {...mockProps} />
      </AppTheme>
    );
  });
});
