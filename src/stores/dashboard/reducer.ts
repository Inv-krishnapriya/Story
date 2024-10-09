import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardDrawerStatus: true,
};
const dashbaordSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.dashboardDrawerStatus = action.payload;
    },
    closeDrawer: (state, action) => {
      state.dashboardDrawerStatus = action.payload;
    },
    acceptPolicyRequest: (state, action) => {},
    acceptPolicySuccess: () => {},
  },
});

export const {
  openDrawer,
  closeDrawer,
  acceptPolicyRequest,
  acceptPolicySuccess,
} = dashbaordSlice.actions;
export default dashbaordSlice.reducer;
