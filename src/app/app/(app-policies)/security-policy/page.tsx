"use client";

import { MintTypography } from "@/design-system";
import { asPixels } from "@/utils";
import { Paper, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const SecurityPolicyPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack gap={theme.mint.spacing.s}>
      <MintTypography size="head-m" weight="700">
        {t("security-policy.title")}
      </MintTypography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: theme.mint.spacing.m,
          pb: theme.mint.spacing.xl,
          gap: theme.mint.spacing.l,
          borderRadius: asPixels(theme.mint.cornerRadius.xl),
        }}
      >
        <Stack gap={theme.mint.spacing.s}>
          <MintTypography size="body" weight="400">
            {t("security-policy.disclaimer.1")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("security-policy.disclaimer.2")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography
            size="head-s"
            weight="700"
            mb={theme.mint.spacing.xxs}
          >
            {t("security-policy.information-security-basic.title")}
          </MintTypography>

          <Stack gap={theme.mint.spacing.s}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((point) => (
              <MintTypography size="body" weight="400" key={point}>
                {t(`security-policy.information-security-basic.${point}`)}
              </MintTypography>
            ))}
          </Stack>

          <MintTypography size="body" weight="400">
            {t(`security-policy.information-security-basic.enacted-date`)}
          </MintTypography>

          <Stack>
            <MintTypography size="body" weight="400" align="right">
              {t(`security-policy.information-security-basic.macromill`)}
            </MintTypography>
            <MintTypography size="body" weight="400" align="right">
              {t(`security-policy.information-security-basic.macromill-ceo`)}
            </MintTypography>
          </Stack>

          <Stack gap={theme.mint.spacing.s}>
            <MintTypography size="head-s" weight="700">
              {t(`security-policy.about-information-encryption.title`)}
            </MintTypography>
            <Stack alignItems="center">
              <Image
                width={117}
                height={74}
                src={"/images/information-security.png"}
                alt="404"
                style={{
                  objectFit: "contain",
                }}
              />
            </Stack>
            <MintTypography size="body" weight="400">
              {t(`security-policy.about-information-encryption.disclaimer.1`)}
            </MintTypography>{" "}
            <MintTypography size="body" weight="400">
              {t(`security-policy.about-information-encryption.disclaimer.2`)}
            </MintTypography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default SecurityPolicyPage;
