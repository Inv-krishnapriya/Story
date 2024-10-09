import { Api } from "@/api/interceptor";
import { ApiConstants } from "@/api/ApiConstants";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions as inquiryActions } from "./reducer";
import { errorToast, successToast } from "@/design-system";
import { ISuccessResponse } from "@/utils/global.type";
import { getErrorMessage, parseSuccessMessage } from "@/utils";
import i18n from "@/i18n";

function* submitInquirySaga(action: PayloadAction<{ request: object }>) {
  try {
    const { request } = action.payload;
    const response: ISuccessResponse = yield call(
      Api,
      ApiConstants.Inquiry,
      request,
      "POST"
    );
    yield put(inquiryActions.submitInquirySuccess(null));
    successToast(parseSuccessMessage(response.message));
  } catch (error: any) {
    errorToast(
      getErrorMessage(error?.response?.data) ??
        i18n.t("inquiry.submitting-error")
    );
  } finally {
    yield put(inquiryActions.submitInquirySuccess(null));
  }
}

export default function* inquirySaga() {
  yield takeLatest(inquiryActions.submitInquiryRequest.type, submitInquirySaga);
}
