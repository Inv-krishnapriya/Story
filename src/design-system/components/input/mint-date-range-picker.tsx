import React from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { MintTextField } from "./mint-text-field";
import {
  DateRangePickerProps,
  DateRangePicker,
} from "@mui/x-date-pickers-pro/DateRangePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { Box, styled } from "@mui/material";

export type DateRangePicker<TDate> = DateRangePickerProps<TDate>;

export function MintDateRangePicker<TDate>(props: DateRangePicker<TDate>) {
  const { slots, ...others } = props;
  return (
    <Box
      sx={{
        ".Mui-selected": {
          backgroundColor: "red",
        },
      }}
    >
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <StyledMintDateRangePicker
          slots={{ field: SingleInputDateRangeField, ...slots }}
          name="allowedRange"
          {...others}
          renderInput={(props: any) => {
            return null;
          }}
        />
      </DemoContainer>
    </Box>
  );
}
const StyledMintDateRangePicker: any = styled(DateRangePicker)(({ theme }) => ({
  ".MuiOutlinedInput-root.Mui-error": {
    backgroundColor: theme.mint.color.system.error.bright,
    zIndex: 1,
  },
  ".MuiOutlinedInput-input": {
    "&::placeholder": {
      color: theme.mint.color.text.high,
    },
  },
}));
const Tool = (props: any) => {
  return <div>hi</div>;
};
