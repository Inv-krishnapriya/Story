import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTypography,
} from "@/design-system";
import { Box, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IPolicyModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function InterviewPolicyModal(
  props: Readonly<IPolicyModalProps>
) {
  const { open, onClose, onAgree } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDialog-container": {
          display: "flex",
          alignItems: "flex-start",
        },
        ".MuiDialog-paper": {
          display: "flex",
          width: "600px",
          // height: "400px",
          maxHeight: "400px",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "8px",
          background: theme.mint.color.surfaceGray.high.high,
          overflowY: "hidden",
        },
      }}
    >
      <MintDialogTitle
        sx={{
          display: "flex",
          padding: "24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          alignSelf: "stretch",
        }}
      >
        <MintTypography size="head-m" weight="500">
          {t("interview-policy-modal.title")}
        </MintTypography>
      </MintDialogTitle>
      <Box
        sx={{
          display: "flex",
          padding: "0px 24px 16px 24px",
          alignItems: "flex-start",
          gap: 0,
          flex: "8px 0px 0px",
          alignSelf: "stretch",
          maxHeight: "250px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            alignItems: "flex-start",
            gap: 0,
            flex: "8px 0px 0px",
            alignSelf: "stretch",
          }}
        >
          <MintDialogContent
            sx={{
              "&.MuiDialogContent-root": {
                padding: "unset",
              },
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              flex: "8px 0px 0px",
              alignSelf: "stretch",
              flexDirection: "column",
            }}
          >
            <MintTypography size="body" weight="400">
              <li>{t("interview-policy-modal.disclaimer-1")}</li>
            </MintTypography>
            <MintTypography size="body" weight="400">
              <li style={{ wordBreak: "keep-all" }}>
                {t("interview-policy-modal.disclaimer-2")}
                <MintTypography
                  size="body"
                  weight="400"
                  sx={{ paddingLeft: "20px" }}
                >
                  {t("interview-policy-modal.disclaimer-3")}
                </MintTypography>
                <MintTypography
                  size="body"
                  weight="400"
                  sx={{ paddingLeft: "20px" }}
                >
                  {t("interview-policy-modal.thank-you")}
                </MintTypography>
              </li>
            </MintTypography>
          </MintDialogContent>
        </Box>
      </Box>
      <MintDialogActions
        sx={{
          display: "flex",
          padding: "16px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            flex: "8px 0px 0px",
          }}
        >
          <MintButton variant="text" onClick={onClose}>
            {t("interview-policy-modal.cancel")}
          </MintButton>
          <MintButton onClick={onAgree}>
            {t("interview-policy-modal.receive")}
          </MintButton>
        </Box>
      </MintDialogActions>
    </MintDialog>
  );
}
