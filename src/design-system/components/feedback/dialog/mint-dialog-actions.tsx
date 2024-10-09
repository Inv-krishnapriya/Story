import { DialogActions, styled } from "@mui/material";
import React from "react";

export function MintDialogActions(props: any) {
  return <StyledDialogActions {...props}>{props.children}</StyledDialogActions>;
}
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.mint.spacing.s,
}));
