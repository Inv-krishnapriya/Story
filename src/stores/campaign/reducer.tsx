import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignList: { currentPage: 1, data: [], pageSize: 0, totalPages: 0 },
  filterData: {},
  monitorData: {
    campaignId: "",
    id: "",
    status: 0,
    confirmedStatus: 0,
    monitorDetail: {},
    meetingDetails: {
      url: "",
      id: "",
      passcode: "",
      meetingId: "",
    },
    scheduleConfirmationDetails: {},
    unreadCount: 0,
  },
  isRedirection: false,
  isDrawerOpen: false,
  value: 0,
  isUnreadExist: false,
};
const slice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    getCampaignListRequest: (state, actions) => {},
    getCampaignListSuccess: (state, actions) => {
      state.campaignList = actions.payload;
    },
    getCampaignListError: () => {},
    restCampaignList: (state, actions) => {
      state.campaignList = initialState.campaignList;
    },
    setFilterData: (state, actions) => {
      console.log(actions.payload?.filterData);

      state.filterData = actions.payload?.filterData;
    },
    resetFilterData: (state, action) => {
      console.log("Inside filter data reset", action.payload);
      state.filterData = action.payload;
    },
    setMonitorData: (state, actions) => {
      state.monitorData = actions.payload;
    },
    setIsRedirection: (state, actions) => {
      state.isRedirection = actions.payload;
    },
    setIsDrawerOpen: (state, actions) => {
      state.isDrawerOpen = actions.payload;
    },
    setValue: (state, actions) => {
      state.value = actions.payload;
    },
    setIsUnreadExist: (state, actions) => {
      console.log("action", actions.payload);

      state.isUnreadExist = actions.payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
