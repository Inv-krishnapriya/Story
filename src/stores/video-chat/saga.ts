import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions as videoActions } from "./reducer";

import { ISuccessResponseData } from "../../utils/global.interface";
import { Api } from "@/api/interceptor";
import { ApiConstants } from "@/api/ApiConstants";

import { addClientData, setTemporaryChannelInfo } from "../global/reducer";
import { errorToast } from "@/design-system";

function* videoChatLoginSaga(
  action: PayloadAction<{
    request: any;
    onSuccess: () => void;
    setFormError: (value: string) => void;
    reset: () => void;
  }>
) {
  try {
    const { request, onSuccess } = action.payload;

    const response: ISuccessResponseData = yield call(
      Api,
      ApiConstants.VideoChatLogin,
      request,
      "POST"
    );
    console.log("response", response.data);

    yield put(videoActions.videoChatLoginSuccess({}));
    let authTokens = JSON.stringify({
      accessToken: response?.data?.accessToken,
      refreshToken: "",
      userId: "",
    });
    yield put(addClientData(authTokens));

    let data = {
      appId: response.data.agoraAppId,
      channelName: response.data.agoraChannelId,
      token: response.data.token,
      uid: response?.data?.agoraUserId,
      startTime: response?.data?.startTime,
      endTime: response?.data?.endTime,
      meetingId: response?.data?.meetingId,
      participantId: response?.data?.participantId,
      campaignId: undefined,
      meetingName: response?.data?.meetingName,
    };

    yield put(setTemporaryChannelInfo(data));
    if (onSuccess) {
      onSuccess();
    }
  } catch (error: any) {
    const { errorCode, message } = error?.response?.data;
    const errorKey = Object.keys(errorCode)[0];
    const errorMessage = message[errorKey];
    console.log(error, "errorMessages");
    if (action.payload.setFormError) {
      action.payload.setFormError(errorMessage);
      action.payload?.reset();
    }
    yield put(videoActions.videoChatLoginError({}));
  }
}

export default function* videoChatSaga() {
  yield takeLatest(videoActions.videoChatLoginRequest.type, videoChatLoginSaga);
}
