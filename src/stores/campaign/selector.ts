import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const campaignSelector = (state: RootState) => state.campaign;

export const campaignListSelector = createSelector(
  campaignSelector,
  (state) => state.campaignList
);
