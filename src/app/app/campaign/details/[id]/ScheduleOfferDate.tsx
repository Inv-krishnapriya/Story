import React from "react";
import { Box, FormControlLabel, Stack, useTheme } from "@mui/material";
import { MintTypography, MintCheckbox } from "@/design-system";
import { useTranslation } from "react-i18next";
import { TimeSlotDate } from "./TimeSlotDate";

export function ScheduleOfferDate(props: Readonly<IScheduleOfferDateProp>) {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    timeslotsList,
    selected,
    setSelected,
    consumedTimeSlots,
    limitReached,
    monitorStatus,
  } = props;

  console.log(selected, limitReached);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target;
    checked
      ? setSelected([...selected, id])
      : setSelected(selected?.filter((tId) => tId !== id));
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

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    checked
      ? setSelected(
          timeslotsList
            .filter((date) => date?.status !== 1 && !isDisabled(date))
            .map((item) => item.id)
        )
      : setSelected([]);
  };

  return (
    <Box sx={{ position: "relative" }} id="slotarea">
      <Box sx={{ gap: "4px", display: "flex", flexDirection: "column" }}>
        <MintTypography
          size="body"
          weight="400"
          color={(theme) => theme.mint.color.text.high}
        >
          {t("side-drawer.schedule-offer.title")}
        </MintTypography>
        <MintTypography
          size="caption"
          weight="400"
          sx={{
            color: theme.palette.uiColor.textLow,
          }}
        >
          {t("side-drawer.schedule-offer.notice")}
        </MintTypography>
      </Box>
      <Box>
        <FormControlLabel
          disabled={!!(limitReached || monitorStatus === 3)}
          label={
            <MintTypography size="body" weight="400" display="contents">
              {t("side-drawer.schedule-offer.select-all")}
            </MintTypography>
          }
          control={
            <MintCheckbox
              sx={{ margin: 1 }}
              onChange={(e) => selectAll(e)}
              checked={
                selected.length > 0 &&
                selected.length ===
                  timeslotsList
                    .filter((date) => date?.status !== 1 && !isDisabled(date))
                    .map((item) => item.id).length
              }
            />
          }
          sx={{
            marginLeft: "unset",
          }}
        />
        <Stack
          ml="6px"
          gap={1}
          sx={{
            overflow: "hidden",
            maxHeight: "330px",
            overflowY: "scroll",
            padding: 1,
          }}
          id="slotContainer"
        >
          {timeslotsList?.map((date) => (
            <FormControlLabel
              disabled={
                !!(
                  limitReached ||
                  monitorStatus === 3 ||
                  date?.status === 1 ||
                  isDisabled(date)
                )
              }
              key={date.id}
              label={
                <MintTypography size="body" weight="400" display="contents">
                  {TimeSlotDate(date, consumedTimeSlots)}
                </MintTypography>
              }
              control={
                <MintCheckbox
                  onChange={(e) => handleChange(e, date.id)}
                  checked={selected.includes(date.id)}
                  sx={{ mr: 2 }}
                  disabled={date?.status === 1 || isDisabled(date)}
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
      </Box>
    </Box>
  );
}
