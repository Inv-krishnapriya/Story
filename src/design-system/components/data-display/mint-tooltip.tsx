import { Tooltip, TooltipProps, styled, useTheme } from "@mui/material";
import React from "react";

interface CustomTooltipProps extends TooltipProps {
  children: any;
}

export function MintTooltip(props: Readonly<CustomTooltipProps>) {
  const { children, PopperProps, ...others } = props;
  const theme = useTheme();
  return (
    <Tooltip
      arrow
      PopperProps={{
        ...PopperProps,
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: theme.mint.color.surfaceAccent.primary.dark,
          },
          "& .MuiTooltip-arrow": {
            color: theme.mint.color.surfaceAccent.primary.dark,
          },
          "&.MuiTooltip-popper": {
            zIndex: 1001,
          },
          ...PopperProps?.sx,
        },
      }}
      {...others}
    >
      {children}
    </Tooltip>
  );
}
