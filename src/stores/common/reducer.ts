import { createSlice } from "@reduxjs/toolkit";

export interface IErrorReducer {
  errors: any;
}

const initialState: IErrorReducer = {
  errors: {},
};

export const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorAction: (state, action) => {
      state.errors = action.payload;
    },

    resetErrors: (state) => {
      state.errors = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setErrorAction, resetErrors } = slice.actions;
export default slice.reducer;
