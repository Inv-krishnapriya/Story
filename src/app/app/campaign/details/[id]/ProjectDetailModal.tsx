import {
  childrenRadios,
  genderRadios,
  marriedRadios,
} from "@/utils/dropdown.data";

import {
  IOption,
  IQuestion,
} from "@/components/forms/campaign/creation/interface";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintRadio,
  MintTypography,
} from "@/design-system";
import { QuestionOptionTypes } from "@/utils/common.data";
import { Box, Stack, TextareaAutosize } from "@mui/material";
import moment from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tslot } from "@/utils/common.type";

interface IProjectDetailProps {
  open: boolean;
  info: any;
  onClose?: () => void;
  onAgree?: () => void;
  agreeButtonName?: string;
  isLoading?: boolean;
}

const ProjectDetailModal: React.FC<IProjectDetailProps> = (props) => {
  const { open, info, onClose, onAgree, agreeButtonName, isLoading } = props;
  const { t } = useTranslation();
  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time).local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };
  const formattedQuestions = useMemo(() => {
    const data = formatQuestionData(info?.screening?.question ?? []);
    const formattedData = data?.map((question) => {
      const formattedOptions = question?.options
        ?.slice()
        .sort(sortOptionsByType);
      return {
        ...question,
        options: formattedOptions,
      };
    });

    return formattedData;
  }, [info?.screening?.question]);
  return (
    <MintDialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "343px",
          maxHeight: "646px",
          width: "600px",
        },
      }}
    >
      <MintDialogTitle id="alert-dialog-title">
        <MintTypography
          weight="500"
          size="head-m"
          sx={{
            color: (theme) => theme?.palette.uiColor?.textHigh,
          }}
        >
          {t("campaign.campaignDetail.modaldetail.heading.main")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent sx={{ display: "grid", gap: "16px" }}>
        <div>
          <MintTypography
            weight="700"
            size="head-m"
            sx={{ color: (theme) => theme.palette.uiColor.textHigh }}
          >
            {t("campaign.campaignDetail.modaldetail.heading.first")}
          </MintTypography>
          <Box
            sx={{
              display: "flex",
              padding: "0px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0px",
              alignSelf: "stretch",
            }}
          >
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section1.title")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  {info?.title}
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                width: "100%",
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  // justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section1.conditions")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  <pre
                    style={{
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                      fontFamily: "inherit",
                    }}
                  >
                    {info?.includeCondition}
                  </pre>
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section1.exclusion")}
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  <pre
                    style={{
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                      fontFamily: "inherit",
                    }}
                  >
                    {info?.excludeCondition}
                  </pre>
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("campaign.campaignDetail.NGIndustries")}
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  {info?.industries?.join(", ")}
                </MintTypography>
              </div>
            </Stack>
          </Box>
        </div>

        <div>
          <MintTypography
            weight="700"
            size="head-m"
            sx={{
              color: (theme) => theme.mint.color.text.high,
              fontStyle: "normal",
              lineHeight: "150%",
              gap: "8px",
            }}
          >
            {t("campaign.campaignDetail.modaldetail.heading.second")}
          </MintTypography>
          <Box
            sx={{
              display: "flex",
              padding: "0px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0px",
              alignSelf: "stretch",
            }}
          >
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section1.monitorscount")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  {info?.monitorsCount}
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                width: "100%",
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section1.duration")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  {info?.duration}
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section2.interview-date")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  flex: "1 0 0",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.high }}
                >
                  {moment(info?.startsAt).format("YYYY/MM/DD")} ~{" "}
                  {moment(info?.endsAt).format("YYYY/MM/DD")}
                </MintTypography>
              </div>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                padding: "8px 0px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "216px",
                  padding: "8px 16px",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  weight="700"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.text.low }}
                >
                  {t("interview.section2.slot-title")}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.mint.color.system.error.error }}
                >
                  *
                </MintTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 8px 8px 16px",
                  alignItems: "center",
                  gap: "16px",
                  // flex: "1 0 0",
                  flexDirection: "column",
                }}
              >
                {info?.timeslotsList?.map((item: Tslot) => {
                  return (
                    <MintTypography
                      weight="400"
                      size="caption"
                      sx={{ color: (theme) => theme.mint.color.text.high }}
                    >
                      {toLocalDatetime(item.startTime, item.endTime)}
                    </MintTypography>
                  );
                })}
              </div>
            </Stack>
          </Box>
        </div>
        {formattedQuestions?.length > 0 && (
          <>
            {" "}
            <MintTypography
              weight="700"
              size="head-m"
              sx={{
                color: (theme) => theme.mint.color.text.high,
                fontStyle: "normal",
                lineHeight: "150%",
              }}
            >
              {t("campaign.campaignDetail.modaldetail.heading.third")}
            </MintTypography>
            <Box
              sx={{
                display: "flex",
                padding: "0px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Stack
                direction="column"
                sx={{
                  display: "flex",
                  padding: "8px 0px",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                {formattedQuestions?.map((question: any, index: number) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                      >
                        <MintTypography
                          size="body"
                          weight="400"
                          color={(theme) => theme.mint.color.text.medium}
                          lineHeight={"150%"}
                        >
                          {index + 1}. {question.questionText}
                        </MintTypography>
                        {question.type === 1 && (
                          <MintTypography
                            size="body"
                            weight="400"
                            color={(theme) => theme.mint.color.text.medium}
                          >
                            {t(
                              "campaign.campaignDetail.question.question-type1"
                            )}
                          </MintTypography>
                        )}
                        {question.type === 2 && (
                          <MintTypography
                            size="body"
                            weight="400"
                            color={(theme) => theme.mint.color.text.medium}
                          >
                            {t(
                              "campaign.campaignDetail.question.question-type2"
                            )}
                          </MintTypography>
                        )}
                        {question?.isRequired && (
                          <MintTypography
                            size="body"
                            weight="400"
                            color={(theme) =>
                              theme.mint.color.system.error.error
                            }
                          >
                            *
                          </MintTypography>
                        )}
                      </Box>
                      {question?.options?.map((opt: any) => {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                            }}
                          >
                            {question?.type === 1 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 2,
                                }}
                              >
                                <MintCheckbox disabled />
                                <MintTypography
                                  size="body"
                                  weight="400"
                                  color={(theme) => theme.mint.color.text.high}
                                  lineHeight={"150%"}
                                >
                                  {opt.optionText}
                                </MintTypography>
                              </Box>
                            )}
                            {question?.type === 2 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 2,
                                }}
                              >
                                <MintRadio size="small" disabled />
                                <MintTypography
                                  size="body"
                                  weight="400"
                                  color={(theme) => theme.mint.color.text.high}
                                  lineHeight={"150%"}
                                >
                                  {opt.optionText}
                                </MintTypography>
                              </Box>
                            )}
                            {question?.type === 3 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Box
                                  component={"p"}
                                  sx={{
                                    alignItems: "flex-end",
                                    alignSelf: "flex-end",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <MintTypography
                                    size="body"
                                    weight="400"
                                    color={(theme) =>
                                      theme.mint.color.text.medium
                                    }
                                    lineHeight={"100%"}
                                  >
                                    0 / 500
                                  </MintTypography>
                                </Box>
                                <TextareaAutosize
                                  style={{
                                    width: "327px",
                                    borderRadius: "4px",
                                    padding: 2,
                                  }}
                                  disabled
                                  placeholder={t(
                                    "campaign.campaignDetail.question.question-type3-placeholder"
                                  )}
                                  minRows={5}
                                />
                              </Box>
                            )}
                          </Box>
                        );
                      })}
                    </div>
                  );
                })}
              </Stack>
            </Box>
          </>
        )}

        <MintTypography
          weight="700"
          size="head-m"
          sx={{
            color: (theme) => theme.mint.color.text.high,
            fontStyle: "normal",
            lineHeight: "150%",
          }}
        >
          {t("campaign.campaignDetail.modaldetail.heading.fourth")}
        </MintTypography>
        <Box
          sx={{
            display: "flex",
            padding: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0px",
            alignSelf: "stretch",
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("basic-attribute.gender.label")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.gender !== 0
                  ? t(
                      genderRadios
                        .filter((item) => item.value === info?.gender)
                        .map((item) => item.label)
                    )
                  : ""}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("basic-attribute.age.label")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.ageFrom !== 0
                  ? info?.ageFrom + t("side-drawer.age-postfix")
                  : ""}{" "}
                ~{" "}
                {info?.ageTo !== 0
                  ? info?.ageTo + t("side-drawer.age-postfix")
                  : ""}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("campaign.campaignDetail.th.prefecture")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.prefectures?.join(", ")}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("campaign.campaignDetail.th.profession")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.occupation?.join(", ")}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("campaign.campaignDetail.th.maritalstatus")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.maritalStatus !== 0
                  ? t(
                      marriedRadios
                        .filter((item) => item.value === info?.maritalStatus)
                        .map((item) => item.label)
                    )
                  : ""}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("interview.section4.children-presence")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.hasChildren !== 0
                  ? t(
                      childrenRadios
                        .filter((item) => item.value === info?.hasChildren)
                        .map((item) => item.label)
                    )
                  : ""}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("interview.section4.household-income-label")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.householdIncomeStart !== 0
                  ? info?.householdIncomeStart +
                    t("campaign.creation.preview.income")
                  : ""}{" "}
                ~{" "}
                {info?.householdIncomeEnd !== 0
                  ? info?.householdIncomeEnd +
                    t("campaign.creation.preview.income")
                  : ""}
              </MintTypography>
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              padding: "8px 0px",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "216px",
                padding: "8px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography
                weight="700"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.low }}
              >
                {t("interview.section4.personal-income-label")}
              </MintTypography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 8px 8px 16px",
                alignItems: "center",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              <MintTypography
                weight="400"
                size="caption"
                sx={{ color: (theme) => theme.mint.color.text.high }}
              >
                {info?.personalIncomeStart !== 0
                  ? info?.personalIncomeStart +
                    t("campaign.creation.preview.income")
                  : ""}{" "}
                ~{" "}
                {info?.personalIncomeEnd !== 0
                  ? info?.personalIncomeEnd +
                    t("campaign.creation.preview.income")
                  : ""}
              </MintTypography>
            </div>
          </Stack>
        </Box>
      </MintDialogContent>
      <MintDialogActions>
        {agreeButtonName && (
          <MintButton
            onClick={onAgree}
            color="primary"
            variant="contained"
            sx={{
              width: "auto",
            }}
            disabled={isLoading}
            data-testid="modal-onAgree"
            id="confirmation-agreeButton"
            loading={isLoading}
          >
            {t(agreeButtonName)}
          </MintButton>
        )}
      </MintDialogActions>
    </MintDialog>
  );
};

export default ProjectDetailModal;
const sortOptionsByOrder = (options: IOption[], order: number): IOption[] => {
  // Convert the Immutable.js List to a regular array
  const mutableOptions = options.map((option) => ({ ...option }));

  switch (order) {
    case QuestionOptionOder.Ascending:
      return mutableOptions.sort((a, b) => a.order - b.order);
    case QuestionOptionOder.Descending:
      return mutableOptions.sort((a, b) => b.order - a.order);
    case QuestionOptionOder.Random:
      return mutableOptions.sort(() => Math.random() - 0.5);
    default:
      return mutableOptions;
  }
};

const formatQuestionData = (questions: IQuestion[]): IQuestion[] => {
  return questions.map((question) => {
    const { order } = question;
    const sortedOptions = sortOptionsByOrder(question.options, order);

    return {
      ...question,
      options: sortedOptions,
    };
  });
};
const sortOptionsByType = (a: IOption, b: IOption) => {
  const exclusiveType = QuestionOptionTypes.EXCLUSIVE;
  const otherOptionType = QuestionOptionTypes.OTHER_OPTION;

  if (a.optionType === exclusiveType && b.optionType !== exclusiveType) {
    return 1; // Move a to the end
  } else if (a.optionType !== exclusiveType && b.optionType === exclusiveType) {
    return -1; // Move b to the end
  } else if (
    a.optionType === otherOptionType &&
    b.optionType !== otherOptionType
  ) {
    return 1; // Move a to second last
  } else if (
    a.optionType !== otherOptionType &&
    b.optionType === otherOptionType
  ) {
    return -1; // Move b to second last
  } else {
    return 0; // Keep the same order for elements other than the first two
  }
};
const QuestionOptionOder = { Ascending: 1, Descending: 2, Random: 3 };
