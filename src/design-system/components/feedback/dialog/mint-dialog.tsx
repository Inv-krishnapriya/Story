import { Dialog, DialogProps, styled } from "@mui/material";
import React from "react";

export function MintDialog(props: DialogProps) {
  return <StyledDialog {...props}>{props.children}</StyledDialog>;
}
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.mint.cornerRadius.m,
    boxShadow:
      "0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 11px 15px -7px rgba(0, 0, 0, 0.20)",
  },
}));
