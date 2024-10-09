"use client";

import { researchService, ticketService } from "@/common/apiUrls";

import {
  ArrowLeftIcon,
  MintButton,
  MintCheckbox,
  MintRadio,
  MintTextField,
  MintTypography,
  errorToast,
  infoToast,
  successToast,
} from "@/design-system";
import { resetDataState, updateCampaign } from "@/stores/data/reducer";
import { resetState } from "@/stores/interview/reducer";
import { RootState } from "@/stores/rootReducer";
import { Box, Stack, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { IQuestion } from "@/components/forms/campaign/creation/interface";
import { QuestionTypes } from "@/utils/common.data";
import {
  childrenRadios,
  genderRadios,
  marriedRadios,
} from "@/utils/dropdown.data";
import PurchaseModal from "@/components/Modal/campaign/creation/PurchaseModal";
import SuccessModal from "@/components/Modal/campaign/creation/SuccessModal";
import {
  DRAFTED_CAMPAIGN_LIMIT,
  PUBLISHED_CAMPAIGN_LIMIT,
} from "../../../../../../Constants";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import { getErrorCode, getErrorMessage } from "@/utils";
import { sortFunction } from "@/components/forms/campaign/creation/QuestionElements";

function Page() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>("");
  const [draftModal, setDraftModal] = useState<boolean>(false);
  const [publishModal, setPublishModal] = useState<boolean>(false);

  useEffect(() => {
    const handlePopstate = (event: PopStateEvent) => {
      handleGoBack();
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      setTimeout(() => {
        window.removeEventListener("popstate", handlePopstate);
      }, 1000);
    };
  }, []);

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

  function checkJson(data: any) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      return data;
    }
  }
  const campaignData = useSelector(
    (state: RootState) => state.global.campaignAddData
  );

  const campaignFormData: any = useSelector(
    (state: RootState) => state.data.Campaign
  );
  let data: any = checkJson(campaignData);

  console.log("Campaign data: ", data);

  const router = useRouter();
  const search = useSearchParams();
  const campaignId =
    search.get("id") ??
    useSelector((state: RootState) => state.data.campaignId);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  let timer: any;

  const selectedIndustries = data?.ngIndustries;

  const selectedPrefectures = data?.prefectures;
  const selectedProfessions = data?.occupations;
  const surveys: IQuestion[] = data?.screening?.question;

  const durations: any = useSelector(
    (state: RootState) => state.schedule.durations[0]
  );
  const industries: any = useSelector(
    (state: RootState) => state.schedule.industries[0]
  );
  const prefectures: any = useSelector(
    (state: RootState) => state.schedule.prefectures[0]
  );
  const professions: any = useSelector(
    (state: RootState) => state.schedule.profession[0]
  );
  const [radioOpt, setRadioOpt] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const drawerStatus = useSelector(
    (state: RootState) => state.dashboard.dashboardDrawerStatus
  );

  const indValues = industries
    ?.filter((industry: any) => selectedIndustries!?.includes(industry?.id))
    ?.map((item: any) => item)
    ?.sort((a: { order: number }, b: { order: number }) => a?.order - b?.order);

  const prefectureValues = prefectures
    ?.filter((industry: any) => selectedPrefectures?.includes(industry?.id))
    ?.map((item: any) => item)
    ?.sort((a: { order: number }, b: { order: number }) => a?.order - b?.order);

  const profValues = professions
    ?.filter((industry: any) => selectedProfessions?.includes(industry?.id))
    ?.map((item: any) => item)
    ?.sort((a: { order: number }, b: { order: number }) => a?.order - b?.order);

  const handleGoBack = () => {
    let formData = JSON.stringify({
      title: campaignFormData?.title,
      conditions: campaignFormData?.includeCondition,
      exclusion: campaignFormData?.excludeCondition,
      ngIndustries: campaignFormData?.ngIndustries,
      monitorscount: campaignFormData?.monitorsCount,
      duration: campaignFormData?.interviewDurationId,
      gender: campaignFormData?.gender,
      age: {
        lower: campaignFormData?.ageFrom,
        upper: campaignFormData?.ageTo,
      },
      prefecture: campaignFormData?.prefectures,
      married: campaignFormData?.maritalStatus,
      children: campaignFormData?.hasChildren,
      personalIncome: {
        lower: campaignFormData?.personalIncomeStart,
        upper: campaignFormData?.personalIncomeEnd,
      },
      householdIncome: {
        lower: campaignFormData?.householdIncomeStart,
        upper: campaignFormData?.householdIncomeEnd,
      },
      profession: campaignFormData?.occupations,
      screening: campaignFormData?.screening,
    });
    dispatch(updateCampaign(formData));
    router.push(
      `/app/campaign/creation${
        search.get("id") ? `?id=${search.get("id")}` : ""
      }`
    );
  };

  const convertStrToDate = (dateStr: any, timeStr: any) => {
    const dateParts = dateStr?.split("-");
    const timeParts = timeStr?.split(":");
    const localDateTime = new Date(
      dateParts[2],
      parseInt(dateParts[1]) - 1,
      dateParts[0],
      timeParts[0],
      timeParts[1]
    );
    return localDateTime?.toISOString();
  };
  const convertToISO = (obj: any) => {
    const { startTime, endTime, scheduledDate } = obj;
    const startTimeISO = convertStrToDate(scheduledDate, startTime);
    const endTimeISO = convertStrToDate(scheduledDate, endTime);

    return { startTime: startTimeISO, endTime: endTimeISO };
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleSubmit = (status: number) => {
    data = {
      ...data,
      status: status,
    };
    const timeslots = data?.timeslot?.map((slot: any) => {
      return convertToISO(slot);
    });
    data.timeslot = timeslots;
    let secondsElapsed = 0;
    const intervalTime = 5000;
    const totalTime = 60000;
    setIsSubmitted(true);
    if (campaignId !== null && campaignId !== undefined && campaignId !== "") {
      researchService
        .updateCampaignDetail(campaignId!, JSON.stringify(data))
        .then((response) => {
          dispatch(resetDataState());
          dispatch(resetState());

          if (response?.status !== 201) {
            apiInterval();
          } else {
            if (status === 0) {
              successToast(t("interview.success-info-draft"));
            } else {
              successToast(t("interview.success-info"));
            }

            setOpenModal(false);
            setIsSubmitted(false);
            router.push("/app/campaign");
          }
          function apiInterval() {
            getCampaignStatus(response?.data?.data?.campaignId, status);
            secondsElapsed += intervalTime;
            if (secondsElapsed < totalTime) {
              timer = setTimeout(apiInterval, intervalTime);
            } else {
              infoToast(t("interview.processing-info"));
              router.push("/app/campaign");
              setOpenModal(false);
              setIsSubmitted(false);
            }
          }
        })
        .catch((error) => {
          setIsSubmitted(false);

          if (getErrorCode(error?.response?.data) === "E200056") {
            setOpenModal(false);
            setPurchaseModal(true);
          } else {
            setOpenModal(false);
            const errorMessage = getErrorMessage(error?.response?.data);
            errorToast(errorMessage);
          }
        });
    } else {
      researchService
        .createCampaign(JSON.stringify(data), {})
        .then((response) => {
          dispatch(resetState());
          if (response?.status !== 201) {
            apiInterval();
          } else {
            if (status === 0) {
              successToast(t("interview.success-info-draft"));
            } else {
              successToast(t("interview.success-info"));
            }
            setOpenModal(false);
            setIsSubmitted(false);
            router.push("/app/campaign");
          }
          function apiInterval() {
            getCampaignStatus(response?.data?.data?.campaignId, status);
            secondsElapsed += intervalTime;
            if (secondsElapsed < totalTime) {
              timer = setTimeout(apiInterval, intervalTime);
            } else {
              infoToast(t("interview.processing-info"));
              router.push("/app/campaign");
              setOpenModal(false);
              setIsSubmitted(false);
            }
          }
        })
        .catch((error) => {
          setIsSubmitted(false);

          if (getErrorCode(error?.response?.data) === "E200056") {
            setOpenModal(false);
            setPurchaseModal(true);
          } else {
            setOpenModal(false);
            const errorMessage = getErrorMessage(error?.response?.data);
            errorToast(errorMessage);
          }
        });
    }
  };

  const handlePurchaseSubmit = () => {
    router.push("/app/ticket");
  };

  function getCampaignStatus(campaignId: string, status: number) {
    researchService
      .getCampaignStatus(campaignId)
      .then((response) => {
        if (response?.status === 201) {
          if (status === 0) {
            successToast(t("interview.success-info-draft"));
          } else {
            successToast(t("interview.success-info"));
          }
          // successToast(t("interview.success-info"));
          clearStatus();
        }
      })
      .catch((error) => {
        clearStatus();
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  }

  function clearStatus() {
    clearInterval(timer);
    setOpenModal(false);
    setIsSubmitted(false);
    router.push("/app/campaign");
  }

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handlePurchaseModalClose = () => {
    setPurchaseModal(false);
  };

  const onDraftSubmit = () => {
    if (
      userData !== undefined &&
      userData !== null &&
      userData !== "" &&
      Object.keys(userData?.tickets!)?.length !== 0
    ) {
      if (userData?.campaigns?.draftedCampaign === DRAFTED_CAMPAIGN_LIMIT) {
        setDraftModal(true);
      } else {
        handleSubmit(0);
      }
    }
  };
  const onPublishSubmit = () => {
    if (
      userData !== undefined &&
      userData !== null &&
      userData !== "" &&
      Object.keys(userData?.tickets!)?.length !== 0 &&
      !slotTimeExceed()
    ) {
      if (userData?.campaigns?.publishedCampaign === PUBLISHED_CAMPAIGN_LIMIT) {
        setPublishModal(true);
      } else {
        handleModalOpen();
      }
    }
    if (slotTimeExceed()) {
      errorToast(t("campaign.creation.time-exceed"));
    }
  };
  const slotTimeExceed = useCallback(() => {
    const currentTime = moment();
    const isExceed = data?.timeslot?.some((item: any) => {
      const scheduledDate = moment(item.scheduledDate, "DD-MM-YYYY");
      const startTime = moment(
        `${item.scheduledDate} ${item.startTime}`,
        "DD-MM-YYYY HH:mm"
      );
      return (
        scheduledDate.isSameOrBefore(moment()) &&
        startTime.isBefore(currentTime)
      );
    });
    return isExceed;
  }, [data?.timeslot]);
  console.log(slotTimeExceed(), "slotTimeExceed");

  return (
    <Box>
      <Stack gap={theme.mint.spacing.s}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={theme.mint.spacing.x3s}
          onClick={handleGoBack}
          sx={{
            width: "fit-content",
            cursor: "pointer",
          }}
          data-testid="goBack-button"
        >
          <ArrowLeftIcon size={16} color={theme.mint.color.object.link} />

          <MintTypography
            size="body"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.link}
          >
            {t("campaign.creation.preview.return-job-offer")}
          </MintTypography>
        </Box>
        <MintTypography
          size="head-l"
          weight="700"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.confirmation.title")}
        </MintTypography>
        <Stack
          p={theme.mint.spacing.m}
          gap={theme.mint.spacing.m}
          bgcolor={theme.mint.color.background.containerBg.layer1}
          borderRadius={`${theme.mint.cornerRadius.xl}px`}
          style={{
            pointerEvents: "none",
          }}
          sx={{ marginBottom: "96px" }}
        >
          <Stack gap={theme.mint.spacing.s}>
            <MintTypography
              size="head-m"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.confirmation.section1.heading")}
            </MintTypography>
            <Stack>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section1.title")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.title}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section1.conditions")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    <pre
                      style={{
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit",
                      }}
                    >
                      {data?.includeCondition}
                    </pre>
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section1.exclusion")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    <pre
                      style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
                    >
                      {data?.excludeCondition}
                    </pre>
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.confirmation.section2.industry")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {indValues?.map((value: any) => value?.name)?.join(", ")}
                  </MintTypography>
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Stack gap={theme.mint.spacing.s}>
            <MintTypography
              size="head-m"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.confirmation.section2.heading")}
            </MintTypography>
            <Stack>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section2.monitorscount")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.monitorsCount} {t("campaign.creation.preview.count")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section2.duration")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {durations
                      ?.filter(
                        (item: any) => item.id === data?.interviewDurationId
                      )
                      ?.map((item: any) => item.duration)}
                    {t("campaign.creation.preview.duration")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section2.interview-date")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {moment(data?.startsAt, "DD-MM-YYYY").format("YYYY/MM/DD")}{" "}
                    ~ {moment(data?.endsAt, "DD-MM-YYYY").format("YYYY/MM/DD")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                  alignItems={"center"}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section2.slot-title")}
                  </MintTypography>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.system.error.error}
                  >
                    *
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.timeslot?.map((item: any) => {
                      return (
                        <>
                          {moment(item?.scheduledDate, "DD-MM-YYYY").format(
                            "YYYY/MM/DD"
                          )}{" "}
                          {item?.startTime} ~ {item?.endTime} <br></br>
                        </>
                      );
                    })}
                  </MintTypography>
                </Box>
              </Box>
            </Stack>
          </Stack>
          {surveys?.length > 0 && (
            <Stack gap={theme.mint.spacing.s}>
              <MintTypography
                size="head-m"
                weight="700"
                lineHeight={"150%"}
                color={theme.mint.color.text.high}
              >
                {t("interview.confirmation.section3.heading")}
              </MintTypography>
              {surveys?.map((survey, index) => {
                const isRequired: any = survey?.isRequired;
                const options = survey.options.slice().sort(sortFunction);
                return (
                  <Stack gap={theme.mint.spacing.xxs} key={index}>
                    <Box display={"flex"} gap={theme.mint.spacing.x3s}>
                      <MintTypography
                        size="body"
                        weight="500"
                        lineHeight={"150%"}
                        color={theme.mint.color.text.low}
                      >
                        {index + 1}.{survey?.questionText}
                      </MintTypography>
                      {isRequired === "1" && (
                        <MintTypography
                          size="body"
                          weight="400"
                          lineHeight={"150%"}
                          color={theme.mint.color.system.error.error}
                        >
                          *
                        </MintTypography>
                      )}
                      {isRequired === true && (
                        <MintTypography
                          size="body"
                          weight="400"
                          lineHeight={"150%"}
                          color={theme.mint.color.system.error.error}
                        >
                          *
                        </MintTypography>
                      )}
                    </Box>

                    {survey?.type === QuestionTypes?.FreeText && (
                      <MintTextField
                        multiline
                        label={"free text"}
                        minRows={3}
                        inputProps={{
                          maxLength: 500,
                          style: { resize: "both" },
                        }}
                        sx={{
                          ".MuiInputBase-root": {
                            paddingRight: "5px",
                            paddingBottom: "5px",
                          },
                        }}
                        style={{
                          width: "fit-content",
                        }}
                        hideLabel
                      />
                    )}
                    {survey?.type === QuestionTypes?.Single &&
                      options?.map((option, index) => {
                        return (
                          <Box
                            display={"flex"}
                            gap={theme.mint.spacing.s}
                            key={index}
                          >
                            <MintRadio />
                            <MintTypography
                              size="body"
                              weight="500"
                              lineHeight={"150%"}
                              color={theme.mint.color.text.low}
                            >
                              {option?.optionText}
                            </MintTypography>
                          </Box>
                        );
                      })}
                    {survey?.type === QuestionTypes?.Multiple &&
                      options?.map((option, index) => {
                        return (
                          <Box
                            display={"flex"}
                            gap={theme.mint.spacing.s}
                            key={index}
                          >
                            <MintCheckbox />
                            <MintTypography
                              size="body"
                              weight="500"
                              lineHeight={"150%"}
                              color={theme.mint.color.text.low}
                            >
                              {option?.optionText}
                            </MintTypography>
                          </Box>
                        );
                      })}
                  </Stack>
                );
              })}
            </Stack>
          )}

          <Stack gap={theme.mint.spacing.s}>
            <MintTypography
              size="head-m"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.confirmation.section4.heading")}
            </MintTypography>
            <Stack>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("basic-attribute.gender.label")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data !== undefined &&
                    data?.gender !== undefined &&
                    data?.gender !== null
                      ? t(
                          genderRadios!
                            ?.filter((item) => item?.value === data?.gender)
                            ?.map((item) => item?.label)
                        )
                      : ""}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("basic-attribute.age.label")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.ageFrom}
                    {t("campaign.creation.preview.age")} ~ {data?.ageTo}
                    {t("campaign.creation.preview.age")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.prefecture-text")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {prefectureValues
                      ?.map((value: any) => value?.name)
                      ?.join(", ")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.profession")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {profValues?.map((value: any) => value?.name)?.join(", ")}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.marital-status")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data !== undefined &&
                    data?.maritalStatus !== undefined &&
                    data?.maritalStatus !== null
                      ? t(
                          marriedRadios!
                            .filter(
                              (item) => item.value === data?.maritalStatus
                            )
                            ?.map((item) => item.label)
                        )
                      : ""}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.children-presence")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data !== undefined &&
                    data?.hasChildren !== undefined &&
                    data?.hasChildren !== null
                      ? t(
                          childrenRadios!
                            .filter((item) => item.value === data?.hasChildren)
                            ?.map((item) => item.label)
                        )
                      : ""}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.household-income-label")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.householdIncomeStart ? (
                      <>
                        {data?.householdIncomeStart}
                        {t("campaign.creation.preview.income")} ~{" "}
                        {data?.householdIncomeEnd}
                        {t("campaign.creation.preview.income")}
                      </>
                    ) : (
                      t("interview.confirmation.section4.unspecified")
                    )}
                  </MintTypography>
                </Box>
              </Box>
              <Box
                py={theme.mint.spacing.xxs}
                display={"flex"}
                gap={theme.mint.spacing.s}
                borderBottom={`1px solid ${theme.mint.color.border.low}`}
              >
                <Box
                  py={theme.mint.spacing.xxs}
                  px={theme.mint.spacing.s}
                  minWidth={"216px"}
                  maxWidth={"216px"}
                  display={"flex"}
                  gap={theme.mint.spacing.x3s}
                >
                  <MintTypography
                    size="body"
                    weight="700"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.low}
                  >
                    {t("interview.section4.personal-income-label")}
                  </MintTypography>
                </Box>
                <Box py={theme.mint.spacing.xxs} px={theme.mint.spacing.s}>
                  <MintTypography
                    size="body"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.high}
                  >
                    {data?.personalIncomeStart ? (
                      <>
                        {data?.personalIncomeStart}
                        {t("campaign.creation.preview.income")} ~{" "}
                        {data?.personalIncomeEnd}
                        {t("campaign.creation.preview.income")}
                      </>
                    ) : (
                      t("interview.confirmation.section4.unspecified")
                    )}
                  </MintTypography>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          padding: "16px 8px",
          display: "flex",
          justifyContent: "center !important",
          alignItems: "center !important",
          position: "fixed",
          gap: "8px",
          bottom: 0,
          width: `calc(100% - ${drawerStatus ? 240 : 65}px) !important`,
          right: 0,
          bgcolor: theme.mint.color.background.containerBg.layer1,
          borderTop: `1px solid ${theme.mint.color.border.medium}`,
        }}
      >
        <MintButton
          name="publish"
          variant="contained"
          type="submit"
          size="medium"
          sx={{ minWidth: "136px !important" }}
          disabled={isSubmitted}
          onClick={onPublishSubmit}
          data-testid="publish-button"
        >
          {t("campaign.creation.preview.publish")}
        </MintButton>
        <MintButton
          name="draft"
          variant="outlined"
          type="submit"
          size="medium"
          sx={{ minWidth: "136px !important" }}
          disabled={isSubmitted}
          onClick={onDraftSubmit}
          data-testid="draft-button"
        >
          {t("campaign.creation.preview.submit")}
        </MintButton>
      </Box>
      <SuccessModal
        data={data}
        open={openModal}
        close={handleModalClose}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />

      <PurchaseModal
        open={purchaseModal}
        close={handlePurchaseModalClose}
        handleSubmit={handlePurchaseSubmit}
      />
      {draftModal && (
        <ConfirmationModal
          open={draftModal}
          title="interview.draft-modal.header"
          content="interview.draft-modal.content"
          agreeButtonName="interview.draft-modal.agreeButton"
          disAgreeButtonName="interview.draft-modal.disAgreeButton"
          onDisagree={() => setDraftModal(false)}
          onAgree={() => {
            handleSubmit(1);
            setDraftModal(false);
          }}
          modalWidth="400px"
        />
      )}
      {publishModal && (
        <ConfirmationModal
          open={publishModal}
          title="interview.publish-modal.header"
          content="interview.publish-modal.content"
          agreeButtonName="interview.publish-modal.agreeButton"
          disAgreeButtonName="interview.publish-modal.disAgreeButton"
          onDisagree={() => setPublishModal(false)}
          onAgree={() => {
            handleSubmit(0);
            setPublishModal(false);
          }}
          modalWidth="400px"
        />
      )}
    </Box>
  );
}

export default Page;
