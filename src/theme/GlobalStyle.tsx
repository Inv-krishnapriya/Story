import { GlobalStyles, useTheme } from "@mui/material";
import React from "react";

function GlobalStyle() {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        "::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "::-webkit-scrollbar-track": {
          //   "-webkit-box-shadow": `inset 0 0 6px ${theme.mint.color.object.low}`,
          borderRadius: "8px",
          backgroundColor: "#ebebeb",
          WebkitBorderRadius: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme.mint.color.surfaceGray.low.low,
          borderRadius: "8px",
        },
      }}
    />
  );
}

export default GlobalStyle;
