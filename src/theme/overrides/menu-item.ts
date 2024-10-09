// ----------------------------------------------------------------------
import { Theme } from "@mui/material/styles";

export default function MenuItemOverride(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
            color: theme.palette?.common.white,
            "&.Mui-focusVisible": {
              background: theme.mint.color.surfaceAccent.primary.primary,
            },
            "&:hover": {
              backgroundColor: theme.mint.color.surfaceAccent.primary.hover,
            },
          },
        },
      },
    },
  };
}
