"use client";
import { videoChatService } from "@/common/apiUrls";
import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTextField,
  MintTypography,
  successToast,
} from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { updateReportStatus } from "@/stores/videocall/reducer";
import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface IFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReportModal(props: Readonly<IFeedbackModalProps>) {
  const { open, onClose } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [reason, setReason] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const dispatch = useDispatch();
  const [contentError, setContentError] = useState<string>("");

  const meetingData = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );

  const handleReport = () => {
    if (email.trim().length > 0 && reason.trim().length > 0) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        setEmailError(t("report-modal.invaild-email"));
        return;
      }
      let data = JSON.stringify({
        meetingId: meetingData?.meetingId,
        text: reason,
        feedbackType: 1,
        email: email,
      });
      videoChatService
        .postInterviewFeedback(data)
        .then((response) => {
          console.log("Response from feedback api : ", response);
          successToast(t("report-modal.report-success-message"));
          dispatch(updateReportStatus(true));
          onClose();
        })
        .catch((error) => {
          console.log("Error occured in feedback api : ", error);
          onClose();
        });
    } else {
      if (email.trim().length === 0) {
        setEmailError(t("report-modal.email-required"));
      } else if (reason.trim().length === 0) {
        setContentError(t("report-modal.message-required"));
      }
      return;
    }
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailError("");
    setEmail(e.target.value);
  };

  const handleReasonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContentError("");
    setReason(e.target.value);
  };

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
          {t("report-modal.title")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          display: "flex",
          padding: "0px 24px 16px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <MintTypography size="body" weight="400">
            {t("report-modal.email-label")}
          </MintTypography>
          <MintTypography
            size="body"
            weight="700"
            color={theme.mint.color.system.error.error}
          >
            {t("report-modal.required")}
          </MintTypography>
        </Box>

        <MintTextField
          placeholder=""
          fullWidth
          sx={{
            "&.MuiTextField-root": {
              width: "350px",
              ".MuiInputBase-inputSizeSmall": {
                padding: "8px 0px",
              },
            },
            "&.MuiOutlinedInput-root": {
              padding: "4px 2px",
            },
            "& .MuiOutlinedInput-input": {
              resize: "auto",
              width: "552px",
              height: "24px",
            },
          }}
          value={email}
          onChange={(e) => handleEmailChange(e)}
          inputProps={{ "data-testid": "email" }}
        />
        {emailError && (
          <MintTypography color={theme.mint.color.system.error.error}>
            {emailError}
          </MintTypography>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <MintTypography size="body" weight="400">
            {t("report-modal.describe-problem")}
          </MintTypography>
          <MintTypography
            size="body"
            weight="700"
            color={theme.mint.color.system.error.error}
          >
            {t("report-modal.required")}
          </MintTypography>
        </Box>

        <MintTextField
          multiline
          fullWidth
          minRows={2}
          placeholder={t("report-modal.enter-message")}
          sx={{
            "&.MuiTextField-root": {
              width: "350px",
              ".MuiInputBase-inputSizeSmall": {
                padding: "8px 0px",
              },
            },
            "&.MuiOutlinedInput-root": {
              padding: "4px 2px",
            },
            "& .MuiOutlinedInput-input": {
              resize: "auto",
              width: "552px",
              height: "24px",
            },
          }}
          value={reason}
          onChange={(e) => handleReasonChange(e)}
        />
        {contentError && (
          <MintTypography color={theme.mint.color.system.error.error}>
            {contentError}
          </MintTypography>
        )}
      </MintDialogContent>
      <MintDialogActions>
        <MintButton variant="text" onClick={onClose}>
          <MintTypography size="body" weight="500">
            {t("report-modal.cancel")}
          </MintTypography>
        </MintButton>
        <MintButton
          sx={{
            background: theme.mint.color.surfaceAccent.primary.primary,
          }}
          data-testid="report-submit"
          onClick={handleReport}
        >
          {t("report-modal.send")}
        </MintButton>
      </MintDialogActions>
    </MintDialog>
  );
}
