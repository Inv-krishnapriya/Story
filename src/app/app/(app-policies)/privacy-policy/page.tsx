"use client";

import { MintLink, MintTypography } from "@/design-system";
import { asPixels } from "@/utils";
import { Paper, Stack, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack gap={theme.mint.spacing.s}>
      <MintTypography size="head-m" weight="700">
        {t("privacy-policy.title")}
      </MintTypography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          px: theme.mint.spacing.m,
          pt: theme.mint.spacing.m,
          pb: theme.mint.spacing.xl,
          gap: theme.mint.spacing.m,
          borderRadius: asPixels(theme.mint.cornerRadius.xl),
        }}
      >
        <MintTypography size="body" weight="400">
          {t("privacy-policy.please-see-link")}
        </MintTypography>

        <MintLink path="https://www.macromill.com/privacy.html">
          {t("privacy-policy.link")}
        </MintLink>
      </Paper>
    </Stack>
  );
};

export default PrivacyPolicyPage;
