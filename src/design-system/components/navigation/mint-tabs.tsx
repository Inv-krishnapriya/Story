import React from "react";
import { styled, Tabs, TabsProps } from "@mui/material";

export type MintTabsProps = TabsProps;

export function MintTabs(props: MintTabsProps) {
  return <TabsStyled {...props} />;
}

const TabsStyled = styled(Tabs)(({ theme }) => ({
  minHeight: 37,
  ".MuiButtonBase-root": {
    padding: `${theme.mint.spacing.xxs}px ${theme.mint.spacing.s}px`,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    color: theme.mint.color.text.high,
    minHeight: 37,
    borderBottom: `2px solid ${theme.mint.color.border.low}`,
    "&.Mui-selected": {
      fontWeight: 700,
      color: theme.mint.color.text.accent,
    },
  },
  ".MuiTabs-indicator": {
    backgroundColor: theme.mint.color.border.accent,
  },
}));
