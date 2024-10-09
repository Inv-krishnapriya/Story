import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const TextFieldInput = ({
  name,
  control,
  label,
  errors,
  ...rest
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          {...rest}
        />
      )}
    />
  );
};
