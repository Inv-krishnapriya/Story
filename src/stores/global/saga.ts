import { ApiConstants, SSO_Redirection_URL } from "@/api/ApiConstants";
import { Api } from "@/api/interceptor";
import firebaseApp from "@/utils/firebase";
import { PayloadAction } from "@reduxjs/toolkit";
import { getMessaging } from "firebase/messaging";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { customerFcmTokenSelector } from "./selector";
import { logoutRequest, logoutSuccess } from "./reducer";
import { RootState } from "../rootReducer";
import store from "@/stores";

function* logoutSaga(action: PayloadAction<{ router: any }>) {
  const { router } = action.payload;
  const storeState: any = store.getState();
  const rootState: RootState = storeState;
  const clientData = rootState.global.clientData;

  try {
    const messaging = getMessaging(firebaseApp);
    const firebaseToken: string = yield select(customerFcmTokenSelector);
    let params = {};
    if (firebaseToken) {
      console.log({ firebaseToken });
      params = { fireBaseToken: firebaseToken };
    }

    yield call(Api, ApiConstants.Logout, null, "GET", params);
  } catch (error) {
    console.log("Error logging out", error);
  } finally {
    yield put({ type: "SIGN_OUT" });
    yield put(logoutSuccess());
    if (clientData?.isSsoLogin) {
      router.push(SSO_Redirection_URL);
    } else {
      router.push("/auth/login");
    }
  }
}

export default function* globalSaga() {
  yield takeLatest(logoutRequest.type, logoutSaga);
}
