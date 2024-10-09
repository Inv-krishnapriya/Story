"use client";

import { MintTypography } from "@/design-system";
import { asPixels } from "@/utils";
import { Paper, Stack, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import TermsOfUseSections from "@/components/page-elements/terms/TermsOfUseSections";

const TermsAndConditionPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Stack gap={theme.mint.spacing.s}>
      <MintTypography size="head-m" weight="700">
        {t("terms-of-use.title")}
      </MintTypography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: theme.mint.spacing.m,
          pb: theme.mint.spacing.xl,
          gap: theme.mint.spacing.m,
          borderRadius: asPixels(theme.mint.cornerRadius.xl),
        }}
      >
        <TermsOfUseSections
          establishedDate={t("terms-of-use.implementation-date")}
        />
      </Paper>
    </Stack>
  );
};

export default TermsAndConditionPage;
