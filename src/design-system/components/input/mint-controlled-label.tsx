import { FormControlLabel, FormControlLabelProps, styled } from "@mui/material";
import React from "react";

export function MintFormControlLabel(props: FormControlLabelProps) {
  return <StyledFormControlLabel {...props} />;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  gap: theme.mint.spacing.xxs,
  ".MuiFormControlLabel-label": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "150%",
    color: theme.mint.color.text.high,
  },
}));
