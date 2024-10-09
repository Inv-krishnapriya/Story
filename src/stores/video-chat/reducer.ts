import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const reducerSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    videoChatLoginRequest: (action, payload) => {},
    videoChatLoginSuccess: (action, payload) => {},
    videoChatLoginError: (action, payload) => {},
  },
});

const { actions, reducer } = reducerSlice;
export { actions };
export default reducer;
