"use client";
import { videoChatService } from "@/common/apiUrls";
import { TChatHistoryType } from "@/common/types";
import { MintButton, MintTextField, MintTypography } from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { VideoCallUserType } from "@/utils/common.data";
import { Box, useTheme } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

interface IChatMessageSectionProps {
  updateHistory: (
    tabChange: boolean,
    data: any,
    timestamp: string,
    chatRootContainerRef: RefObject<HTMLDivElement> | null
  ) => void;
  status: number;
}

const ChatMessageSection = (props: IChatMessageSectionProps) => {
  const { updateHistory, status } = props;
  const chatRootContainerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [chatBoxHeight, setChatBoxHeight] = useState(0);
  const theme = useTheme();
  const [messages, setMessages] = useState<string>("");
  const scrollTopRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasSend, setHasSend] = useState<boolean>(false);
  const userType = useSelector(
    (state: RootState) => state.videocall.meetingData.userType
  );
  const chatHistory = useSelector(
    (state: RootState) => state.videocall.chatHistory
  );
  const channelInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );
  console.log("User type: ", userType);

  const remoteUsersInfo = useSelector(
    (state: RootState) => state.videocall.remoteUsersInfo
  );

  const [isScreenShareUserExist, setIsScreenShareUserExist] =
    useState<number>(0);

  useEffect(() => {
    setIsScreenShareUserExist(
      remoteUsersInfo.filter(
        (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
      )?.length
    );
  }, [remoteUsersInfo]);
  useEffect(() => {
    if (!messages && chatBoxRef?.current) {
      setTimeout(() => {
        const height = chatBoxRef?.current?.clientHeight;
        setChatBoxHeight(height ?? 0);
      }, 10);
    }
  }, [messages]);

  const getBackground = (role: string) => {
    switch (role) {
      case VideoCallUserType.MONITOR:
        return "B82F25";
        break;
      case VideoCallUserType.INTERVIEWER:
        return "2D45BA";
        break;
      case VideoCallUserType.BACKROOM_MEMBER:
        return "1F784F";
        break;
      default:
        return null;
    }
  };

  const sendMessage = (type: string | undefined) => {
    if (messages.length > 0) {
      setHasSend(true);
      let messageId = uuid();
      let datas = JSON.stringify({
        participantId: channelInfo.participantId,
        type: type!,
        message: messages,
        messageId: messageId,
      });
      videoChatService
        .sendMessage(channelInfo.meetingId, datas)
        .then((response) => {
          setHasSend(false);
          console.log("Respone from api : ", response);
          setMessages("");
        })
        .catch((error) => {
          console.log("Error occured: ", error);
          const { errorCode, data } = error?.response?.data;
          console.log(
            "ErrorCode : ",
            errorCode,
            errorCode?.video === "E500015"
          );
          if (errorCode?.video === "E500015") {
            updateHistory(false, data, "", chatRootContainerRef);
          }
          setMessages("");
          setHasSend(false);
        });
    }
  };

  const getType = (newValue: number) => {
    if (userType === VideoCallUserType.BACKROOM_MEMBER) {
      if (newValue === 0) {
        return VideoCallUserType.INTERVIEWER;
      } else if (newValue === 1) {
        return VideoCallUserType.BACKROOM_MEMBER;
      } else {
        return VideoCallUserType.MONITOR;
      }
    } else {
      if (newValue === 0) {
        return VideoCallUserType.INTERVIEWER;
      } else {
        return VideoCallUserType.MONITOR;
      }
    }
  };

  const getHistory = (timestamp: string = "", newValue?: number) => {
    console.log(newValue, timestamp);

    const limit = 20;
    videoChatService
      .getAgoraChatHistory(
        channelInfo.meetingId,
        getType(newValue !== undefined ? newValue : status),
        timestamp,
        limit
      )
      .then((response) => {
        const historyLength = response?.data?.data?.length;
        if (!historyLength || historyLength < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        console.log("Response from history API : ", response.data.data);
        updateHistory(
          newValue !== undefined ? true : false,
          response.data.data,
          timestamp,
          chatRootContainerRef
        );
      })
      .catch((error) => {
        console.log("Error occured during get history : ", error);
      });
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const first = entries[0];
    console.log({ isIntersecting: false });
    if (first.isIntersecting && hasMore) {
      console.log({ isIntersecting: true });
      const timestamp = chatHistory[chatHistory.length - 1]?.timestamp;
      console.log(
        "TimeStmap:",
        timestamp,
        chatHistory[chatHistory.length - 1],
        chatHistory
      );

      getHistory(timestamp, undefined);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: chatRootContainerRef.current,
      rootMargin: "250px",
    });
    console.log({ isIntersecting: "Use effect" });
    console.log({ isIntersecting: "Condition", true: scrollTopRef.current });

    if (observer && scrollTopRef.current) {
      console.log({ isIntersecting: "Observing" });
      observer.observe(scrollTopRef.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [chatHistory]);

  const getChatType = (status: number) => {
    if (status === 0) {
      if (
        userType === VideoCallUserType.INTERVIEWER ||
        userType === VideoCallUserType.BACKROOM_MEMBER
      ) {
        return VideoCallUserType.INTERVIEWER;
      }
    } else if (status === 1) {
      if (userType === VideoCallUserType.INTERVIEWER) {
        return VideoCallUserType.MONITOR;
      } else {
        return VideoCallUserType.BACKROOM_MEMBER;
      }
    } else if (status === 2) {
      if (userType === VideoCallUserType.BACKROOM_MEMBER) {
        return VideoCallUserType.MONITOR;
      }
    } else {
      return "";
    }
  };

  return (
    <Box
      ref={chatRootContainerRef}
      id={
        userType === VideoCallUserType.BACKROOM_MEMBER
          ? "interviewerChatArea"
          : "backroomChatArea"
      }
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column-reverse",
        justifyContent: "end",
        alignItems: "center",
        gap: 1,
        flex: "8px 0px 0px",
        alignSelf: "stretch",
        height:
          isScreenShareUserExist > 0
            ? `calc(100vh - 350px)`
            : `calc(100vh - 295px)`,
        overflowY: "auto",
        paddingBottom: `calc(${theme.mint.spacing.s} + ${chatBoxHeight}px)`,
      }}
    >
      <Box flex={1} />
      {chatHistory.length > 0 &&
        chatHistory.map((item: TChatHistoryType) => {
          return (
            <>
              {item.senderId !== channelInfo.participantId &&
                item.chatType === getChatType(status)! && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        padding: 0,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        alignSelf: "stretch",
                      }}
                    >
                      {" "}
                      <Box
                        id="reciepient"
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: 1,
                          alignSelf: "stretch",
                        }}
                      >
                        <Box id="reciepientAvatar">
                          <Image
                            src={`https://ui-avatars.com/api/?name=${item?.senderName}&background=${getBackground(
                              item?.senderType
                            )}&color=FFF&bold=true`}
                            alt="404"
                            height={32}
                            width={32}
                            style={{
                              borderRadius: "40px",
                              backgroundColor: "#B82F25",
                            }}
                          />
                        </Box>
                        <Box
                          id="message"
                          sx={{
                            padding: 1,
                            borderRadius: "8px 8px 8px 0px",
                            width: "-webkit-fill-available",
                            background:
                              theme.mint.color.extendedColors.gray.ex1,
                            maxWidth: "360px",
                            wordBreak: "break-word",
                            alignSelf: "center",
                            whiteSpace: "pre-line",
                            fontFamily: "Roboto",
                          }}
                        >
                          <MintTypography
                            size="body"
                            weight="400"
                            color={theme.mint.color.text.high}
                          >
                            {item?.message?.trim()}
                          </MintTypography>
                        </Box>
                        <Box>
                          <MintTypography
                            size="caption"
                            weight="400"
                            color={theme.mint.color.text.low}
                          >
                            {moment
                              .utc(item?.timestamp)
                              .local()
                              .format("HH:mm")}
                          </MintTypography>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              {item.senderId === channelInfo.participantId && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      padding: 0,
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 1,
                      alignSelf: "stretch",
                    }}
                  >
                    {" "}
                    <Box
                      id="sender"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        alignSelf: "stretch",
                      }}
                    >
                      {" "}
                      <MintTypography
                        size="caption"
                        weight="400"
                        color={theme.mint.color.text.low}
                      >
                        <Box id="time">
                          {moment.utc(item.timestamp).local().format("HH:mm")}
                        </Box>
                      </MintTypography>
                      <Box
                        id="message"
                        sx={{
                          padding: 1,
                          borderRadius: "8px 8px 0px 8px",
                          width: "-webkit-fill-available",
                          background: item?.ng
                            ? "#FFF1F0"
                            : theme.mint.color.extendedColors.aqua.ex1,
                          maxWidth: "360px",
                          wordBreak: "break-word",
                          whiteSpace: "pre-line",
                          fontFamily: "Roboto",
                        }}
                      >
                        <MintTypography
                          size="body"
                          weight="400"
                          color={theme.mint.color.text.high}
                        >
                          {item?.message}
                        </MintTypography>
                      </Box>
                    </Box>
                    {item?.ng && (
                      <MintTypography
                        size="caption"
                        weight="400"
                        color={theme.mint.color.system.error.error}
                      >
                        NGワードが入っているため送信できませんでした。
                      </MintTypography>
                    )}
                  </Box>
                </>
              )}
            </>
          );
        })}
      <Box id="hasMore">{hasMore && <Box ref={scrollTopRef}></Box>}</Box>

      {(userType !== VideoCallUserType.BACKROOM_MEMBER ||
        (userType === VideoCallUserType.BACKROOM_MEMBER && status !== 2)) && (
        <Box
          id="messageAction"
          sx={{
            position: "absolute",
            width: "90%",
            bottom: "10px",
            display: "flex",
            flexDirection: "row",
            gap: 2,
            background: "white",
          }}
          ref={chatBoxRef}
        >
          <Box>
            <MintTextField
              fullWidth
              minRows={0}
              multiline
              placeholder="メッセージを送信"
              onChange={(e) => {
                setMessages(e.target.value);
                setTimeout(() => {
                  if (chatBoxRef?.current) {
                    const height = chatBoxRef?.current?.clientHeight;
                    setChatBoxHeight(height);
                  }
                }, 10);
              }}
              value={messages}
              inputProps={{ "data-testid": "message-input", maxLength: 500 }}
              sx={{
                ".MuiInputBase-input": {
                  maxHeight: "200px",
                  overflowY: "auto !important",
                },
              }}
            />
          </Box>

          <Box id="button" sx={{ display: "flex", alignItems: "end" }}>
            <MintButton
              variant="contained"
              disabled={hasSend}
              sx={{
                display: "flex",
                width: "64px",
                height: "40px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                borderRadius: 1,
                background: theme.mint.color.surfaceAccent.primary.primary,
              }}
              onClick={() => sendMessage(getChatType(status))}
              data-testid="sent-message"
            >
              <MintTypography size="body" weight="500">
                送信
              </MintTypography>
            </MintButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessageSection;
