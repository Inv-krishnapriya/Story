import { InputLabel } from '@mui/material';
import React from 'react';
// Renders InputLabel components based on the provided text array and languageId
const UserSummaryQuestionCard = ({ text, languageId }: any) => {
  return text
    .filter((data: any) => data.languageId === languageId) // Filter the text array based on languageId
    ?.map(
      (
        data: any,
        index: number // Map the filtered elements to InputLabel components
      ) => (
        <InputLabel
          key={index}
          sx={{ margin: 1, cursor: 'pointer', overflow: 'hidden' }}
        >
          {data.text}
        </InputLabel>
      )
    );
};
export default UserSummaryQuestionCard;
