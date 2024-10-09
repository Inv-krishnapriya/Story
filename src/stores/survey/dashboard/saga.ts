import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions as homeActions } from "./reducer";
import { ApiConstants } from "../../../api/ApiConstants";
import { toast } from "react-toastify";
import { SurveyStatusPublished } from "../../../utils/common.data";
import { ISuccessResponse } from "../../../utils/global.interface";
import { Api } from "../../../api/interceptor";

function* getSurveyDataSaga(action: PayloadAction<{ query: object }>) {
  try {
    yield put(homeActions.setHasMoreScroll(false));
    const { query } = action.payload;
    const response: ISuccessResponse = yield call(
      Api,
      ApiConstants.GET_SURVEY_LIST,
      null,
      "GET",
      query
    );
    yield put(
      homeActions.getSurveyDataSuccess({ response: response?.data, query })
    );
    if (response?.data?.length === 0) {
      yield put(homeActions.setHasMoreScroll(false));
    } else {
      yield put(homeActions.setHasMoreScroll(true));
    }
  } catch (error) {
    yield put(homeActions.getSurveyDataError({}));
    yield put(homeActions.setHasMoreScroll(false));
  }
}
function* deleteSurveyDataSaga(
  action: PayloadAction<{
    request: object;
    onSuccess: () => void;
    onSuccessMessage: () => void;
    onFailMessage: () => void;
  }>
) {
  try {
    const { request, onSuccess, onSuccessMessage } = action.payload;
    yield call(Api, ApiConstants.Survey_Status, request, "PUT");
    yield put(homeActions.deleteSurveyDataSuccess({}));
    onSuccess();
    onSuccessMessage();
  } catch (error) {
    // action.payload?.onFailMessage();
    yield put(homeActions.deleteSurveyDataError({}));
  }
}
function* changeSurveyStatusSaga(
  action: PayloadAction<{
    request: {
      surveyId: string;
      surveyStatus: number;
    };
    togglePlay: () => void;
    setSurveyStatus: React.Dispatch<React.SetStateAction<number>>;
    toastSuccessMessage: string;
    toastFailMessage: string;
  }>
) {
  toast.dismiss();
  try {
    const { request, togglePlay, setSurveyStatus, toastSuccessMessage } =
      action.payload;

    yield call(Api, ApiConstants.Survey_Status, request, "PUT");
    setSurveyStatus(request?.surveyStatus);
    if (request?.surveyStatus === SurveyStatusPublished && togglePlay) {
      togglePlay();
    }
    toast.success(toastSuccessMessage);

    yield put(homeActions.changeSurveyStatusSuccess({}));
  } catch {
    yield put(homeActions.changeSurveyStatusError({}));
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.getSurveyDataFetch.type, getSurveyDataSaga);
  yield takeLatest(
    homeActions.deleteSurveyDataRequest.type,
    deleteSurveyDataSaga
  );
  yield takeLatest(
    homeActions.changeSurveyStatusRequest.type,
    changeSurveyStatusSaga
  );
}
