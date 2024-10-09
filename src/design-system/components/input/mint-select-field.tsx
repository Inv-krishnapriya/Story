import React from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
  useTheme,
} from "@mui/material";
import { MintTypography } from "./mint-typography";

export type MintSelectFieldOptionProps = {
  label: string;
  value: string | number | readonly string[] | undefined | "";
  disabled?: boolean;
};

export type MintSelectFieldProps = SelectProps & {
  options: MintSelectFieldOptionProps[];
  helperText?: string;
  placeholder?: string;
};

export function MintSelectField(props: MintSelectFieldProps) {
  const newProps = { ...props };
  newProps.label = "";
  newProps.size = "small";
  newProps.fullWidth = true;
  const placeHolderValue: any = props.value;
  console.log(props.value, "props.value");

  const theme = useTheme();
  const requireColor = theme.mint.color.system.error.error;
  const textColor = theme.mint.color.text.high;
  const errorColor = theme.mint.color.system.error.error;
  const placeholderColor = theme.mint.color.text.disabled;

  // eslint-disable-next-line
  const propsToPass: any = { ...newProps };
  delete propsToPass.helperText;
  delete propsToPass.required;

  return (
    <>
      {props.label ? (
        <div style={{ marginBottom: theme.mint.spacing.x3s }}>
          <MintTypography style={{ color: textColor }}>
            {props.label}&nbsp;
            {props.required && <span style={{ color: requireColor }}>*</span>}
          </MintTypography>
        </div>
      ) : (
        ""
      )}
      <SelectStyled displayEmpty {...propsToPass}>
        {props?.placeholder && (
          <MenuItem
            disabled={!!props?.required}
            value={!placeHolderValue ? placeHolderValue : ""}
            selected
            sx={{
              backgroundColor: `${theme.mint.color.background.containerBg.layer1} !important`,
            }}
          >
            <MintTypography size="body" weight="400" color={placeholderColor}>
              {props.placeholder}
            </MintTypography>
          </MenuItem>
        )}
        {props?.options?.map((option, i) => (
          <MenuItem key={i} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </SelectStyled>
      {props.helperText && (
        <MintTypography
          size="caption"
          style={{ color: props.error ? errorColor : "auto" }}
        >
          {props.helperText}j
        </MintTypography>
      )}
    </>
  );
}
const SelectStyled = styled(Select)(({ theme }) => ({
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.mint.color.border.medium}`,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: `3px solid ${theme.mint.color.system.focus.focus}`,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.mint.color.surfaceGray.disabled.disabled,
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderRadius: "4px",
  },
  ".MuiSelect-select": {
    "&:hover": {
      backgroundColor: theme.mint.color.surfaceGray.componentBg.hover,
    },
  },
}));
