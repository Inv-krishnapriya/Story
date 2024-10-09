"use client";

import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTypography,
} from "@/design-system";
import { Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMonitorData } from "./ApplicantDetails";

interface ICoulmnSettingsProp {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
  onDisagree: () => void;
  applicantList: IMonitorData[];
}
const SendOffModal: React.FC<ICoulmnSettingsProp> = (props) => {
  const { open, onClose, onAgree, onDisagree, applicantList } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <MintDialog
        open={open}
        onClose={onClose}
        aria-labelledby="display-settings-dialog"
        aria-describedby="display-settings-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxHeight: "295px",
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0,
            borderRadius: (theme) => theme.mint.cornerRadius.xs,
            background: (theme) => theme.mint.color.surfaceGray.high.high,
            boxShadow: "rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <MintDialogTitle>
          {t("campaign.campaignDetail.modalsendoff.title")}
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
          <MintTypography
            size="body"
            weight="400"
            color={theme.mint.color.text.high}
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              lineHeight: "150%",
            }}
          >
            {t("campaign.campaignDetail.modalsendoff.content")}
          </MintTypography>
          <MintTypography
            size="body"
            weight="700"
            color={theme.mint.color.text.high}
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              lineHeight: "150%",
            }}
          >
            {t("campaign.campaignDetail.modalsendoff.sendoffmonitors")}
          </MintTypography>
          <Stack
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              alignSelf: "stretch",
            }}
          >
            {applicantList.map((monitor) => (
              <MintTypography
                px={2}
                size="body"
                weight="400"
                lineHeight={"150%"}
                alignSelf={"stretch"}
              >
                <li>{monitor.name}</li>
              </MintTypography>
            ))}
          </Stack>
        </MintDialogContent>
        <MintDialogActions
          maxHeight="56px"
          height="56px"
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "flex-end",
            alignItems: "flex-start",
            gap: 1,
            alignSelf: "stretch",
          }}
        >
          <MintButton
            size="small"
            variant="text"
            color="accentPrimary"
            onClick={onDisagree}
          >
            <MintTypography
              size="body"
              weight="500"
              color={theme.mint.color.text.accent}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.modalsendoff.disagreeButton")}
            </MintTypography>
          </MintButton>
          <MintButton
            size="medium"
            variant="contained"
            // color="accentPrimary"
            onClick={onAgree}
            sx={{ background: theme.mint.color.surfaceAccent.primary.primary }}
            data-testid="agree-button"
          >
            <MintTypography
              size="body"
              weight="500"
              color={theme.mint.color.text.highInverse}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.modalsendoff.agreeButton")}
            </MintTypography>
          </MintButton>
        </MintDialogActions>
      </MintDialog>
    </>
  );
};
export default SendOffModal;
