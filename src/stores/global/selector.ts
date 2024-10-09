import { createSelector } from "@reduxjs/toolkit";
import { GlobalReducer } from "./interface";
import { RootState } from "../rootReducer";

export const globalSelector = (state: RootState) => state.global;

export const languageSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state.language || "";
  }
);

export const languageIdSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state.languageId;
  }
);

export const userActiveStatusSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    const {
      refreshToken,
      isUserConfidentialityAgreementAccepted,
      isUserServiceAgreementAccepted,
    } = state.clientData;
    const hasAgreedPolicies =
      isUserConfidentialityAgreementAccepted && isUserServiceAgreementAccepted;
    const isActive = Boolean(refreshToken);
    return hasAgreedPolicies && isActive;
  }
);
export const ticketInfoSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state?.tickets;
  }
);
export const isInPreviewModeSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state?.isInPreviewMode;
  }
);

export const accessTokenSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state?.clientData.accessToken;
  }
);

export const customerFcmTokenSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => {
    return state?.fcmToken;
  }
);

export const hasUserAgreedPoliciesSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) =>
    state.clientData.isUserServiceAgreementAccepted &&
    state.clientData.isUserConfidentialityAgreementAccepted
);

export const hasBasicAccessSelector = createSelector(
  globalSelector,
  (state: GlobalReducer) => Boolean(state.clientData.refreshToken)
);
