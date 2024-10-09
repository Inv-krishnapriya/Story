import { IRemoteProfile, TCurrentUserProfile } from "@/common/types";
import {
  CrossOutlinedIcon,
  MicIcon,
  MicOffIcon,
  MintTypography,
  PersonIcon,
} from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { getUserName } from "@/utils";
import { VideoCallUserType } from "@/utils/common.data";
import { Box, Divider, Drawer, useTheme } from "@mui/material";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface IParticipantsDrawerProps {
  open: boolean;
  onClose: (index: number) => void;
  remoteUsers: IAgoraRTCRemoteUser[];
  remoteUsersInfo: IRemoteProfile[];
  currentUser: TCurrentUserProfile | undefined;
}

export default function ParticipantsDrawer(
  props: Readonly<IParticipantsDrawerProps>
) {
  const { open, onClose, remoteUsers, remoteUsersInfo, currentUser } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const controls = useSelector((state: RootState) => state.videocall.controls);
  const roleOrder: Record<string, number> = { "1": 0, "0": 1, "2": 2 };

  console.log("Remote users : ", remoteUsers, remoteUsersInfo, currentUser);

  useEffect(() => {
    [...remoteUsersInfo]?.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    console.log(
      "After sorting: ",
      [...remoteUsersInfo]?.sort(
        (a, b) => roleOrder[a.role] - roleOrder[b.role]
      )
    );
  }, [remoteUsersInfo]);

  const getUserType = (id: string) => {
    let role = remoteUsersInfo!
      ?.filter((item) => item.agoraUserId === id)
      .map((item) => item.role)[0];
    switch (role) {
      case VideoCallUserType.MONITOR:
        return t("participants-drawer.monitor");
      case VideoCallUserType.INTERVIEWER:
        return t("participants-drawer.interviewer");
      case VideoCallUserType.BACKROOM_MEMBER:
        return t("participants-drawer.backroom");
      case VideoCallUserType.SCREEN_SHARE_USER:
        return null;
      default:
        console.log("No matching user role found");
    }
  };

  const getBackground = (id: string) => {
    let role = remoteUsersInfo!
      ?.filter((item) => item.agoraUserId === id)
      .map((item) => item.role)[0];
    switch (role) {
      case VideoCallUserType.MONITOR:
        return "B82F25";
      case VideoCallUserType.INTERVIEWER:
        return "2D45BA";
      case VideoCallUserType.BACKROOM_MEMBER:
        return "1F784F";
      default:
        return null;
    }
  };

  const screenshareUser = remoteUsersInfo.filter(
    (item) => item.role === VideoCallUserType.SCREEN_SHARE_USER
  );
  console.log("Screen share user exist : ", screenshareUser);

  const getMicStatus = (agoraUserId: string) => {
    const statuss = remoteUsers?.filter(
      (item) => item.uid.toString() === agoraUserId
    )?.[0];
    return statuss.hasAudio;
  };

  return (
    <Drawer
      open={open}
      hideBackdrop
      anchor="right"
      PaperProps={{
        style: {
          height: "calc(100% - 136px)",
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
        id="participants"
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
            borderRadius: "8px 8px 0px 0px",
            background: "#DEE3FA",
          }}
        >
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
              <PersonIcon size={20} />
              <MintTypography size="head-xs" weight="700">
                {t("participants-drawer.participants-list")}
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
            data-testid="drawer-close"
          >
            <CrossOutlinedIcon size={20} />
          </Box>
        </Box>
        <Box
          id="content"
          sx={{
            display: "flex",
            width: "100%",
            overflowX: "hidden",
            padding: 2,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            flex: "8px 0px 0px",
            alignRadius: "0px 0px 8px 8px",
            background: `${theme.mint.color.background.containerBg.layer1}`,
            overflowY: "auto",
          }}
        >
          <>
            {currentUser?.type !== null && (
              <Box
                sx={{
                  display: "flex",
                  padding: "4px px",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 2,
                  alignSelf: "stretch",
                }}
              >
                <Box id="avatarIcon">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${currentUser?.name!}&background=${
                      currentUser?.type === VideoCallUserType.INTERVIEWER
                        ? "2D45BA"
                        : "1F784F"
                    }&color=FFF&bold=true`}
                    alt="404"
                    height={40}
                    width={40}
                    style={{
                      borderRadius: "40px",
                      backgroundColor: "#B82F25",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "78%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "4px",
                  }}
                >
                  <Box
                    id="info"
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Box id="name">
                      <MintTypography
                        sx={{
                          width: " 100%",
                          wordBreak: "break-all",
                        }}
                        size="body"
                        weight="400"
                        color={theme.mint.color.text.high}
                      >
                        {currentUser?.name}
                      </MintTypography>
                    </Box>
                    <Box id="type">
                      <MintTypography
                        size="caption"
                        weight="400"
                        color={theme.mint.color.text.medium}
                      >
                        {currentUser?.type === VideoCallUserType.INTERVIEWER
                          ? t("participants-drawer.interviewer")
                          : t("participants-drawer.backroom")}
                      </MintTypography>
                    </Box>
                  </Box>
                  <Box
                    id="micStatus"
                    sx={{
                      right: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {controls.micStatus ? (
                      <MicIcon size={20} color="#162987" fillOpacity={1} />
                    ) : (
                      <MicOffIcon
                        size={20}
                        color="#0A1826"
                        fillOpacity={0.37}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
            <Divider style={{ width: "330px" }} />
          </>
          {remoteUsersInfo.length > 0 &&
            [...remoteUsersInfo]
              ?.sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
              .map((item) => {
                let type = getUserType(item.agoraUserId);
                let background = getBackground(item.agoraUserId);
                return (
                  <>
                    {type !== null && (
                      <Box
                        sx={{
                          display: "flex",
                          padding: "4px px",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          gap: 2,
                          alignSelf: "stretch",
                        }}
                      >
                        <Box id="avatarIcon">
                          <Image
                            src={`https://ui-avatars.com/api/?name=${getUserName(
                              item.agoraUserId,
                              remoteUsersInfo
                            )}&background=${background}&color=FFF&bold=true`}
                            alt="404"
                            height={40}
                            width={40}
                            style={{
                              borderRadius: "40px",
                              backgroundColor: "#B82F25",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "78%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "4px",
                          }}
                        >
                          <Box
                            id="info"
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <Box id="name">
                              <MintTypography
                                sx={{
                                  width: " 100%",
                                  wordBreak: "break-all",
                                }}
                                size="body"
                                weight="400"
                                color={theme.mint.color.text.high}
                              >
                                {getUserName(item.agoraUserId, remoteUsersInfo)}
                              </MintTypography>
                            </Box>
                            <Box id="type">
                              <MintTypography
                                size="caption"
                                weight="400"
                                color={theme.mint.color.text.medium}
                              >
                                {type}
                              </MintTypography>
                            </Box>
                          </Box>
                          <Box
                            id="micStatus"
                            sx={{
                              right: "16px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {getMicStatus(item.agoraUserId) ? (
                              <MicIcon
                                size={20}
                                color="#162987"
                                fillOpacity={1}
                              />
                            ) : (
                              <MicOffIcon
                                size={20}
                                color="#0A1826"
                                fillOpacity={0.37}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                );
              })}
        </Box>
      </Box>
    </Drawer>
  );
}
