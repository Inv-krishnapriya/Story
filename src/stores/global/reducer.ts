import { createSlice } from "@reduxjs/toolkit";
import { GlobalReducer } from "./interface";

const initialState: GlobalReducer = {
  language: "en",
  languageId: 1,
  tickets: {
    availableTickets: 0,
    lockedTickets: 0,
    unlockedTickets: 0,
  },
  campaigns: {
    draftedCampaign: 0,
    publishedCampaign: 0,
  },
  consumed: 0,
  clientData: {
    accessToken: "",
    refreshToken: "",
    userId: "",
    isUserServiceAgreementAccepted: false,
    isUserConfidentialityAgreementAccepted: false,
    isSsoLogin: false,
  },
  campaignAddData: {},
  isChatActive: false,
  temporaryChannelInfo: {
    appId: "",
    channelName: "",
    token: "",
    uid: "",
    startTime: "",
    endTime: "",
    meetingId: "",
    participantId: "",
    campaignId: "",
    meetingName: "",
  },
  fcmToken: "",
  campaignCreationMode: true,
};

export const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetGlobalState: () => initialState,
    setLanguageAction: (state, action) => {
      state.language = action.payload?.code;
      state.languageId = action.payload?.id;
    },
    updateTickets: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        tickets: {
          availableTickets: action.payload.availableTickets,
          lockedTickets: action.payload.lockedTickets,
          unlockedTickets: action.payload.unlockedTickets,
        },
      };
    },
    updateCampaigns: (state, action) => {
      return {
        ...state,
        campaigns: {
          draftedCampaign: action.payload.draftedCampaign,
          publishedCampaign: action.payload.publishedCampaign,
        },
      };
    },
    updateConsumedTickets: (state, action) => {
      state.consumed = action.payload;
    },
    addClientData: (state, action) => {
      const data = JSON.parse(action?.payload);
      state.clientData.accessToken = data.accessToken;
      state.clientData.refreshToken = data.refreshToken;
      state.clientData.userId = data.userId;
      state.clientData.isUserServiceAgreementAccepted =
        data.isUserServiceAgreementAccepted;
      state.clientData.isUserConfidentialityAgreementAccepted =
        data.isUserConfidentialityAgreementAccepted;
      state.clientData.isSsoLogin = data.isSsoLogin;
    },
    getClientInfoRequest: () => {},
    updateCampaignAddData: (state, action) => {
      state.campaignAddData = action.payload;
    },
    updatePreviewModeValue: (state, action) => {
      state.isInPreviewMode = action.payload;
    },
    setChatActive: (state, action) => {
      state.isChatActive = action.payload;
    },
    setTemporaryChannelInfo: (state, action) => {
      console.log("Temporary channel info: ", action.payload);

      state.temporaryChannelInfo = action.payload;
    },
    resetClientData: (state) => {
      state.clientData = initialState.clientData;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setAgreementAccept: (state, action) => {
      state.clientData.isUserServiceAgreementAccepted = action.payload.terms;
      state.clientData.isUserConfidentialityAgreementAccepted =
        action.payload.communication;
    },
    setCreateQuestionMode: (state, action) => {
      console.log(action.payload, "666666666666");

      state.campaignCreationMode = action.payload;
    },
    logoutRequest: (state, action) => {},
    logoutSuccess: () => {},
  },
});

export const {
  resetGlobalState,
  updateTickets,
  updateConsumedTickets,
  updateCampaigns,
  addClientData,
  getClientInfoRequest,
  updateCampaignAddData,
  updatePreviewModeValue,
  setChatActive,
  setTemporaryChannelInfo,
  resetClientData,
  setFcmToken,
  setAgreementAccept,
  setCreateQuestionMode,
  logoutRequest,
  logoutSuccess,
} = slice.actions;
export default slice.reducer;
