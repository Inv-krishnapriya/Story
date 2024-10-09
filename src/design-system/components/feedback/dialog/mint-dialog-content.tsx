import { DialogContent, DialogContentProps, styled } from "@mui/material";
import React from "react";

export function MintDialogContent(props: DialogContentProps) {
  return <StyledDialogContent {...props}>{props.children}</StyledDialogContent>;
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingLeft: theme.mint.spacing.m,
  paddingRight: theme.mint.spacing.m,
  paddingBottom: theme.mint.spacing.s,
  paddingTop: 0,
}));
