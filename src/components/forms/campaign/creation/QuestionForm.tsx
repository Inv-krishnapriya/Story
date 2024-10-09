import {
  HandleHorizontalIcon,
  MintButton,
  MintIconButton,
  MintRadio,
  MintSelectField,
  MintSwitch,
  MintTextField,
  MintTypography,
  TrashOutlinedIcon,
} from "@/design-system";
import i18n from "@/i18n";
import { Box, Collapse, Stack, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IQuestion } from "./interface";
import {
  FreeTextQuestion,
  MultipleQuestion,
  SingleQuestion,
} from "./QuestionElements";
import { QuestionTypes } from "@/utils/common.data";
import useToggle from "@/hooks/useToggle";
import MultiQuestionModal from "@/components/Modal/campaign/creation/MultiQuestionModal";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { setCreateQuestionMode } from "@/stores/global/reducer";
import { useDispatch } from "react-redux";

function QuestionForm({
  onQuestionAdd,
  activeQuestionIndex,
  setActiveQuestionIndex,
  hasInitialQuestion,
  openAnimation,
  index,
 

}: {
  onQuestionAdd: () => void;
  activeQuestionIndex: number | null;
  setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hasInitialQuestion: boolean;
  openAnimation: boolean;
  index: number;

  
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [clearAllQuestion, setClearAllQuestion] = useState(false);

  const createQuestionMode = useSelector(
    (state: RootState) => state.global.campaignCreationMode
  );
  const { watch, setValue, clearErrors } = useFormContext();
  const dispatch = useDispatch();
  const questions: IQuestion[] = watch("question") ?? [];

  useEffect(() => {
    if (hasInitialQuestion) {
      dispatch(setCreateQuestionMode(true));
    }
  }, [hasInitialQuestion]);
  useEffect(() => {
    if (!hasInitialQuestion && createQuestionMode && questions?.length === 0) {
      onQuestionAdd();
    }
  }, [hasInitialQuestion, createQuestionMode, questions]);
  const questionCreateModeChange = (checked: boolean) => {
    if (checked) {
      onQuestionAdd();
      dispatch(setCreateQuestionMode(true));
    } else {
      setClearAllQuestion(true);
    }
  };
  // useEffect(() => {

  //   } else {
  //     setValue("question", []);
  //     clearErrors("question");
  //   }
  // }, [questionCreateMode]);
  // );

  useEffect(()=>{
    console.log("",index);

  })

  const onActiveQuestionIndexChange = (index: number | null) => {
    setActiveQuestionIndex(index);
  };

  const onDrag = (e: any) => {
    const { source, destination } = e;
    const updatedQuestion = [...questions];
    const elementToMove = updatedQuestion.splice(source?.index, 1)[0];
    updatedQuestion.splice(destination?.index, 0, elementToMove);
    setValue("question", updatedQuestion);
  };

  return (
    <Box
      p={theme.mint.spacing.l}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      bgcolor={theme.mint.color.background.containerBg.layer1}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Stack gap={theme.mint.spacing.xxs}>
          <MintTypography
            size="head-m"
            weight="700"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            {t("interview.section3.heading")}
          </MintTypography>
          <MintTypography
            size="body"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.medium}
          >
            {t("interview.section3.info-text")}
          </MintTypography>
        </Stack>
        <Box display={"flex"} gap={theme.mint.spacing.xxs}>
          <MintTypography
            size="body"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            {t("campaign.creation.form.survey-creation")}
          </MintTypography>
          <MintSwitch
            onChange={(e) => {
              questionCreateModeChange(e.target.checked);
            }}
            inputProps={
              { "data-testid": "campaign.creation.form.survey-creation" } as any
            }
            checked={createQuestionMode}
          />
        </Box>
      </Box>
      <Collapse in={createQuestionMode}>
        <DragDropContext onDragEnd={(source) => onDrag(source)}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
                {questions?.map((question, index) => {
                  return (
                    <>
                      {question.type === QuestionTypes.FreeText && (
                        <FreeTextQuestion
                          index={index}
                          activeQuestionIndex={activeQuestionIndex}
                          question={question}
                          onActiveQuestionIndexChange={
                            onActiveQuestionIndexChange
                          }
                          questionLength={questions?.length ?? 0}
                        />
                      )}
                      {question.type === QuestionTypes.Multiple && (
                        <MultipleQuestion
                          index={index}
                          question={question}
                          activeQuestionIndex={activeQuestionIndex}
                          onActiveQuestionIndexChange={
                            onActiveQuestionIndexChange
                          }
                          openAnimation={openAnimation}
                          questionLength={questions?.length ?? 0}
                        />
                      )}
                      {question.type === QuestionTypes.Single && (
                        <SingleQuestion
                          index={index}
                          question={question}
                          activeQuestionIndex={activeQuestionIndex}
                          onActiveQuestionIndexChange={
                            onActiveQuestionIndexChange
                          }
                          questionLength={questions?.length ?? 0}
                        />
                      )}
                    </>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        <Box
          mt={theme.mint.spacing.s}
          gap={theme.mint.spacing.xxs}
          display={"flex"}
        >
          <MintButton
            variant="outlined"
            size="medium"
            onClick={onQuestionAdd}
            disableRipple
            disabled={questions?.length === 10}
            
           
          >
            {t("campaign.creation.form.question-add")}
          </MintButton>
        </Box>
      </Collapse>

      {clearAllQuestion && (
        <ConfirmationModal
          open={clearAllQuestion}
          title="campaign.creation.modal.question-clear-title"
          onAgree={() => {
            setValue("question", []);
            clearErrors("question");
            dispatch(setCreateQuestionMode(false));
            setClearAllQuestion(false);
          }}
          onDisagree={() => {
            setClearAllQuestion(false);
          }}
          agreeButtonName="campaign.creation.modal.yes"
          disAgreeButtonName="campaign.creation.modal.return"
        />
      )}
    </Box>
  );
}

export default QuestionForm;
