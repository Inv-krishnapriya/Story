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
import { IQuestion } from "@/components/forms/campaign/creation/interface";

type TModal = {
  open: boolean;
  close: () => void;
  handleFormSubmit: (data: string[], randomType: boolean) => void;
  questions: IQuestion[];
};
const MultiQuestionModal = ({
  open,
  close,
  handleFormSubmit,
  questions,
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
      multiQuestion: "",
      randomType: false,
    },
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data: { multiQuestion: string; randomType: boolean }) => {
    const spittedData = data?.multiQuestion?.split("\n");
    handleFormSubmit(spittedData, data.randomType);
    console.log(spittedData, "spittedData");
  };
  const totalLength = useMemo(() => {
    let count = 0;

    const questionLength = questions?.length;

    questions?.forEach((field: any, index: number) => {
      const hasNonEmptyOptionText = field?.options?.some(
        (item: any) => item.optionsName?.trim() !== ""
      );
      const hasNonEmptyQuestionText = field?.questionText?.trim() !== "";
      if (!hasNonEmptyOptionText && !hasNonEmptyQuestionText) {
        count = count + 1;
      }
    });
    return questionLength - count;
  }, [open]);
  const maxQuestionCount = totalLength ? 10 - totalLength + 1 : 11;
  return (
    <MintDialog
      open={open}
      onClose={close}
      sx={{
        "& .MuiPaper-root": {
          width: "400px",
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
            設問の一括入力
          </MintTypography>
        </Box>
        <MintTypography
          dangerouslySetInnerHTML={{
            __html:
              "アンケート回答の選択肢を一括で登録できます。</br>選択肢は改行で区切って入力してください。",
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
            name="multiQuestion"
            defaultValue=""
            rules={{
              required: `${t("AddMultipleQuestions.Error.required")}`,
              validate: (value) => {
                const titles = value?.split("\n");
                const hasStringWithMoreThan100Length = titles?.some(
                  (str) => str?.length > 500
                );

                if (titles && titles?.length >= maxQuestionCount) {
                  const maximumCount = totalLength ? 10 - totalLength : 10;
                  const errorMessage = `質問数の${maximumCount}までです`;

                  return errorMessage;
                }
                if (hasStringWithMoreThan100Length) {
                  return `タイトルが500文字を超えています`;
                }
              },
            }}
            render={({ field }) => (
              <MintTextField
                multiline
                minRows={3}
                fullWidth
                {...field}
                error={!!errors.multiQuestion}
                helperText={errors.multiQuestion?.message}
                inputProps={{
                  style: { resize: "vertical" },
                  "data-testid": "input-testid",
                }}
              />
            )}
          />

          <Box display={"flex"} justifyContent={"end"}>
            <Box display={"flex"} gap={theme.mint.spacing.xxs}>
              <MintTypography
                size="body"
                weight="400"
                lineHeight={"150%"}
                color={theme.mint.color.text.high}
              >
                ランダム登録
              </MintTypography>
              <Controller
                control={control}
                name={`randomType`}
                render={({ field }) => <MintSwitch {...field} />}
              />
            </Box>
          </Box>
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
          data-testid="submit-button"
        >
          入力
        </MintButton>
      </Stack>
    </MintDialog>
  );
};

export default MultiQuestionModal;
