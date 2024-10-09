export const BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL || "/";
const SURVEY_REPLY_URL = process.env.REACT_APP_SURVEY_REPLY_URL || "/";
export const MUI_PRO_LICENSE_KEY =
  process.env.NEXT_PUBLIC_MUI_PRO_LICENSE_KEY || "/";
export const ENVIRONMENT_TYPE = process.env.NEXT_PUBLIC_NODE_ENV || "";
const surveyService = {
  GET_SURVEY_LIST: "surveys/",
  CREATE_SURVEY: "surveys/",
  Survey_Status: "surveys/status",
  ADD_QUESTION_OPTION: "add-questions/",
  GET_SURVEY_BY_ID: "surveys",
  UPDATE_SURVEY: "surveys/",
  UPDATE_SURVEY_ON_START: "update-start-survey/",
  GET_RESPONSE_BY_USER_ID: "surveys/user",
  GET_RESPONSE_USERS_LIST: "users",
  GET_CLIENT_TICKETS: "customers/tickets/clients",
  GET_CAMPAIGN: "customers/researches",
};
export const SSO_Redirection_URL =
  process.env.NEXT_PUBLIC_SSO_REDIRECTION_URL ?? "/";

const CustomerService = {
  AcceptPolicy: "/customers/policy-agreement",
  Logout: "customers/logout",
};

const VideoChat = {
  VideoChatLogin: "customers/video-chat/login",
};

const CommunicationService = {
  Inquiry: "/customers/communications/client-inquiry",
};

export const ApiConstants = {
  BASE_URL: BASE_URL,
  SURVEY_REPLY_URL: SURVEY_REPLY_URL,
  ...surveyService,
  ...VideoChat,
  ...CommunicationService,
  ...CustomerService,
};
