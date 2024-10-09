import {
  MintButton,
  errorToast,
  infoToast,
  successToast,
} from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import BasicAttributesForm from "./BasicAttributesForm";
import { FormProvider, useForm } from "react-hook-form";
import { IFormValues } from "./interface";
import InterviewDetailForm from "./InterviewDetailForm";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import {
  IndustryResponse,
  TCampaignRequest,
  TSurveyData,
} from "@/common/types";
import { surveyDataSelector } from "@/stores/survey/selector";
import { generalServices, researchService } from "@/common/apiUrls";
import {
  addIndustry,
  clearIndustry,
  resetState,
} from "@/stores/interview/reducer";
import moment from "moment";
import { updateCampaign } from "@/stores/data/reducer";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import IndustryModal from "@/components/Modal/campaign/creation/IndustryModal";
import QuestionForm from "./QuestionForm";
import ImplementationForm from "./ImplementationForm";
import {
  DRAFTED_CAMPAIGN_LIMIT,
  PUBLISHED_CAMPAIGN_LIMIT,
} from "../../../../../Constants";
import {
  updateCampaignAddData,
  updatePreviewModeValue,
} from "@/stores/global/reducer";
import { QuestionTypes } from "@/utils/common.data";
import { isInPreviewModeSelector } from "@/stores/global/selector";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import { getErrorMessage, parseSuccessMessage } from "@/utils";

function CampaignCreationForm({ userData }: { userData: any }) {
  const theme = useTheme();
  const search = useSearchParams();
  const searchId = search.get("id") ?? "";
  const [openAnimation, setOpenAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [draftModal, setDraftModal] = useState<boolean>(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [industries, setIndustries] = useState<IndustryResponse[]>([]);

  const campaigns = useSelector((state: RootState) => state?.global?.campaigns);

  let publishedCampaigns = campaigns?.publishedCampaign! ?? 0;
  const campaignId =
    useSelector((state: RootState) => state?.data.campaignId) ?? searchId;

  const industriesFR = useSelector(
    (state: RootState) => state?.schedule?.industries
  );
  const [scheduleError, setScheduleError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(1);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    1
  );
  let timer: any;
  let requestData: TCampaignRequest;
  const navigate = useRouter();
  const dispatch = useDispatch();
  const index=+1

  const selectedSlot = useSelector(
    (state: RootState) => state?.schedule?.selectedSlots
  );
  const slotTimeExceed = useCallback(() => {
    const currentTime = moment();
    const isExceed = selectedSlot?.some((item) => {
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
  }, [selectedSlot]);

  const convertStrToDate = (dateStr: any, timeStr: any) => {
    const dateParts = dateStr.split("-");
    const timeParts = timeStr.split(":");
    const localDateTime = new Date(
      dateParts[2],
      parseInt(dateParts[1]) - 1,
      dateParts[0],
      timeParts[0],
      timeParts[1]
    );
    return localDateTime.toISOString();
  };
  const convertToISO = (obj: any) => {
    const { startTime, endTime, scheduledDate } = obj;
    const startTimeISO = convertStrToDate(scheduledDate, startTime);
    const endTimeISO = convertStrToDate(scheduledDate, endTime);

    return { startTime: startTimeISO, endTime: endTimeISO };
  };

  const surveyData = useSelector(surveyDataSelector);

  const interViewDates: {
    start: Date | string;
    end: Date | string;
  } = useSelector((state: RootState) => state?.interviewdates?.interviewDates);

  function getNgIndustries() {
    generalServices.getIndustries().then((response) => {
      const items = response?.data?.data;
      if (items !== null) {
        setIndustries(
          items?.sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order
          )
        );
        dispatch(clearIndustry());
        dispatch(addIndustry(items));
      }
    });
  }

  const closedModal = () => setIsModalOpen(false);

  const closeSurveyModal = () => setIsSurveyModalOpen(false);
  const { t } = useTranslation();

  const drawerStatus = useSelector(
    (state: RootState) => state?.dashboard?.dashboardDrawerStatus
  );

  const methods = useForm<IFormValues>({
    defaultValues: {
      title: null,
      conditions: null,
      exclusion: null,
      ngIndustries: [],
      gender: 3,
      age: {
        lower: null,
        upper: null,
      },
      prefecture: [],
      married: 3,
      children: 3,
      personalIncome: { lower: null, upper: null },
      householdIncome: { lower: null, upper: null },
      profession: [],
      question: [],
      monitorscount: null,
      duration: "",
    },

    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setFocus,
    clearErrors,
    setError,
    formState: {
      errors,
      isSubmitting,
      isSubmitted: formSubmitted,
      isValidating,
    },
    reset,
  } = methods;

  useEffect(() => {
    const errorElement = document.getElementById("form-error");
    const mainElement = document.getElementById("main-container");

    if (errorElement && mainElement) {
      const offsetTop = errorElement.offsetTop;

      // Ensure mainElement has scrollTo method before calling it
      if ("scrollTo" in mainElement) {
        mainElement.scrollTo({
          left: mainElement.scrollLeft,
          top: offsetTop - 40,
          behavior: "smooth",
        });
      }
    }
  }, [errors, setFocus, isSubmitting]);

  function checkJson(data: any) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      return data;
    }
  }
  const location = useSelector((state: RootState) => state?.data?.Campaign);

  const openModal = useCallback(() => {
    if (Object.keys(location)?.length === 0) getNgIndustries();
    setIsModalOpen(true);
  }, []);

  const formData = checkJson(location);

  const initialQuestion = {
    questionText: "",
    type: QuestionTypes.Multiple,
    isRequired: true,
    order: 1,
    sequence: 1,
    options: [],
  };

  useEffect(() => {
    if (location !== null || Object.keys(location)?.length !== 0) {
      getNgIndustries();
      reset(formData);
      if (formData?.age?.lower) {
        setValue(
          "age.lower",
          formData?.age?.lower !== null ? formData?.age?.lower : ""
        );
      }
      if (formData?.age?.upper) {
        setValue(
          "age.upper",
          formData?.age?.upper !== null ? formData?.age?.upper : ""
        );
      }
      if (formData?.personalIncome?.lower) {
        setValue(
          "personalIncome.lower",
          formData?.personalIncome?.lower !== null
            ? formData?.personalIncome?.lower
            : ""
        );
      }
      if (formData?.personalIncome?.upper) {
        setValue(
          "personalIncome.upper",
          formData?.personalIncome?.upper !== null
            ? formData?.personalIncome?.upper
            : ""
        );
      }
      if (formData?.householdIncome?.lower) {
        setValue(
          "householdIncome.lower",
          formData?.householdIncome?.lower !== null
            ? formData?.householdIncome?.lower
            : ""
        );
      }
      if (formData?.householdIncome?.upper) {
        setValue(
          "householdIncome.upper",
          formData?.householdIncome?.upper !== null
            ? formData?.householdIncome?.upper
            : ""
        );
      }
    }
    if (formData?.screening?.question?.length > 0) {
      setValue("question", formData?.screening?.question);
    }
  }, [location]);

  const ngIndustries: string[] = useMemo(
    () => watch("ngIndustries")!,
    [watch("ngIndustries")]
  );

  const handleDropdownSubmit = (selected: string[]) => {
    setValue("ngIndustries", selected);
    closedModal();
  };

  function getRequestData(data: IFormValues) {
    const questions = getValues("question")?.map((question) => ({
      ...question,
      isRequired: question?.isRequired ? "1" : "0",
      options: question?.options?.map((option, index) => ({
        ...option,
        order: index + 1,
      })),
    }));
    const surveyObj: any = {
      order: 1,
      question: questions,
    };

    const startDate: Date | undefined = interViewDates?.start
      ? new Date(interViewDates?.start)
      : undefined;

    const endDate: Date | undefined = interViewDates?.end
      ? new Date(interViewDates?.end)
      : undefined;

    requestData = {
      title: data.title,
      includeCondition: data?.conditions !== "" ? data?.conditions : null,
      excludeCondition: data?.exclusion?.length! > 0 ? data?.exclusion : null,
      ngIndustries: data?.ngIndustries ?? [],
      monitorsCount: data?.monitorscount!
        ? parseInt(data?.monitorscount?.toString())
        : null,
      interviewDurationId: data?.duration !== "" ? data?.duration : null,
      startsAt: startDate! ? moment(startDate).format("DD-MM-YYYY") : null,
      endsAt: endDate! ? moment(endDate).format("DD-MM-YYYY") : null,
      timeslot: selectedSlot,
      hasScreening: false,
      gender: data?.gender ? parseInt(data?.gender?.toString()) : null,
      ageFrom: data.age?.lower ? data.age?.lower : null,
      ageTo: data.age?.upper ? data.age?.upper : null,
      prefectures: data?.prefecture ?? [],
      maritalStatus: data?.married ? parseInt(data.married?.toString()) : null,
      hasChildren: data?.children ? parseInt(data.children?.toString()) : null,
      occupations: data?.profession ?? [],
      personalIncomeStart: data?.personalIncome?.lower
        ? data?.personalIncome?.lower
        : null,
      personalIncomeEnd: data?.personalIncome?.upper
        ? data?.personalIncome?.upper
        : null,
      householdIncomeStart: data?.householdIncome?.lower
        ? data?.householdIncome?.lower
        : null,
      householdIncomeEnd: data?.householdIncome?.upper
        ? data?.householdIncome?.upper
        : null,
    };
    if (questions?.length > 0) {
      requestData = {
        ...requestData,
        hasScreening: true,
        screening: surveyObj,
      };
    }
    return requestData;
  }
  useEffect(() => {
    const today = moment();
    const start = moment(interViewDates?.start);
    const end = moment(interViewDates?.end);
    const startDifference = start.diff(today, "days");
    const startEndDiff = end.diff(start, "days");
    if (selectedSlot?.length <= 0 && formSubmitted) {
      setScheduleError(t("messages.schedule-required"));
    } else {
      setScheduleError("");
    }
    if (!interViewDates?.start && formSubmitted) {
      setDateError(t("messages.implementation-period"));
    } else if (!interViewDates?.end && formSubmitted) {
      setDateError(t("messages.implementation-period"));
    } else if (startDifference > 30) {
      setDateError(t("messages.implementation-period-min"));
    } else if (startEndDiff > 30) {
      setDateError(t("messages.implementation-period-range"));
    } else {
      setDateError("");
    }
  }, [ngIndustries, formSubmitted, selectedSlot, interViewDates]);

  useEffect(() => {
    setOpenAnimation(true);
  }, []);
  const checkFormValid = () => {
    const questions = getValues("question") ?? [];

    let hasMoreThan50Options = false;

    questions.forEach((question) => {
      if (question.options.length > 50) {
        hasMoreThan50Options = true;
        return; // Exit loop early if any question has more than 50 options
      }
    });
    const emptyQuestionsTextIndex = questions.findIndex(
      (item) => item?.questionText === ""
    );
    let emptyOptionIndex = -1;
    let questionIndex = -1;

    questions.forEach((question, index) => {
      question.options.forEach((option, optionIndex) => {
        if (
          option.optionText === "" &&
          question.type !== QuestionTypes.FreeText
        ) {
          emptyOptionIndex = optionIndex;
          questionIndex = index;
        }
      });
    });
    const today = moment();
    const start = moment(interViewDates?.start);
    const end = moment(interViewDates?.end);
    const startDifference = start.diff(today, "days");
    const startEndDiff = end.diff(start, "days");
    if (!interViewDates?.start) {
      setDateError(t("messages.implementation-period"));
    } else if (!interViewDates?.end) {
      setDateError(t("messages.implementation-period"));
    } else if (startDifference > 30) {
      setDateError(t("messages.implementation-period-min"));
    } else if (startEndDiff > 30) {
      setDateError(t("messages.implementation-period-range"));
    } else {
      setDateError("");
    }
    if (selectedSlot?.length <= 0) {
      setScheduleError(t("messages.schedule-required"));
    } else {
      setScheduleError("");
    }
    if (emptyQuestionsTextIndex !== -1) {
      setError(`question.${emptyQuestionsTextIndex}.questionText`, {
        type: "required",
        message: "messages.required",
      });
      setActiveQuestionIndex(emptyQuestionsTextIndex);
    } else if (
      emptyQuestionsTextIndex === -1 &&
      emptyOptionIndex !== -1 &&
      questionIndex !== -1
    ) {
      setError(
        `question.${questionIndex}.options.${emptyOptionIndex}.optionText`,
        {
          type: "required",
          message: "messages.required",
        }
      );
      setActiveQuestionIndex(questionIndex);
    }
    if (hasMoreThan50Options) {
      errorToast(t("messages.questions-options-max"));
    } else if (slotTimeExceed()) {
      errorToast(t("campaign.creation.time-exceed"));
    }
    if (
      interViewDates?.start &&
      interViewDates?.end &&
      selectedSlot?.length !== 0 &&
      emptyQuestionsTextIndex === -1 &&
      emptyOptionIndex === -1 &&
      questionIndex === -1 &&
      !hasMoreThan50Options &&
      startDifference <= 30 &&
      !slotTimeExceed()
    ) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = (data: IFormValues) => {
    let request = getRequestData(data);
    request.status = 1;
    const isCheckFormValid = checkFormValid();
    if (isCheckFormValid && !slotTimeExceed()) {
      if (interViewDates?.start === "" || interViewDates?.end === "") {
        setDateError(t("messages.implementation-period-min"));
        return;
      } else if (
        moment(new Date(interViewDates?.start)).format("YYYY/MM/DD") <
        moment(new Date()).format("YYYY/MM/DD")
      ) {
        setDateError(t("messages.implementation-period-past"));
        return;
      } else {
        setDateError("");
      }
      if (selectedSlot?.length <= 0) {
        setScheduleError(t("messages.schedule-required"));
        return;
      } else {
        setScheduleError("");
      }
      dispatch(updateCampaign(requestData));
      dispatch(updateCampaignAddData(request));
      dispatch(updatePreviewModeValue(true));

      navigate.push(
        `/app/campaign/creation/preview${searchId ? `?id=${searchId}` : ""}`
      );
    }
  };
  const onDraftSubmit = () => {
    const questions = getValues("question") ?? [];

    let hasMoreThan50Options = false;

    questions.forEach((question) => {
      if (question.options.length > 50) {
        hasMoreThan50Options = true;
        return; // Exit loop early if any question has more than 50 options
      }
    });
    const data = getValues();

    if (data.title) {
      if (!hasMoreThan50Options && !slotTimeExceed()) {
        clearErrors("title");
        let request = getRequestData(data);

        const timeslots = request?.timeslot?.map((slot: any) => {
          return convertToISO(slot);
        });
        request.timeslot = timeslots;

        setDraftModal(true);

        request.status = 0;
        let secondsElapsed = 0;
        const intervalTime = 5000;
        const totalTime = 60000;
        setIsSubmitted(true);

        if (
          campaignId !== null &&
          campaignId !== undefined &&
          campaignId !== ""
        ) {
          researchService
            .updateCampaignDetail(campaignId!, JSON.stringify(request))
            .then((response) => {
              localStorage.removeItem("campaignId");
              dispatch(resetState());
              if (response.status !== 201) {
                apiInterval();
              } else {
                successToast(t("interview.success-info-draft"));
                setIsSubmitted(false);
                navigate.push("/app/campaign");
              }
              function apiInterval() {
                getCampaignStatus(response?.data?.data?.campaignId);
                secondsElapsed += intervalTime;
                if (secondsElapsed < totalTime) {
                  timer = setTimeout(apiInterval, intervalTime);
                } else {
                  infoToast(parseSuccessMessage(response.data?.message));
                  navigate.push("/app/campaign");
                }
              }
            })
            .catch((error) => {
              setIsSubmitted(false);
              errorToast(getErrorMessage(error?.response?.data));
            });
        } else {
          researchService
            .createCampaign(JSON.stringify(request), {})
            .then((response) => {
              dispatch(resetState());
              if (response.status !== 201) {
                apiInterval();
              } else {
                successToast(t("interview.success-info-draft"));
                setIsSubmitted(false);
                navigate.push("/app/campaign");
              }
              function apiInterval() {
                getCampaignStatus(response?.data?.data?.campaignId);
                secondsElapsed += intervalTime;
                if (secondsElapsed < totalTime) {
                  timer = setTimeout(apiInterval, intervalTime);
                } else {
                  infoToast(t("interview.processing-info"));
                  navigate.push("/app/campaign");
                }
              }
            })
            .catch((error) => {
              setIsSubmitted(false);

              // if (error?.response?.data?.errorCode === 'E200056') {
              //   setPurchaseModal(true);
              // } else {
              const errorMessage = getErrorMessage(error?.response?.data);
              errorToast(errorMessage);

              // }
            });
        }
      } else if (hasMoreThan50Options) {
        errorToast(t("messages.questions-options-max"));
      } else if (slotTimeExceed()) {
        errorToast(t("campaign.creation.time-exceed"));
      }
    } else {
      clearErrors();
      setDateError("");
      setScheduleError("");
      setError("title", {
        type: "required",
        message: "messages.required",
      });
    }
  };

  function getCampaignStatus(campaignId: string) {
    researchService
      .getCampaignStatus(campaignId)
      .then((response) => {
        if (response.status === 201) {
          successToast(t("interview.success-info-draft"));
          clearStatus();
        }
      })
      .catch((error) => {
        if (error?.response?.data?.statusCode === 400) {
          const errorMessage = getErrorMessage(error?.response?.data);
          errorToast(errorMessage);
          clearStatus();
        } else {
          const errorMessage = getErrorMessage(error?.response?.data);
          errorToast(errorMessage);
          clearStatus();
        }
      });
  }

  function clearStatus() {
    clearInterval(timer);
    setIsSubmitted(false);
    navigate.push("/app/campaign");
  }

  

  const onQuestionAdd = () => {
 if (activeQuestionIndex!=null){
    const index=activeQuestionIndex+1


    console.log("currentQuestionIndex",activeQuestionIndex);
    
    const textFieldElement = document.getElementById(`free-text-field-${activeQuestionIndex+1}`);
    console.log(activeQuestionIndex,"CAMPAIGNcREATE_question");
    console.log(textFieldElement,"CAMPAIGNcREATE_question");
    
    if (textFieldElement) {
      console.log(textFieldElement,"CAMPAIGNcREATE_question");
      // setTimeout(() => {
     
        textFieldElement.focus();
      // },100)
    
      
      
      // const inputElement = textFieldElement.querySelector('input') || textFieldElement.querySelector('textarea');
      // console.log(inputElement,"CAMPAIGNcREATE_question");
      // if (inputElement) {
      //   inputElement.focus();
      // }
    
      
    }}
    
  
    setOpenAnimation(true);
    const question = getValues("question") ?? [];
    setValue("question", [...question, initialQuestion]);
    setActiveQuestionIndex(question?.length);
    // setTimeout(() => {
    //   setOpenAnimation(true);
    // }, 100);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ paddingBottom: "96px" }}
    >
      <Stack gap={theme.mint.spacing.l}>
        <FormProvider {...methods}>
          <InterviewDetailForm
            openModal={openModal}
            industries={industries}
            ngIndustries={ngIndustries}
          />
          <ImplementationForm
            scheduleError={scheduleError}
            dateError={dateError}
          />
          <QuestionForm
            onQuestionAdd={onQuestionAdd}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
            hasInitialQuestion={formData.screening?.question?.length > 0}
            openAnimation={openAnimation}
            index={index}
           
          />
          <BasicAttributesForm />
        </FormProvider>
        {isModalOpen && (
          <IndustryModal
            industries={industries}
            checked={ngIndustries}
            isOpen={isModalOpen}
            close={closedModal}
            submit={handleDropdownSubmit}
          />
        )}
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
            zIndex: 1000,
            borderTop: `1px solid ${theme.mint.color.border.medium}`,
          }}
        >
          <MintButton
            name="publish"
            variant="contained"
            type="submit"
            size="medium"
            sx={{ minWidth: "136px !important" }}
            disabled={isSubmitting || isValidating}
            onClick={handleSubmit(onSubmit)}
          >
            {t("campaign.creation.form.submit")}
          </MintButton>
          <MintButton
            name="draft"
            variant="outlined"
            size="medium"
            disabled={
              isSubmitted ||
              (searchId
                ? false
                : userData?.campaigns?.draftedCampaign ===
                  DRAFTED_CAMPAIGN_LIMIT)
            }
            onClick={onDraftSubmit}
            sx={{ minWidth: "136px !important" }}
          >
            {t("interview.button.draft")}
          </MintButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default CampaignCreationForm;
