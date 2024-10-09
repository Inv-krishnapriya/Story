import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../stores/rootReducer';

export const surveyReducerSelector = (state: RootState) => state.survey;
// const surveyReducerIdDataSelector = (state: RootState) =>
//   state.survey?.editUpdatedDate;
export const hasOnlyViewSelector = createSelector(
  surveyReducerSelector,
  (state) => state.hasOnlyView
);
export const getSurveyByIdSelector = createSelector(
  surveyReducerSelector,
  (state) => state.surveyByIdData || {}
);
export const editSurveyInitialData = createSelector(
  surveyReducerSelector,
  (state) => {
    const surveyData = state?.surveyByIdData || {};

    const surveyInitial = {
      defaultLanguage: surveyData?.defaultLanguage || '',
      order: surveyData?.order || '',
      requiredLanguage: surveyData?.requiredLanguage || [],
      titleAndDescription: surveyData.titleAndDescription || [],
      question: surveyData?.question,
      createdAt: surveyData?.createdAt || null,
      surveyStatus: surveyData?.surveyStatus || 0,
      updatedAt: surveyData?.updatedAt || 0,
      id: surveyData?.id || '',
    };
    return surveyInitial || {};
  }
);

export const addSurveyInitialData = createSelector(
  surveyReducerSelector,
  (state) => {
    const surveyInitial = {
      id: state?.surveyByIdData?.id || '',
      question: state?.surveyByIdData?.question || [],
      surveyStatus: state?.surveyByIdData?.surveyStatus || 1,
      order: state?.surveyByIdData?.order || '',
      updatedAt: state?.surveyByIdData?.updatedAt || 0,
    };
    return surveyInitial || {};
  }
);

export const enableOnChangeSelector = createSelector(
  surveyReducerSelector,
  (state) => state.enableOnChange
);

export const getUserResponce = createSelector(
  surveyReducerSelector,
  (state) => state.userResponseByIdData
);
export const surveyResponseUserLIstSelector = createSelector(
  surveyReducerSelector,
  (state) => state.responseUsersList
);

export const surveyDataSelector = createSelector(
  surveyReducerSelector,
  (state) => {    
    const surveyData = {
      order: state?.surveyData?.order || '',
      question: state?.surveyData?.question || [],
    };
    return surveyData || {};
  }
);
