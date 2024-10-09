import {
  CalendarOutlinedIcon,
  MintDateRangePicker,
  MintSelectField,
  MintTextField,
  MintTypography,
  TicketOutlinedIcon,
  MintHelperText,
} from "@/design-system";
import { addDate } from "@/stores/interview/datereducer";
import { Box, FormControl, Stack, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AVAILABLE_SLOT_LIMIT } from "../../../../../Constants";
import {
  addDuration,
  addSelectedDuration,
  clearDuration,
  removeAllSlots,
} from "@/stores/interview/reducer";
import { updateConsumedTickets } from "@/stores/global/reducer";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { researchService } from "@/common/apiUrls";
import { RootState } from "@/stores/rootReducer";
import { addDays } from "date-fns";

import moment from "moment";
import dayjs from "dayjs";
import TimeSlotPicker from "../../../UI/slot-picker/TimeSlotContainer";
import ScheduleSlotSelection from "./ScheduleSlotSelection";
import { TDuration } from "@/utils/common.type";

function ImplementationForm({
  scheduleError,
  dateError,
}: {
  scheduleError: string;
  dateError: string;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

  const [openSchedule, setOpenSchedule] = useState<boolean>(false);
  const [durations, setDurations] = useState<TDuration[]>([]);
  const selectDurationsData = useMemo(
    () =>
      durations?.map((durations) => {
        return {
          label: `${durations.duration} 分`,
          value: durations.id,
        };
      }),
    [durations]
  );

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const maxDate = useMemo(() => {
    const parsedStartDate = moment();
    const endDate = parsedStartDate.add(60, "days");
    const formattedEndDate = endDate.toISOString();
    return formattedEndDate;
  }, []);

  const [form, setForm] = useState<{
    showCount: number;
    showSlot: number;
  }>({
    showCount: 0,
    showSlot: 0,
  });
  const durationFR = useSelector(
    (state: RootState) => state.schedule.durations
  );

  const interViewDates: {
    start: Date | undefined | string;
    end: Date | undefined | string;
  } = useSelector((state: RootState) => state.interviewdates.interviewDates);

  const interviewDurations = useSelector(
    (state: RootState) => state.global.consumed!
  );

  useEffect(() => {
    researchService
      .getInterviewDuration()
      .then((response) => {
        setDurations(response?.data?.data);
        dispatch(clearDuration());
        dispatch(addDuration(response?.data?.data));
      })
      .catch((errors) => {});
  }, []);

  const dispatch = useDispatch();
  const [data, setData] = useState<number>(30);
  const durationValue = watch("duration")!;
  const countValue = watch("monitorscount");
  const campaignData = useSelector((state: RootState) => state.data.Campaign);

  useEffect(() => {
    if (!startDate && !endDate) {
      if (Object.keys(campaignData).length !== 0) {
        const initialStartDate = interViewDates?.start
          ? new Date(interViewDates?.start)
          : null;
        const initialEndDate = interViewDates?.end
          ? new Date(interViewDates?.end)
          : null;

        setStartDate(
          interViewDates?.start ? new Date(interViewDates?.start) : null
        );
        setEndDate(interViewDates?.end ? new Date(interViewDates?.end) : null);
        setOpenSchedule(true);
      } else {
        dispatch(updateConsumedTickets(0));
      }
    }
  }, [campaignData, interViewDates]);

  const handleScheduleOpen = () => {
    if (
      form.showSlot !== 0 &&
      form.showSlot !== undefined &&
      startDate !== undefined &&
      form.showCount !== 0 &&
      form.showCount !== undefined
    )
      setOpenSchedule(true);
    else setOpenSchedule(false);
  };

  useEffect(() => {
    if (
      countValue !== 0 &&
      countValue !== "" &&
      durationValue !== 0 &&
      durationValue !== "" &&
      durations?.length > 0 &&
      countValue !== undefined &&
      durationValue !== undefined
    ) {
      const duration1: TDuration[] = durations?.filter(
        (item) => item.id === durationValue
      );
      dispatch(updateConsumedTickets(duration1[0]?.ticketsCount * countValue));
      setForm((prev) => ({
        ...prev,
        showSlot: countValue * AVAILABLE_SLOT_LIMIT,
        showCount: duration1[0]?.ticketsCount * countValue,
      }));
      setData(parseInt(duration1[0]?.duration));
      dispatch(addSelectedDuration(parseInt(duration1[0]?.duration)));
    } else if (countValue !== 0 && countValue !== undefined) {
      setForm((prev) => ({
        ...prev,
        showCount: form.showCount === 0 ? interviewDurations : form.showCount,
        showSlot: countValue * AVAILABLE_SLOT_LIMIT,
      }));
    }
  }, [durationValue, countValue, durations]);

  const handleDateChange = (dates: any) => {
    const [start, endDate] = dates;

    const formattedStartDate = new Date(start);
    const formattedEndDate = new Date(endDate);
    const today = moment();

    if (
      start &&
      endDate &&
      moment(formattedEndDate).isSameOrAfter(today, "day") &&
      moment(formattedStartDate).isSameOrAfter(today, "day")
    ) {
      dispatch(
        addDate({
          start: formattedStartDate,
          end: formattedEndDate,
        })
      );
      setStartDate(() => formattedStartDate);
      setEndDate(() => formattedEndDate);
    }
    if (
      start &&
      !endDate &&
      moment(formattedStartDate).isSameOrAfter(today, "day")
    ) {
      dispatch(
        addDate({
          start: formattedStartDate,
          end: null,
        })
      );
      setStartDate(() => formattedStartDate);
      setEndDate(() => null);
    }
  };

  return (
    <Box
      p={theme.mint.spacing.l}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      bgcolor={theme.mint.color.background.containerBg.layer1}
    >
      <Stack gap={theme.mint.spacing.m}>
        <MintTypography
          size="head-m"
          weight="700"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.section2.heading")}
        </MintTypography>
        <Box>
          <Box>
            <Box
              display={"flex"}
              gap={theme.mint.spacing.xxs}
              alignItems={"center"}
            >
              <Controller
                control={control}
                name="monitorscount"
                rules={{
                  required: "messages.required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "messages.monitors-count.pattern",
                  },
                  max: {
                    value: 40,
                    message: "messages.monitors-count.max",
                  },
                  min: {
                    value: 1,
                    message: "messages.monitors-count.min",
                  },
                }}
                render={({ field }) => (
                  <MintTextField
                    required
                    label={t("interview.section2.monitorscount")}
                    sx={{
                      ".MuiInputBase-root": {
                        backgroundColor: "transparent",
                      },
                    }}
                    {...field}
                    onChange={(e) => {
                      const inputValue = e?.target?.value;
                      const onlyNumbers = /^\d*$/;
                      if (onlyNumbers.test(inputValue) || inputValue === "") {
                        field.onChange(e);
                        dispatch(removeAllSlots());
                      }
                    }}
                    value={field.value}
                    error={!!errors.monitorscount?.message}
                    inputProps={{
                      "data-testid": "interview.section2.monitorscount",
                    }}
                    autoComplete="off"
                  />
                )}
              />
              <MintTypography
                size="body"
                weight="400"
                lineHeight={"150%"}
                color={theme.mint.color.text.medium}
                mt={theme.mint.spacing.m}
              >
                人
              </MintTypography>
            </Box>
            {errors.monitorscount?.message && (
              <MintTypography
                size="caption"
                sx={{ color: theme.mint.color.system.error.error, mt: "4px" }}
              >
                {t(String(errors.monitorscount?.message), {
                  field: t("interview.section2.monitorscount"),
                })}
              </MintTypography>
            )}
          </Box>

          <MintTypography
            size="caption"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.medium}
          >
            {t("interview.section2.count-info")}
          </MintTypography>
        </Box>
        <Box>
          <Box
            display={"flex"}
            gap={theme.mint.spacing.m}
            alignItems={"end"}
            id={errors.duration?.message ? "form-error" : ""}
          >
            <Controller
              rules={{
                required: "messages.required",
              }}
              control={control}
              name="duration"
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  error={!!errors.duration?.message}
                >
                  <MintSelectField
                    label={t("interview.section2.duration")}
                    required
                    fullWidth={false}
                    placeholder={t("interview.duration.select.label")}
                    options={selectDurationsData}
                    sx={{
                      width: "192px",
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      dispatch(removeAllSlots());
                    }}
                    error={!!errors.duration?.message}
                    inputProps={{
                      "data-testid": "interview.section2.duration",
                    }}
                  />
                </FormControl>
              )}
            />
            <Box
              sx={{
                backgroundColor: theme.mint.color.background.containerBg.layer2,
                borderRadius: `${theme.mint.cornerRadius.s}px`,
                padding: theme.mint.spacing.xxs,
                display: "flex",
                gap: theme.mint.spacing.xxs,
                width: "fit-content",
              }}
            >
              <TicketOutlinedIcon
                size={20}
                color={theme.mint.color.object.medium}
              />
              <MintTypography
                size="body"
                lineHeight={"150%"}
                weight="400"
                color={theme.mint.color.text.medium}
              >
                {t("interview.section2.ticket-label")}
              </MintTypography>
              <MintTypography
                size="body"
                lineHeight={"150%"}
                weight="400"
                color={theme.mint.color.text.medium}
                display={"flex"}
              >
                <Box fontWeight={"700"}>{form.showCount}</Box>

                <MintTypography pl={theme.mint.spacing.x3s}>
                  {t("interview.section2.tickets")}
                </MintTypography>
              </MintTypography>
            </Box>
          </Box>
          <MintHelperText>
            {errors.duration?.message
              ? t(String(errors.duration?.message), {
                  field: t("interview.section2.duration"),
                })
              : ""}
          </MintHelperText>
        </Box>

        <Box>
          <Box>
            <MintTypography
              style={{ color: theme.mint.color.text.high }}
              id={dateError ? "form-error" : ""}
            >
              {t("interview.section2.interview-date")}&nbsp;
              <span style={{ color: theme.mint.color.system.error.error }}>
                *
              </span>
            </MintTypography>

            <MintDateRangePicker
              sx={{
                width: "308px",
              }}
              slotProps={{
                textField: {
                  error: !!dateError,
                  placeholder: t("interview.section2.interview-placeholder"),

                  InputProps: {
                    endAdornment: (
                      <CalendarOutlinedIcon
                        color={theme.mint.color.object.low}
                      />
                    ),
                  },
                  inputProps: {
                    "data-testid": "mint-date-picker",
                  },
                },
              }}
              disablePast
              onChange={(e) => {
                dispatch(removeAllSlots());
                handleDateChange(e);
              }}
              maxDate={dayjs(maxDate)}
              value={[
                startDate ? dayjs(startDate) : null,
                endDate ? dayjs(endDate) : null,
              ]}
              format="YYYY-MM-DD"
            />
            {dateError && (
              <MintTypography
                size="caption"
                style={{ color: theme.mint.color.system.error.error }}
              >
                {dateError}
              </MintTypography>
            )}
          </Box>
          <MintTypography
            size="caption"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.medium}
          >
            {t("interview.section2.interview-date-info")}
          </MintTypography>
        </Box>
        <Box>
          <MintTypography
            style={{ color: theme.mint.color.text.high }}
            id={scheduleError ? "form-error" : ""}
          >
            {t("interview.section2.slot-title")}&nbsp;
            <span
              style={{
                color: theme.mint.color.system.error.error,
                marginLeft: "8px",
              }}
            >
              *
            </span>
          </MintTypography>
          <Box
            sx={{
              backgroundColor: theme.mint.color.background.containerBg.layer2,
              borderRadius: `${theme.mint.cornerRadius.s}px`,
              padding: theme.mint.spacing.xxs,
              display: "flex",
              gap: theme.mint.spacing.xxs,
              width: "fit-content",
              mt: "12px",
            }}
          >
            <MintTypography
              size="body"
              lineHeight={"150%"}
              weight="400"
              color={theme.mint.color.text.medium}
            >
              {t("interview.section2.available-slot")}
            </MintTypography>
            <MintTypography
              size="body"
              lineHeight={"150%"}
              weight="400"
              color={theme.mint.color.text.medium}
              display={"flex"}
            >
              <Box fontWeight={"700"}>{form.showSlot}</Box>
              <MintTypography pl={theme.mint.spacing.x3s}>
                {t("interview.section2.slot")}
              </MintTypography>
            </MintTypography>
          </Box>
          {(!openSchedule || dateError) && (
            <Box
              sx={{
                height: "240px",
                backgroundColor: theme.mint.color.background.containerBg.layer2,
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${theme.mint.color.border.medium}`,
                marginTop: theme.mint.spacing.m,
                cursor:
                  startDate !== undefined &&
                  form.showSlot !== 0 &&
                  form.showCount !== 0 &&
                  !dateError
                    ? "pointer"
                    : "unset",
              }}
              onClick={handleScheduleOpen}
              data-testid="schedule-open"
            >
              <MintTypography
                size="body"
                weight="700"
                lineHeight={"150%"}
                color={theme.mint.color.text.medium}
              >
                {t("interview.section2.slot-area")}
              </MintTypography>
            </Box>
          )}
          {openSchedule &&
            form.showSlot !== 0 &&
            form.showSlot !== undefined &&
            startDate !== undefined &&
            form.showCount !== 0 &&
            form.showCount !== undefined &&
            !dateError && (
              <Box
                sx={{
                  height: "auto",
                  backgroundColor:
                    theme.mint.color.background.containerBg.layer1,

                  marginTop: theme.mint.spacing.m,
                }}
              >
                <ScheduleSlotSelection
                  data={{
                    durationSelected: data,
                    availableSlot: form.showSlot,
                  }}
                />
              </Box>
            )}

          {scheduleError && (
            <MintTypography
              size="caption"
              style={{ color: theme.mint.color.system.error.error }}
            >
              {scheduleError}
            </MintTypography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default ImplementationForm;
