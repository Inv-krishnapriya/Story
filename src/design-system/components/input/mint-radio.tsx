import { Radio, RadioProps, styled } from "@mui/material";
import React from "react";

export function MintRadio(props: Readonly<RadioProps>) {
  const newprops = { ...props };
  newprops.size = newprops.size ?? "small";

  return (
    <StyledRadio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
     
      {...props}
    />
  );
}

const StyledRadio = styled(Radio)(() => ({
  padding: 0,
}));

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 24,
  height: 24,
  position: "relative",
  boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.medium}`,
  "input:disabled ~ &": {
    boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.disabled}`,
    background: theme.mint.color.border.low,
  },
  "input:checked ~ &": {
    boxShadow: "none",
  },
  "input:hover ~ &": {
    boxShadow: `inset 0 0 0 2px ${theme.mint.color.border.mediumHover}`,
  },
  "input:focus ~ &": {
    border: `none`,
    outline: `2px solid ${theme.mint.color.system.focus.focus}`,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
  "&:before": {
    display: "block",
    width: 24,
    height: 24,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: theme.mint.color.surfaceAccent.primary.hover,
    boxShadow: "none",
  },
  "input:focus ~ &": {
    border: `none`,
    boxShadow: "none",
    backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
  },
  "input:checked:disabled ~ &": {
    backgroundColor: theme.mint.color.surfaceAccent.primary.disabled,
  },
}));
