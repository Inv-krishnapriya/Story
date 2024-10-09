import React, { useMemo } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  SelectChangeEvent,
  Stack,
  useTheme,
} from "@mui/material";
import {
  MintButton,
  MintTypography,
  MintCheckbox,
  PlusOutlinedIcon,
  DeleteOutlinedIcon,
} from "@/design-system";
import dayjs from "dayjs";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  ScheduleSlotOfferType,
  ConsumedTimeSlotStatus,
} from "@/utils/common.data";
import { SelectTimeSlots } from "./SelectTimeSlots";
import { seperateDateTimeWithDash } from "./TimeSlotDate";

export function SelectOfferDate(props: Readonly<ISelectOfferDateProp>) {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    timeslotsList,
    scheduledDate,
    setScheduledDate,
    duration,
    consumedTimeSlots,
    setSelected,
    selected,
    campaignDetail: { startDate, endDate },
    limitReached,
  } = props;

  const addNewRow = () => {
    setScheduledDate([
      ...scheduledDate,
      {
        startTime: "",
        endTime: "",
        scheduledDate: "",
      },
    ]);
  };

  const isCheckboxSelected = (selected: any, slot: any) => {
    return (
      selected?.startTime === slot?.startTime &&
      selected?.endTime === slot?.endTime &&
      selected?.scheduledDate ===
        dayjs(slot?.scheduledDate, "YYYY-MM-DD").format("DD-MM-YYYY")
    );
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    const { checked } = e.target;

    checked
      ? setSelected([
          ...selected,
          {
            startTime: data?.startTime,
            endTime: data?.endTime,
            scheduledDate: dayjs(data?.scheduledDate, "YYYY-MM-DD").format(
              "DD-MM-YYYY"
            ),
          },
        ])
      : setSelected(selected?.filter((x) => !isCheckboxSelected(x, data)));
  };

  const removeRow = (index: number) => {
    if (scheduledDate.length === 1) return;

    const copy = [...scheduledDate];
    copy.splice(index, 1);
    setScheduledDate(copy);
  };

  const generateTimeList = useMemo(() => {
    const startTime = 480; // 8:00 * 60
    const endTime = 1320; // 22:00 * 60

    return (timeDifference: number) => {
      let timeList = [];
      let startTimeObject = dayjs().startOf("day").add(startTime, "minute");
      let endTimeObject = startTimeObject?.add(timeDifference, "minute");
      const timeUpperBound = dayjs().startOf("day").add(endTime, "minute");

      while (
        startTimeObject.isBefore(timeUpperBound) &&
        (endTimeObject.isBefore(timeUpperBound) ||
          endTimeObject.isSame(timeUpperBound))
      ) {
        const startTimeValue = startTimeObject?.format("HH:mm");
        const endTimeValue = endTimeObject?.format("HH:mm");

        timeList.push({
          label: seperateDateTimeWithDash(startTimeValue, endTimeValue, false),
          value: JSON.stringify({
            startTime: startTimeValue,
            endTime: endTimeValue,
          }),
        });

        startTimeObject = endTimeObject;
        endTimeObject = startTimeObject?.add(timeDifference, "minute");
      }

      return timeList;
    };
  }, []);

  const timeList = generateTimeList(duration);

  const handleSelectChange = (event: SelectChangeEvent, index: number) => {
    let scheduledDateCopy = [...scheduledDate];
    const values = JSON.parse(event?.target?.value);
    scheduledDateCopy[index] = {
      ...scheduledDateCopy[index],
      ...values,
    };

    setScheduledDate(scheduledDateCopy);
  };

  const handleDateChange = (event: any, index: number) => {
    let scheduledDateCopy = [...scheduledDate];
    const value = event.format("DD-MM-YYYY");

    scheduledDateCopy[index] = {
      ...scheduledDateCopy[index],
      scheduledDate: value,
    };

    setScheduledDate(scheduledDateCopy);
    generateTimeList(duration);
  };

  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time).local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}  送信済`;
  };

  const filterTimeSlots = (date: string, index: number) => {
    const dateMoment = moment(date, "DD-MM-YYYY");

    const timeSlotJson: {
      [key: string]: { label: string; value: string };
    } = {};
    timeList.forEach((slot) => {
      timeSlotJson[slot.label] = slot;
    });

    const deleteTimeSlotIfInvalid = (
      isSameDate: boolean,
      startTimeMoment: moment.Moment,
      endTime: string
    ) => {
      if (isSameDate) {
        delete timeSlotJson[
          seperateDateTimeWithDash(
            startTimeMoment.format("HH:mm"),
            moment(endTime).format("HH:mm"),
            false
          )
        ];
      }
    };

    //Filter existing time slots
    timeslotsList?.map((slot) => {
      const { startTime, endTime, type, status } = slot;
      // only remove time slots if monitor confirmed
      if (
        type !== ScheduleSlotOfferType.ADDITIONAL_OFFER ||
        status === ConsumedTimeSlotStatus.SCHEDULE_CONFIRMED
      ) {
        const startTimeMoment = moment(startTime);
        const isSameDate = startTimeMoment?.isSame(dateMoment, "day");
        deleteTimeSlotIfInvalid(isSameDate, startTimeMoment, endTime);
      }
    });

    // Filter consumed time slots
    consumedTimeSlots?.map((slot: any) => {
      const { startTime, endTime } = slot;
      const startTimeMoment = moment(startTime);
      const isSameDate = startTimeMoment?.isSame(dateMoment, "day");
      deleteTimeSlotIfInvalid(isSameDate, startTimeMoment, endTime);
    });

    // Filter selected time slots
    scheduledDate.forEach((slot, i) => {
      const { startTime, endTime, scheduledDate } = slot;
      const startTimeMoment = moment(
        `${scheduledDate} ${startTime}`,
        "DD-MM-YYYY HH:mm"
      );
      const endTimeMoment = moment(
        `${scheduledDate} ${endTime}`,
        "DD-MM-YYYY HH:mm"
      );
      const isSameDate = startTimeMoment?.isSame(dateMoment, "day");

      if (index !== i) {
        deleteTimeSlotIfInvalid(
          isSameDate,
          startTimeMoment,
          endTimeMoment.format("YYYY-MM-DDTHH:mm:ss")
        );
      }
    });

    // Filter past slots selected date is current date
    const currentDateTime = moment();
    if (dateMoment.isSame(currentDateTime, "day")) {
      Object.keys(timeSlotJson)?.forEach((slot) => {
        const [hours, minutes] = slot?.split("〜")[0]?.split(":")?.map(Number);
        const slotDateTime = moment()
          ?.set("hour", hours)
          ?.set("minute", minutes);

        if (currentDateTime?.isAfter(slotDateTime)) delete timeSlotJson[slot];
      });
    }

    return Object.values(timeSlotJson);
  };

  const isDisabled = (slot: any) => {
    const now = new Date();
    const startTime = new Date(slot?.startTime);
    if (now > startTime) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box sx={{ position: "relative" }} id="main">
      <Box>
        <Box
          height="320px"
          display="flex"
          flexDirection="column"
          gap={theme.mint.spacing.xs}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            marginBottom: "45px",
          }}
        >
          <Stack
            ml="6px"
            gap={1}
            sx={{
              padding: 1,
            }}
            id="sentSlotContainer"
          >
            {consumedTimeSlots?.length > 0 &&
              consumedTimeSlots?.map((slot: any) => (
                <FormControlLabel
                  disabled={!!(limitReached || isDisabled(slot))}
                  key={slot?.consumedTimeslotId}
                  label={
                    <MintTypography size="body" weight="400" display="contents">
                      {toLocalDatetime(slot?.startTime, slot?.endTime)}
                    </MintTypography>
                  }
                  control={
                    <MintCheckbox
                      onChange={(e) => handleCheckboxChange(e, slot)}
                      checked={selected?.some((x) =>
                        isCheckboxSelected(x, slot)
                      )}
                      sx={{ mr: 2 }}
                      disabled={isDisabled(slot)}
                    />
                  }
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    p: 1,
                    borderRadius: theme.mint.cornerRadius.xs,
                  }}
                />
              ))}
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
            {scheduledDate?.map((day, index) => (
              <Box
                display="flex"
                gap={1}
                key={index}
                flexDirection="row"
                sx={{
                  paddingBottom: "12px",
                  borderBottom: limitReached
                    ? 0
                    : "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
                  <MintTypography
                    size="body"
                    weight="400"
                    display={limitReached ? "none" : "flex"}
                  >
                    {t("side-drawer.select-offer.date")}
                  </MintTypography>
                  <DesktopDatePicker
                    disablePast
                    sx={{
                      display: limitReached ? "none" : "flex",
                      "& .MuiOutlinedInput-root": {
                        height: "42px",
                        width: "167px",
                      },
                    }}
                    minDate={dayjs(startDate)}
                    maxDate={dayjs(endDate)}
                    value={
                      day?.scheduledDate
                        ? dayjs(day?.scheduledDate, "DD-MM-YYYY")
                        : null
                    }
                    onChange={(e) => handleDateChange(e, index)}
                  />
                </Box>
                <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
                  <MintTypography
                    size="body"
                    weight="400"
                    display={limitReached ? "none" : "flex"}
                  >
                    {t("side-drawer.select-offer.time")}
                  </MintTypography>
                  <SelectTimeSlots
                    options={filterTimeSlots(day?.scheduledDate, index)}
                    value={JSON.stringify({
                      startTime: day?.startTime,
                      endTime: day?.endTime,
                    })}
                    onChange={(e: any) => handleSelectChange(e, index)}
                    limitReached={limitReached}
                  />
                </Box>
                <Box>
                  <div style={{ height: "21px" }}>{""}</div>
                  <Box
                    sx={{
                      display: limitReached ? "none" : "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      height: "28px",
                      width: "28px",
                      border: `1px solid rgba(10, 24, 38, 0.71)`,
                      background: "#FFF",
                      marginTop: "50%",
                    }}
                  >
                    <IconButton
                      onClick={() => removeRow(index)}
                      sx={{ display: limitReached ? "none" : "flex" }}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </LocalizationProvider>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", bottom: "10px" }}>
        <MintButton
          variant="outlined"
          onClick={addNewRow}
          sx={{
            marginTop: 16,
            display: limitReached ? "none" : "flex",
          }}
          size="small"
        >
          <PlusOutlinedIcon size={16} color="#162987" />
          {t("side-drawer.select-offer.button")}
        </MintButton>
      </Box>
    </Box>
  );
}
