import { Checkbox, Radio } from '@mui/material';
import React from 'react';

interface dataForm {
  value: string;
  optionType: number;
}

// Renders a Checkbox or Radio component based on the provided value and optionType
const USummaryQueOptTypeCard = ({ value, optionType }: dataForm) => {
  return (
    // Ternary operator to conditionally render Checkbox or Radio
    value === '0' ? (
      optionType === 1 ? (
        <Checkbox disabled /> // Render disabled Checkbox
      ) : (
        <Radio disabled />
      ) // Render disabled Radio
    ) : optionType === 1 ? (
      <Checkbox disabled checked /> // Render disabled Checkbox with defaultChecked
    ) : (
      <Radio disabled checked />
    ) // Render disabled Radio with defaultChecked
  );
};

export default USummaryQueOptTypeCard;
