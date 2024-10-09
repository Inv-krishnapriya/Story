import { current } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/interceptor";
import {
  AuthenticationCredentials,
  AuthenticationResponse,
  GetNotificataionParam,
  IRemoteProfile,
  TicketsTypesResponse,
} from "./types";

const authenticateUser = (data: AuthenticationCredentials) => {
  return axiosPrivate.post<AuthenticationResponse>("customers/login", data);
};

const interviewInvitation = (data: AuthenticationCredentials) => {
  return axiosPrivate.post<AuthenticationResponse>("customers/login", data);
};

const logout = (params: any) => {
  return axiosPrivate.get<string>("customers/logout", { params: params });
};

const getUserProfile = () => {
  return axiosPrivate.get<string>("customers/profile");
};

const getTicketTypes = () => {
  return axiosPrivate.get<TicketsTypesResponse>("customers/tickets/types");
};

const purchaseTickets = (data: any) => {
  return axiosPrivate.post("customers/tickets", data);
};

const getIndustries = () => {
  return axiosPrivate.get<any>("customers/industries");
};

const getPrefectures = () => {
  return axiosPrivate.get<any>("customers/prefectures");
};

const getProfession = () => {
  return axiosPrivate.get<any>("customers/occupations");
};

const getUserDetails = () => {
  return axiosPrivate.get<any>("customers/tickets/clients");
};

const createCampaign = (data: any, headers: any) => {
  return axiosPrivate.post<any>("customers/researches", data, {
    headers: headers,
  });
};

const getInterviewDuration = () => {
  return axiosPrivate.get<any>("customers/researches/interview-durations");
};

const getCampaignStatus = (campaignId: string) => {
  return axiosPrivate.get<any>(`customers/researches/status/${campaignId}`);
};

const getCampaigns = (page: number, searchQuery?: string, sortType?:string) => {
  const searchParam = searchQuery ? `&search=${searchQuery}` : "";
  const sortFeild = sortType ? `&sortFeild=-${sortType}` : "";
  return axiosPrivate.get<any>(`customers/researches?page=${page}${searchParam}${sortFeild}`);
};

const getCampaignDetail = (campaignId: string) => {
  return axiosPrivate.get<any>(`customers/researches/${campaignId}`);
};

const updateCampaignDetail = (campaignId: string, data: any) => {
  return axiosPrivate.put<any>(`customers/researches/${campaignId}`, data);
};

const getPublishedCampaignDetails = (id: string | string[]) => {
  return axiosPrivate.get<any>(`customers/researches/${id}/monitors`);
};

const updateRecruitementStatus = (data: any) => {
  return axiosPrivate.put<any>(`customers/researches/close`, data);
};

const updateInterviewStatus = (data: any) => {
  return axiosPrivate.put<any>(`customers/researches/end`, data);
};

const updateMemo = (campaignId: string, data: any) => {
  return axiosPrivate.put<any>(`customers/researches/${campaignId}/memo`, data);
};

const sendOff = (campaignId: string, data: any) => {
  return axiosPrivate.put<any>(
    `customers/researches/${campaignId}/sendoff`,
    data
  );
};

const getReturnTicket = (campaignId: string) => {
  return axiosPrivate.get<any>(`customers/researches/${campaignId}/end/ticket`);
};

const updateBulkOffer = (campaignId: string, data: any) => {
  return axiosPrivate.post<any>(
    `customers/researches/${campaignId}/bulk-offer`,
    data
  );
};

const getFilterData = (campaignId: string, data: any) => {
  console.log('campaignId',campaignId);
  console.log('data',data);
  
  return axiosPrivate.get(`customers/researches/${campaignId}/monitors`, {
    params: data,
  });
};

const addIndividualOffer = (campaignId: string, data: any) => {
  return axiosPrivate.post(
    `customers/researches/${campaignId}/add-offer`,
    data
  );
};

const getMonitorOffers = (campaignId: string, monitorId: string) => {
  return axiosPrivate.get<any>(
    `customers/researches/${campaignId}/${monitorId}/scheduled-timeslot`
  );
};

const updateMonitorCancellation = (
  campaignId: string,
  monitorId: string,
  data: any
) => {
  return axiosPrivate.post<any>(
    `customers/researches/${campaignId}/${monitorId}/update-timeslot`,
    data
  );
};

const cancellationByClient = (
  campaignId: string,
  monitorId: string,
  data: any
) => {
  return axiosPrivate.post<any>(
    `customers/researches/${campaignId}/${monitorId}/cancel-timeslot`,
    data
  );
};

const uploadFile = (campaignId: string, formData: any, config: any) => {
  return axiosPrivate.post<any>(
    `customers/${campaignId}/file-upload`,
    formData,
    config
  );
};

const getChatHistory = (roomId: string, query: any) => {
  return axiosPrivate.get<any>(`customers/${roomId}/chat-history`, {
    params: query,
  });
};

const enterWaitingLobby = (meetingId: string) => {
  return axiosPrivate.get<any>(`customers/video-chat/${meetingId}`);
};

const joinInterviewRoom = (meetingId: string, data: any) => {
  return axiosPrivate.post<any>(`customers/video-chat/${meetingId}/join`, data);
};

const leaveInterviewRoom = (meetingId: string) => {
  return axiosPrivate.post<any>(`customers/video-chat/${meetingId}/leave`);
};

const getRemoteUserProfile = (
  meetingId: string,
  data: { agoraUserIds: string[] }
) => {
  return axiosPrivate.post<any>(
    `customers/video-chat/${meetingId}/profile`,
    data
  );
};

const updateUserConfirmation = (meetingId: string) => {
  return axiosPrivate.post<any>(
    `customers/video-chat/${meetingId}/join-confirmation`
  );
};

const sendMessage = (meetingId: string, data: any) => {
  return axiosPrivate.post<any>(`customers/video-chat/${meetingId}/chat`, data);
};

const postInterviewFeedback = (data: any) => {
  return axiosPrivate.post<any>(`customers/communications/feedback`, data);
};

const createScreenshareUser = (meetingId: string, data: any) => {
  return axiosPrivate.post<any>(
    `customers/video-chat/${meetingId}/screen-sharing`,
    data
  );
};

const getAgoraChatHistory = (
  meetingId: string,
  chatType: string,
  timeStamp: string,
  limit: number
) => {
  return axiosPrivate.get<any>(
    `customers/video-chat/${meetingId}/chat-history/${chatType}?timestamp=${timeStamp}&limit=${limit}`
  );
};

const getNotificationList = (params: GetNotificataionParam) => {
  return axiosPrivate.get<any>(`customers/researches/notifications`, {
    params: params,
  });
};

const getNotificationDetails = (id: string) => {
  return axiosPrivate.get<any>(`customers/researches/notifications/${id}`);
};

const getTodaysInterviewList = (pageNo: string) => {
  return axiosPrivate.get<any>(
    `customers/researches/todays/campaigns?page=${pageNo}`
  );
};

const deleteDraftCampaign = (campaignId: string) => {
  return axiosPrivate.delete<any>(`customers/researches/${campaignId}`);
};

const getCancellationStatus = (processingId: string) => {
  return axiosPrivate.get<any>(
    `customers/researches/processing/${processingId}/status?requestValue=cancel`
  );
};

const getDeliveryList = (params: { page: number }) => {
  return axiosPrivate.get<any>(`customers/researches/delivery`, {
    params: params,
  });
};

const getDeliveryDetails = (campaignId: string) => {
  return axiosPrivate.get<any>(`customers/researches/delivery/${campaignId}`);
};
const getMonitorScreeningDetails = (
  campaignId: string,
  params: { screeningId?: string; monitorId?: string }
) => {
  return axiosPrivate.get<any>(
    `customers/researches/delivery/${campaignId}/monitor`,
    { params: params }
  );
};

const downloadVideo = (params: any) => {
  return axiosPrivate.get<any>(`customers/download`, { params: params });
};

const registerFCMToken = (body: any) => {
  return axiosPrivate.post<any>(
    `customers/communications/device-registration-token`,
    body
  );
};
const recordForceStop = (id: any) => {
  return axiosPrivate.get(`customers/video-chat/${id}/recording-force-stop`);
};

const authenticateSSOUser = (data: any) => {
  return axiosPrivate.post(`customers/login-sso`, data);
};

const customerService = {
  authenticateUser,
  logout,
  getUserProfile,
  getPublishedCampaignDetails,
  updateRecruitementStatus,
  updateInterviewStatus,
  updateMemo,
  sendOff,
  getReturnTicket,
  updateBulkOffer,
  getFilterData,
  addIndividualOffer,
  getMonitorOffers,
  updateMonitorCancellation,
  cancellationByClient,
  uploadFile,
  getChatHistory,
  interviewInvitation,
  getNotificationList,
  getTodaysInterviewList,
  getNotificationDetails,
  authenticateSSOUser,
};

const ticketService = {
  getTicketTypes,
  purchaseTickets,
  getUserDetails,
};

const generalServices = {
  getIndustries,
  getPrefectures,
  getProfession,
};

const researchService = {
  createCampaign,
  getInterviewDuration,
  getCampaignStatus,
  getCampaigns,
  getCampaignDetail,
  updateCampaignDetail,
  deleteDraftCampaign,
  getCancellationStatus,
  getDeliveryList,
  getMonitorScreeningDetails,
};

const videoChatService = {
  enterWaitingLobby,
  joinInterviewRoom,
  leaveInterviewRoom,
  getRemoteUserProfile,
  updateUserConfirmation,
  sendMessage,
  postInterviewFeedback,
  getAgoraChatHistory,
  createScreenshareUser,
  getDeliveryDetails,
  downloadVideo,
  recordForceStop,
};

const communicationService = {
  registerFCMToken,
};
export {
  customerService,
  ticketService,
  generalServices,
  researchService,
  videoChatService,
  communicationService,
};
