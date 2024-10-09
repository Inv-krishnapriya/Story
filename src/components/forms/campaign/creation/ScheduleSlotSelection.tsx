import React, { useCallback, useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { useDispatch } from "react-redux";
import {
  addSchedule,
  addSlot,
  removeAllSlots,
  removeSchedule,
  removeSlot,
  resetSlot,
} from "@/stores/interview/reducer";
import moment from "moment";
import { Box } from "@mui/material";
import { MintTypography } from "@/design-system";
import TimeSlotPicker from "@/components/UI/slot-picker/TimeSlotPicker";

interface ISchedule {
  data: {
    durationSelected: number;
    availableSlot: number;
  };
}

interface IScheduleFormat {
  start: string | Date;
  end: string | Date;
  title: any;
}

function ScheduleSlotSelection(props: ISchedule) {
  const { data } = props;
  const dispatch = useDispatch();
  const updatedDuration = useSelector(
    (state: RootState) => state.schedule.selectedDuration
  );

  const dates = useSelector((state: RootState) => state.interviewdates);

  const eventsSlots: any = useSelector(
    (state: RootState) => state.schedule.selectedSlots
  );
  console.log(eventsSlots, "eventsSlots");

  const campaignData = useSelector((state: RootState) => state.data.Campaign);
  const handleSlotChange = useCallback((slots: any) => {
    const { start, end, scheduledDate } = slots;
    const startTime24 = moment(start, "hh:mm A").format("HH:mm");
    const endTime24 = moment(end, "hh:mm A").format("HH:mm");
    dispatch(
      addSchedule({
        start: startTime24,
        end: endTime24,
        title: "",
      })
    );
    dispatch(
      addSlot({
        startTime: startTime24,
        endTime: endTime24,
        scheduledDate: scheduledDate,
      })
    );
  }, []);

  const handleResetAll = useCallback((data: any[] = []) => {
    dispatch(resetSlot(data));
  }, []);

  const formattedDate = useMemo(() => {
    const momentStart = moment(dates?.interviewDates?.start);
    const momentEnd = moment(dates?.interviewDates?.end);

    const formattedStart = momentStart.format("YYYY-MM");
    const formattedEnd = momentEnd.format("YYYY-MM");
    const isDatesSame = formattedStart === formattedEnd;
    const formattedStartDate = moment(dates.interviewDates.start).format(
      "YYYY年 M月"
    );
    const formattedEndDate = moment(dates.interviewDates.end).format(
      "YYYY年 M月"
    );
    if (isDatesSame) {
      return formattedStartDate;
    } else {
      return `${formattedStartDate}-${formattedEndDate}`;
    }
  }, [dates.interviewDates]);
  const optimizedUpdatedDuration = useMemo(
    () => updatedDuration,
    [updatedDuration]
  );
  const optimizedDates = useMemo(() => dates, [dates]);
  return (
    <Box>
      <MintTypography
        size="caption"
        weight="400"
        color={(theme) => theme.mint.color.text.low}
        lineHeight={"150%"}
      >
        ※連続となるインタビュー実施は避け、休憩時間の取得をおすすめします。
      </MintTypography>
      <MintTypography
        size="head-m"
        weight="500"
        color={(theme) => theme.mint.color.text.medium}
        lineHeight={"150%"}
        sx={{
          paddingY: (theme) => theme.mint.spacing.xxs,
        }}
      >
        {formattedDate}
      </MintTypography>
      <TimeSlotPicker
        minDate={optimizedDates.interviewDates.start}
        maxDate={optimizedDates.interviewDates.end}
        slotDuration={optimizedUpdatedDuration}
        eventsSlots={eventsSlots}
        maxSlots={data.availableSlot}
        handleSlotChange={handleSlotChange}
        handleResetAll={handleResetAll}
      />
    </Box>
  );
}

export default ScheduleSlotSelection;
