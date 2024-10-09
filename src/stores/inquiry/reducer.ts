import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const reducerSlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    submitInquiryRequest: (state, action) => {},
    submitInquirySuccess: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = reducerSlice;
export { actions };
export default reducer;
