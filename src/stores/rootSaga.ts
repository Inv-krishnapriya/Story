import { all, fork } from "redux-saga/effects";
import dashBoardSaga from "./dashboard/saga";
import campaignSaga from "./campaign/saga";
import videoChatSaga from "./video-chat/saga";
import inquirySaga from "./inquiry/saga";
import globalSaga from "./global/saga";

export default function* rootSaga() {
  yield all([
    fork(dashBoardSaga),
    fork(campaignSaga),
    fork(videoChatSaga),
    fork(inquirySaga),
    fork(globalSaga),
  ]);
}
