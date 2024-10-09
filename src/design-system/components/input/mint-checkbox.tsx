import React from "react";
import { Box, Checkbox, CheckboxProps, styled } from "@mui/material";

interface MintCheckboxProps extends CheckboxProps {
  label?: string;
  color?: 'primary' | 'secondary' | 'error',
 
}

export function MintCheckbox(props: MintCheckboxProps) {
  const newProps = { ...props };
  newProps.size = props.size ?? "small";
  return (
    <Box display={"flex"} alignItems={"center"}>
      <StyledCheckBox
        disableRipple
        color={props.color}
        label={newProps?.label}
        name={newProps?.name}
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "MintCheckbox" }}
        {...props}
      />
    </Box>
  );
}

const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  "&.MuiCheckbox-indeterminate": {
    color: theme.mint.color.surfaceAccent.primary.primary,
    "&:hover": {
      color: theme.mint.color.surfaceAccent.primary.hover,
      boxShadow: "none",
    },
  },
}));
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 4,
  width: 18,
  height: 18,
  boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.medium}`,
  "input:hover ~ &": {
    boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.mediumHover}`,
  },
  "input:disabled ~ &": {
    boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.disabled}`,
    background: theme.mint.color.border.low,
  },
  "input:checked ~ &": {
    boxShadow: "none",
  },
  "input:focus ~ &": {
    border: `none`,
    outline: `2px solid ${theme.mint.color.system.focus.focus}`,
    boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.medium}`,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
  "&:before": {
    display: "block",
    width: 18,
    height: 18,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: theme.mint.color.surfaceAccent.primary.hover,
    boxShadow: "none",
  },
  "input:focus ~ &": {
    boxShadow: "none",
    border: `none`,
    outline: `2px solid ${theme.mint.color.system.focus.focus}`,
    backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
  },
}));
