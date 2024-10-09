import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { MintIconButton } from "../input/mint-icon-button";
import { MintTypography } from "../input/mint-typography";

export const MintAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.mint.color.surfaceAccent.primaryNavigation.primary,
}));
