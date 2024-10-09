import { Alert, AlertProps, AlertTitle, styled } from "@mui/material";
import React from "react";

interface CustomAlertProps extends AlertProps {
  message?: string;
}

export function MintAlert(props: Readonly<CustomAlertProps>) {
  const { title, message, ...others } = props;
  return (
    <AlertStyled {...others}>
      <AlertTitle>{props.title}</AlertTitle>
      {message}
    </AlertStyled>
  );
}

const AlertStyled = styled(Alert)(({ theme }) => ({
  "&.MuiAlert-root": {
    padding: "16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
    ".MuiAlertTitle-root": {
      color: theme.mint.color.text.high,
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "150%",
    },
    "&.MuiAlert-outlined": {
      color: theme.mint.color.text.medium,
    },
    "&.MuiAlert-standard": {
      color: theme.mint.color.text.medium,
      ".MuiAlert-action": {
        color: theme.mint.color.text.high,
      },
    },
    "&.MuiAlert-filledSuccess": {
      backgroundColor: theme.mint.color.system.success.success,
    },
    "&.MuiAlert-filledError": {
      backgroundColor: theme.mint.color.system.error.error,
    },
    "&.MuiAlert-filledWarning": {
      backgroundColor: theme.mint.color.system.warning.warning,
    },
    "&.MuiAlert-filledInfo": {
      backgroundColor: theme.mint.color.system.info.info,
    },
    "&.MuiAlert-outlinedError": {
      border: `1px solid ${theme.mint.color.system.error.error}`,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.error.error,
      },
    },
    "&.MuiAlert-outlinedWarning": {
      border: `1px solid ${theme.mint.color.system.warning.warning}`,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.warning.warning,
      },
    },
    "&.MuiAlert-outlinedSuccess": {
      border: `1px solid ${theme.mint.color.system.success.success}`,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.success.success,
      },
    },
    "&.MuiAlert-outlinedInfo": {
      border: `1px solid ${theme.mint.color.system.info.info}`,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.info.info,
      },
    },
    "&.MuiAlert-standardError": {
      backgroundColor: theme.mint.color.system.error.bright,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.error.error,
      },
    },
    "&.MuiAlert-standardWarning": {
      backgroundColor: theme.mint.color.system.warning.bright,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.warning.warning,
      },
    },
    "&.MuiAlert-standardSuccess": {
      backgroundColor: theme.mint.color.system.success.bright,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.success.success,
      },
    },
    "&.MuiAlert-standardInfo": {
      backgroundColor: theme.mint.color.system.info.bright,
      "& .MuiAlert-icon": {
        color: theme.mint.color.system.info.info,
      },
    },
    ".MuiAlert-message": {
      padding: 0,
    },
    ".MuiAlert-icon": {
      display: "flex",
      alignItems: "center",
    },
  },
}));
