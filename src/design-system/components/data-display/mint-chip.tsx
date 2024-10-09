import React from "react";
import { Chip, ChipProps, styled } from "@mui/material";

interface CustomChipProps extends ChipProps {
  selected?: boolean;
}

export function MintChip(props: Readonly<CustomChipProps>) {
  return <ChipStyled {...props}>{props.children}</ChipStyled>;
}

interface ChipStyledProps {
  selected?: boolean;
}

const ChipStyled = styled(Chip)<ChipStyledProps>(({ theme, selected }) => ({
  "&.MuiChip-root": {
    height: "28px",
    padding: "4px 8px",
    alignItems: "center",
    flexShrink: "0",

    ...(selected && {
      backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      color: theme.mint.color.text.highInverse,
      ".MuiSvgIcon-root": {
        color: theme.mint.color.text.highInverse,
      },
    }),
  },
  "& .MuiChip-label": {
    paddingLeft: 0,
    paddingRight: "4px",
  },
  "&.MuiChip-filledPrimary": {
    backgroundColor: theme.mint.color.surfaceAccent.primary.bright,
    color: theme.mint.color.text.accent,
    ".MuiSvgIcon-root": {
      color: theme.mint.color.object.accent,
      width: "16px",
      height: "16px",
    },
    ".MuiChip-deleteIcon": {
      color: theme.mint.color.surfaceAccent.primary.primary,
      margin: 0,
    },
    ...(selected && {
      backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      color: theme.mint.color.text.highInverse,
    }),
    "&:hover": {
      backgroundColor: theme.mint.color.surfaceAccent.primary.brightHover,
      ...(selected && {
        backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      }),
    },

    "&.Mui-disabled": {
      backgroundColor: theme.mint.color.surfaceGray.disabled.disabled,
      color: theme.mint.color.text.disabled,
    },
  },
  "&.MuiChip-outlinedPrimary": {
    backgroundColor: theme.mint.color.surfaceGray.componentBg.bg,
    color: theme.mint.color.text.accent,
    border: `1px solid ${theme.mint.color.border.accent}`,
    ".MuiSvgIcon-root": {
      color: theme.mint.color.text.highInverse,
    },
    ...(selected && {
      backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      color: theme.mint.color.text.highInverse,
    }),
    "&:hover": {
      backgroundColor: theme.mint.color.surfaceAccent.primary.areaHover,
      border: `1px solid ${theme.mint.color.border.accent}`,
      ...(selected && {
        backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      }),
    },

    "&.Mui-disabled": {
      border: `1px solid ${theme.mint.color.border.disabled}`,
      backgroundColor: theme.mint.color.surfaceGray.disabled.disabled,
      color: theme.mint.color.text.disabled,
    },
  },
  "&.MuiChip-filledGray": {
    backgroundColor: theme.mint.color.surfaceGray.medium.medium,
    color: theme.mint.color.text.high,
    ".MuiSvgIcon-root": {
      color: theme.mint.color.object.medium,
      ...(selected && {
        color: theme.mint.color.text.highInverse,
      }),
    },
    ...(selected && {
      backgroundColor: theme.mint.color.surfaceGray.componentBg.selected,
      color: theme.mint.color.text.highInverse,
    }),
    "&:hover": {
      backgroundColor: theme.mint.color.surfaceGray.medium.hover,
      ...(selected && {
        backgroundColor: theme.mint.color.surfaceGray.componentBg.selected,
        color: theme.mint.color.text.highInverse,
      }),
    },

    "&.Mui-disabled": {
      backgroundColor: theme.mint.color.surfaceGray.disabled.disabled,
    },
  },
}));
