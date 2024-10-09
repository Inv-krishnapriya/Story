import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const uiReducerSelector = (state: RootState) => state.ui;

export const checkIfLoading = (...actionsToCheck: any) =>
  createSelector(uiReducerSelector, (state: any) => {
    const prefixKeys = actionsToCheck?.map((actionType: string) => {
      const matches = /(.*)(Request|Success|Error|Fetch)/.exec(actionType);
      if (!matches) {
        return actionType;
      }
      return matches[1];
    });
    return prefixKeys?.some((key: string) => !!state[key]);
  });
