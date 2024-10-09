import { render } from "@testing-library/react";
import { TimeSlotDate } from "../details/[id]/TimeSlotDate";
import moment from "moment";

const today = new Date();
const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

const dateParam = {
  id: 1,
  startTime: today.toISOString(),
  endTime: twoDaysLater.toISOString(),
};

const consumedTimeSlots = [
  {
    consumedTimeslotId: 1,
  },
];

describe("Time Slot Date Component", () => {
  it("Should return formated date without status key", () => {
    const todayMoment = moment
      .utc(today.toISOString())
      .local()
      .format("YYYY/MM/DD (ddd) HH:mm");

    const endTime = moment
      .utc(twoDaysLater.toISOString())
      .local()
      .format("HH:mm");

    const response = TimeSlotDate(dateParam, []);

    expect(response).toBe(`${todayMoment}〜${endTime} `);
  });

  it("Should return formated date with status key", () => {
    const todayMoment = moment
      .utc(today.toISOString())
      .local()
      .format("YYYY/MM/DD (ddd) HH:mm");

    const endTime = moment
      .utc(twoDaysLater.toISOString())
      .local()
      .format("HH:mm");

    const response = TimeSlotDate(dateParam, consumedTimeSlots);

    expect(response).toBe(`${todayMoment}〜${endTime} 送信済`);
  });
});
