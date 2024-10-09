"use client";
import { MintLink, MintTypography } from "@/design-system";
import { asPixels } from "@/utils";
import { Box, Paper, Stack, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function SecurityCheckSheetPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const openSecurityCheckSheetPDFIPAVersion = () => {
    window.open("/security-check-sheet-ipa.pdf", "_blank");
  };

  const openSecurityCheckSheetPDF = () => {
    window.open("/security-check-sheet.pdf", "_blank");
  };

  return (
    <Stack gap={theme.mint.spacing.s}>
      <MintTypography size="head-m" weight="700">
        {t("security-check-sheet.title")}
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
        <Box>
          <MintTypography size="body" weight="400">
            {t("security-check-sheet.disclaimer.1")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("security-check-sheet.disclaimer.2")}
          </MintTypography>
        </Box>

        <Stack gap={theme.mint.spacing.s}>
          <Stack gap={theme.mint.spacing.m}>
            <MintTypography size="head-s" weight="700">
              {t("security-check-sheet.interview-zero-check-sheet")}
            </MintTypography>
            <Stack
              px={theme.mint.spacing.m}
              py={theme.mint.spacing.s}
              gap={theme.mint.spacing.m}
              borderRadius={asPixels(theme.mint.cornerRadius.m)}
              border={`1px solid ${theme.mint.color.border.medium}`}
            >
              <MintTypography size="body" weight="400" component="span">
                {t("security-check-sheet.disclosure.published-by")}
                <InlineLink
                  href="https://www.soumu.go.jp/menu_news/s-news/01ryutsu02_02000167.html"
                  target="_blank"
                >
                  {t("security-check-sheet.disclosure.guidelines-link")}
                </InlineLink>
                {t("security-check-sheet.disclosure.IPA")}
                <InlineLink
                  href=" https://www.ipa.go.jp/security/vuln/websecurity/about.html"
                  target="_blank"
                >
                  {t("security-check-sheet.disclosure.check-sheet-link")}
                </InlineLink>
                {t("security-check-sheet.disclosure.download-check-sheet")}
              </MintTypography>
              <Stack gap={theme.mint.spacing.xxs}>
                <MintLink onClick={openSecurityCheckSheetPDF}>
                  {t(
                    "security-check-sheet.download-ministry-of-internal-affairs"
                  )}
                </MintLink>
                <MintTypography size="body" weight="400">
                  {t("security-check-sheet.info-related-to-service")}
                </MintTypography>
              </Stack>
              <Stack gap={theme.mint.spacing.xxs}>
                <MintLink onClick={openSecurityCheckSheetPDFIPAVersion}>
                  {t("security-check-sheet.download-IPA-version")}
                </MintLink>
                <MintTypography size="body" weight="400">
                  {t("security-check-sheet.info-application-security")}
                </MintTypography>
              </Stack>
            </Stack>
          </Stack>
          <Box>
            <MintTypography size="body" weight="400">
              {t("security-check-sheet.sheet-contains-disclosed-info")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("security-check-sheet.cannot-respond-to-queries-not-in-sheet")}
            </MintTypography>
          </Box>
        </Stack>

        <Stack gap={theme.mint.spacing.s}>
          <MintTypography
            size="head-s"
            weight="700"
            mb={theme.mint.spacing.xxs}
          >
            {t("security-check-sheet.security-measures")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("security-check-sheet.for-more-download-check-sheet")}
          </MintTypography>

          <Stack gap={theme.mint.spacing.x3s}>
            <MintTypography size="head-xs" weight="700">
              {t("security-check-sheet.application-protection")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("security-check-sheet.encrypted-by-https")}
            </MintTypography>
          </Stack>

          <Stack gap={theme.mint.spacing.x3s}>
            <MintTypography size="head-xs" weight="700">
              {t("security-check-sheet.data-operation-management")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("security-check-sheet.uses-aws")}
            </MintTypography>
          </Stack>

          <Stack gap={theme.mint.spacing.x3s}>
            <MintTypography size="head-xs" weight="700">
              {t("security-check-sheet.use-the-system")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("security-check-sheet.monitored-24*7")}
            </MintTypography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
export default SecurityCheckSheetPage;

const InlineLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & React.PropsWithChildren<{}>
> = ({ children, ...props }) => (
  <Box
    component="a"
    color={(theme) => theme.mint.color.text.link}
    fontSize={(theme) => asPixels(theme.mint.typography.fontSize.body)}
    fontWeight={400}
    lineHeight="150%"
    sx={{
      textDecoration: "none",
    }}
    {...props}
  >
    {children}
  </Box>
);
