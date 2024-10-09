import { Box, Checkbox, Radio, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Renders either a FormGroup with FormControlLabel components or a TextField based on the provided option, languageId, and type
const USummaryQuOptionCard = ({ option, languageId, type }: any) => {
  const { t } = useTranslation();
  let optionData = option?.value || [];
  if (type === 3 && typeof option?.value === 'string') {
    try {
      optionData = JSON.parse(optionData.replace(/'/g, '"'));
    } catch (error) {
      optionData = [];
    }
  } else if (type === 3 && !option?.value) {
    optionData.push({ fa1: '' });
  }
  return type !== 3 ? ( // Conditionally render FormGroup and FormControlLabel components
    <>
      {option?.optionsName?.map((texts: any, index: any) => {
        return (
          texts?.languageId === languageId &&
          option?.value == '1' && ( // Conditionally render FormControlLabel based on languageId
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {type === 1 ? (
                <Checkbox disabled checked /> // Render disabled Checkbox with defaultChecked
              ) : (
                <Radio disabled checked />
              )}
              {texts.text}
            </Box>
          )
        );
      })}
    </>
  ) : (
    <>
      {optionData?.map((data: any, index: number) => {
        return (
          <TextField
            key={index} // Render TextField if type is 3
            multiline
            value={data.fa1 ? data.fa1 : t('USummaryQuOptionCard.NotAnswered')}
            fullWidth
            disabled
          />
        );
      })}
    </>
  );
};

export default USummaryQuOptionCard;
