import { Switch, SwitchProps, styled } from "@mui/material";
import React from "react";

export function MintSwitch(props: Readonly<SwitchProps>) {
  return <StyledSwitch {...props} />;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },

  "& .Mui-disabled + .MuiSwitch-track": {
    backgroundColor: `${theme.mint.color.surfaceAccent.primary.disabled} !important`,
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "&.MuiSwitch-input:focus": {},
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.mint.color.surfaceAccent.primary.primary,
      },
      "&:hover  + .MuiSwitch-track": {
        backgroundColor: theme.mint.color.surfaceAccent.primary.hover,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: "16px",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
  //   "&:hover": {
  //     ".MuiSwitch-track": {
  //       backgroundColor: "red",
  //     },
  //   },
}));
