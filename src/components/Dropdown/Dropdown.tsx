import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';

type DropdownProp = {
  label?: string;
  name?: string;
  value?: any;
  onChange?: (e: SelectChangeEvent<any>) => void;
  menu: string[] | number[];
  dropdownMaxHeight?: number;
  dropdownWidth?: number;
  defaultValue?: number | string | '' | null;
  field?: any;
  width?: string;
  register?: any;
  placeHolder?: string;
};

const Dropdown: FC<DropdownProp> = ({
  value,
  label,
  name,
  onChange,
  menu,
  dropdownMaxHeight,
  dropdownWidth,
  defaultValue,
  field,
  width,
  register,
  placeHolder,
  ...rest
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} variant="outlined">
      {label && (
        <InputLabel id="simple-select-helper-label">{label}</InputLabel>
      )}
      <Select
        displayEmpty
        labelId="simple-select-helper-label"
        id="simple-select-helper"
        label={label}
        value={value}
        ref={register}
        name={name}
        onChange={onChange}
        sx={{ height: '40px', width: width ?? '160px' }}
        defaultValue={defaultValue !== null ? defaultValue : ''}
        {...field}
        input={<OutlinedInput label={label} />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: dropdownMaxHeight,
              width: dropdownWidth,
            },
          },
        }}
        {...rest}
      >
        <MenuItem value="" disabled selected>
          {placeHolder}
        </MenuItem>
        {menu?.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.defaultProps = {
  dropdownMaxHeight: 200,
  dropdownWidth: 200,
};

export default Dropdown;
