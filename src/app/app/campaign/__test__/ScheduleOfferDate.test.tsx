import { fireEvent, render, screen } from "@testing-library/react";
import { ScheduleOfferDate } from "../details/[id]/ScheduleOfferDate";
import AppTheme from "@/theme";
import moment from "moment";
import { act } from "react-dom/test-utils";

const today = new Date();
const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
const fourDaysLater = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);

const timeslotDate = {
  startTime: twoDaysLater.toISOString(),
  endTime: fourDaysLater.toISOString(),
};

const timeslotsList = [
  {
    status: 2,
    id: "1",
    ...timeslotDate,
  },
];

describe("Schedule Offer Date component", () => {
  it("should render properly", () => {
    render(
      <AppTheme>
        <ScheduleOfferDate
          selected={[]}
          setSelected={jest.fn()}
          timeslotsList={[]}
          consumedTimeSlots={[]}
          limitReached={false}
          monitorStatus={3}
        />
      </AppTheme>
    );

    expect(
      screen.getByText("side-drawer.schedule-offer.title")
    ).toBeInTheDocument();

    expect(
      screen.getByText("side-drawer.schedule-offer.notice")
    ).toBeInTheDocument();

    expect(
      screen.getByText("side-drawer.schedule-offer.select-all")
    ).toBeInTheDocument();
  });

  it("Should render the timeslots", async () => {
    render(
      <AppTheme>
        <ScheduleOfferDate
          selected={[]}
          setSelected={jest.fn()}
          timeslotsList={timeslotsList}
          consumedTimeSlots={[]}
          limitReached={false}
          monitorStatus={3}
        />
      </AppTheme>
    );

    const todayMoment = moment
      .utc(twoDaysLater.toISOString())
      .local()
      .format("YYYY/MM/DD (ddd) HH:mm");

    const endTime = moment
      .utc(fourDaysLater.toISOString())
      .local()
      .format("HH:mm");

    expect(
      await screen.findByText(`${todayMoment}〜${endTime}`)
    ).toBeInTheDocument();

    await act(async () => {
      (await screen.findAllByRole("checkbox")).forEach((checkbox) => {
        fireEvent.click(checkbox);
      });
    });
  });

  it("checkboxs should be checked", async () => {
    render(
      <AppTheme>
        <ScheduleOfferDate
          selected={timeslotsList.map((slot) => slot.id)}
          setSelected={jest.fn()}
          timeslotsList={timeslotsList}
          consumedTimeSlots={[]}
          limitReached={false}
          monitorStatus={3}
        />
      </AppTheme>
    );

    await act(async () => {
      (await screen.findAllByRole("checkbox")).forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });
  });
});
