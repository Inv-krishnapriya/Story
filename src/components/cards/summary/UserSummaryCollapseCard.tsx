import {
  Collapse,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useTranslation } from "react-i18next";
import UserSummaryQuestionCard from "./UserSummaryQuestionCard";
import USummaryQuOptionCard from "./USummaryQuOptionCard";
// This state variable will be used to track whether the question is loading or not.
const UserSummaryCollapseCard = ({ question, languageId }: any) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true); // Initialize isLoading state to false
  return (
    <>
      <Paper
        onClick={() => setIsLoading(!isLoading)} // Toggle isLoading state onClick
        variant="outlined"
        sx={{ p: 0, margin: 0, cursor: "pointer" }}
        data-testid="loading-click"
      >
        <Grid container spacing={2}>
          <Grid item xs={10} sm={11} md={11} lg={11} xl={11}>
            {/* Display Question */}
            <UserSummaryQuestionCard
              text={question.questionText}
              languageId={languageId}
            />
          </Grid>
          <Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
            <Tooltip title={t(`SurveyQuestionOptions.Collapse.${isLoading}`)}>
              {/* IconButton with icon that toggles based on isLoading state */}
              <IconButton aria-label="add" color="primary">
                {isLoading ? (
                  <KeyboardDoubleArrowUpIcon />
                ) : (
                  <KeyboardDoubleArrowDownIcon />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 0, marginBottom: 1, minHeight: "0px", paddingTop: "-1" }}
      >
        <Collapse in={isLoading}>
          <Stack direction={"row"} flexWrap={"wrap"}>
            {isLoading &&
              question?.options?.map((option: any, index: number) => (
                <USummaryQuOptionCard
                  key={index}
                  option={option}
                  languageId={languageId}
                  type={question?.type}
                />
              ))}
          </Stack>
        </Collapse>
      </Paper>
    </>
  );
};

export default UserSummaryCollapseCard;
