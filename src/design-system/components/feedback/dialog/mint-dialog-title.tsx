import { DialogTitle, DialogTitleProps, styled } from "@mui/material";
import React from "react";

export function MintDialogTitle(props: DialogTitleProps) {
  return <StyledDialogTitle {...props}>{props.children}</StyledDialogTitle>;
}

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.mint.spacing.m,
}));
