"use client";
import { MintTypography } from "@/design-system";
import { Box, Paper, Stack, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CompanyProfilePage = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Stack flex={1} gap={theme.mint.spacing.s}>
      <MintTypography size="head-m" weight="700">
        {t("company-profile.title")}
      </MintTypography>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          px: theme.mint.spacing.m,
          pt: theme.mint.spacing.m,
          pb: theme.mint.spacing.xl,
          gap: theme.mint.spacing.xxl,
          borderRadius: `${theme.mint.cornerRadius.xl}px`,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
        }}
      >
        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.company-name")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.macromill")}
          </MintTypography>
        </Stack>

        <Box>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.location")}
          </MintTypography>
          <Stack mt={theme.mint.spacing.m} gap={theme.mint.spacing.s}>
            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.main.name")}
              </MintTypography>

              <Box>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.main.address")}
                </MintTypography>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.main.tel")}
                </MintTypography>
              </Box>
            </Stack>

            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.shinagawa.name")}
              </MintTypography>
              <MintTypography size="body" weight="400">
                {t("company-profile.office.shinagawa.address")}
              </MintTypography>
            </Stack>

            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.kansai.name")}
              </MintTypography>
              <Box>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.kansai.address")}
                </MintTypography>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.kansai.tel")}
                </MintTypography>
              </Box>
            </Stack>

            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.nagoya.name")}
              </MintTypography>
              <Box>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.nagoya.address")}
                </MintTypography>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.nagoya.tel")}
                </MintTypography>
              </Box>
            </Stack>

            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.sendai.name")}
              </MintTypography>
              <Box>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.sendai.address")}
                </MintTypography>
                <MintTypography size="body" weight="400">
                  {t("company-profile.office.sendai.tel")}
                </MintTypography>
              </Box>
            </Stack>

            <Stack gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="head-s"
                weight="700"
                color={theme.mint.color.text.accent}
              >
                {t("company-profile.office.fukuoka.name")}
              </MintTypography>
              <MintTypography size="body" weight="400">
                {t("company-profile.office.fukuoka.address")}
              </MintTypography>
            </Stack>
          </Stack>
        </Box>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.estabished-date-label")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.estabished-date")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.representative")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.ceo")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.capital")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.capital-amount")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.revenue")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.revenue-amount")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.listed-exchange")}
          </MintTypography>
          <MintTypography size="body" weight="400">
            {t("company-profile.tokyo-stock-exchange")}
          </MintTypography>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.number-of-employees.label")}
          </MintTypography>
          <Box>
            <MintTypography size="body" weight="400">
              {t("company-profile.number-of-employees.date")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("company-profile.number-of-employees.consolidated")}
            </MintTypography>
            <MintTypography size="body" weight="400">
              {t("company-profile.number-of-employees.non-consolidated")}
            </MintTypography>
          </Box>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <MintTypography size="head-s" weight="700">
            {t("company-profile.business.label")}
          </MintTypography>

          <List>
            <List.Item>
              {t("company-profile.business.research.marketing")}
            </List.Item>
            <List.NestedItem>
              {t("company-profile.business.research.internet")}
            </List.NestedItem>
            <List.NestedItem>
              {t("company-profile.business.research.offline")}
            </List.NestedItem>
            <List.NestedItem>
              {t("company-profile.business.research.analysis")}
            </List.NestedItem>
            <List.Item>
              {t("company-profile.business.research.global")}
            </List.Item>
            <List.Item>
              {t("company-profile.business.research.digital-marketing")}
            </List.Item>
            <List.Item>{t("company-profile.business.database")}</List.Item>
            <List.NestedItem>
              {t("company-profile.business.purchasing-db")}
            </List.NestedItem>{" "}
            <List.NestedItem>
              {t("company-profile.business.lifestyle-db")}
            </List.NestedItem>
            <List.Item>{t("company-profile.business.self-type")}</List.Item>
            <List.Item>
              {t("company-profile.business.data-utilization-support")}
            </List.Item>
            <List.Item>
              {t("company-profile.business.marketing-measure")}
            </List.Item>
            <List.Item>{t("company-profile.business.life-science")}</List.Item>
          </List>
        </Stack>

        <Stack gap={theme.mint.spacing.m}>
          <Box
            px={theme.mint.spacing.s}
            py={theme.mint.spacing.xxs}
            sx={{
              backgroundColor: theme.mint.color.surfaceAccent.primary.bright,
            }}
          >
            <MintTypography size="head-s" weight="700">
              {t("company-profile.group-company")}
            </MintTypography>
          </Box>

          <Stack gap={theme.mint.spacing.s}>
            <MintTypography
              size="head-s"
              weight="700"
              color={theme.mint.color.text.medium}
            >
              {t("company-profile.consolidated-subsidiary")}
            </MintTypography>
            <List>
              <List.Item>{t("company-profile.dentsu-macromill")}</List.Item>
              <List.Item>{t("company-profile.h-m-marketing")}</List.Item>
              <List.Item>{t("company-profile.macromil-care")}</List.Item>
              <List.Item>{t("company-profile.monitasu")}</List.Item>
              <List.Item>{t("company-profile.m-cube")}</List.Item>
              <List.Item>{t("company-profile.sentan")}</List.Item>
              <List.Item>{t("company-profile.eight-hundred")}</List.Item>
              <List.Item>{t("company-profile.acrymate")}</List.Item>
              <List.Item>{t("company-profile.macromill-south-asia")}</List.Item>
              <List.Item>{t("company-profile.macromill-embrain")}</List.Item>
              <List.Item>{t("company-profile.macromill-china")}</List.Item>
            </List>

            <MintTypography
              size="head-s"
              weight="700"
              color={theme.mint.color.text.medium}
            >
              {t("company-profile.equity-method-company")}
            </MintTypography>

            <List>
              <List.Item>{t("company-profile.shitacion-japan")}</List.Item>
              <List.Item>{t("company-profile.toluna-holdings")}</List.Item>
              <List.Item>{t("company-profile.eolembrain")}</List.Item>
            </List>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default CompanyProfilePage;

function List({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Box component="ul">{children}</Box>;
}

const ListItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      component="li"
      alignItems="center"
      mt={(theme) => theme.mint.spacing.s}
      gap={(theme) => theme.mint.spacing.m}
    >
      <Box
        height="6px"
        width="6px"
        borderRadius={(theme) => theme.mint.cornerRadius.full}
        sx={{ backgroundColor: (theme) => theme.mint.color.text.accent }}
      />
      <MintTypography size="body" weight="400">
        {children}
      </MintTypography>
    </Box>
  );
};

const NestedListItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      component="li"
      alignItems="center"
      mt={(theme) => theme.mint.spacing.xxs}
      gap={(theme) => theme.mint.spacing.m}
      px={(theme) => theme.mint.spacing.l}
    >
      <MintTypography size="body" weight="500">
        -
      </MintTypography>
      <MintTypography size="body" weight="400">
        {children}
      </MintTypography>
    </Box>
  );
};

List.Item = ListItem;
List.NestedItem = NestedListItem;
