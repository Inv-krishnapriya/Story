import { videoChatService } from "@/common/apiUrls";
import { IRemoteProfile } from "@/common/types";
import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import Tabs from "@/components/UI/tabs/tab/Tab";
import {
  CrossOutlinedIcon,
  ForumOutlinedIcon,
  MintTypography,
} from "@/design-system";
import { VideoCallUserType } from "@/utils/common.data";
import { Box, Drawer, useTheme } from "@mui/material";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import ChatMessageSection from "./ChatMessageSection";
import { useDispatch } from "react-redux";
import { resetChatHistory } from "@/stores/videocall/reducer";
import { t } from "i18next";

interface IChatDrawerProps {
  open: boolean;
  onClose: (index: number) => void;
  remoteUsers: IAgoraRTCRemoteUser[];
  nickName: string;
  updateHistory: (
    tabChange: boolean,
    data: any,
    timestamp: string,
    chatRootContainerRef: RefObject<HTMLDivElement> | null
  ) => void;
  remoteUsersInfo: IRemoteProfile[];
}

export default function ChatDrawer(props: IChatDrawerProps) {
  const {
    open,
    onClose,
    remoteUsers,
    nickName,
    updateHistory,
    remoteUsersInfo,
  } = props;
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.videocall.meetingData);
  const channelInfo = useSelector(
    (state: RootState) => state.global.temporaryChannelInfo
  );
  const userType = useSelector(
    (state: RootState) => state.videocall.meetingData.userType
  );
  const chatHistory = useSelector(
    (state: RootState) => state.videocall.chatHistory
  );

  console.log(userType, chatHistory);

  const theme = useTheme();
  const [status, setStatus] = useState<number>(0);
  console.log("Remote users : ", remoteUsers);
  const chatRootContainerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    getHistory("", 0);
  }, []);

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
        chatRootContainerRef!.current!.scrollTop = 0;
      })
      .catch((error) => {
        console.log("Error occured during get history : ", error);
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(resetChatHistory());
    setStatus(newValue);
    getHistory("", newValue);
  };

  const tabValues =
    userType === VideoCallUserType.BACKROOM_MEMBER
      ? [
          { label: t("chat-drawer.interviewer"), value: 0 },
          { label: t("chat-drawer.backroom"), value: 1 },
          { label: t("chat-drawer.monitor"), value: 2 },
        ]
      : [
          { label: t("chat-drawer.backroom"), value: 0 },
          { label: t("chat-drawer.monitor"), value: 1 },
        ];

  return (
    <Drawer
      open={open}
      hideBackdrop
      anchor="right"
      PaperProps={{
        style: {
          height:
            remoteUsersInfo.filter(
              (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
            ).length > 0
              ? "calc(100% - 180px)"
              : "calc(100% - 136px)",
          display: "flex",
          width: "360px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          alignSelf: "stretch",
          marginTop: "127px",
          borderRadius: "8px",
          right: "8px",
          minWidth: "320px",
        },
      }}
      variant="persistent"
    >
      <Box
        id="chat"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: "8px 0px 0px",
          alignSelf: "stretch",
          overflow: "hidden",
        }}
      >
        <Box
          id="heading"
          sx={{
            display: "flex",
            padding: "8px 16px",
            alignItems: "center",
            gap: 1,
            alignSelf: "stretch",
            flexDirection: "column",
            borderRadius: "8px 8px 0px 0px",
            background: "#DEE3FA",
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              id="drawerTitle"
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "center",
                gap: 1,
                flex: "8px 0px 0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ForumOutlinedIcon size={20} color="#162331" />
                <MintTypography size="head-xs" weight="700">
                  {t("chat-drawer.chat")}
                </MintTypography>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                right: "15px",
                cursor: "pointer",
              }}
              onClick={() => onClose(0)}
            >
              <CrossOutlinedIcon size={18} />
            </Box>
          </Box>
          <Box sx={{ alignSelf: "flex-start" }}>
            <MintTypography
              size="caption"
              weight="400"
              color={theme.mint.color.text.high}
            >
              {t("chat-drawer.disclaimer")}
            </MintTypography>
          </Box>
        </Box>
        <Box
          id="content"
          sx={{
            display: "flex",
            padding: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            flex: "8px 0px 0px",
            alignRadius: "0px 0px 8px 8px",
            background: `${theme.mint.color.background.containerBg.layer1}`,
            width: "360px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={status}
              handleChange={handleChange}
              tabItems={tabValues}
              sx={{
                ".-MuiTabs-flexContainer": {
                  width: "100%",
                },
                ".MuiButtonBase-root": {
                  flexGrow: 1,
                },
              }}
              variant="fullWidth"
            />
            <TabPanel index={0} value={status}>
              <ChatMessageSection updateHistory={updateHistory} status={0} />
            </TabPanel>
            <TabPanel index={1} value={status}>
              <ChatMessageSection updateHistory={updateHistory} status={1} />
            </TabPanel>
            <TabPanel index={2} value={status}>
              <ChatMessageSection updateHistory={updateHistory} status={2} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
