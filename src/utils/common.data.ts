//Data order
const DataOrder = [
  { id: 1, name: "Ascending" },
  { id: 2, name: "Descending" },
  { id: 3, name: "Random" },
];

const QuestionType = [
  { id: 0, name: "Select" },
  { id: 1, name: "MultipleChoice" },
  { id: 2, name: "SingleChoice" },
  { id: 3, name: "LongText" },
];

const QuestionTypes = {
  Multiple: 1,
  Single: 2,
  FreeText: 3,
};
const QuestionOptionTypes = {
  NORMAL: 1,
  EXCLUSIVE: 2,
  OTHER_OPTION: 3,
};

const SurveyStatusDraft = 1;
const SurveyStatusInReview = 2;
const SurveyStatusReady = 3;
const SurveyStatusPublished = 4;
const SurveyStatusStopped = 5;
const SurveyStatusDeleted = 6;

const LANGUAGES = [
  { id: 1, name: "English", code: "en" },
  { id: 2, name: "Japanese", code: "ja" },
];

const ChatMessageType = {
  Message: 2,
  Image: 3,
  File: 4,
};

const WebsocketType = {
  Message: "chat_message",
  UpdateMessage: "update_message",
};

const MessageType = {
  SystemMessage: 1,
  ChatMessage: 2,
};

const UserType = {
  Monitor: 1,
  Client: 0,
};

const MessageStatus = {
  UnRead: 1,
  Read: 2,
  NgMessage: 3,
};

const InterviewRoomUserType = {
  INTERVIEWER: 0,
  BACKROOM: 1,
};

const JoiningStatus = {
  FirstTime: 0,
  Rejoin: 1,
};

const VideoCallUserType = {
  INTERVIEWER: "0",
  MONITOR: "1",
  BACKROOM_MEMBER: "2",
  SCREEN_SHARE_USER: "3",
};

const ScreenShareStatusType = {
  STARTED: "0",
  STOPPED: "1",
  CONFIRMED: "2",
};
const ExcludedImagesTypes = [".svg", ".tif", ".tiff"];

const gender = {
  MALE: "1",
  FEMALE: "2",
};

const NotificationType = {
  CLIENT_SLOT_BULK_OFFER : 0,
  MONITOR_NOT_GOOD_OPTION : 1,
  CLIENT_SLOT_ADDITIONAL_OFFER : 2,
  SCHEDULE_CONFIRMATION : 3,
  CLIENT_SLOT_CANCELLED : 4,                                                                                  
  CLIENT_SEND_OFF : 5,
  CLIENT_CHAT : 6,
  MONITOR_CHAT : 7,
  MONITOR_CANCELLATION : 8 ,                                                   
  MONITOR_CONFIRMATION : 9,
  MONITOR_APPLY : 10,
};

const ConsumedTimeSlotStatus = {
  SCHEDULING: 0,
  SCHEDULE_CONFIRMED: 1,
  CANCELLED: 2,
  CAMPAIGN_CLOSED: 3,
  NOT_INTERESTED: 4,
  CANCELLED_SLOT_OPEN: 5,
  CANCELLED_SLOT_BLOCK: 6,
  IMPLEMENTED: 7,
  INTERVIEWER_CANCELLED: 8,
};

const ScheduleSlotOfferType = {
  NORMAL: 0,
  ADDITIONAL_OFFER: 1,
};
const CategoryTypes = {
  SYSTEM_MESSAGE: 1,
  NORMAL: 2,
}
const InterviewSortfeild={
  DRAFT : 0,
  PUBLISHED : 1,
  RECRUTING : 2,
  RECRUTING_CLOSED : 3,
  COMPLETED : 4,
  CAMPAIGN_CLOSED : 5,
}

const InterviewStatus={
  DRAFT : 0,
  PUBLISHED : 1,
  RECRUTING : 2,
  RECRUTING_CLOSED : 3,
  COMPLETED : 4,
  CAMPAIGN_CLOSED : 5,
}
const InterviewStatusdata: { label: string; value: number }[]=[
  {
    label: '下書き',
    value: InterviewStatus.DRAFT
  },
  {
    label: '公開する',
    value: InterviewStatus.PUBLISHED,
  },
  {
    label: '募集中',
    value: InterviewStatus.RECRUTING,
  },
  {
    label: '募集を終了',
    value: InterviewStatus.RECRUTING_CLOSED,
  },
  
]

const InterviewSortdata: { label: string; value: string }[]=[
  {
    label: 'Relase Date',
    value: "published_at"
  },

]




export {
  DataOrder,
  QuestionType,
  SurveyStatusDraft,
  SurveyStatusInReview,
  SurveyStatusPublished,
  SurveyStatusStopped,
  SurveyStatusDeleted,
  SurveyStatusReady,
  LANGUAGES,
  ChatMessageType,
  MessageType,
  WebsocketType,
  QuestionTypes,
  UserType,
  MessageStatus,
  InterviewRoomUserType,
  JoiningStatus,
  VideoCallUserType,
  ScreenShareStatusType,
  ExcludedImagesTypes,
  QuestionOptionTypes,
  gender,
  NotificationType,
  ConsumedTimeSlotStatus,
  ScheduleSlotOfferType,
  CategoryTypes,
  InterviewStatusdata,
  InterviewSortdata
};
