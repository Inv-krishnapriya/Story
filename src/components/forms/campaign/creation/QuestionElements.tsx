import {
  CrossOutlinedIcon,
  HandleHorizontalIcon,
  MintButton,
  MintCheckbox,
  MintFormControlLabel,
  MintIconButton,
  MintRadio,
  MintSelectField,
  MintSwitch,
  MintTextField,
  MintTooltip,
  MintTypography,
  PlusOutlinedIcon,
  QuestionCircleOutlinedIcon,
  TrashOutlinedIcon,
} from "@/design-system";
import i18n from "@/i18n";

import { Box, Collapse, FormControl, Stack, useTheme } from "@mui/material";

import {
  Control,
  Controller,
  UseFormSetValue,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IOption, IQuestion } from "./interface";
import MultiOptionsModal from "@/components/Modal/campaign/creation/MultiOptionsModal";
import useToggle from "@/hooks/useToggle";
import { useEffect, useRef, useState, useTransition } from "react";
import { QuestionOptionTypes, QuestionTypes } from "@/utils/common.data";
import { Draggable } from "react-beautiful-dnd";
import { getAlphabetLetterByIndex } from "@/utils";

const FreeTextQuestion = ({
  index,
  activeQuestionIndex,
  question,
  onActiveQuestionIndexChange,
  questionLength,
}: {
  index: number;
  activeQuestionIndex: number | null;
  question: IQuestion;
  onActiveQuestionIndexChange: (index: number | null) => void;
  questionLength: number;
}) => {
  const { t } = useTranslation();

  const { control, getValues, setValue, formState } = useFormContext();
  const { errors } = formState as any;
  const questionTextError = errors?.question?.[index]?.questionText;

  const theme = useTheme();

  const onQuestionRemove = () => {
    const allQuestions = getValues("question") ?? [];
    if (index >= 0 && index < allQuestions.length) {
      const updatedQuestions = [...allQuestions];
      updatedQuestions.splice(index, 1);
      setValue(`question`, updatedQuestions);
    }
  };
  useEffect(() => {
    setValue(`question.${index}.options`, []);
  }, [index]);


 

  return (
    <>
      {activeQuestionIndex === index ? (
        <Box
          mt={theme.mint.spacing.m}
          bgcolor={theme.mint.color.background.containerBg.layer2}
          p={theme.mint.spacing.s}
          borderRadius={`${theme.mint.cornerRadius.m}px`}
        >
          <Stack gap={theme.mint.spacing.s}>
            <Box display={"flex"} alignItems={"end"}>
              <Box display={"flex"} gap={theme.mint.spacing.s}>
                <Box>
                  <Controller
                    control={control}
                    name={`question.${index}.type`}
                    render={({ field}) => (
                      <FormControl variant="outlined" fullWidth>
                        <MintSelectField
                          fullWidth={false}
                          label={t("interview.section2.answer-format")}
                          placeholder={t("SurveyQuestionOptions.type.Select")}
                          required
                          options={QuestionType}
                          sx={{
                            width: "136px",
                          }}
                          {...field}
                          
                        />
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Controller
              control={control}
              name={`question.${index}.questionText`}
              rules={{
                required: "messages.required",
              }}
              render={({ field }) => (
                <MintTextField
                  required
                  label={t("interview.section2.question-text")}
                  fullWidth
                  {...field}
                  multiline
                  minRows={1}
                  inputProps={{ maxLength: 500, style: { resize: "vertical" } }}
                  error={!!questionTextError}
                  helperText={
                    questionTextError?.message
                      ? t(String(questionTextError?.message), {
                          field: t("interview.section2.question-text"),
                        })
                      : ""
                  }
                  // id={questionTextError ? "form-error" : ""}
                 
                />
              )}
            />

            <Box
              pt={theme.mint.spacing.s}
              sx={{
                borderTop: `1px solid ${theme.mint.color.border.medium}`,
              }}
              display={"flex"}
              justifyContent={"end"}
              gap={theme.mint.spacing.s}
            >
              <MintIconButton
                onClick={onQuestionRemove}
                disableRipple
                sx={{ p: 0 }}
                data-testid="question-remove"
                disabled={questionLength === 1}
              >
                <TrashOutlinedIcon
                  size={20}
                  color={theme.mint.color.object.medium}
                />
              </MintIconButton>
              <Box display={"flex"} gap={theme.mint.spacing.x3s}>
                <MintTypography
                  size="caption"
                  weight="400"
                  lineHeight={"150%"}
                  color={theme.mint.color.text.medium}
                >
                  {t("common.required")}
                </MintTypography>
                <Controller
                  control={control}
                  name={`question.${index}.isRequired`}
                  render={({ field }) => (
                    <MintSwitch {...field} checked={question.isRequired} />
                  )}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Draggable key={"" + index} draggableId={"" + index} index={index}>
          {(provided, snapshot) => (
            <QuestionPreviewCard
              question={question}
              onActiveQuestionIndexChange={onActiveQuestionIndexChange}
              index={index}
              provided={provided}
            />
          )}
        </Draggable>
      )}
    </>
  );
};
const MultipleQuestion = ({
  index,
  question,
  activeQuestionIndex,
  onActiveQuestionIndexChange,
  openAnimation,
  questionLength,
  
}: {
  index: number;
  question: IQuestion;
  activeQuestionIndex: number | null;
  onActiveQuestionIndexChange: (index: number | null) => void;
  openAnimation: boolean;
  questionLength: number;
}) => {
  const theme = useTheme();
  const openAnimationValue =
    questionLength - 1 !== index || questionLength === 1 ? true : openAnimation;
  const { t } = useTranslation();
  const { control, getValues, setValue, formState, clearErrors } =
    useFormContext();

  const lengthOfFilteredOptions = question?.options.length;

  const { errors } = formState as any;
  const questionTextError = errors?.question?.[index]?.questionText;
  const [multiOptionModal, toggleMultiOptionModal] = useToggle();
  const haveExclusiveOption = question.options?.some(
    (option) => option?.optionType === QuestionOptionTypes.EXCLUSIVE
  );
  const haveOtherOption = question?.options?.some(
    (option) => option?.optionType === QuestionOptionTypes.OTHER_OPTION
  );
  useEffect(() => {
    const textFieldElement = document.getElementById('free-text-field');
    console.log(textFieldElement);
    if (textFieldElement) {
      (textFieldElement as HTMLInputElement).focus();
    }
  }, []);

  useEffect(() => {
    setValue(`question.${index}.sequence`, index + 1);
    if (question.options?.length === 0) {
      setValue(`question.${index}.options`, [
        {
          optionText: "",
          order: 1,
          optionType: QuestionOptionTypes.NORMAL,
        },
        {
          optionText: "",
          order: 2,
          optionType: QuestionOptionTypes.NORMAL,
        },
        {
          optionText: "",
          order: 3,
          optionType: QuestionOptionTypes.NORMAL,
        },
        {
          optionText: t("interview.section2.others"),
          order: 4,
          optionType: QuestionOptionTypes.OTHER_OPTION,
        },
        {
          optionText: t("interview.section2.exclusive-options"),
          order: 5,
          optionType: QuestionOptionTypes.EXCLUSIVE,
        },
      ]);
    }
  }, [index]);

  // useEffect(() => {
  //   const textFieldElement = document.getElementById('free-text-field');
  //   if (textFieldElement) {
  //     (textFieldElement as HTMLInputElement).focus();
  //     console.log("textFieldElement",textFieldElement);
      
  //   }
  // }, [index]);
  useEffect(()=>{
    console.log("textFieldElement",activeQuestionIndex);

  })

  const onOptionAdd = () => {
    const haveExclusiveOption = question?.options?.find(
      (option) => option?.optionType === QuestionOptionTypes.EXCLUSIVE
    );
    const haveOtherOption = question.options?.find(
      (option) => option?.optionType === QuestionOptionTypes.OTHER_OPTION
    );
    const filteredOptions = question.options?.filter(
      (option) =>
        option?.optionType !== QuestionOptionTypes.EXCLUSIVE &&
        option?.optionType !== QuestionOptionTypes.OTHER_OPTION
    );

    const optionNewData = {
      optionText: "",
      optionType: QuestionOptionTypes.NORMAL,
    };
    const formattedOptions = [
      ...filteredOptions,
      optionNewData,
      haveOtherOption,
      haveExclusiveOption,
    ].filter(Boolean);

    setValue(`question.${index}.options`, [...formattedOptions]);
  };
  const onOptionRemove = (questionIndex: number) => {
    const options = question?.options ?? [];
    if (questionIndex >= 0 && questionIndex < options.length) {
      const updatedOptions = [...options];
      updatedOptions.splice(questionIndex, 1);
      setValue(`question.${index}.options`, updatedOptions);
    }
  };
  const onQuestionRemove = () => {
    const allQuestions = getValues("question") ?? [];
    if (index >= 0 && index < allQuestions.length) {
      const updatedQuestions = [...allQuestions];
      updatedQuestions.splice(index, 1);
      setValue(`question`, updatedQuestions);

      onActiveQuestionIndexChange(updatedQuestions?.length - 1);
    }
  };
  const addExtraOptions = (type: string, label: string, checked: boolean) => {
    if (checked) {
      const optionNewData = {
        optionText: label,
        type: type,
        ...(type === "exclusive"
          ? { optionType: QuestionOptionTypes.EXCLUSIVE }
          : { optionType: QuestionOptionTypes.OTHER_OPTION }),
        order: question?.options?.length + 1,
      };
      setValue(`question.${index}.options`, [
        ...(question?.options ?? []),
        optionNewData,
      ]);
    } else {
      const updatedData = question.options?.filter(
        (option) => option.optionText !== label
      );

      setValue(`question.${index}.options`, updatedData);
    }
  };
  const onMultipleOptionSubmit = (data: string[], randomType: boolean) => {
    const titleData = data;
    const optionData = question.options;

    const updatedOption = optionData?.map((item) => {
      const hasNonEmptyQuestionText = item?.optionText?.trim() !== "";
      const optionsName = item?.optionText;
      if (!hasNonEmptyQuestionText && !optionsName) {
        const tittle = titleData.splice(0, 1)[0];
        return {
          ...item,
          optionText: tittle,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    const newOption = titleData?.map((title, index) => {
      return {
        optionText: title,
        order: updatedOption?.length + (index + 1),
        optionType: QuestionOptionTypes.NORMAL,
      };
    });

    const combinedData = [...updatedOption, ...newOption];
    const formattedData = combinedData.slice().sort(sortFunction);

    setValue(`question[${index}].options`, formattedData);
    if (randomType) {
      setValue(`question[${index}].order`, 3);
    }
    formattedData.forEach((option, optionIndex) => {
      setValue(
        `question.${index}.options.${optionIndex}.optionText`,
        option.optionText
      );
    });

    toggleMultiOptionModal();
    clearErrors(`question.${index}.options`);
  };
  return (
    <Collapse in={openAnimationValue}>
      {activeQuestionIndex === index ? (
        <Box
          mt={theme.mint.spacing.m}
          bgcolor={theme.mint.color.background.containerBg.layer2}
          p={theme.mint.spacing.s}
          borderRadius={`${theme.mint.cornerRadius.m}px`}
        >
          <Stack gap={theme.mint.spacing.s}>
            <Box display={"flex"} alignItems={"end"}>
              <Box display={"flex"} gap={theme.mint.spacing.s}>
                <Box>
                  <Controller
                    control={control}
                    name={`question.${index}.type`}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <MintSelectField
                          fullWidth={false}
                          label={t("interview.section2.answer-format")}
                          placeholder={t("SurveyQuestionOptions.type.Select")}
                          required
                          options={QuestionType}
                          sx={{
                            width: "136px",
                          }}
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
            </Box>

            <Controller
              control={control}
              name={`question.${index}.questionText`}
              rules={{
                required: "messages.required",
                pattern: {
                  value: /^(?!\s*$).+/,
                  message: "messages.required",
                },
              }}
              
              render={({ field}) => (
              
                <MintTextField
                  index={activeQuestionIndex}
                  required
                  label={t("interview.section2.question-text")}
                  fullWidth
                  {...field}
                  multiline
                  minRows={1}
                  inputProps={{ maxLength: 500, style: { resize: "vertical" },id:`free-text-field-${activeQuestionIndex+1}`}}
                  error={!!questionTextError}
                  helperText={
                    questionTextError?.message
                      ? t(String(questionTextError?.message), {
                          field: t("interview.section2.question-text"),
                        })
                      : ""
                  }
                 
                  id={questionTextError ? "form-error" : activeQuestionIndex === 0 ? "" : `free-text-field-${activeQuestionIndex-1}`}

               
                />
              )}
            />
            activeQuestionIndex:{activeQuestionIndex-1}
            <Stack gap={`${theme.mint.spacing.xxs}`}>
              {question?.options?.map((option, optionIndex) => {
                const haveExclusiveOption =
                  option?.optionType === QuestionOptionTypes.EXCLUSIVE;
                const haveOtherOption =
                  option?.optionType === QuestionOptionTypes.OTHER_OPTION;
                if (!haveExclusiveOption && !haveOtherOption) {
                  return (
                    <QuestionOption
                      key={optionIndex}
                      optionIndex={optionIndex}
                      index={index}
                      control={control}
                      onOptionRemove={onOptionRemove}
                      type={question.type}
                      setValue={setValue}
                      errors={errors}
                      optionsCount={question?.options?.length}
                    />
                  );
                } else return null;
              })}
            </Stack>
            <Stack direction={"row"} gap={`${theme.mint.spacing.xxs}`}>
              <MintButton
                variant="outlined"
                size="small"
                startIcon={
                  <PlusOutlinedIcon
                    size={16}
                    color={theme.mint.color.object.accent}
                  />
                }
                onClick={onOptionAdd}
                disabled={lengthOfFilteredOptions >= 50}
                data-testid="option-add"
              >
                {t("interview.section2.add-choice")}
              </MintButton>
              <MintButton
                variant="text"
                size="small"
                onClick={toggleMultiOptionModal}
                disabled={lengthOfFilteredOptions >= 50}
                data-testid="multiple-option-button"
              >
                {t("interview.section2.multiple-choice")}
              </MintButton>
            </Stack>
            <Stack
              py={`${theme.mint.spacing.m}`}
              borderTop={`1px solid ${theme.mint.color.border.low}`}
              borderBottom={`1px solid ${theme.mint.color.border.low}`}
              gap={`${theme.mint.spacing.xs}`}
            >
              <Box display={"flex"} gap={`${theme.mint.spacing.xxs}`}>
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      onChange={(e) => {
                        addExtraOptions(
                          "other",
                          t("interview.section2.others"),
                          e.target.checked
                        );
                      }}
                      checked={haveOtherOption}
                      inputProps={{ "data-testid": "option-other" } as any}
                    />
                  }
                  label={t("interview.section2.add-other")}
                />
              </Box>
              <Box display={"flex"} gap={`${theme.mint.spacing.xxs}`}>
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      onChange={(e) => {
                        addExtraOptions(
                          "exclusive",
                          t("interview.section2.exclusive-options"),
                          e.target.checked
                        );
                      }}
                      checked={haveExclusiveOption}
                      inputProps={{ "data-testid": "option-exclusive" } as any}
                    />
                  }
                  label={t("interview.section2.added-nothing-applies")}
                />

                <MintTypography
                  size="caption"
                  weight="400"
                  lineHeight={"150%"}
                  color={theme.mint.color.text.low}
                >
                  ※他の選択肢と同時に選べない選択肢です
                </MintTypography>
              </Box>
            </Stack>
            <Box
              pt={theme.mint.spacing.s}
              display={"flex"}
              justifyContent={"space-between"}
              gap={theme.mint.spacing.s}
            >
              <Box
                display={"flex"}
                gap={theme.mint.spacing.xxs}
                alignItems={"end"}
              >
                <Box>
                  <Controller
                    control={control}
                    name={`question.${index}.order`}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <MintSelectField
                          fullWidth={false}
                          label={"選択肢の表示順序"}
                          // placeholder="指定しない"
                          required
                          options={DataOrder}
                          sx={{
                            width: "172px",
                          }}
                          {...field}
                          value={getValues(`question.${index}.order`)}
                        />
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
              <Box
                display={"flex"}
                gap={theme.mint.spacing.s}
                alignItems={"end"}
              >
                <MintIconButton
                  onClick={onQuestionRemove}
                  disableRipple
                  sx={{ p: 0 }}
                  data-testid="question-remove"
                  disabled={questionLength === 1}
                >
                  <TrashOutlinedIcon
                    size={20}
                    color={theme.mint.color.object.medium}
                  />
                </MintIconButton>

                <Box display={"flex"} gap={theme.mint.spacing.x3s}>
                  <MintTypography
                    size="caption"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.medium}
                  >
                    必須
                  </MintTypography>
                  <Controller
                    control={control}
                    name={`question.${index}.isRequired`}
                    render={({ field }) => (
                      <MintSwitch {...field} checked={question.isRequired} />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          {multiOptionModal && (
            <MultiOptionsModal
              open={multiOptionModal}
              close={toggleMultiOptionModal}
              handleFormSubmit={onMultipleOptionSubmit}
              options={question.options}
            />
          )}
        </Box>
      ) : (
        <Draggable key={"" + index} draggableId={"" + index} index={index}>
          {(provided, snapshot) => (
            <QuestionPreviewCard
              question={question}
              onActiveQuestionIndexChange={onActiveQuestionIndexChange}
              index={index}
              provided={provided}
            />
          )}
        </Draggable>
      )}
    </Collapse>
  );
};
const SingleQuestion = ({
  index,
  question,
  activeQuestionIndex,
  onActiveQuestionIndexChange,
  questionLength,
}: {
  index: number;
  question: IQuestion;
  activeQuestionIndex: number | null;
  onActiveQuestionIndexChange: (index: number | null) => void;
  questionLength: number;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { control, getValues, setValue, formState, clearErrors } =
    useFormContext();

  const lengthOfFilteredOptions = question?.options.length;
  const { errors } = formState as any;
  const questionTextError = errors?.question?.[index]?.questionText;
  const [multiOptionModal, toggleMultiOptionModal] = useToggle();
  const haveExclusiveOption = question?.options?.some(
    (option) => option?.optionType === QuestionOptionTypes.EXCLUSIVE
  );
  const haveOtherOption = question?.options?.some(
    (option) => option?.optionType === QuestionOptionTypes.OTHER_OPTION
  );

  useEffect(() => {
    setValue(`question.${index}.sequence`, index + 1);
    if (question.options?.length === 0) {
      setValue(`question.${index}.options`, [
        {
          optionText: "",
          order: 1,
          optionType: QuestionOptionTypes.NORMAL,
        },
        {
          optionText: "",
          order: 2,
          optionType: QuestionOptionTypes.NORMAL,
        },
        {
          optionText: "",
          order: 3,
          optionType: QuestionOptionTypes.NORMAL,
        },
      ]);
    }
  }, [index]);
  const onOptionAdd = () => {
    const haveExclusiveOption = question?.options?.find(
      (option) => option?.optionType === QuestionOptionTypes.EXCLUSIVE
    );
    const haveOtherOption = question?.options?.find(
      (option) => option?.optionType === QuestionOptionTypes.OTHER_OPTION
    );
    const filteredOptions = question?.options?.filter(
      (option) =>
        option?.optionType !== QuestionOptionTypes.EXCLUSIVE &&
        option?.optionType !== QuestionOptionTypes.OTHER_OPTION
    );

    const optionNewData = {
      optionText: "",
      order: question?.options?.length + 1,
      optionType: QuestionOptionTypes.NORMAL,
    };
    const formattedOptions = [
      ...filteredOptions,
      optionNewData,
      haveOtherOption,
      haveExclusiveOption,
    ].filter(Boolean);
    setValue(`question.${index}.options`, [...formattedOptions]);
  };
  const onOptionRemove = (questionIndex: number) => {
    const options = question?.options ?? [];
    if (questionIndex >= 0 && questionIndex < options.length) {
      const updatedOptions = [...options];
      updatedOptions.splice(questionIndex, 1);
      setValue(`question.${index}.options`, updatedOptions);
    }
  };
  const addExtraOptions = (type: string, label: string, checked: boolean) => {
    if (checked) {
      const optionNewData = {
        optionText: label,
        type: type,
        ...(type === "exclusive"
          ? { optionType: QuestionOptionTypes.EXCLUSIVE }
          : { optionType: QuestionOptionTypes.OTHER_OPTION }),
        order: question?.options?.length + 1,
      };
      setValue(`question.${index}.options`, [
        ...(question?.options ?? []),
        optionNewData,
      ]);
    } else {
      const updatedData = question.options?.filter(
        (option) => option.optionText !== label
      );
      setValue(`question.${index}.options`, updatedData);
    }
  };
  const onQuestionRemove = () => {
    const allQuestions = getValues("question") ?? [];
    if (index >= 0 && index < allQuestions.length) {
      const updatedQuestions = [...allQuestions];
      updatedQuestions.splice(index, 1);
      setValue(`question`, updatedQuestions);
    }
  };
  const onMultipleOptionSubmit = (data: string[], randomType: boolean) => {
    const titleData = data;
    const optionData = question.options;

    const updatedOption = optionData?.map((item) => {
      const hasNonEmptyQuestionText = item?.optionText?.trim() !== "";
      const optionsName = item?.optionText;
      if (!hasNonEmptyQuestionText && !optionsName) {
        const tittle = titleData.splice(0, 1)[0];
        return {
          ...item,
          optionText: tittle,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    const newOption = titleData?.map((title, index) => {
      return {
        optionText: title,
        order: updatedOption?.length + (index + 1),
        optionType: QuestionOptionTypes.NORMAL,
      };
    });

    const combinedData = [...updatedOption, ...newOption];
    const formattedData = combinedData.slice().sort(sortFunction);

    setValue(`question[${index}].options`, formattedData);
    if (randomType) {
      setValue(`question[${index}].order`, 3);
    }
    formattedData.forEach((option, optionIndex) => {
      setValue(
        `question.${index}.options.${optionIndex}.optionText`,
        option.optionText
      );
    });

    toggleMultiOptionModal();
    clearErrors(`question.${index}.options`);
  };
  return (
    <>
      {activeQuestionIndex === index ? (
        <Box
          mt={theme.mint.spacing.m}
          bgcolor={theme.mint.color.background.containerBg.layer2}
          p={theme.mint.spacing.s}
          borderRadius={`${theme.mint.cornerRadius.m}px`}
        >
          <Stack gap={theme.mint.spacing.s}>
            <Box display={"flex"} alignItems={"end"}>
              <Box display={"flex"} gap={theme.mint.spacing.s}>
                <Box>
                  <Controller
                    control={control}
                    name={`question.${index}.type`}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <MintSelectField
                          fullWidth={false}
                          label={"回答形式"}
                          placeholder={t("SurveyQuestionOptions.type.Select")}
                          required
                          options={QuestionType}
                          sx={{
                            width: "136px",
                          }}
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Controller
              control={control}
              name={`question.${index}.questionText`}
              rules={{
                required: "messages.required",
              }}
              render={({ field }) => (
                <MintTextField
                  required
                  label={"設問文"}
                  fullWidth
                  {...field}
                  multiline
                  minRows={1}
                  inputProps={{ maxLength: 500, style: { resize: "vertical" } }}
                  error={!!questionTextError}
                  helperText={
                    questionTextError?.message
                      ? t(String(questionTextError?.message), {
                          field: "設問文",
                        })
                      : ""
                  }
                  id={questionTextError ? "form-error" : ""}
                />
              )}
            />
            <Stack gap={`${theme.mint.spacing.xxs}`}>
              {question?.options?.map((option, optionIndex) => {
                const haveExclusiveOption =
                  option?.optionType === QuestionOptionTypes.EXCLUSIVE;
                const haveOtherOption =
                  option?.optionType === QuestionOptionTypes.OTHER_OPTION;
                if (!haveExclusiveOption && !haveOtherOption) {
                  return (
                    <QuestionOption
                      key={optionIndex}
                      optionIndex={optionIndex}
                      index={index}
                      control={control}
                      onOptionRemove={onOptionRemove}
                      type={question.type}
                      setValue={setValue}
                      errors={errors}
                      optionsCount={question?.options?.length}
                    />
                  );
                } else return null;
              })}
            </Stack>
            <Stack direction={"row"} gap={`${theme.mint.spacing.xxs}`}>
              <MintButton
                variant="outlined"
                size="small"
                startIcon={
                  <PlusOutlinedIcon
                    size={16}
                    color={theme.mint.color.object.accent}
                  />
                }
                disabled={lengthOfFilteredOptions >= 50}
                onClick={onOptionAdd}
                data-testid="option-add"
              >
                選択肢を追加
              </MintButton>
              <MintButton
                variant="text"
                size="small"
                onClick={toggleMultiOptionModal}
                disabled={lengthOfFilteredOptions >= 50}
                data-testid="multiple-option-button"
              >
                選択肢一括入力
              </MintButton>
            </Stack>
            <Stack
              py={`${theme.mint.spacing.m}`}
              borderTop={`1px solid ${theme.mint.color.border.low}`}
              borderBottom={`1px solid ${theme.mint.color.border.low}`}
              gap={`${theme.mint.spacing.xs}`}
            >
              <Box display={"flex"} gap={`${theme.mint.spacing.xxs}`}>
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      onChange={(e) => {
                        addExtraOptions(
                          "other",
                          t("interview.section2.others"),
                          e.target.checked
                        );
                      }}
                      checked={haveOtherOption}
                      inputProps={{ "data-testid": "option-other" } as any}
                    />
                  }
                  label={"「その他」を追加"}
                />
              </Box>
              <Box display={"flex"} gap={`${theme.mint.spacing.xxs}`}>
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      onChange={(e) => {
                        addExtraOptions(
                          "exclusive",
                          t("interview.section2.exclusive-options"),
                          e.target.checked
                        );
                      }}
                      checked={haveExclusiveOption}
                      inputProps={{ "data-testid": "option-exclusive" } as any}
                    />
                  }
                  label={t("interview.section2.added-nothing-applies")}
                />
              </Box>
            </Stack>
            <Box
              pt={theme.mint.spacing.s}
              display={"flex"}
              justifyContent={"space-between"}
              gap={theme.mint.spacing.s}
            >
              <Box
                display={"flex"}
                gap={theme.mint.spacing.xxs}
                alignItems={"end"}
              >
                <Box>
                  <Controller
                    control={control}
                    name={`question.${index}.order`}
                    render={({ field }) => (
                      <FormControl variant="outlined" fullWidth>
                        <MintSelectField
                          fullWidth={false}
                          label={t("interview.section2.choice-display-order")}
                          // placeholder={t("common.not-specified")}
                          required
                          options={DataOrder}
                          sx={{
                            width: "172px",
                          }}
                          {...field}
                          value={getValues(`question.${index}.order`)}
                        />
                      </FormControl>
                    )}
                  />
                </Box>
                <Box>
                  <MintTooltip
                    title={t("interview.section2.order-info")}
                    placement="top"
                  >
                    <Box>
                      <QuestionCircleOutlinedIcon
                        size={24}
                        color={theme.mint.color.object.low}
                      />
                    </Box>
                  </MintTooltip>
                </Box>
              </Box>
              <Box
                display={"flex"}
                gap={theme.mint.spacing.s}
                alignItems={"end"}
              >
                <MintIconButton
                  onClick={onQuestionRemove}
                  disableRipple
                  sx={{ p: 0 }}
                  data-testid="question-remove"
                  disabled={questionLength === 1}
                >
                  <TrashOutlinedIcon
                    size={20}
                    color={theme.mint.color.object.medium}
                  />
                </MintIconButton>
                <Box display={"flex"} gap={theme.mint.spacing.x3s}>
                  <MintTypography
                    size="caption"
                    weight="400"
                    lineHeight={"150%"}
                    color={theme.mint.color.text.medium}
                  >
                    {t("common.required")}
                  </MintTypography>
                  <Controller
                    control={control}
                    name={`question.${index}.isRequired`}
                    render={({ field }) => (
                      <MintSwitch {...field} checked={question.isRequired} />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          {multiOptionModal && (
            <MultiOptionsModal
              open={multiOptionModal}
              close={toggleMultiOptionModal}
              handleFormSubmit={onMultipleOptionSubmit}
              options={question.options}
            />
          )}
        </Box>
      ) : (
        <Draggable key={"" + index} draggableId={"" + index} index={index}>
          {(provided, snapshot) => (
            <QuestionPreviewCard
              question={question}
              onActiveQuestionIndexChange={onActiveQuestionIndexChange}
              index={index}
              provided={provided}
            />
          )}
        </Draggable>
      )}
    </>
  );
};

const QuestionPreviewCard = ({
  question,
  index,
  onActiveQuestionIndexChange,
  provided,
}: {
  question: IQuestion;
  index: number;
  onActiveQuestionIndexChange: (index: number | null) => void;
  provided: any;
}) => {
  const theme = useTheme();

  return (
    <Box
      mt={theme.mint.spacing.m}
      px={theme.mint.spacing.s}
      bgcolor={theme.mint.color.background.containerBg.layer1}
      pb={theme.mint.spacing.s}
      borderRadius={`${theme.mint.cornerRadius.m}px`}
      border={`1px solid ${theme.mint.color.border.low}`}
      gap={theme.mint.spacing.xxs}
      onClick={() => {
        onActiveQuestionIndexChange(index);
      }}
      ref={provided.innerRef}
      data-testid="active-question-click"
      {...provided.draggableProps}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <MintIconButton
          sx={{
            padding: 0,
          }}
          disableRipple
          {...provided.dragHandleProps}
        >
          <HandleHorizontalIcon color={theme.mint.color.object.low} />
        </MintIconButton>
      </Box>
      <Stack
        gap={theme.mint.spacing.m}
        style={{
          pointerEvents: "none",
        }}
      >
        <MintTypography
          size="body"
          weight="500"
          lineHeight={"150%"}
          color={theme.mint.color.text.medium}
        >
          {question.questionText}
        </MintTypography>
        {question.type === QuestionTypes.FreeText && (
          <MintTextField
            fullWidth
            multiline
            minRows={1}
            inputProps={{ maxLength: 50, style: { resize: "vertical" } }}
          />
        )}
        <Stack gap={theme.mint.spacing.xxs}>
          {question?.options?.map((option, index) => {
            return (
              <Stack
                gap={theme.mint.spacing.xxs}
                direction={"row"}
                flexGrow={1}
                key={index}
              >
                {question.type === QuestionTypes.Single && <MintRadio />}
                {question.type === QuestionTypes.Multiple && <MintCheckbox />}

                <MintTypography>{option.optionText}</MintTypography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
const QuestionOption = ({
  index,
  optionIndex,
  onOptionRemove,
  control,
  type,
  setValue,
  errors,
  optionsCount,
}: {
  index: number;
  optionIndex: number;
  onOptionRemove: (index: number) => void;
  control: Control<any>;
  type: number;
  setValue: UseFormSetValue<any>;
  errors: any;
  optionsCount: number;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    setValue(`question.${index}.options.${optionIndex}.order`, optionIndex + 1);
  }, [optionIndex, index]);

  const questionOptionTextError =
    errors?.question?.[index]?.options?.[optionIndex]?.optionText;

  return (
    <Box
      key={index}
      pl={`${theme.mint.spacing.m}`}
      py={`${theme.mint.spacing.x3s}`}
      display={"flex"}
      gap={`${theme.mint.spacing.xxs}`}
    >
      <Stack gap={`${theme.mint.spacing.xxs}`} direction={"row"} flexGrow={1}>
        <Box
          style={{
            pointerEvents: "none",
            maxHeight: "40px",
          }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {type === QuestionTypes.Multiple && <MintCheckbox />}
          {type === QuestionTypes.Single && <MintRadio />}
        </Box>

        <Controller
          control={control}
          name={`question.${index}.options.${optionIndex}.optionText`}
          rules={{
            required: "messages.required",
            pattern: {
              value: /^(?!\s*$).+/,
              message: "messages.required",
            },
          }}
          render={({ field }) => (
            <MintTextField
              style={{
                width: "100%",
              }}
              placeholder={`${t(
                "interview.section2.choices"
              )}${getAlphabetLetterByIndex(optionIndex + 1)}`}
              required
              fullWidth
              {...field}
              error={!!questionOptionTextError}
              helperText={
                questionOptionTextError?.message
                  ? t(String(questionOptionTextError?.message), {
                      field: `${t(
                        "interview.section2.choices"
                      )}${getAlphabetLetterByIndex(optionIndex + 1)}`,
                    })
                  : ""
              }
              id={questionOptionTextError ? "form-error" : ""}
              inputProps={{ maxLength: 100 }}
            />
          )}
        />
      </Stack>

      <Box
        height={"28px"}
        width={"28px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          cursor: "pointer",
        }}
        visibility={optionsCount < 2 ? "hidden" : "visible"}
        onClick={() => {
          onOptionRemove(optionIndex);
        }}
        data-testid={`option-remove`}
      >
        <CrossOutlinedIcon size={16} color={theme.mint.color.object.medium} />
      </Box>
    </Box>
  );
};

export { FreeTextQuestion, MultipleQuestion, SingleQuestion };

const QuestionType = [
  { value: 2, label: i18n.t("SurveyQuestionOptions.type.SingleChoice") },
  { value: 1, label: i18n.t("SurveyQuestionOptions.type.MultipleChoice") },
  { value: 3, label: i18n.t("SurveyQuestionOptions.type.LongText") },
];
const DataOrder = [
  { value: 1, label: i18n.t("Order.Ascending") },
  { value: 2, label: i18n.t("Order.Descending") },
  { value: 3, label: i18n.t("Order.Random") },
];
export const sortFunction = (a: IOption, b: IOption) => {
  if (
    a?.optionType === QuestionOptionTypes.EXCLUSIVE &&
    b?.optionType !== QuestionOptionTypes.EXCLUSIVE
  ) {
    return 1; // Move a to the end
  } else if (
    a?.optionType !== QuestionOptionTypes.EXCLUSIVE &&
    b?.optionType === QuestionOptionTypes.EXCLUSIVE
  ) {
    return -1; // Move b to the end
  } else if (
    a?.optionType === QuestionOptionTypes.OTHER_OPTION &&
    b?.optionType !== QuestionOptionTypes.OTHER_OPTION
  ) {
    return 1; // Move a to second last
  } else if (
    a?.optionType !== QuestionOptionTypes.OTHER_OPTION &&
    b?.optionType === QuestionOptionTypes.OTHER_OPTION
  ) {
    return -1; // Move b to second last
  } else {
    return a.order - b.order;
  }
};
