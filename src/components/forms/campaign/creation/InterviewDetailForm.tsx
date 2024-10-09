import {
  MintButton,
  MintChip,
  MintTextField,
  MintTypography,
} from "@/design-system";

import { Box, Stack, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IndustryResponse } from "@/common/types";

function InterviewDetailForm({
  openModal,
  industries,
  ngIndustries,
}: {
  openModal: () => void;
  industries: IndustryResponse[];
  ngIndustries: string[];
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;

  const deleteChip = useCallback(
    (chipToDelete: string) => {
      const chips = ngIndustries?.filter((chip) => chip !== chipToDelete);
      setValue("ngIndustries", chips);
    },
    [ngIndustries]
  );
  return (
    <Box
      p={theme.mint.spacing.l}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      bgcolor={theme.mint.color.background.containerBg.layer1}
    >
      <Stack gap={theme.mint.spacing.m}>
        <Stack gap={theme.mint.spacing.xxs}>
          <MintTypography
            size="head-m"
            weight="700"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            {t("interview.section1.heading")}
          </MintTypography>
          <MintTypography
            size="body"
            weight="400"
            color={theme.mint.color.text.medium}
          >
            　　応募者に公開する内容になります。
          </MintTypography>
        </Stack>

        <Controller
          control={control}
          name="title"
          rules={{
            required: "messages.required",
            pattern: {
              value: /^(?!\s*$).+/,
              message: "messages.required",
            },
          }}
          render={({ field }) => (
            <MintTextField
              required
              label={t("interview.section1.title")}
              placeholder={t("interview.section1.title-placeholder")}
              fullWidth
              sx={{
                ".MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
              }}
              {...field}
              multiline
              minRows={1}
              inputProps={{
                maxLength: 50,
                style: { resize: "vertical" },
                "data-testid": "interview.section1.title-placeholder",
              }}
              error={!!errors.title?.message}
              helperText={
                errors.title?.message
                  ? t(String(errors.title?.message), {
                      field: t("interview.section1.title"),
                    })
                  : ""
              }
            />
          )}
        />
        <Controller
          control={control}
          name="conditions"
          rules={{
            required: "messages.required",
            pattern: {
              value: /^(?!\s*$).+/,
              message: "messages.required",
            },
            validate: {
              containsEmoji: (value) =>
                !/\p{Extended_Pictographic}/u.test(value) || "messages.emoji",
            },
          }}
          render={({ field }) => (
            <MintTextField
              required
              label={t("interview.section1.conditions")}
              placeholder={t("interview.section1.conditions-placeholder")}
              fullWidth
              sx={{
                ".MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
              }}
              {...field}
              multiline
              minRows={2}
              maxRows={8}
              inputProps={{
                maxLength: 500,
                style: { resize: "vertical" },
                "data-testid": "interview.section1.conditions-placeholder",
              }}
              error={!!errors.conditions?.message}
              helperText={
                errors.conditions?.message
                  ? t(String(errors.conditions?.message), {
                      field: t("interview.section1.conditions"),
                    })
                  : ""
              }
              id={errors.conditions?.message ? "form-error" : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="exclusion"
          rules={{
            validate: {
              containsEmoji: (value) =>
                !/\p{Extended_Pictographic}/u.test(value) || "messages.emoji",
            },
          }}
          render={({ field }) => (
            <MintTextField
              label={t("interview.section1.exclusion")}
              placeholder={t("interview.section1.exclusion-placeholder")}
              fullWidth
              sx={{
                ".MuiInputBase-root": {
                  backgroundColor: "transparent",
                },
              }}
              {...field}
              multiline
              minRows={2}
              maxRows={8}
              inputProps={{ maxLength: 500, style: { resize: "vertical" } }}
              error={!!errors.exclusion?.message}
              helperText={
                errors.exclusion?.message
                  ? t(String(errors.exclusion?.message))
                  : ""
              }
            />
          )}
        />
        <Stack gap={theme.mint.spacing.xxs}>
          <Box display={"flex"} gap={theme.mint.spacing.x3s}>
            <MintTypography style={{ color: theme.mint.color.text.high }}>
              {t("interview.section1.ngIndustries")}&nbsp;
            </MintTypography>
          </Box>

          <Stack gap={theme.mint.spacing.xs}>
            <Stack gap={theme.mint.spacing.x3s}>
              <Box>
                <MintButton
                  variant="outlined"
                  size="medium"
                  onClick={openModal}
                >
                  {t("campaign.creation.form.industry-button")}
                </MintButton>
              </Box>
            </Stack>

            <Box
              display={"flex"}
              gap={theme.mint.spacing.xxs}
              flexWrap={"wrap"}
            >
              {ngIndustries?.map((chip) => (
                <MintChip
                  key={chip}
                  label={industries
                    .filter((industry) => industry.id === chip)
                    ?.map((industry) => industry.name)}
                  onDelete={() => deleteChip(chip)}
                  variant="filled"
                  color="primary"
                />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default React.memo(InterviewDetailForm);
