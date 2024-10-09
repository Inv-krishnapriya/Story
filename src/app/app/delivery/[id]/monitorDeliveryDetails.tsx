"use client";

import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import Tabs from "@/components/UI/tabs/tab/Tab";
import { MintTypography } from "@/design-system";
import { Box, CircularProgress, useTheme } from "@mui/material";
import React from "react";
import MonitorBasicDetails from "./monitorBasicDetails";
import { IScreeningMonitorDetails, IVideo } from "../interface";
import { useTranslation } from "react-i18next";
import { genderRadios } from "../../../../utils/dropdown.data";

const MonitorDeliveryDetails = ({
  loading,
  campaignData,
  monitorScreeningDetails,
}: {
  campaignData: IVideo;
  loading: boolean;
  monitorScreeningDetails: IScreeningMonitorDetails;
}) => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Box>
      {loading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={theme.mint.spacing.m}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Tabs
            variant={"fullWidth"}
            value={0}
            handleChange={() => {}}
            tabItems={[{ label: "モニタ詳細", value: 0 }]}
            sx={{
              pb: 2,
              width: "100%",
              maxWidth: "100%",
              ".MuiButtonBase-root": {
                width: "100% !important",
                maxWidth: "100% !important",
              },
            }}
          />
          <TabPanel
            index={0}
            value={0}
            sx={{ width: "100%", maxWidth: "100%" }}
          >
            <MintTypography
              size="body"
              weight="700"
              paddingBottom={theme.mint.spacing.s}
            >
              {campaignData.monitorName}
            </MintTypography>
            <MintTypography
              size="body"
              weight="700"
              paddingBottom={theme.mint.spacing.xxs}
            >
              基本情報
            </MintTypography>
            <MonitorBasicDetails
              name={"性別"}
              value={
                campaignData.monitorDetails?.gender !== 0
                  ? t(
                      genderRadios
                        .filter(
                          (item) =>
                            item.value === campaignData.monitorDetails?.gender
                        )
                        .map((item) => item.label)
                    )
                  : ""
              }
            />
            <MonitorBasicDetails
              name={"年齢"}
              value={"" + campaignData.monitorDetails?.gender}
            />
            <MonitorBasicDetails
              name={"職業"}
              value={"" + campaignData.monitorDetails?.occupation}
            />
            <MonitorBasicDetails
              name={"居住地"}
              value={"" + campaignData.monitorDetails?.area.toString()}
            />
            <MonitorBasicDetails name={"メモ"} value={"" + campaignData.memo} />
            {monitorScreeningDetails?.screening?.length > 0 && (
              <Box>
                <Box
                  height={"1px"}
                  bgcolor={theme.mint.color.border.low}
                  width={"100%"}
                  my={theme.mint.spacing.s}
                ></Box>
                <MintTypography
                  size="body"
                  weight="700"
                  paddingBottom={theme.mint.spacing.xxs}
                >
                  アンケート回答
                </MintTypography>

                {monitorScreeningDetails?.screening.map((screening, index) => {
                  return (
                    <Box key={index}>
                      <MonitorBasicDetails
                        name={"設問" + (index + 1)}
                        question={screening.question + " ?"}
                        value={screening.answers.toString()}
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </TabPanel>
        </Box>
      )}
    </Box>
  );
};

export default MonitorDeliveryDetails;
