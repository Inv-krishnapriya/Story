"use cleint";
import { videoChatService } from "@/common/apiUrls";
import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTextField,
  MintTypography,
  successToast,
} from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { updateFeedbackStatus } from "@/stores/videocall/reducer";
import { trimAllValues } from "@/utils";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface IFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackModal(props: Readonly<IFeedbackModalProps>) {
  const { open, onClose } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(-1);
  const [feedback, setFeedback] = useState<string>("");
  const [ratingError, setRatingError] = useState<any>(null);
  const [feedbackCommentError, setFeedbackCommentError] = useState<any>(null);
  const [ratingsAvailable, setRatingsAvailable] = useState<
    { key: number; label: string; status: boolean }[]
  >([
    { key: 5, label: t("feedback-modal.very-satisfied"), status: false },
    { key: 4, label: t("feedback-modal.somewhat-satisfied"), status: false },
    {
      key: 3,
      label: t("feedback-modal.neither-agree-nor-disagree"),
      status: false,
    },
    { key: 2, label: t("feedback-modal.somewhat-dissatisfied"), status: false },
    { key: 1, label: t("feedback-modal.dissatisfaction"), status: false },
  ]);
  const router = useRouter();
  const meetingData = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );
  const dispatch = useDispatch();

  const handleFeedback = () => {
    if (rating >= 0) {
      if (trimAllValues(feedback)?.length > 500) {
        setFeedbackCommentError(t("feedback-modal.max-500-char"));
        return;
      } else {
        let data = JSON.stringify({
          meetingId: meetingData?.meetingId,
          text: feedback,
          rating: rating,
          feedbackType: 0,
        });
        videoChatService
          .postInterviewFeedback(data)
          .then(() => {
            successToast(t("feedback-modal.survey-has-been-sent"));
            if (meetingData?.campaignId !== undefined) {
              router.push(`/app/campaign/details/${meetingData.campaignId}`);
            } else if (meetingData.campaignId === undefined) {
              router.push(
                `/video-chat/auth/login?meetingId=${meetingData.meetingId}`
              );
            }
            dispatch(updateFeedbackStatus(true));
            onClose();
          })
          .catch((error) => {
            console.log("Error occured in feedback api : ", error);
            onClose();
          });
      }
    } else {
      setRatingError(t("feedback-modal.required-validation"));
    }
  };

  const handleRating = (element: number, itemIndex: number) => {
    setRatingsAvailable((prevRating) => {
      return prevRating.map((item, index) => {
        return { ...item, status: index === itemIndex };
      });
    });
    setRating(element);
    setRatingError(null);
  };

  const handleFeedbackComments = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback(e.target.value);
    if (trimAllValues(e.target.value)?.length > 500)
      setFeedbackCommentError(t("feedback-modal.max-500-char"));
    else setFeedbackCommentError(null);
  };

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDialog-paper": {
          width: "600px",
        },
      }}
    >
      <MintDialogTitle>
        <MintTypography size="head-m" weight="500">
          {t("feedback-modal.evaluation-question")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          display: "flex",
          padding: "0px 24px 16px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          alignSelf: "stretch",
        }}
      >
        {ratingError && (
          <Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.system.error.error}
            >
              {ratingError}
            </MintTypography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            width: "538px",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <Box
            id="question1"
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography size="body" weight="700">
                Q1.
              </MintTypography>
              <MintTypography size="body" weight="700">
                {t("feedback-modal.question-1")}
              </MintTypography>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <MintTypography
                  size="body"
                  weight="700"
                  color={theme.mint.color.system.error.error}
                >
                  {t("feedback-modal.required")}
                </MintTypography>
              </Box>
            </Box>
            <Box
              id="rating"
              sx={{
                display: "flex",
                width: "343px",
                padding: 0,
                alignItems: "flex-start",
                gap: "48px",
              }}
            >
              {ratingsAvailable?.map((item, index) => {
                return (
                  <Box
                    id={item.key.toString()}
                    key={index}
                    sx={{
                      display: "flex",
                      padding: 0,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        ".MuiBox-root: hover": {
                          background:
                            theme.mint.color.surfaceAccent.primary.primary,
                          color: theme.mint.color.text.highInverse,
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          cursor: "pointer",
                          width: "46px",
                          height: "46px",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          borderRadius: "999px",
                          background: item.status
                            ? theme.mint.color.surfaceAccent.primary.primary
                            : theme.mint.color.surfaceGray.medium.medium,
                        }}
                        onClick={() => handleRating(item.key, index)}
                      >
                        <MintTypography
                          size="head-xs"
                          weight="400"
                          color={
                            item.status
                              ? theme.mint.color.text.highInverse
                              : theme.mint.color.text.high
                          }
                        >
                          {item.key}
                        </MintTypography>
                      </Box>
                    </Box>
                    <MintTypography
                      size="caption"
                      weight="400"
                      sx={{ width: "48px", textAlign: "center" }}
                    >
                      {item.label}
                    </MintTypography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            id="question2"
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <MintTypography size="body" weight="700">
                Q2.
              </MintTypography>
              <MintTypography size="body" weight="700">
                {t("feedback-modal.question-2")}
              </MintTypography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <Box
                id="reason"
                sx={{
                  display: "flex",
                  height: "90px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  alignSelf: "stretch",
                  width: "100%",
                }}
              >
                <MintTextField
                  sx={{
                    "&.MuiTextField-root": {
                      width: "550px",
                      padding: "unset",
                      ".MuiInputBase-input": {
                        padding: 1,
                      },
                      ".MuiOutlinedInput-root": {
                        padding: "4.5px 4px",
                      },
                    },

                    "& .MuiOutlinedInput-input": {
                      resize: "auto",
                      width: "552px",
                      height: "24px",
                    },
                  }}
                  fullWidth
                  multiline
                  placeholder={t("feedback-modal.upto-500-characters")}
                  minRows={3}
                  value={feedback}
                  onChange={(e) => handleFeedbackComments(e)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </MintDialogContent>
      {feedbackCommentError && (
        <Box sx={{ pt: 1, pl: 3 }}>
          <MintTypography
            size="caption"
            weight="400"
            color={theme.mint.color.system.error.error}
          >
            {feedbackCommentError}
          </MintTypography>
        </Box>
      )}
      <MintDialogActions>
        <MintButton variant="text" onClick={onClose}>
          <MintTypography size="body" weight="500">
            {t("feedback-modal.close")}
          </MintTypography>
        </MintButton>
        <MintButton
          sx={{
            background: (theme) =>
              theme.mint.color.surfaceAccent.primary.primary,
          }}
          onClick={handleFeedback}
        >
          {t("feedback-modal.answer-with-content")}
        </MintButton>
      </MintDialogActions>
    </MintDialog>
  );
}
