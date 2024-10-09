import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";

import { Api } from "@/api/interceptor";
import { ApiConstants } from "@/api/ApiConstants";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions as campaignActions } from "./reducer";
import { ISuccessResponse } from "@/utils/global.type";

function* getCampaignListSaga(action: PayloadAction<{ query: object }>) {
  try {
    const { query } = action.payload;
    const response: ISuccessResponse = yield call(
      Api,
      ApiConstants.GET_CAMPAIGN,
      null,
      "GET",
      query
    );
    yield put(campaignActions.getCampaignListSuccess(response));
  } catch (error: any) {
    yield put(campaignActions.getCampaignListError());
  }
}

export default function* campaignSaga() {
  yield takeEvery(
    campaignActions.getCampaignListRequest.type,
    getCampaignListSaga
  );
}
