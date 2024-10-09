import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, FC } from 'react';

type CheckboxProp = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checked?: boolean;
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
};

const AppCheckbox: FC<CheckboxProp> = ({
  handleChange,
  checked,
  label,
  name,
  value,
  disabled,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={disabled}
          value={value}
          onChange={handleChange}
          name={name}
          checked={checked}
        />
      }
      label={label}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
        '&.Mui-checked': {
          color: '#162987 !important',
        },
        width: 'fit-content',
        padding: '0px !important',
      }}
      {...rest}
    />
  );
};

export default AppCheckbox;
