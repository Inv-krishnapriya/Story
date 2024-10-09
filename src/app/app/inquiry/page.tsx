"use client";

import {
  MintButton,
  MintFormControlLabel,
  MintRadio,
  MintTextField,
  MintTypography,
} from "@/design-system";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormControl, Paper, RadioGroup, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TScheme, Schema, InquiryType } from "./Scheme";
import { useDispatch, useSelector } from "react-redux";
import { actions as inquiryActions } from "@/stores/inquiry/reducer";
import { checkIfLoading } from "@/stores/ui/selector";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";

const asPixels = (pixels: number) => `${pixels}px`;

export default function InquiryPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<TScheme>({
    resolver: yupResolver(Schema),
    defaultValues: {
      inquiryType: InquiryType.Inquiry,
      inquiry: t(`inquiry.content-placeholder.inquiry`),
    },
  });

  const watchInquiryType = Number(watch("inquiryType"));
  const watchForm = watch();

  const inquiryFieldHasChanged =
    watchForm.inquiry !==
    t(
      `inquiry.content-placeholder.${
        watchInquiryType === InquiryType.Inquiry ? "inquiry" : "inform"
      }`
    );

  useEffect(() => {
    setValue(
      "inquiry",
      t(
        `inquiry.content-placeholder.${
          watchInquiryType === InquiryType.Inquiry ? "inquiry" : "inform"
        }`
      )
    );
  }, [watchInquiryType]);

  const onSubmit = handleSubmit(() => {
    setIsModalOpen(true);
  });

  const onAgree = () => {
    dispatch(inquiryActions.submitInquiryRequest({ request: watchForm }));
    reset({ inquiryType: undefined, email: "", title: "", inquiry: "" });
    setIsModalOpen(false);
  };

  const isLoading = useSelector(
    checkIfLoading(inquiryActions.submitInquiryRequest.type)
  );

  return (
    <Box display="flex" flexDirection="column" gap={theme.mint.spacing.m}>
      <MintTypography size="head-l" weight="700">
        {t("inquiry.heading")}
      </MintTypography>

      <Paper
        sx={{
          borderRadius: asPixels(theme.mint.cornerRadius.xl),
          p: theme.mint.spacing.m,
          gap: theme.mint.spacing.m,
          display: "flex",
          flexDirection: "column",
          maxWidth: asPixels(632),
        }}
        component="form"
        onSubmit={onSubmit}
      >
        <Box display="flex" flexDirection="column" gap={theme.mint.spacing.xxs}>
          <Box display="flex" gap={theme.mint.spacing.x3s}>
            <MintTypography size="body" weight="400">
              {t("inquiry.type-of-inquiry")}
            </MintTypography>
            <span style={{ color: theme.mint.color.system.error.error }}>
              *
            </span>
          </Box>
          <Box
            borderRadius={asPixels(theme.mint.cornerRadius.m)}
            sx={{
              backgroundColor: theme.mint.color.background.containerBg.layer2,
              p: theme.mint.spacing.xxs,
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="inquiry-radio-buttons-group"
                name="inquiry-group"
                sx={{
                  gap: theme.mint.spacing.xxs,
                  width: "100%",
                }}
                defaultValue={InquiryType.Inquiry}
              >
                <Box
                  display="flex"
                  gap={theme.mint.spacing.xxs}
                  alignItems="center"
                >
                  <Controller
                    control={control}
                    name="inquiryType"
                    render={({ field }) => (
                      <MintFormControlLabel
                        control={<MintRadio {...field} value={1} />}
                        label={t("inquiry.type.inquiry")}
                      />
                    )}
                  />
                </Box>
                <Box
                  display="flex"
                  gap={theme.mint.spacing.xxs}
                  alignItems="center"
                >
                  <Controller
                    control={control}
                    name="inquiryType"
                    render={({ field }) => (
                      <Controller
                        control={control}
                        name="inquiryType"
                        render={({ field }) => (
                          <MintFormControlLabel
                            control={<MintRadio {...field} value={2} />}
                            label={t("inquiry.type.inform")}
                          />
                        )}
                      />
                    )}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={theme.mint.spacing.s}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <MintTextField
                {...field}
                label={t("inquiry.email")}
                placeholder="abc@macromill.com"
                required
                fullWidth
              />
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <MintTextField
                {...field}
                label={t("inquiry.title")}
                placeholder={t("inquiry.title-placeholder")}
                required
                fullWidth
              />
            )}
          />

          <Controller
            control={control}
            name="inquiry"
            render={({ field }) => (
              <MintTextField
                {...field}
                label={t("inquiry.content")}
                inputProps={{
                  maxLength: 800,
                }}
                placeholder={t(
                  `inquiry.content-placeholder.${
                    watchInquiryType === InquiryType.Inquiry
                      ? "inquiry"
                      : "inform"
                  }`
                )}
                required
                fullWidth
                multiline
                minRows={5}
              />
            )}
          />
        </Box>

        <Box>
          <MintButton
            type="submit"
            disabled={!isValid || isLoading || !inquiryFieldHasChanged}
            loading={isLoading}
          >
            {t("inquiry.send")}
          </MintButton>
        </Box>
      </Paper>

      <ConfirmationModal
        open={isModalOpen}
        title="inquiry.modal.title"
        content="inquiry.modal.content"
        agreeButtonName="inquiry.modal.agree"
        onAgree={onAgree}
      />
    </Box>
  );
}
