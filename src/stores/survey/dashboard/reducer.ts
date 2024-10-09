import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  surveyList: [],
  hasMoreScroll: true,
  editUpdatedDate: 0,
  addUpdatedDate: 0,
  hasMoreUserScroll: true,
};

const reducerSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getSurveyDataFetch: (state, action) => {},
    getSurveyDataSuccess: (state, action) => {
      const { response, query } = action.payload;
      if (query) {
        state.surveyList = [...state.surveyList, ...response];
      } else {
        state.surveyList = [...response];
      }
    },
    // eslint-disable-next-line no-empty-function
    getSurveyDataError: (state, action) => {},
    setSurveyDataDirect: (state, action) => {
      state.surveyList = action.payload;
    },
    resetSurveyListData: (state, action) => {
      state.surveyList = [];
    },
    setHasMoreScroll: (state, action) => {
      state.hasMoreScroll = action.payload;
    },
    deleteSurveyDataRequest: (state, action) => {},
    deleteSurveyDataSuccess: (state, action) => {},
    deleteSurveyDataError: (state, action) => {},
    changeSurveyStatusRequest: (state, action) => {},
    changeSurveyStatusSuccess: (state, action) => {},
    changeSurveyStatusError: (state, action) => {},
    setEditUpdatedDate: (state, action) => {
      state.editUpdatedDate = action.payload;
    },
    setAddUpdatedDate: (state, action) => {
      state.addUpdatedDate = action.payload;
    },
    setHasMoreUserScroll: (state, action) => {
      state.hasMoreUserScroll = action.payload;
    },
  },
});

const { actions, reducer } = reducerSlice;
export { actions };
export default reducer;
