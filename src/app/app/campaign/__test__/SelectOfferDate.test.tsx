import { fireEvent, render, screen } from "@testing-library/react";
import AppTheme from "@/theme";
import { SelectOfferDate } from "../details/[id]/SelectOfferDate";
import { act } from "react-dom/test-utils";

const today = new Date();
const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
const fourDaysLater = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);

const timeslotsList = [
  {
    startTime: twoDaysLater.toISOString(),
    endTime: fourDaysLater.toISOString(),
    id: "1",
    status: 1,
    type: 1,
  },
];

const scheduledDate = [
  {
    startTime: twoDaysLater.toISOString(),
    endTime: fourDaysLater.toISOString(),
    scheduledDate: twoDaysLater.toISOString(),
  },
];

describe("Select Offer Date component", () => {
  it("should render properly", () => {
    render(
      <AppTheme>
        <SelectOfferDate
          timeslotsList={timeslotsList}
          scheduledDate={[]}
          setScheduledDate={jest.fn()}
          duration={30}
          consumedTimeSlots={[]}
          setSelected={jest.fn()}
          selected={[]}
          campaignDetail={{
            startDate: today.toISOString(),
            endDate: fourDaysLater.toISOString(),
          }}
          limitReached={false}
        />
      </AppTheme>
    );

    expect(
      screen.getByText("side-drawer.select-offer.button")
    ).toBeInTheDocument();
  });

  it("should be able to click on select offer button", async () => {
    render(
      <AppTheme>
        <SelectOfferDate
          timeslotsList={timeslotsList}
          scheduledDate={scheduledDate}
          setScheduledDate={jest.fn()}
          duration={30}
          consumedTimeSlots={[]}
          setSelected={jest.fn()}
          selected={[]}
          campaignDetail={{
            startDate: today.toISOString(),
            endDate: fourDaysLater.toISOString(),
          }}
          limitReached={false}
        />
      </AppTheme>
    );

    const selectOfferButton = screen.getByRole("button", {
      name: "side-drawer.select-offer.button",
    });

    await act(async () => {
      fireEvent.click(selectOfferButton);
    });
  });

  it("should be able to select checkboxes", async () => {
    render(
      <AppTheme>
        <SelectOfferDate
          timeslotsList={timeslotsList}
          scheduledDate={scheduledDate}
          setScheduledDate={jest.fn()}
          duration={30}
          consumedTimeSlots={[
            {
              consumedTimeslotId: "1",
              startTime: twoDaysLater.toISOString(),
              endTime: fourDaysLater.toISOString(),
            },
          ]}
          setSelected={jest.fn()}
          selected={[]}
          campaignDetail={{
            startDate: today.toISOString(),
            endDate: fourDaysLater.toISOString(),
          }}
          limitReached={false}
        />
      </AppTheme>
    );

    await act(async () => {
      screen.getAllByRole("checkbox").forEach((checkbox) => {
        fireEvent.click(checkbox);
      });
    });
  });
});
