"use client";
import { ArrowLeftIcon, MintTypography, errorToast } from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CampaignCreationForm from "@/components/forms/campaign/creation/CampaignCreationForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { actions as QuestionOptionActions } from "@/stores/survey/reducer";
import { researchService, ticketService } from "@/common/apiUrls";
import { addDate, resetDateState } from "@/stores/interview/datereducer";
import { updateCampaign, updateCampaignId } from "@/stores/data/reducer";
import {
  addSchedule,
  addSelectedDuration,
  addSlot,
  removeAllSchedule,
  removeAllSlots,
} from "@/stores/interview/reducer";
import moment from "moment";
import {
  setCreateQuestionMode,
  updateConsumedTickets,
} from "@/stores/global/reducer";
import { isInPreviewModeSelector } from "@/stores/global/selector";
import { useSelector } from "react-redux";
import { getErrorMessage } from "@/utils";

function Page() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const search = useSearchParams();
  const dispatch = useDispatch();
  const isInPreviewMode = useSelector(isInPreviewModeSelector);
  const [userData, setUserData] = useState<any>("");
  const campaignId = search.get("id") ?? "";

  const getCampaignData = async () => {
    dispatch(QuestionOptionActions.removeSurveyData());
    await researchService
      .getCampaignDetail(campaignId)
      .then((response: any) => {
        const data = response?.data?.data;
        console.log(data, "data55");

        if (data !== "") {
          if (data?.startsAt !== "" && data?.endsAt !== "") {
            const start = new Date(data?.startsAt);
            const end = new Date(data?.endsAt);
            dispatch(addDate({ start: start!, end: end }));
          }

          const surveyData = response?.data?.data?.screening;
          if (response?.data?.data?.hasScreening) {
            const surveyObj: any = {
              createdAt: null,
              id: null,
              order: surveyData?.order,
              surveyStatus: 1,
              question: surveyData?.question?.map((quest: any) => {
                return {
                  questionText: quest?.questionText,
                  type: quest?.type,
                  required: quest?.required,
                  order: quest?.order,
                  sequence: quest?.sequence,
                  options: quest?.options?.map((opt: any) => {
                    return {
                      optionsName: opt?.optionText,
                      order: opt?.order,
                    };
                  }),
                };
              }),
            };
            dispatch(QuestionOptionActions.setSurveyData(surveyObj));
          }
          dispatch(updateCampaignId(data?.id));

          let formData = JSON.stringify({
            title: data?.title,
            conditions: data?.includeCondition,
            exclusion: data?.excludeCondition,
            ngIndustries: data?.industries,
            monitorscount: data?.monitorsCount,
            duration: data?.interviewDurationId,
            gender: data?.gender,
            age: {
              lower: data?.ageFrom === 0 ? "" : data?.ageFrom,
              upper: data?.ageTo === 0 ? "" : data?.ageTo,
            },
            prefecture: data?.prefectures,
            married: data?.maritalStatus,
            children: data?.hasChildren,
            personalIncome: {
              lower:
                data?.personalIncomeStart === 0
                  ? ""
                  : data?.personalIncomeStart,
              upper:
                data?.personalIncomeEnd === 0 ? "" : data?.personalIncomeEnd,
            },
            householdIncome: {
              lower:
                data?.householdIncomeStart === 0
                  ? ""
                  : data?.householdIncomeStart,
              upper:
                data?.householdIncomeEnd === 0 ? "" : data?.householdIncomeEnd,
            },
            profession: data?.occupation,
            screening: data?.screening,
          });

          if (data?.timeslotsList?.length > 0) {
            dispatch(removeAllSchedule());
            dispatch(removeAllSlots());
          }

          data?.timeslotsList?.map((item: any) => {
            const convertedStartTime = moment
              .utc(item?.startTime)
              .local()
              .format("HH:mm");
            const convertedEndTime = moment
              .utc(item?.endTime)
              .local()
              .format("HH:mm");
            const convertedDate = moment
              .utc(item?.startTime)
              .local()
              .format("DD-MM-YYYY");

            dispatch(
              addSchedule({
                start: new Date(
                  moment
                    .utc(item?.startTime)
                    .local()
                    .format("YYYY-MM-DD HH:mm")
                ),
                end: new Date(
                  moment
                    .utc(item?.endTime)
                    .local()
                    .format("YYYY-MM-DD HH:mm")
                ),
                title: "",
              })
            );
            dispatch(
              addSlot({
                startTime: convertedStartTime,
                endTime: convertedEndTime,
                scheduledDate: convertedDate,
              })
            );
          });
          dispatch(addSelectedDuration(data?.duration));
          dispatch(updateConsumedTickets(data?.ticketsCount));
          dispatch(updateCampaign(formData));
          router.push(`/app/campaign/creation?id=${campaignId}`);
        } else {
          errorToast(t("interview.api-error-info"));
        }
      })
      .catch((error: any) => {
        console.log("Error occured: ", error);
        router.push(`/app/campaign`);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };
  useEffect(() => {
    ticketService
      .getUserDetails()
      .then((response) => {
        if (response) {
          setUserData(response?.data?.data);
        }
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    if (campaignId && !isInPreviewMode) {
      getCampaignData();
      dispatch(removeAllSlots());
    }
    if (!campaignId && !isInPreviewMode) {
      dispatch(resetDateState());
      dispatch(removeAllSlots());
      dispatch(setCreateQuestionMode(true));
    }
  }, [campaignId]);

  return (
    <Box>
      <Stack gap={theme.mint.spacing.s}>
        <Box
          display={"flex"}
          gap={theme.mint.spacing.x3s}
          alignItems={"center"}
          sx={{
            cursor: "pointer",
            widows: "fit-content",
          }}
          onClick={() => {
            router.push("/app/campaign");
          }}
        >
          <ArrowLeftIcon size={16} color={theme.mint.color.object.link} />

          <MintTypography
            size="body"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.link}
          >
            {t("campaign.creation.back-button")}
          </MintTypography>
        </Box>
        <MintTypography
          size="head-l"
          weight="700"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.heading")}
        </MintTypography>
        <CampaignCreationForm userData={userData} />
      </Stack>
    </Box>
  );
}

export default Page;
