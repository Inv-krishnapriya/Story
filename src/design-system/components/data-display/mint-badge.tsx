import { Box, ThemeOptions, useTheme } from "@mui/material";
import React from "react";
import { MintTypography } from "../input/mint-typography";

export function MintBadge({
  count,
  color = "primary",
  disabled = false,
}: Readonly<{
  count?: number;
  color?: "primary" | "error";
  disabled?: boolean;
}>) {
  const theme = useTheme();
  const variantStyle = getVariantStyle(color, theme);
  const dotStyle = {
    height: theme.mint.spacing.xxs,
    minWidth: theme.mint.spacing.xxs,
    padding: 0,
  };

  const style = disabled
    ? {
        background: theme.mint.color.surfaceGray.disabled.disabled,
        color: theme.mint.color.text.disabled,
      }
    : variantStyle;

  return (
    <Box
      sx={{
        display: "inline-flex",
        height: "20px",
        minWidth: "20px",
        padding: "0px 6px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: "0",
        borderRadius: theme.mint.cornerRadius.full,
        ...style, // Spread the style object here
        ...(!count && dotStyle),
      }}
    >
      {count && (
        <MintTypography
          size="caption"
          weight={"400"}
          sx={{
            color: style?.color, // Set text color based on the chosen style
          }}
        >
          {count}
        </MintTypography>
      )}
    </Box>
  );
}

// Extract the logic to get the variant style into a separate function
function getVariantStyle(color: "primary" | "error", theme: ThemeOptions) {
  const style = [
    {
      color: "primary",
      style: {
        background: theme.mint.color.surfaceAccent.primary.primary,
        color: theme.mint.color.text.highInverse,
      },
    },
    {
      color: "error",
      style: {
        background: theme.mint.color.system.error.error,
        color: theme.mint.color.text.highInverse,
      },
    },
  ];

  return style.find((s) => s.color === color)?.style;
}
