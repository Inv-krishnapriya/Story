import { IRemoteProfile } from "@/common/types";
import {
  ContractOutlinedIcon,
  CrossOutlinedIcon,
  MintTypography,
} from "@/design-system";
import { gender } from "@/utils/common.data";
import { Box, Drawer, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface IMonitorDrawerProps {
  open: boolean;
  onClose: (index: number) => void;
  data: any;
  screeningData: any;
  remoteUsersInfo: IRemoteProfile[];
}

export default function MonitorDrawer(props: Readonly<IMonitorDrawerProps>) {
  const { open, onClose, data, screeningData, remoteUsersInfo } = props;
  const theme = useTheme();
  const { t } = useTranslation();

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
        id="profile"
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
              <ContractOutlinedIcon size={20} />
              <MintTypography size="head-xs" weight="700">
                {t("monitor-drawer.answer-info")}
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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 3,
            flex: "8px 0px 0px",
            alignRadius: "0px 0px 8px 8px",
            background: `${theme.mint.color.background.containerBg.layer1}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "8px 18px",
              height: "80vh",
              flexGrow: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <Box
              id="basic"
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Box
                id="basicHeader"
                sx={{
                  display: "flex",
                  paddingBottom: "4px",
                  alignItems: "flex-start",
                  gap: 0,
                  alignSelf: "stretch",
                  borderBottom: `1px solid #EBECEE`,
                }}
              >
                <MintTypography
                  size="body"
                  weight="700"
                  color={theme.mint.color.text.high}
                >
                  {t("monitor-drawer.profile")}
                </MintTypography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  alignSelf: "stretch",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    alignItems: "flex-start",
                    gap: "8px",
                    alignSelf: "stretch",
                    flex: "8px 0px 0px",
                  }}
                >
                  <MintTypography size="body" weight="400">
                    {t("monitor-drawer.username")}
                    {data?.name}
                  </MintTypography>
                  <MintTypography size="body" weight="400">
                    {t("monitor-drawer.gender")}
                    {data?.gender
                      ? data?.gender === gender.MALE
                        ? t("monitor-drawer.male")
                        : data.gender === gender.FEMALE
                          ? t("monitor-drawer.woman")
                          : ""
                      : ""}
                  </MintTypography>
                  <MintTypography size="body" weight="400">
                    {t("monitor-drawer.prefecture")}
                    {data?.prefecture}
                  </MintTypography>
                </Box>
              </Box>
            </Box>
            {screeningData?.length > 0 && (
              <Box
                id="screening"
                sx={{
                  display: "flex",
                  padding: 0,
                  flexGrow: 1,
                  overflowY: "auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                }}
              >
                <Box
                  id="contentHeader"
                  sx={{
                    display: "flex",
                    paddingBottom: "4px",
                    alignItems: "flex-start",
                    gap: 0,
                    alignSelf: "stretch",
                    borderBottom: "1px solid #EBECEE",
                  }}
                >
                  <MintTypography size="body" weight="700">
                    {t("monitor-drawer.screening")}
                  </MintTypography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    gap: 1,
                  }}
                >
                  {screeningData?.length > 0 &&
                    screeningData?.map((item: any, index: number) => (
                      <Box sx={{ gap: 1 }} key={index}>
                        <Box
                          id="answerArea"
                          sx={{
                            display: "flex",
                            padding: 0,
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 1,
                            alignSelf: "stretch",
                          }}
                        >
                          <Box
                            id="question"
                            sx={{
                              display: "flex",
                              padding: 0,
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <MintTypography size="body" weight="400">
                              Q.
                            </MintTypography>
                            <MintTypography size="body" weight="400">
                              {item.question}
                            </MintTypography>
                          </Box>
                          <Box
                            id="answer"
                            sx={{
                              display: "flex",
                              padding: 0,
                              alignItems: "flex-start",
                              gap: 1,
                              alignSelf: "stretch",
                            }}
                          >
                            <MintTypography size="body" weight="400">
                              A.
                            </MintTypography>
                            <MintTypography size="body" weight="400">
                              {item.answers.length > 1
                                ? item.answers.map((item: any) => {
                                    return (
                                      <li
                                        style={{ listStyle: "none" }}
                                        key={item}
                                      >
                                        {item}
                                      </li>
                                    );
                                  })
                                : item.answers[0]}
                            </MintTypography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
