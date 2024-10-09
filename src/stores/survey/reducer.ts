import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

interface IInitialState {
  hasOnlyView: boolean;
  surveyByIdData: any;
  userResponseByIdData: any;
  enableOnChange: boolean;
  responseUsersList: any[];
  surveyData: any;
}

const initialState: IInitialState = {
  hasOnlyView: false,
  surveyByIdData: {},
  userResponseByIdData: {},
  enableOnChange: true,
  responseUsersList: [],
  surveyData: null,
};

const reducerSlice = createSlice({
  name: 'SurveyCreator',
  initialState,
  reducers: {
    setSurveyRequest: (state, action) => {},
    setSurveySuccess: (state, action) => {},
    setSurveyError: (state, action) => {},

    setQuestionOptionRequest: (state, action) => {},
    setQuestionOptionSuccess: (state, action) => {},
    setQuestionOptionError: (state, action) => {},

    setQuestionOptionSubRequest: (state, action) => {},
    setQuestionOptionSubSuccess: (state, action) => {},
    setQuestionOptionSubError: (state, action) => {},

    setSurveyData: (state, action) => {
      console.log(action.payload);
      state.surveyData = action.payload;
    },

    removeSurveyData: (state) => {
      state.surveyData = initialState.surveyData;
    },

    setQuestionMultiOptionRequest: (state, action) => {},
    setQuestionMultiOptionSuccess: (state, action) => {},
    setQuestionMultiOptionError: (state, action) => {},

    setHasOnlyViewStatus: (state, action) => {
      state.hasOnlyView = action.payload;
    },
    getSurveyByIdDataFetch: (state, action) => {},
    getSurveyByIdDataSuccess: (state, action) => {
      state.surveyByIdData = action.payload;
    },
    getSurveyByIdDataError: (state, action) => {},
    resetSurveyByIdData: (state) => {
      state.surveyByIdData = {};
    },
    multiQuestionRequest: (state, action) => {},
    multiQuestionSuccess: (state, action) => {},
    multiQuestionError: (state, action) => {},
    updateSurveyRequest: (state, action) => {},
    updateSurveySuccess: (state, action) => {},
    updateSurveyError: (state, action) => {},
    updateSurveyOnChange: (state, action) => {},

    updateSurveyOnStartRequest: (state, action) => {},
    updateSurveyOnStartSuccess: (state, action) => {},
    updateSurveyOnStartError: (state, action) => {},

    updateSurveyOnMultOptionRequest: (state, action) => {},
    updateSurveyOnMultOptionSuccess: (state, action) => {},
    updateSurveyOnMultOptionError: (state, action) => {},
    updateSurveyOnMultOptionOnChange: (state, action) => {},
    setOnChangeStatus: (state, action) => {
      state.enableOnChange = action.payload;
    },

    getSurveyResponseByUserIdDataFetch: (state, action) => {},
    getSurveyResponseByUserIdSuccess: (state, action) => {
      state.userResponseByIdData = action.payload;
    },
    getSurveyResponseByUserIdDataError: (state, action) => {},
    getSurveyResponseUserListDataFetch: (state, action) => {},
    getSurveyResponseUserListDataSuccess: (state, action) => {
      const { response, respondentId } = action.payload;
      if (Array.isArray(response)) {
        if (respondentId) {
          state.responseUsersList = [...state.responseUsersList, ...response];
        } else {
          state.responseUsersList = [...response];
        }
      }
    },
    getSurveyResponseUserListDataError: (state, action) => {},
  },
});

const { actions, reducer } = reducerSlice;
export { actions };
export default reducer;
