import { createSlice } from '@reduxjs/toolkit';

interface IDates {
  start: string;
  end: string;
}

interface IinterviewDates {
  interviewDates: IDates;
}

const initialState: IinterviewDates = {
  interviewDates: {
    start: '',
    end: '',
  },
};

const interviewSlice = createSlice({
  name: 'interviewdates',
  initialState,
  reducers: {
    addDate: (state, action) => {
      console.log(action.payload);
      state.interviewDates = action.payload;
    },
    resetDateState: () => {
      return initialState;
    },
  },
});

export const { addDate, resetDateState } = interviewSlice.actions;
export default interviewSlice.reducer;
