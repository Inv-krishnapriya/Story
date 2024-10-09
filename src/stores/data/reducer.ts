import { TCampaignRequest } from "@/common/types";

import { createSlice } from "@reduxjs/toolkit";

interface Idata {
  totalAmount: number;

  Campaign: TCampaignRequest;

  campaignId: string;

  campaignDetails: any;
  campaignDetailsPagination:any
}

const initialState: Idata = {
  totalAmount: 0,

  Campaign: {},

  campaignId: "",

  campaignDetails: {},
  campaignDetailsPagination:{}
};

const dataSlice = createSlice({
  name: "data",

  initialState,

  reducers: {
    resetDataState: () => initialState,

    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    updateCampaign: (state, action) => {
      console.log(action.payload);

      state.Campaign = action.payload;
    },

    updateCampaignId: (state, action) => {
      state.campaignId = action.payload;
    },

    resetCampaignId: (state) => {
      state.campaignId = initialState.campaignId;
    },

    setCampaignDetails: (state, action) => {
      state.campaignDetails = action.payload;
    },

    setCampaignDetailsPageination: (state, action) => {
      state.campaignDetailsPagination = action.payload;
    },
  },
});

export const {
  resetDataState,

  updateTotalAmount,

  updateCampaign,

  updateCampaignId,

  resetCampaignId,

  setCampaignDetails,
  setCampaignDetailsPageination
} = dataSlice.actions;

export default dataSlice.reducer;
