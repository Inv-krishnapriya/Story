"use client";

import {
  Box,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import BackButton from "@/components/UI/button/BackButton";
import { TonalButton } from "@/components/UI/button/button";
import { H4, H6, H7 } from "@/components/UI/typography/Typography";
import Tabs from "@/components/UI/tabs/tab/Tab";
import {
  ChatSvgIcon,
  DownArrowIcon,
  UpArrowSvgIcon,
  UserSvgIcon,
} from "@/components/UI/icons/Icon";
import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import { useParams } from "next/navigation";
import {
  customerService,
  researchService,
  videoChatService,
} from "@/common/apiUrls";
import moment from "moment";
import NoDataFound from "@/components/Common/NoDataFound";
import ApplicantDetails from "./ApplicantDetails";
import {
  BinderIcon,
  CalendarOutlinedIcon,
  ChevronDownOutlinedIcon,
  ChevronUpOutlinedIcon,
  ClockOutlinedIcon,
  CopyOutlinedIcon,
  DocumentOutlinedIcon,
  MintBadge,
  MintPagination,
  MintTextField,
  PencilIcon,
  PersonOutlinedIcon,
  PointCircleOutlinedIcon,
  SubtractIcon,
  errorToast,
  infoToast,
  successToast,
} from "@/design-system";
import { MintButton, MintTypography } from "@/design-system";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import ProjectDetailModal from "./ProjectDetailModal";
import { useRouter } from "next/navigation";
import DataTable, { IDataTableColumn } from "@/components/tables/DataTable";
import { useTranslation } from "react-i18next";
import { DoorOutlineIcon } from "@/design-system";
import AppliedMonitorDrawer from "./Drawer";
import { setTemporaryChannelInfo } from "@/stores/global/reducer";
import { useDispatch } from "react-redux";
import FeedbackModal from "@/components/Modal/campaign/creation/Details/FeedbackModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { actions } from "@/stores/campaign/reducer";
import { getErrorMessage } from "@/utils";
import { setCampaignDetails as setCampaignDetailsAction, setCampaignDetailsPageination } from "@/stores/data/reducer";
import { setTimeout } from "timers";

export default function CampaignDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const setCampaignDetails = (data: any) =>
    dispatch(setCampaignDetailsAction(data));

  const campaignDetails = useSelector(
    (state: RootState) => state.data.campaignDetails
  );
  const campaignDetailsPagination= useSelector(
    (state: RootState) => state.data.campaignDetailsPagination
  );
  console.log("campaignDetailsPagination", campaignDetailsPagination);

  const monitorData = useSelector(
    (state: RootState) => state.campaign.monitorData
  );
  const isDrawerOpen = useSelector(
    (state: RootState) => state.campaign.isDrawerOpen
  );

  console.log(monitorData, "datas");

  const setMonitorData = (data: IMonitorData) =>
    dispatch(actions.setMonitorData(data));
  const setIsDrawerOpen = (data: boolean) =>
    dispatch(actions.setIsDrawerOpen(data));
  const [collapse, setCollapse] = useState(false);
  const [value, setValue] = useState(0);
  const params = useParams();
  const [recruitementClose, setRecruitementClose] = useState<boolean>(false);
  const [isRecruitementClosed, setIsRecruitementClosed] =
    useState<boolean>(false);
  const [interviewClose, setInterviewClose] = useState<boolean>(false);
  const [isInterviewClosed, setIsInterviewClosed] = useState<boolean>(false);
  const theme = useTheme();
  const [isProjectDetail, setIsProjectDetail] = useState<boolean>(false);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const router = useRouter();
  const disabledStatus = [3, 4, 5];
  const [isFetching, setIsFetching] = useState(true);
  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
    const [filterData, setFilterData] = useState<object>({});
  
  let timer: any;

  useEffect(() => {
    if (params?.id && value === 1) {
      getFilterPublishedCampaignDetails(params?.id);
    } else if (params?.id) {
      getPublishedCampaignDetails(params?.id);
    }
  }, [value]);

  const getPublishedCampaignDetails = async (id: any, filterData?: object,currentPage?:number) => {
    console.log("Campaign get API called");
    setIsFetching(true);
    await customerService
      .getFilterData(id,{ status: 1, ...(filterData ?? {}) ,currentPage})
      
      .then((response: any) => {
        console.log("Response from api: ", response);
        setCampaignDetails(response?.data?.data);
        dispatch(setCampaignDetailsPageination(response?.data?.pages))
        setIsFetching(false);      
      })
      .catch((error) => {
        setIsFetching(false);
        console.log("Error occured: ", error);
        router.push("/app/campaign");
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
      
  };

  const getFilterPublishedCampaignDetails = async (id: any) => {
    console.log("Campaign get API called");
    setIsFetching(true);
    await customerService
      .getFilterData(id, { status: "2" })
      .then((response: any) => {
        console.log("Response from api: ", response);
        setCampaignDetails(response?.data?.data);
        dispatch(setCampaignDetailsPageination(response?.data?.pages))
        setIsFetching(false);
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        router.push("/app/campaign");
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    const updatedData = {
      ...campaignDetails,
      monitors: [],
    };
    setCampaignDetails(updatedData);
    setValue(newValue);
  };
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleRecruitementClose = () => {
    let data = JSON.stringify({
      campaignId: params?.id,
    });
    customerService
      .updateRecruitementStatus(data)
      .then((response) => {
        console.log(response);
        setRecruitementClose(false);
        setIsRecruitementClosed(true);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };
 

  function getCampaignEndStatus(campaignId: string) {
    researchService
      .getCampaignStatus(campaignId)
      .then((response) => {
        console.log("Polling API response: ", response);
        if (response.status === 201) {
          clearInterval(timer);
          // successToast(response?.data?.message);
          setInterviewClose(false);
          setIsInterviewClosed(true);
        }
      })
      .catch((error) => {
        console.log("Campaign creation failed!", error);
        errorToast(getErrorMessage(error?.response?.data));
      });
  }

  const handleInterviewEnd = () => {
    let secondsElapsed = 0;
    const intervalTime = 5000;
    const totalTime = 60000;
    let data = JSON.stringify({
      campaignId: params?.id,
    });
    customerService
      .updateInterviewStatus(data)
      .then((response) => {
        console.log(
          "Response from interview end API : ",
          response?.data?.data?.message
        );
      
        if (response.status !== 201) {
          // infoToast(response?.data?.message);
          apiInterval();
        } else {
          setInterviewClose(false);
          setIsInterviewClosed(true);
        }
        function apiInterval() {
          let campaignId = params?.id;
          getCampaignEndStatus(campaignId.toString());
          secondsElapsed += intervalTime;
          if (secondsElapsed < totalTime) {
            timer = setTimeout(apiInterval, intervalTime);
          } else {
            infoToast(t("interview.processing-info"));
            setInterviewClose(false);
            setIsInterviewClosed(true);
          }
        }
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        setInterviewClose(false);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };

  const getreturnTickets = () => {
    customerService
      .getReturnTicket(campaignDetails?.id)
      .then((response) => {
        console.log(response?.data?.data);
        setTicketCount(response?.data?.data?.count);
        setInterviewClose(true);
      })
      .catch((error) => {
        console.log("Error occured in get ticket count : ", error);
        setInterviewClose(false);
      });
  };

  const openFeedbackDrawer = (e: any, data: any) => {
    e.stopPropagation();
    console.log("worksss");
    console.log(data);
    setMeetingId(`${params?.id}-${data?.id}`);

    setIsFeedbackDrawerOpen(true);
  };

  const closeFeedbackDrawer = () => {
    if (params?.id && value === 1) {
      getFilterPublishedCampaignDetails(params?.id);
      
    } else if (params?.id) {
      getPublishedCampaignDetails(params?.id);
      setIsFetching(false);
    }
    setIsFeedbackDrawerOpen(false);
  };
  const handleFeedbackSubmit = () => {
    console.log("worksss");
  };
  const handleCopyLink = (e: any, data: any) => {
    e.stopPropagation();
    console.log("yesss", data);
    const meetingDetails = data?.meetingDetails;
    navigator?.clipboard
      ?.writeText(
        `URL: ${meetingDetails?.link}\n ID: ${meetingDetails?.id
          ?.toString()
          .match(/.{1,3}/g)
          ?.join("")}\n Passcode: ${meetingDetails?.passCode}`
      )
      .then((response) => {
        console.log("Text copied to clipboard successfully", response);
        successToast("クリックボードにコピー済み");
      })
      .catch((error) => {
        console.log("Error occured during copying : ", error);
      });
  };

  const joinInterviewRoom = (e: any, data: any) => {
    e.stopPropagation();
    const meetingDetails = data?.meetingDetails;
    videoChatService
      .enterWaitingLobby(meetingDetails?.meetingId)
      .then((response) => {
        console.log("Enter waiting lobby : ", response);
        let joinInfo = {
          appId: response?.data?.data?.agoraAppId,
          channelName: response?.data?.data?.agoraChannelId,
          token: response?.data?.data?.token,
          uid: response?.data?.data?.agoraUserId,
          startTime: response?.data?.data?.startTime,
          endTime: response?.data?.data?.endTime,
          meetingId: meetingDetails?.meetingId,
          participantId: response?.data?.data?.participantId,
          campaignId: params?.id,
        };
        dispatch(setTemporaryChannelInfo(joinInfo));
        window.open(`/video-chat/app/meeting`, "_blank");
        closeDrawer();
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
        closeDrawer();
      });
  };
  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time)?.local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };

  const columns: IDataTableColumn[] = [
    {
      key: "nickName",
      header: t("campaign.campaignDetail.th.nickname"),
      Cell: (monitor: any) => {
        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            height={"100%"}
            gap={1}
            sx={{
              wordBreak: "break-all",
              overflowWrap: "break-word",
              whiteSpace: "initial",
              borderLeft: "none",
              padding: "10px 0px",
            }}
          >
            <Box
              sx={{
                display: monitor?.monitorStatus === 6 ? "flex" : "none",
              }}
            >
              <MintBadge color="error" />
            </Box>
            {monitor?.nickName}
          </Box>
        );
      },
      headerProps: {
        align: "left",
        width: "216px",
      },
    },
    {
      key: "monitorStatus",
      header: t("campaign.campaignDetail.th.status"),
      Cell: (monitor: any) => {
        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
            height={"100%"}
          >
            {monitor?.monitorStatus === 1 && (
              <TonalButton tonalVariant="teal">
                {t("campaign.campaignDetail.monitorStatus.applied")}
              </TonalButton>
            )}
            {(monitor?.monitorStatus === 3 ||
              monitor?.monitorStatus === 4 ||
              monitor?.monitorStatus === 8) && (
              <TonalButton tonalVariant="gray">
                {t("campaign.campaignDetail.monitorStatus.sendOff")}
              </TonalButton>
            )}
            {monitor?.monitorStatus === 5 && (
              <TonalButton tonalVariant="yellow">
                {t("campaign.campaignDetail.monitorStatus.scheduleAdjusted")}
              </TonalButton>
            )}
            {monitor?.monitorStatus === 6 && (
              <TonalButton tonalVariant="orange">
                {t("campaign.campaignDetail.monitorStatus.scheduleConfirmed")}
              </TonalButton>
            )}
            {monitor?.monitorStatus === 2 && (
              <TonalButton tonalVariant="gray">
                {t("campaign.campaignDetail.monitorStatus.completed")}
              </TonalButton>
            )}
          </Box>
        );
      },

      headerProps: {
        align: "left",
        width: "104px",
      },
      cellProps: {
        align: "left",
        width: "104px",
      },
    },
    {
      key: "timeSlotDetails",
      header: t("campaign.campaignList.tableHeader.implementationPeriod"),
      Cell: (monitor: any) => {
        return toLocalDatetime(
          monitor?.timeSlotDetails?.startTime,
          monitor?.timeSlotDetails?.endTime
        );
      },

      headerProps: {
        align: "left",
        width: "198px",
      },
      cellProps: {
        align: "left",
        width: "198px",
      },
    },
    {
      key: "actions",
      header: "",
      avoidRowClick: (monitor: any) => monitor?.feedbackStatus,
      Cell: (monitor: any) => {
        return (
          <Box display={"flex"} gap={1}>
            {monitor?.monitorStatus == 6 && (
              <>
                <MintButton
                  onClick={(e) => joinInterviewRoom(e, monitor)}
                  startIcon={
                    <DoorOutlineIcon
                      size={16}
                      color={theme.mint.color.object.accent}
                    />
                  }
                  variant="outlined"
                  size="small"
                  sx={{ width: "184px" }}
                >
                  {t("campaign.campaignDetail.completed.join")}
                </MintButton>
                <MintButton
                  onClick={(e) => handleCopyLink(e, monitor)}
                  startIcon={
                    <CopyOutlinedIcon
                      size={16}
                      color={theme.mint.color.object.accent}
                    />
                  }
                  variant="text"
                  size="small"
                  sx={{ width: "184px" }}
                >
                  {t("campaign.campaignDetail.completed.copy-link")}
                </MintButton>{" "}
              </>
            )}
            {monitor?.monitorStatus == 2 && (
              <MintButton
                disabled={monitor?.feedbackStatus}
                onClick={(e) => openFeedbackDrawer(e, monitor)}
                startIcon={
                  <DocumentOutlinedIcon
                    size={16}
                    color={
                      monitor?.feedbackStatus
                        ? theme.mint.color.object.disabled
                        : theme.mint.color.object.accent
                    }
                  />
                }
                variant="text"
                size="small"
                sx={{ width: "184px" }}
              >
                {t("campaign.campaignDetail.completed.feedback")}
              </MintButton>
            )}
          </Box>
        );
      },
      headerProps: {
        align: "left",
        width: "394px",
      },
    },
  ];
  const handleMonitor = (data: any) => {
    console.log(data);
    const answers = data?.answer;
    const questions = campaignDetails?.screening?.question;
    const timeslotsList = campaignDetails?.timeslotsList;

    const questionWithAnswer = questions
      ? questions.map((question: any, index: number) => ({
          questionText: question?.questionText,
          answer: answers[index],
        }))
      : [];

    setMonitorData({
      campaignId: campaignDetails?.id,
      id: data?.id,
      name: data?.nickName,
      status: data?.monitorStatus,
      confirmedStatus: data?.timeSlotDetails?.consumedStatus,
      answers: questionWithAnswer,
      timeslotsList: timeslotsList,
      monitorDetail: {
        memo: data?.memo,
        gender: data?.gender,
        age: data?.age,
        occupation: data?.occupation,
        prefecture: data?.prefecture,
      },
      meetingDetails: {
        url: data?.meetingDetails?.link,
        id: data?.meetingDetails?.id,
        passcode: data?.meetingDetails?.passCode,
        meetingId: data?.meetingDetails?.meetingId,
      },
      unreadCount: data?.unreadCount,
      scheduleConfirmationDetails: data?.timeSlotDetails,
    });
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    console.log("Drawer close called!");
    if (params?.id && value === 1) {
      getFilterPublishedCampaignDetails(params?.id);
    } else if (params?.id) {
      getPublishedCampaignDetails(params?.id);
      setIsFetching(false);
    }
    setIsDrawerOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,   
  ) => {
       setPageNumber(value)
     
      console.log("filter dataa", filterData);
    getPublishedCampaignDetails(params?.id,filterData,value)
  };
  
  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"}>
        <BackButton
          label={t("campaign.campaignDetail.returnToList")}
          path="/app/campaign"
        />
        <Stack direction="row" gap={1}>
         
          <MintButton
            id="recruitmentCloseBtn"
            variant="outlined"
            size="medium"
            onClick={() => setRecruitementClose(true)}
            disabled={
              !campaignDetails?.id ||
              disabledStatus?.includes(campaignDetails?.status) ||
              isRecruitementClosed
            }
            sx={{
              color:
                !campaignDetails?.id ||
                disabledStatus?.includes(campaignDetails?.status) ||
                isRecruitementClosed
                  ? theme.mint.color.text.disabled
                  : theme.mint.color.text.accent,
              border:
                !campaignDetails?.id ||
                disabledStatus?.includes(campaignDetails?.status) ||
                isRecruitementClosed
                  ? "1px solid rgba(10, 24, 38, 0.15)"
                  : "1px solid #162987",
              background: theme.mint.color.surfaceGray.componentBg.bg,
            }}
          >
            {t("campaign.campaignDetail.closeRecruitement")}
          </MintButton>
          <MintButton
            id="interviewcloseBtn"
            variant="contained"
            size="medium"
            onClick={getreturnTickets}
            disabled={
              !campaignDetails?.id ||
              [4, 5].includes(campaignDetails?.status) ||
              isInterviewClosed
            }
          >
            {t("campaign.campaignDetail.closeProject")}
          </MintButton>
        </Stack>
      </Stack>
      <Box
        pt={3}
        px={3}
        mt={2}
        pb={2}
        borderRadius={"var(--mm-radius-xl)"}
        border={`1px solid var(--mm-border-low)`}
        bgcolor={"var(--mm-background-container-bg)"}
        
      >
        <H4 id="title">{campaignDetails?.title}</H4>
        <Stack pt={"12px"} gap={2} direction={"row"}>
          {campaignDetails?.status === 1 && (
            <TonalButton tonalVariant="blue" id="statusBtn">
              {t("campaign.status.recruiting")}
            </TonalButton>
          )}
          {campaignDetails?.status === 2 && (
            <TonalButton tonalVariant="blue" id="statusBtn">
              {t("campaign.status.recruiting")}
            </TonalButton>
          )}
 {100000}
          <Stack direction={"row"} gap={2}>
            <Box display={"flex"} alignItems={"center"} gap={1} id="implPeriod">
              <CalendarOutlinedIcon
                size={16}
                color={theme.mint.color.object.low}
              />
              <H7
                sx={{
                  color: "var(--mm-text-low)",
                }}
              >
                {moment(campaignDetails?.startsAt).format("YYYY/MM/DD")} ~{" "}
                {moment(campaignDetails?.endsAt).format("YYYY/MM/DD")}
              </H7>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <PersonOutlinedIcon
                size={16}
                color={theme.mint.color.object.low}
              />
              <H7
                sx={{
                  color: "var(--mm-text-low)",
                }}
              >
                {campaignDetails?.monitorsCount}人
              </H7>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <ClockOutlinedIcon
                size={16}
                color={theme.mint.color.object.low}
              />
              <H7
                sx={{
                  color: "var(--mm-text-low)",
                }}
              >
                {campaignDetails?.duration}
                {t("campaign.creation.preview.duration")}
              </H7>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <PointCircleOutlinedIcon size={16} />
              <H7
                sx={{
                  color: "var(--mm-text-low)",
                }}
              >
                {campaignDetails?.rewardPoint ?? 0}
                {t("campaign.creation.preview.reward-point")}
              </H7>
            </Box>
          </Stack>
        </Stack>
        <Box pt={"12px"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box
              id="collapseContainer"
              display={"flex"}
              gap={1}
              alignItems={"center"}
              onClick={toggleCollapse}
              sx={{
                cursor: "pointer",
              }}
            >
              {collapse ? (
                <ChevronUpOutlinedIcon
                  size={16}
                  color="#0A1826"
                  fillOpacity={0.47}
                />
              ) : (
                <ChevronDownOutlinedIcon
                  size={16}
                  color="#0A1826"
                  fillOpacity={0.47}
                />
              )}

              <H7
                sx={{
                  color: "var(--mm-text-low)",
                }}
              >
                {collapse
                  ? t("campaign.campaignDetail.collapse")
                  : t("campaign.campaignDetail.detail")}
              </H7>
            </Box>
            <MintButton
              variant="text"
              color="primary"
              id="projectDetails"
              onClick={() => setIsProjectDetail(true)}
            >
              <MintTypography
                size="body"
                color={(theme) => theme.mint.color.text.accent}
                fontWeight={400}
              >
                {t("campaign.campaignDetail.checkProjectDetails")}
              </MintTypography>
            </MintButton>
          </Stack>
          <Collapse in={collapse} sx={{ pt: 1 }}>
            <Box
              sx={{
                padding: 1,
                borderRadius: "var(--mm-radius-m)",
                bgcolor: "var(--mm-background-container-bg-layer-2)",
              }}
            >
              <Stack direction={"row"} gap={"12px"}>
                <Box
                  sx={{
                    borderRight: "1px solid var(--mm-border-medium)",
                  }}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"12px"}
                  flex={1}
                >
                  <Box py={"4px"} px={1}>
                    <H7
                      sx={{
                        color: "var(--mm-text-low)",
                        fontWeight: "400",
                        lineHeight: "150%",
                      }}
                    >
                      {t("campaign.campaignDetail.includeCondition")}
                    </H7>
                    <H6
                      sx={{
                        color: "var(--mm-text-high)",
                        fontWeight: "400",
                        lineHeight: "150%",
                        pt: "4px",
                        overflow: "hidden",
                        wordBreak: "break-all",
                      }}
                      id="includeCondition"
                    >
                      <pre
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          fontFamily: "inherit",
                        }}
                      >
                        {campaignDetails?.includeCondition}
                      </pre>
                    </H6>
                  </Box>
                  <Box py={"4px"} px={1}>
                    <H7
                      sx={{
                        color: "var(--mm-text-low)",
                        fontWeight: "400",
                        lineHeight: "150%",
                      }}
                    >
                      {t("campaign.campaignDetail.excludeCondition")}
                    </H7>
                    <H6
                      sx={{
                        color: "var(--mm-text-high)",
                        fontWeight: "400",
                        lineHeight: "150%",
                        pt: "4px",
                        overflow: "hidden",
                        wordBreak: "break-all",
                      }}
                      id="excludeCondition"
                    >
                      <pre
                        style={{
                          wordBreak: "break-all",
                          whiteSpace: "pre-wrap",
                          fontFamily: "inherit",
                        }}
                      >
                        {campaignDetails?.excludeCondition}
                      </pre>
                    </H6>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"12px"}
                  flex={1}
                >
                  <Box py={"4px"} px={1}>
                    <H7
                      sx={{
                        color: "var(--mm-text-low)",
                        fontWeight: "400",
                        lineHeight: "150%",
                      }}
                    >
                      {t("campaign.campaignDetail.NGIndustries")}
                    </H7>
                    <H6
                      sx={{
                        color: "var(--mm-text-high)",
                        fontWeight: "400",
                        lineHeight: "150%",
                        pt: "4px",
                        display: "flex",
                        flexDirection: "column",
                        wordBreak: "break-all",
                      }}
                      id="ngIndustries"
                    >
                      {campaignDetails?.industries?.join(", ")}
                    </H6>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </Box>
      </Box>
      <Box pt={3}>
        <Tabs
          value={value}
          handleChange={handleChange}
          tabItems={[
            {
              label: t("campaign.campaignDetail.tabItem.applicantlist"),
              Icon: UserSvgIcon,
              value: 0,
            },
            {
              label: t("campaign.campaignDetail.tabItem.interviewconfirmed"),
              Icon: ChatSvgIcon,
              value: 1,
            },
          ]}
          sx={{ pb: 2 }}
          disabled={isFetching}
        />
        <TabPanel index={0} value={value}>
          {(campaignDetails && campaignDetails?.monitors?.length > 0) ||
          isFetching ? (
            <>
            <ApplicantDetails
              campaignDetails={campaignDetails}
              
              isFetching={isFetching}
              filterData={filterData}
              setFilterData={setFilterData}
              handleCampaign={(id: string, filter?: object) =>
                getPublishedCampaignDetails(params?.id, filter)
              }
              setPageNumber={setPageNumber}
             
            />
            <Box>
               <MintPagination
               sx={{mt:-5,alignItems:'end'}}
            count={campaignDetailsPagination?.totalPages || 1}
            defaultPage= {1}
            page={pageNumber}
           
            onChange={handlePageChange}
            data-testid="pagination"
            
            /></Box>
            </>
          ) : (
            <NoDataFound message={t("campaign.campaignDetail.noapplication")} />
          )}
          
          
        </TabPanel>
        <TabPanel index={1} value={value}>
          {campaignDetails && campaignDetails?.monitors?.length > 0 ? (
            <DataTable 
              rowClick={handleMonitor}
              
              
              data={campaignDetails?.monitors}
              columns={columns}
              disableScrollButton={true}
              fixedSizeTable
              isFetching={isFetching}
              paginationProps={{
                hasPagination: true,
                count: campaignDetailsPagination?.itemCount || 1,
                defaultPage: 1,
                page: pageNumber,
                onChange: handlePageChange,
              }}
            />
          ) : (
            <NoDataFound
              message={t("campaign.campaignDetail.noconfirmedinterviews")}
            />
          )}
        </TabPanel>
      </Box>
      {recruitementClose && (
        <ConfirmationModal
          width="400px"
          open={recruitementClose}
          onClose={() => setRecruitementClose(false)}
          onDisagree={() => setRecruitementClose(false)}
          onAgree={handleRecruitementClose}
          title={t("campaign.campaignDetail.modalrecruitement.title")}
          content={t("campaign.campaignDetail.modalrecruitement.content")}
          agreeButtonName={t(
            "campaign.campaignDetail.modalrecruitement.agreeButtonName"
          )}
          disAgreeButtonName={t(
            "campaign.campaignDetail.modalrecruitement.disagreeButtonName"
          )}
        />
      )}
      {interviewClose && (
        <ConfirmationModal
          width="400px"
          height="279px"
          ticketInfo={t("campaign.campaignDetail.modalinterview.ticket-info")}
          ticketCount={ticketCount}
          open={interviewClose}
          onClose={() => setInterviewClose(false)}
          onDisagree={() => setInterviewClose(false)}
          onAgree={handleInterviewEnd}
          title={t("campaign.campaignDetail.modalinterview.title")}
          content={t("campaign.campaignDetail.modalinterview.content")}
          agreeButtonName={t(
            "campaign.campaignDetail.modalinterview.agreeButtonName"
          )}
          disAgreeButtonName={t(
            "campaign.campaignDetail.modalinterview.disagreeButtonName"
          )}
        />
      )}

      {isProjectDetail && (
        <ProjectDetailModal
          open={isProjectDetail}
          info={campaignDetails}
          onClose={() => setIsProjectDetail(false)}
          onAgree={() => setIsProjectDetail(false)}
          agreeButtonName={t(
            "campaign.campaignDetail.modaldetail.agreeButtonName"
          )}
        />
      )}
      {isDrawerOpen && (
        <AppliedMonitorDrawer
          closeDrawer={closeDrawer}
          open={isDrawerOpen}
          campaignDetail={{
            campaignId: campaignDetails?.id,
            duration: campaignDetails?.duration,
            startDate: campaignDetails?.startsAt,
            endDate: campaignDetails?.endsAt,
          }}
          limitReached={false}
          monitorData={monitorData}
          handleCampaign={() => {}}
        />
      )}
      {isFeedbackDrawerOpen && (
        <FeedbackModal
          isOpen={isFeedbackDrawerOpen}
          submit={handleFeedbackSubmit}
          close={closeFeedbackDrawer}
          meetingId={meetingId}
        />
      )}
    </Box>
  );
}
