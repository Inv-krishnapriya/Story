import React from 'react';
import { MintTextField } from './mint-text-field';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';

export type MintDateTimePickerProps<TDate> = DateTimePickerProps<TDate>;

export function MintDateTimePicker<TDate>(
  props: MintDateTimePickerProps<TDate>
) {
  return (
    <DateTimePicker
      {...props}
      slots={{
        textField: MintTextField,
      }}
    />
  );
}
