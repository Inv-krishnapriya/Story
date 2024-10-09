import React from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { MintTextField } from "./mint-text-field";

export type MintDatePickerProps<TDate> = DatePickerProps<TDate>;

export function MintDatePicker<TDate>(props: MintDatePickerProps<TDate>) {
  return (
    <DatePicker
      {...props}
      slots={{
        textField: MintTextField,
        ...props.slots,
      }}
    />
  );
}
