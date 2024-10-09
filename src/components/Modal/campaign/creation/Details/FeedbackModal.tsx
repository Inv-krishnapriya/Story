import React, { useState } from "react";
import {
  MintButton,
  MintDialog,
  MintTextField,
  MintTypography,
  errorToast,
  successToast,
} from "@/design-system";
import { Box, useTheme } from "@mui/material";
import BadgeButton from "@/components/UI/button/BadgeButton";
import { customerService, videoChatService } from "@/common/apiUrls";
import { getErrorMessage, trimAllValues } from "@/utils";

type TModal = {
  isOpen: boolean;
  close: any;
  submit?: () => void;
  meetingId: string;
};
const FeedbackModal = ({ isOpen, close, submit, meetingId }: TModal) => {
  const theme = useTheme();
  const [feedbackCommentError, setFeedbackCommentError] = useState<any>(null);
  const [ratingError, setRatingError] = useState<any>(null);
  const reviewCount = [
    {
      name: "非常に 満足",
      value: 5,
    },
    {
      name: "やや満足",
      value: 4,
    },
    {
      name: "どちら とも いえない",
      value: 3,
    },
    {
      name: "やや不満",
      value: 2,
    },
    {
      name: "不満",
      value: 1,
    },
  ];
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (ratingCount >= 0) {
      if (trimAllValues(answer)?.length > 500) {
        setFeedbackCommentError("※ 500文字以下で入力してください。");
        return;
      } else {
        let body = {
          meetingId: meetingId,
          rating: ratingCount,
          text: answer,
          feedbackType: 0,
        };
        console.log(body);
        videoChatService
          .postInterviewFeedback(body)
          .then((res) => {
            successToast("評価アンケートを送信しました");
            close();
          })
          .catch((error) => {
            console.log(error);
            errorToast(getErrorMessage(error?.response?.data));
          });
      }
    } else {
      setRatingError("※ 必須項目が選択されていません。");
    }
  };
  const [ratingCount, setRatingCount] = useState(-1);
  const [answer, setAnswer] = useState("");

  const clickRating = (value: number) => {
    console.log(value);
    if (value == ratingCount && value != 1) {
      setRatingCount(value - 1);
    } else {
      setRatingCount(value);
    }
    setRatingError(null);
  };

  const handleFeedbackComments = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswer(e.target.value);
    if (trimAllValues(e.target.value)?.length > 500)
      setFeedbackCommentError("※ 500文字以下で入力してください。");
    else setFeedbackCommentError(null);
  };

  return (
    <MintDialog
      open={isOpen}
      onClose={close}
      sx={{
        "& .MuiPaper-root": {
          width: "600px",
        },
      }}
    >
      <Box
        px={theme.mint.spacing.m}
        paddingTop={theme.mint.spacing.m}
        paddingBottom={theme.mint.spacing.s}
      >
        <MintTypography
          size="head-m"
          weight="500"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          評価アンケート
        </MintTypography>
        {ratingError && (
          <Box sx={{ paddingTop: 3, paddingBottom: "unset" }}>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.system.error.error}
            >
              {ratingError}
            </MintTypography>
          </Box>
        )}

        <Box paddingBottom={theme.mint.spacing.s}>
          <Box
            paddingTop={theme.mint.spacing.s}
            paddingBottom={theme.mint.spacing.xs}
            display={"flex"}
            gap={theme.mint.spacing.x3s}
          >
            <MintTypography size="body" weight="700">
              Q1.
            </MintTypography>
            <MintTypography size="body" weight="700">
              今回のインタビューの満足度をお知らせください。
            </MintTypography>
            <MintTypography
              size="body"
              color={theme.mint.color.pallet.pinkBrilliant500}
              weight="700"
            >
              *必須
            </MintTypography>
          </Box>
          <Box width={538} height={126}>
            <Box
              display={"flex"}
              gap={theme.mint.spacing.xxl}
              alignItems={"flex-start"}
            >
              {reviewCount?.map(({ name, value }: any) => {
                return (
                  <Box
                    key={value}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    maxWidth={"47px"}
                  >
                    <BadgeButton
                      onClick={() => clickRating(value)}
                      value={value}
                      isActive={value === ratingCount}
                    />
                    <Box>
                      <MintTypography
                        sx={{ wordBreak: "keep-all" }}
                        paddingTop={theme.mint.spacing.xxs}
                        size="caption"
                        textAlign={"center"}
                      >
                        {name}
                      </MintTypography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            paddingTop={theme.mint.spacing.s}
            paddingBottom={theme.mint.spacing.xs}
            display={"flex"}
            gap={theme.mint.spacing.x3s}
          >
            <MintTypography size="body" weight="700">
              Q2.
            </MintTypography>
            <MintTypography size="body" weight="700">
              理由などございましたらお書きください
            </MintTypography>
          </Box>
          <MintTextField
            fullWidth
            multiline
            rows={2}
            inputProps={{ style: { resize: "vertical" } }}
            placeholder="500文字まで"
            onChange={(e) => handleFeedbackComments(e)}
          />
        </Box>
        {feedbackCommentError && (
          <Box>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.system.error.error}
            >
              {feedbackCommentError}
            </MintTypography>
          </Box>
        )}
        <Box
          display={"flex"}
          gap={theme.mint.spacing.xxs}
          justifyContent={"flex-end"}
          paddingTop={theme.mint.spacing.s}
        >
          <MintButton variant="text" onClick={close}>
            閉じる
          </MintButton>
          <MintButton onClick={handleSubmit} variant="contained">
            この内容で回答
          </MintButton>
        </Box>
      </Box>
    </MintDialog>
  );
};

export default FeedbackModal;
