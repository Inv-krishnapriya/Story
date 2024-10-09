import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-react";

export type AuthenticationCredentials = {
  username: string;
  password: string;
  isSessionExist?: boolean;
};

export type AuthenticationResponse = {
  errorCode?: string;
  message?: string;
  data?: {
    userDetails: {};
    accessToken: string;
    refreshToken: string;
  };
};

export type TicketsTypesResponse = {
  errorCode?: string;
  message?: string;
  data?: [];
};

export type Ticket = {
  id: string;
  text: string;
  description: string;
  unit_price: number;
  ticket_count: number;
  amount: number;
};

export interface IndustryResponse {
  id: string;
  name: string;
  order: number;
}

export interface IResponse<T> {
  errorCode?: { [key: string]: string } | string;
  message?: { [key: string]: string } | string;
  data?: T;
  serviceHealth?: { [key: string]: boolean };
}

export interface PrefectureResponse {
  id: string;
  name: string;
  order: string;
  prefectures: [
    {
      id: string;
      name: string;
      order: number;
    },
  ];
}

export interface ProfessionResponse {
  id: string;
  name: string;
  order: number;
}

export type TCampaignRequest = {
  status?: any;
  title?: string | null;
  includeCondition?: string | null;
  excludeCondition?: string | null | undefined;
  ngIndustries?: string[];
  monitorsCount?: number | null;
  interviewDurationId?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  timeslot?: any;
  hasScreening?: boolean;
  gender?: number | null;
  ageFrom?: number | null | undefined;
  ageTo?: number | null | undefined;
  prefectures?: string[] | undefined;
  maritalStatus?: number | null;
  hasChildren?: number | null;
  occupations?: string[] | undefined;
  personalIncomeStart?: number | null | undefined;
  personalIncomeEnd?: number | null | undefined;
  householdIncomeStart?: number | null | undefined;
  householdIncomeEnd?: number | null | undefined;
  screening?: TSurveyData;
  timezone?: string;
};

export type TSurveyData = {
  question: [
    {
      questionText: string;
      type: number;
      isRequired: string;
      order: number;
      sequence: number;
      options: [
        {
          optionText: string;
          order: number;
        },
      ];
    },
  ];
  order: number;
};

export interface IAgoraRTCRemoteUser {
  uid: string;
  hasAudio: boolean;
  hasVideo: boolean;
  audioTrack: IRemoteAudioTrack | undefined;
  videoTrack: IRemoteVideoTrack | undefined;
}

export interface IRemoteProfile {
  agoraUserId: string;
  displayName: string;
  role: string;
}

export type TCurrentUserProfile = {
  hasAudio: boolean;
  hasVideo: boolean;
  audio: IMicrophoneAudioTrack | null;
  video: ICameraVideoTrack | null;
  id: string;
  type: string;
  name: string;
};

export type GetNotificataionParam = {
  page: string;
  category?: string;
};
export type GetNotificationList = {
  errorCode?: string;
  message?: string;
  data: [];
  pages: {
    totalPages: number;
  };
};

export type GetNotificationDetails = {
  id: string;
  body: string;
  category: number;
  createdAt: string;
  updatedAt: string;
  interviewId: string;
  notificationType: number;
  readStatus: boolean;
  reciever: string;
  sender: string;
  title: string;
  interviewTitle: string;
};

export type GetTodaysCampaignDetails = {
  endsAt: string;
  id: string;
  monitorId: string;
  nickName: string;
  startsAt: string;
  title: string;
};

export type TChatHistoryType = {
  chatType: string;
  message: string;
  messageId: string;
  messageType: number;
  ng: boolean;
  senderId: string;
  senderName: string;
  senderType: string;
  timestamp: string;
};
