import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import {
  MintButton,
  MintTypography,
  MintRadio,
  PersonOutlinedIcon,
  CalendarOutlinedIcon,
  CommentOutlinedIcon,
  successToast,
  CheckCircleOutlinedIcon,
  errorToast,
} from "@/design-system";
import "dayjs/locale/ja";
import "moment/locale/ja";
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";
import Tabs from "@/components/UI/tabs/tab/Tab";
import { customerService } from "@/common/apiUrls";
import ScheduleConfirmed from "./ScheduleConfirmed";
import { DrawerCloseIcon } from "@/components/UI/icons/Icon";
import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import MonitorCancellation from "./MonitorCancellation";
import Chat from "./Chat";
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { actions as chatActions } from "@/stores/chat/reducer";
import { IChatItem } from "@/stores/chat/interface";
import { setChatActive } from "@/stores/global/reducer";
import {
  ChatMessageType,
  MessageStatus,
  UserType,
  WebsocketType,
} from "@/utils/common.data";
import { v4 as uuid } from "uuid";
import { actions } from "@/stores/campaign/reducer";
import { getErrorMessage } from "@/utils";
import { SelectOfferDate } from "./SelectOfferDate";
import { ScheduleOfferDate } from "./ScheduleOfferDate";

const MonitorStatus: Record<number, string> = {
  0: "INVITED",
  1: "応募済",
  2: "実施済",
  3: "見送り",
  4: "見送り",
  5: "日程調整中",
  6: "日程確定",
  7: "NOT_INTERESTED",
  8: "見送り",
};

const Gender: Record<number, string> = {
  1: "side-drawer.male",
  2: "side-drawer.female",
  3: "side-drawer.other",
};

const Status = {
  INVITED: 0,
  APPLIED: 1,
  IMPLEMENTED: 2,
  REJECTED: 3,
  CANCELLED: 4,
  SCHEDULE_ADJUSTMENT: 5,
  SCHEDULE_CONFIRMED: 6,
  NOT_INTERESTED: 7,
  INTERVIEWER_CANCELLED: 8,
} as const;

const scheduleRadios: { label: string; value: string }[] = [
  {
    label: "side-drawer.schedule-offer.radio-label",
    value: "offer-date",
  },
  {
    label: "side-drawer.select-offer.radio-label",
    value: "select-date",
  },
];

export default function AppliedMonitorDrawer(props: Readonly<IDrawerProps>) {
  const theme = useTheme();
  const { t } = useTranslation();

  const value = useSelector((state: RootState) => state.campaign.value);
  const setValue = (data: number) => dispatch(actions.setValue(data));
  const [timeslotId, setTimeslotId] = useState<string[]>([]);
  const [offerDetails, setOfferDetails] = useState<any>(null);
  const [scheduleOption, setScheduleOption] = useState("offer-date");
  const [hasAdditionalOffer, setHasAdditionalOffer] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<IScheduleDate[]>([
    {
      startTime: "",
      endTime: "",
      scheduledDate: "",
    },
  ]);
  const [selectScheduledDate, setSelectScheduledDate] = useState<
    IScheduleDate[] | []
  >([]);
  const [chatData, setChatData] = useState<IChatItem[]>([]);
  const [socketProperties, setSocketProperties] = useState({
    connection: true,
    reconnectCount: 0,
  });

  const {
    open,
    closeDrawer,
    monitorData,
    campaignDetail: { campaignId, duration, endDate, startDate },
    handleCampaign,
    limitReached,
  } = props;
  const monitorDetail = monitorData.monitorDetail;
  const scheduleInfo = monitorData?.meetingDetails;
  const [isOfferWarning, setIsOfferWarning] = useState<boolean>(false);
  const dispatch = useDispatch();
  const roomId = `${campaignId}${monitorData?.id}`;
  const [newMessageCount, setNewMessageCount] = useState<number>(
    monitorData?.unreadCount
  );

  console.log(monitorData);

  const chatRef = useRef<HTMLDivElement>(null);

  const notificationAddedTabData = useMemo(() => {
    console.log("MESSAGE COUNT : ", newMessageCount);

    const data = [
      {
        label: "モニタ情報",
        Icon: PersonOutlinedIcon,
        value: 0,
      },
      {
        label: "日程",
        Icon: CalendarOutlinedIcon,
        value: 1,
      },
      {
        label: "メッセージ",
        ...(newMessageCount > 0 && { notificationCount: newMessageCount }),
        Icon: CommentOutlinedIcon,
        value: 2,
      },
    ];
    return data;
  }, [newMessageCount]);

  const tokenData = useSelector(
    (state: RootState) => state.global.clientData.accessToken
  );

  const userID = useSelector(
    (state: RootState) => state.global.clientData.userId
  );

  const chatHistorySelectorData = useSelector(
    (state: RootState) => state.chat.chatHistoryPagination
  );

  const chatHistoryData: any = useSelector(
    (state: RootState) => state.chat.chatHistoryData
  );

  useEffect(() => {
    console.log(
      "Initial chatData: ",
      chatData,
      "Initial historyData: ",
      chatHistoryData
    );
    callGetChatHistoryRequest(null);
  }, [dispatch, roomId]);

  useEffect(() => {
    if (monitorData?.status === Status.SCHEDULE_ADJUSTMENT)
      fetchMonitorOffers();
    dispatch(chatActions.removeChatHistoryData());
    setChatData([]);
    return () => {
      dispatch(chatActions.removeChatHistoryData());
      dispatch(setChatActive(false));
      setChatData([]);
    };
  }, []);

  useEffect(() => {
    console.log("chatData: ", chatData, "historyData: ", chatHistoryData);

    if (chatHistoryData?.length > 0) {
      setChatData((prev) => [...chatHistoryData, ...prev]);
      setTimeout(() => {
        chatScrollToBottom();
      }, 1);
      if (value === 0 || value === 1) {
        setNewMessageCount(monitorData?.unreadCount);
      }
    }
  }, [chatHistoryData]);

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  const query = {
    authorizationToken: tokenData,
    userType: "0",
    userId: userID,
  };

  console.log(`${campaignId}-${monitorData?.id}`);

  const { sendJsonMessage } = useWebSocket(
    socketUrl + `${campaignId}${monitorData?.id}` + "/",
    {
      queryParams: query,

      onOpen: () => {
        console.log("Connected!");
      },
      onClose: (e) => {
        console.log(e.wasClean);
        console.log("Disconnected!");
      },
      onError: (e) => {
        console.log(e, "error");
      },
      onReconnectStop(numAttempts) {
        console.log(numAttempts);
      },
      shouldReconnect(event) {
        console.log(event);
        return true;
      },
      reconnectInterval: 5000,
      reconnectAttempts: 3,
      retryOnError: false,
      onMessage: (e) => {
        console.log(e, "onMessage");
        const data = JSON.parse(e.data) ?? [];
        const messageItem = data?.data ?? {};
        console.log(chatData, "Message Item : ", messageItem);

        const checkMessageThreadExist = chatData?.some(
          (message) => message.messageId?.[0] === messageItem?.messageId?.[0]
        );

        const checkImageThreadExist = chatData?.some(
          (message) =>
            message?.messageId?.[0] === messageItem?.messageId?.[0] &&
            ChatMessageType.Image === messageItem.messageType
        );
        const isNotLoginUser = messageItem?.senderId !== userID;

        if (
          Object.keys(messageItem)?.length !== 0 &&
          !checkMessageThreadExist
        ) {
          if (
            (value === 0 || value === 1) &&
            messageItem?.type === WebsocketType.Message
          ) {
            setNewMessageCount((prev) => prev + 1);
          }
          let sender = messageItem?.senderId?.toString() !== userID;
          console.log(
            messageItem?.senderId === undefined,
            messageItem?.type === WebsocketType.UpdateMessage
          );

          if (
            messageItem?.senderId === undefined &&
            messageItem?.type === WebsocketType.UpdateMessage
          ) {
            setChatData((prev) => {
              const data = prev?.map((item) => ({
                ...item,
                status: MessageStatus.Read,
              }));
              return [...data];
            });
          }

          if (value === 2 && sender && WebsocketType.Message) {
            console.log("Not sender", messageItem?.messageId?.[0]);

            const readRequest = {
              messageId: messageItem?.messageId?.[0],
              type: WebsocketType.UpdateMessage,
              senderId: userID,
              userType: UserType?.Client,
              roomId: roomId,
              status: MessageStatus.Read,
              id: uuid().replaceAll("-", ""),
            };
            sendJsonMessage(readRequest);
          }
          if (messageItem?.type === WebsocketType.Message) {
            console.log("Not an update message");
            setChatData((prev) => {
              return [...prev, messageItem];
            });
            setTimeout(() => {
              const element = chatRef.current;
              if (element) {
                element.scrollIntoView({ block: "end", behavior: "smooth" });
              }
            }, 1);
          }
        }
        if (
          Object.keys(messageItem)?.length !== 0 &&
          checkImageThreadExist &&
          isNotLoginUser
        ) {
          const existingCharData = chatData?.map((chat) => {
            if (chat?.messageId?.[0] === messageItem?.messageId?.[0]) {
              return {
                ...chat,
                files: [...chat?.files, ...messageItem?.files],
              };
            }
            return {
              ...chat,
            };
          });
          setChatData(existingCharData);
        }
        console.log(data, messageItem, "onMessageSocket");
      },
    },
    socketProperties.connection && socketProperties?.reconnectCount <= 20
  );

  const callGetChatHistoryRequest = (query: object | null) => {
    customerService
      .getChatHistory(`${campaignId}${monitorData?.id}`, query)
      .then((response) => {
        console.log("Response from history api : ", response);
        dispatch(chatActions.getChatHistorySuccess(response?.data?.data));
      })
      .catch((error) => {
        console.log("Error occured in history api : ", error);
      });
  };

  const fetchMonitorOffers = () => {
    customerService
      .getMonitorOffers(campaignId, monitorData.id)
      .then((res) => {
        setOfferDetails(res?.data?.data?.timeslots);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setNewMessageCount(0);
    console.log("NEW value: ", newValue);
    if (newValue === 2) {
      dispatch(setChatActive(true));
      if (newMessageCount > 0) {
        const unique_id = uuid()?.replaceAll("-", "");
        const messageItem = chatData[chatData?.length - 1];

        const readRequest = {
          messageId: messageItem?.messageId?.[0],
          type: WebsocketType.UpdateMessage,
          senderId: userID,
          userType: UserType.Client,
          roomId: roomId,
          status: MessageStatus.Read,
          id: unique_id,
        };
        sendJsonMessage(readRequest);
      }
    } else {
      dispatch(setChatActive(false));
    }
  };

  const handleTimeSlotChange = (state: string[]) => {
    setTimeslotId(state);
  };

  const handleScheduledDateChange = (state: IScheduleDate[]) => {
    setScheduledDate(state);
  };

  const handleSelectScheduledDateChange = (state: IScheduleDate[]) => {
    setSelectScheduledDate(state);
  };

  function updateBulkOffer() {
    const requestBody = {
      monitorId: [monitorData.id],
      timeslotId,
    };
    customerService
      .updateBulkOffer(campaignId, requestBody)
      .then((res) => {
        handleCampaign(campaignId);
        fetchMonitorOffers();
        setIsOfferWarning(false);
        successToast("日程を送信しました");
      })
      .catch((err) => {
        console.error(err);
        setIsOfferWarning(false);
      });
  }
  const convertStrToDate = (dateStr: any, timeStr: any) => {
    const dateParts = dateStr?.split("-");
    const timeParts = timeStr?.split(":");
    const localDateTime = new Date(
      dateParts[2],
      parseInt(dateParts[1]) - 1,
      dateParts[0],
      timeParts[0],
      timeParts[1]
    );
    return localDateTime.toISOString();
  };
  const convertToISO = (obj: any) => {
    const { startTime, endTime, scheduledDate } = obj;
    const startTimeISO = convertStrToDate(scheduledDate, startTime);
    const endTimeISO = convertStrToDate(scheduledDate, endTime);

    return { startTime: startTimeISO, endTime: endTimeISO };
  };

  function addIndividualOffer() {
    let timeslots;
    console.log(scheduledDate);
    if (selectScheduledDate?.length === 0) {
      const slots = scheduledDate?.filter((item) => item.startTime !== "");
      timeslots = slots?.map((slot: any) => {
        return convertToISO(slot);
      });
    } else if (scheduledDate[0]?.startTime === "") {
      timeslots = selectScheduledDate?.map(
        ({ scheduledDate, ...rest }) => rest
      );
    } else {
      const convertedSlots = scheduledDate?.map((slot: any) => {
        return convertToISO(slot);
      });
      const removed = selectScheduledDate?.map(
        ({ scheduledDate, ...rest }) => rest
      );

      timeslots = [...convertedSlots, ...removed];
    }

    const requestBody = {
      monitorId: monitorData.id,
      timeslots: timeslots,
    };

    customerService
      .addIndividualOffer(campaignId, requestBody)
      .then((res) => {
        handleCampaign(campaignId);
        fetchMonitorOffers();
        setScheduledDate([
          {
            startTime: "",
            endTime: "",
            scheduledDate: "",
          },
        ]);
        successToast("日程を送信しました");
      })
      .catch((err) => {
        console.error(err);
        setIsOfferWarning(false);
        errorToast(getErrorMessage(err?.response?.data));
      });
  }

  const onSubmit = () => {
    if (scheduleOption === scheduleRadios[0]?.value) {
      if (timeslotId?.length > 0) {
        if (monitorData?.status === Status.SCHEDULE_ADJUSTMENT) {
          setHasAdditionalOffer(false);
          setIsOfferWarning(true);
        } else {
          updateBulkOffer();
        }
      }
    } else if (
      scheduledDate[0]?.startTime !== "" ||
      selectScheduledDate?.length !== 0
    ) {
      if (monitorData?.status === Status.SCHEDULE_ADJUSTMENT) {
        setHasAdditionalOffer(true);
        setIsOfferWarning(true);
      } else {
        addIndividualOffer();
      }
    }
  };

  const agreeConfirmationModal = () => {
    if (scheduleOption === scheduleRadios[0]?.value) {
      updateBulkOffer();
    } else {
      addIndividualOffer();
    }
    setIsOfferWarning(false);
  };

  const displayMonitorDetails = (key: string) => {
    const returnValue: any = monitorDetail[key as keyof IMonitorDetail]!;
    if (key === "age") return `${returnValue}${t("side-drawer.age-postfix")}`;
    else if (key === "gender") return t(Gender[returnValue]);
    else return returnValue;
  };

  const onAddChatData = (data: IChatItem) => {
    setChatData((prev) => [...prev, data]);
  };

  const onSocketAddData = (data: IChatItem) => {
    sendJsonMessage(data);
  };

  const onPaginationChange = () => {
    const pageNumber = chatHistorySelectorData?.currentPage + 1;
    if (pageNumber <= chatHistorySelectorData?.totalPages) {
      const query = { page: pageNumber };
      callGetChatHistoryRequest(query);
    }
  };

  const isMonitorSendoff = () => {
    if (
      monitorData?.status === Status.REJECTED ||
      monitorData?.status === Status.CANCELLED ||
      monitorData?.status === Status.INTERVIEWER_CANCELLED ||
      monitorData?.status === Status.IMPLEMENTED
    ) {
      return true;
    } else {
      return false;
    }
  };

  const chatScrollToBottom = () => {
    if (chatRef.current) {
      const chatContainer = chatRef?.current?.querySelector(".chat-container");
      if (chatContainer) {
        chatContainer.scrollIntoView({
          // behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  };

  const monitorStatusBgColor = (status: number) => {
    switch (status) {
      case Status.APPLIED:
        return theme.mint.color.extendedColors.teal.ex1;
      case Status.REJECTED:
      case Status.CANCELLED:
      case Status.IMPLEMENTED:
      case Status.INTERVIEWER_CANCELLED:
        return theme.mint.color.extendedColors.gray.ex1;
      case Status.SCHEDULE_CONFIRMED:
        return theme.mint.color.extendedColors.orange.ex1;

      default:
        return theme.mint.color.extendedColors.yellow.ex1;
    }
  };

  const handleDrawerClose = () => {
    setValue(0);
    closeDrawer();
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          style: {
            height: "calc(100% - 55px)",
            width: "426px",
            marginTop: "55px",
          },
        }}
      >
        <Box
          mx={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "hidden",
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            sx={{ my: 1, width: "fit-content" }}
            data-testid="drawer-close"
          >
            <DrawerCloseIcon />
          </IconButton>

          <Box display="flex" gap={2} alignItems="center">
            <MintTypography size="head-s" weight="700">
              {monitorData?.name}
            </MintTypography>
            <MintTypography
              size="body"
              p={1}
              sx={{
                height: "28px",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: monitorStatusBgColor(monitorData?.status),
              }}
            >
              {MonitorStatus[monitorData?.status]}
            </MintTypography>
          </Box>
          <Tabs
            variant="fullWidth"
            value={value}
            sx={{
              ".MuiTab-root": {
                padding: "0px 0px",
              },
              gap: "8px",
            }}
            handleChange={handleChange}
            tabItems={notificationAddedTabData}
            tabItemProps={{ flex: 1 }}
          />
          <TabPanel
            index={0}
            value={value}
            sxChild={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <Box flex="0 0 auto">
              <Grid
                container
                spacing={2}
                py={2}
                mb={2}
                display="grid"
                gridTemplateColumns="1fr 2fr"
              >
                {Object.keys(monitorDetail)?.map((key) => (
                  <>
                    <Grid item key={key}>
                      <MintTypography size="head-xs">
                        {t(`side-drawer.${key}`)}
                      </MintTypography>
                    </Grid>
                    <Grid item key={key}>
                      <MintTypography
                        size="head-xs"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {displayMonitorDetails(key)}
                      </MintTypography>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>

            {monitorData?.answers!?.length > 0 && (
              <MintTypography size="body" weight="700">
                {t("side-drawer.questions-heading")}
              </MintTypography>
            )}

            <Box
              component="div"
              sx={{
                flex: 1,
              }}
            >
              <Grid
                container
                spacing={2}
                py={2}
                mb={4}
                display="grid"
                gridTemplateColumns="1fr 2fr"
              >
                {monitorData?.answers!?.map((answer: any, index: number) => (
                  <React.Fragment key={index}>
                    <Grid item>
                      <MintTypography size="head-xs">
                        {t("side-drawer.question") + (index + 1)}
                      </MintTypography>
                    </Grid>
                    <Grid item>
                      <Stack gap={2}>
                        <MintTypography size="head-xs">
                          {answer?.questionText}
                        </MintTypography>
                        <MintTypography
                          size="head-xs"
                          sx={{
                            wordBreak: "break-all",
                            paddingRight: 1,
                          }}
                        >
                          {answer?.answer?.length > 1
                            ? answer?.answer?.map(
                                (item: any, index: number) => {
                                  return (
                                    <li
                                      key={index}
                                      style={{ listStyleType: "none" }}
                                    >
                                      {item}
                                    </li>
                                  );
                                }
                              )
                            : answer?.answer}
                        </MintTypography>
                      </Stack>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel index={1} value={value}>
            {monitorData?.status === Status.IMPLEMENTED && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                py={theme.mint.spacing.m}
                gap={theme.mint.spacing.xs}
              >
                <Box>
                  {" "}
                  <CheckCircleOutlinedIcon
                    color={theme.mint.color.pallet.black200}
                    size={63.996}
                  />
                </Box>
                <Box>
                  <MintTypography
                    size="body"
                    color={theme.mint.color.text.medium}
                    weight="700"
                  >
                    {t("side-drawer.implemented.text")}
                  </MintTypography>
                </Box>
              </Box>
            )}
            {(monitorData?.status === Status.CANCELLED ||
              monitorData?.status === Status.INTERVIEWER_CANCELLED ||
              monitorData?.scheduleConfirmationDetails?.consumedStatus === 5 ||
              monitorData?.scheduleConfirmationDetails?.consumedStatus ===
                6) && (
              <MonitorCancellation
                monitorStatus={monitorData?.status}
                campaignId={campaignId}
                monitorId={monitorData?.id}
                confirmedSchedule={monitorData?.scheduleConfirmationDetails}
                handleCampaign={handleCampaign}
                closeDrawer={handleDrawerClose}
              />
            )}

            {(monitorData?.status === Status.APPLIED ||
              monitorData?.status === Status.SCHEDULE_ADJUSTMENT ||
              monitorData?.status === Status.REJECTED) && (
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <MintTypography size="head-xs" weight="700">
                  {t("side-drawer.candidate-date")}
                </MintTypography>
                <FormControl sx={{ padding: "10px" }} id="label">
                  <RadioGroup sx={{ gap: 2 }}>
                    {scheduleRadios?.map(({ value, label }) => (
                      <FormControlLabel
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            marginLeft: "-9px",
                          },
                        }}
                        id="controllabel"
                        disabled={monitorData?.status === 3}
                        value={value}
                        label={t(label)}
                        key={label}
                        control={
                          <MintRadio
                            size="small"
                            checked={scheduleOption === value}
                            onChange={() => setScheduleOption(value)}
                            sx={{ mr: 2 }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  p={theme.mint.spacing.xs}
                  borderRadius={theme.mint.cornerRadius.xs}
                  sx={{
                    backgroundColor: theme.mint.color.pallet.gray50,
                  }}
                >
                  {scheduleOption === scheduleRadios[0]?.value ? (
                    <ScheduleOfferDate
                      timeslotsList={monitorData?.timeslotsList?.filter(
                        (item: any) => item.type === 0
                      )}
                      consumedTimeSlots={offerDetails}
                      selected={timeslotId}
                      setSelected={handleTimeSlotChange}
                      limitReached={limitReached}
                      monitorStatus={monitorData?.status}
                    />
                  ) : (
                    <SelectOfferDate
                      timeslotsList={monitorData?.timeslotsList}
                      scheduledDate={scheduledDate}
                      consumedTimeSlots={offerDetails?.filter(
                        (item: any) => item.type === 1
                      )}
                      setScheduledDate={handleScheduledDateChange}
                      selected={selectScheduledDate}
                      duration={duration}
                      setSelected={handleSelectScheduledDateChange}
                      campaignDetail={{
                        startDate,
                        endDate,
                      }}
                      limitReached={limitReached}
                    />
                  )}
                </Box>
                <Box pt={2} sx={{ position: "absolute", bottom: "10px" }}>
                  <MintButton
                    variant="contained"
                    onClick={onSubmit}
                    disabled={!!(limitReached || monitorData?.status === 3)}
                  >
                    {t("side-drawer.send")}
                  </MintButton>
                </Box>
              </Box>
            )}

            {monitorData?.status === Status.SCHEDULE_CONFIRMED && (
              <ScheduleConfirmed
                campaignId={monitorData?.campaignId}
                monitorId={monitorData?.id}
                monitorStatus={monitorData?.status}
                closeDrawer={handleDrawerClose}
                scheduleInfo={scheduleInfo}
                confirmationDetails={monitorData?.scheduleConfirmationDetails}
                handleCampaign={handleCampaign}
              />
            )}
          </TabPanel>
          <TabPanel index={2} value={value}>
            <Chat
              tabValue={value}
              chatData={chatData}
              roomId={`${campaignId}${monitorData?.id}`}
              campaignId={campaignId}
              onAddChatData={onAddChatData}
              onSocketAddData={onSocketAddData}
              onPaginationChange={onPaginationChange}
              monitorStatus={isMonitorSendoff()}
              ref={chatRef}
              monitorNickname={monitorData?.name!}
              chatScrollToBottom={chatScrollToBottom}
            />
          </TabPanel>
        </Box>
      </Drawer>
      {isOfferWarning && (
        <ConfirmationModal
          width="400px"
          title={t("side-drawer.schedule-offer-confirmation.title")}
          content={
            hasAdditionalOffer
              ? t(
                  "side-drawer.schedule-offer-confirmation.additioanl-offer-content"
                )
              : t("side-drawer.schedule-offer-confirmation.content")
          }
          agreeButtonName={t(
            "side-drawer.schedule-offer-confirmation.agree-button"
          )}
          disAgreeButtonName={t(
            "side-drawer.schedule-offer-confirmation.disagree-button"
          )}
          open={isOfferWarning}
          onClose={() => setIsOfferWarning(false)}
          onDisagree={() => setIsOfferWarning(false)}
          onAgree={agreeConfirmationModal}
        />
      )}
    </div>
  );
}
