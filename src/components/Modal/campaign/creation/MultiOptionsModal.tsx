import { PrefectureResponse } from "@/common/types";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../AppModal";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import AppCheckbox from "@/components/Checkbox/AppCheckbox";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintSwitch,
  MintTextField,
  MintTypography,
} from "@/design-system";
import { Controller, useForm } from "react-hook-form";
import { IOption } from "@/components/forms/campaign/creation/interface";
import { QuestionOptionTypes } from "@/utils/common.data";

type TModal = {
  open: boolean;
  close: () => void;
  handleFormSubmit: (data: string[], randomType: boolean) => void;
  options: IOption[];
};
const MultiOptionsModal = ({
  open,
  close,
  handleFormSubmit,
  options,
}: TModal) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      multiOptions: "",
      randomType: false,
    },
    // resolver: yupResolver(schema),
  });

  const totalLength = useMemo(() => {
    let count = 0;

    options?.forEach((obj: any) => {
      const isNonEmpty = obj?.optionText !== "";

      if (isNonEmpty) {
        count++;
      }
    });
    return count;
  }, [open, options]);

  const maxOptionCount = totalLength ? 50 - totalLength + 1 : 51;
  const onSubmit = (data: { multiOptions: string; randomType: boolean }) => {
    const spittedData = data?.multiOptions?.split("\n");
    handleFormSubmit(spittedData, data.randomType);
  };
  return (
    <MintDialog
      open={open}
      onClose={close}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "400px",
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
          zIndex: 100,
        }}
      >
        <Box p={theme.mint.spacing.m}>
          <MintTypography
            size="head-m"
            weight="500"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            {t("interview.section2.bulk-of-entry-options")}
          </MintTypography>
        </Box>
        <MintTypography
          dangerouslySetInnerHTML={{
            __html: `${t(
              "interview.section2.bulk-of-entry-options-head1"
            )}</br>${t("interview.section2.bulk-of-entry-options-head2")}`,
          }}
          size="body"
          weight="400"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
          px={theme.mint.spacing.m}
        ></MintTypography>
      </Box>

      <Stack
        px={theme.mint.spacing.m}
        pb={theme.mint.spacing.s}
        pt={theme.mint.spacing.s}
      >
        <Stack gap={theme.mint.spacing.xxs}>
          <Controller
            control={control}
            name="multiOptions"
            defaultValue=""
            rules={{
              required: `${t("AddMultipleOptions.Error.required")}`,
              validate: (value) => {
                const titles = value?.split("\n");
                const hasStringWithMoreThan100Length = titles?.some(
                  (str) => str?.length > 100
                );
                const maximumCount = totalLength ? 50 - totalLength : 50;

                if (titles && titles?.length > maximumCount) {
                  const errorMessage = t(
                    "interview.section2.bulk-of-entry-options-count-exceed",
                    { maximumCount: maximumCount }
                  );

                  return errorMessage;
                }
                if (hasStringWithMoreThan100Length) {
                  return t(
                    "interview.section2.bulk-of-entry-options-title-exceed",
                    { count: 100 }
                  );
                }
              },
            }}
            render={({ field }) => (
              <MintTextField
                multiline
                minRows={4}
                fullWidth
                {...field}
                error={!!errors.multiOptions}
                helperText={errors.multiOptions?.message}
                inputProps={{
                  style: { resize: "both", minWidth: "100%" },
                  "data-testid": "multiOptions",
                }}
              />
            )}
          />
        </Stack>
      </Stack>

      <Stack
        p={theme.mint.spacing.s}
        justifyContent={"end"}
        direction={"row"}
        gap={theme.mint.spacing.xxs}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
        }}
      >
        <MintButton size="medium" variant="text" onClick={close}>
          {t("interview.button.cancel")}
        </MintButton>
        <MintButton
          size="medium"
          onClick={handleSubmit(onSubmit)}
          data-testid="multiOptions-submit"
        >
          {t("common.input")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
};

export default MultiOptionsModal;
