export interface GlobalReducer {
  language: string;
  languageId: number;
  tickets?: {
    availableTickets: number;
    lockedTickets: number;
    unlockedTickets: number;
  };
  campaigns: {
    draftedCampaign: number;
    publishedCampaign: number;
  };
  consumed?: number;
  clientData: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    isUserServiceAgreementAccepted: boolean;
    isUserConfidentialityAgreementAccepted: boolean;
    isSsoLogin: boolean;
  };
  campaignAddData: any;
  isInPreviewMode?: boolean;
  isChatActive: boolean;
  temporaryChannelInfo: {
    appId: string;
    channelName: string;
    token: string;
    uid: string;
    startTime: string;
    endTime: string;
    meetingId: string;
    participantId: string;
    campaignId: string;
    meetingName: string;
  };
  fcmToken: string;
  campaignCreationMode?: boolean;
}
