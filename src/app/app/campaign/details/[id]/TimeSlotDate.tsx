import dayjs from "dayjs";
import moment from "moment";

export const seperateDateTimeWithDash = (
  start: string,
  end: string,
  status: boolean
): string => {
  return `${start}〜${end} ${status ? "送信済" : ""}`;
};

export const TimeSlotDate = (date: any, consumedTimeSlots: any) => {
  dayjs.locale("ja");
  let status = false;

  consumedTimeSlots?.map((item: any) => {
    if (item.consumedTimeslotId == date.id) {
      status = true;
    }
  });

  const formattedStartTime = moment
    .utc(date.startTime)
    .local()
    .format("YYYY/MM/DD (ddd) HH:mm");
  const formattedEndTime = moment.utc(date.endTime).local().format("HH:mm");

  return seperateDateTimeWithDash(formattedStartTime, formattedEndTime, status);
};
