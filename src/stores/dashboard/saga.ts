import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getClientInfoRequest,
  setAgreementAccept,
  updateCampaigns,
  updateTickets,
} from "../global/reducer";
import { Api } from "@/api/interceptor";
import { ApiConstants } from "@/api/ApiConstants";
import { PayloadAction } from "@reduxjs/toolkit";
import { Router } from "next/router";
import {
  acceptPolicyRequest,
  acceptPolicySuccess,
} from "@/stores/dashboard/reducer";

function* getClientInfoSaga(action: PayloadAction) {
  try {
    const response: {
      data: {
        tickets: any;
        campaigns: any;
      };
    } = yield call(Api, ApiConstants.GET_CLIENT_TICKETS, null, "GET");
    yield put(updateTickets(response.data?.tickets));
    yield put(updateCampaigns(response?.data?.campaigns));
  } catch (error: any) {}
}

export function* acceptPolicySaga(
  action: PayloadAction<{
    request: {
      terms: boolean;
      communication: boolean;
    };
    router: Router;
  }>
) {
  try {
    const {
      request: { terms, communication },
      router,
    } = action.payload;

    const requestBody = {
      isUserServiceAgreementAccepted: terms,
      isUserConfidentialityAgreementAccepted: communication,
    };
    yield call(Api, ApiConstants.AcceptPolicy, requestBody, "POST");
    yield put(setAgreementAccept({ terms, communication }));
  } catch (error: any) {
    console.log("Error submitting agreement", error);
  } finally {
    yield put(acceptPolicySuccess());
  }
}

export default function* dashBoardSaga() {
  yield takeEvery(getClientInfoRequest.type, getClientInfoSaga);
  yield takeLatest(acceptPolicyRequest.type, acceptPolicySaga);
}
