import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./survey/dashboard/reducer";
import uiReducer from "./ui/reducer";
import surveyReducer from "@/stores/survey/reducer";
import globalReducer from "./global/reducer";
import errorReducer from "@/stores/common/reducer";
import scheduleReducer from "@/stores/interview/reducer";
import InterviewReducer from "@/stores/interview/datereducer";
import DashboardReducer from "@/stores/dashboard/reducer";
import DataReducer from "@/stores/data/reducer";
import campaignReducer from "@/stores/campaign/reducer";
import ChatReducer from "@/stores/chat/reducer";
import videoChatReducer from "@/stores/video-chat/reducer";
import videoCallReducer from "@/stores/videocall/reducer";
import inquiryReducer from "@/stores/inquiry/reducer";

const rootReducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
  ui: uiReducer,
  survey: surveyReducer,
  error: errorReducer,
  schedule: scheduleReducer,
  interviewdates: InterviewReducer,
  dashboard: DashboardReducer,
  data: DataReducer,
  campaign: campaignReducer,
  chat: ChatReducer,
  videoChat: videoChatReducer,
  videocall: videoCallReducer,
  inquiry: inquiryReducer,
});

type RootReducerType = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
