"use client";

import { MintLink, MintTypography } from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ConfidentialityAgreement = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack gap={theme.mint.spacing.m}>
      <IndentedText>{t("communication-agreement.disclaimer")}</IndentedText>
      <Box component="section">
        <IndentedText>{t("communication-agreement.section.1.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.1.2")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.1.3")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.2.1")}</IndentedText>
        <IndentedText indent={1}>
          {t("communication-agreement.section.2.1-1")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.2.1-2")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.2.1-3")}
        </IndentedText>
      </Box>

      <Box component="section">
        <IndentedText indent={1}>
          {t("communication-agreement.section.2-1.1")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.2-1.2")}
        </IndentedText>
      </Box>

      <Box component="section">
        <IndentedText indent={1}>
          {t("communication-agreement.section.3.1")}
        </IndentedText>
        <IndentedText>{t("communication-agreement.section.3.2")}</IndentedText>
        <IndentedText>
          {t("communication-agreement.section.3.3-1")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.3.3-2")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.3.3-3")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.3.3-4")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.section.3.3-5")}
        </IndentedText>
      </Box>

      <Box component="section">
        <IndentedText indent={1}>
          {t("communication-agreement.section.4.1")}
        </IndentedText>
        <IndentedText>{t("communication-agreement.section.4.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.5.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.5.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.6.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.6.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.7.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.7.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.8.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.8.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.section.8.1")}</IndentedText>
        <IndentedText>{t("communication-agreement.section.8.2")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>
          {t("communication-agreement.address.line-1")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.address.line-2")}
        </IndentedText>
        <IndentedText>
          {t("communication-agreement.address.line-3")}
        </IndentedText>
        <MintTypography
          size="body"
          weight="400"
          display="flex"
          alignItems="center"
        >
          {t("communication-agreement.address.line-4")}
          <MintLink sx={{ mr: "3px" }} path="/app/inquiry">
            {t("communication-agreement.address.line-5-link")}
          </MintLink>
          {t("communication-agreement.address.close")}
        </MintTypography>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.thats-all")}</IndentedText>
      </Box>

      <Box component="section">
        <IndentedText>{t("communication-agreement.i-agree")}</IndentedText>
      </Box>
    </Stack>
  );
};

export default ConfidentialityAgreement;

interface IndentedTextProp {
  indent?: number;
  size?:
    | "body"
    | "button"
    | "caption"
    | "head-xxl"
    | "head-xl"
    | "head-l"
    | "head-m"
    | "head-s"
    | "head-xs";
  weight?: "400" | "500" | "700" | "800";
}

const IndentedText: React.FC<React.PropsWithChildren<IndentedTextProp>> = ({
  children,
  indent = 0,
  size = "body",
  weight = "400",
}) => {
  const indentSpace = "\u00A0 \u00A0".repeat(indent);
  return (
    <MintTypography size={size} weight={weight}>
      {indentSpace}
      {children}
    </MintTypography>
  );
};
