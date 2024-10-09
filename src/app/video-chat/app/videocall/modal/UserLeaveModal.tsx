import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTypography,
} from "@/design-system";
import { useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IWaitingModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
  isUserLeft: boolean;
}
export default function UserLeaveModal(props: Readonly<IWaitingModalProps>) {
  const { open, onClose, onAgree, isUserLeft } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDialog-paper": {
          width: "400px",
        },
      }}
    >
      <MintDialogTitle>
        <MintTypography size="head-m" weight="500">
          {t("user-leave-modal.title")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent>
        <MintTypography size="body" weight="400">
          {t("user-leave-modal.disclaimer")}
        </MintTypography>
      </MintDialogContent>
      <MintDialogActions>
        <MintButton variant="text" onClick={onClose}>
          <MintTypography size="body" weight="500">
            {t("user-leave-modal.close")}
          </MintTypography>
        </MintButton>
        <MintButton
          disabled={isUserLeft}
          sx={{
            "&.MuiButton-containedPrimary": {
              background: theme.mint.color.system.error.error,
              ":hover": {
                background: theme.mint.color.system.error.hover,
              },
            },
          }}
          onClick={onAgree}
        >
          <MintTypography
            size="body"
            weight="500"
            color={theme.mint.color.text.highInverse}
          >
            {t("user-leave-modal.exit")}
          </MintTypography>
        </MintButton>
      </MintDialogActions>
    </MintDialog>
  );
}
