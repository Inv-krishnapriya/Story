"use client";

import { MintTypography, DocumentLightOutlinedIcon } from "@/design-system";
import { Box, LinearProgress, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import TodaysFeedDetails from "./TodaysFeedDetails";
import moment from "moment";
import "moment/locale/ja";
import { customerService } from "@/common/apiUrls";
import { GetTodaysCampaignDetails } from "@/common/types";
import { useTranslation } from "react-i18next";

const TodaysFeedList = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [todaysList, setTodaysList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodaysList();
    console.log("wwww");
  }, []);

  const getTodaysList = async () => {
    await customerService
      .getTodaysInterviewList("1")
      .then((res) => {
        setTodaysList(res?.data?.data);
        setLoading(false);
        console.log(res, "api called");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        console.log("error api called");
      });
  };

  const formattedDate = moment(new Date()).locale("ja").format("MM/DD（ddd）");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ width: "100%", padding: theme.mint.spacing.m }}
      bgcolor={theme.mint.color.background.containerBg.layer1}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      gap={theme.mint.spacing.s}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <MintTypography
          size="head-s"
          color={theme.mint.color.text.high}
          weight="700"
        >
          {t("todays-feed.interview")}
        </MintTypography>
        <Box display={"flex"} alignItems={"center"}>
          <MintTypography
            size="head-xs"
            weight="700"
            color={theme.mint.color.text.medium}
          >
            {formattedDate}
          </MintTypography>
        </Box>
      </Box>
      <Box
        overflow={"auto"}
        sx={{
          height: "100%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading && (
          <Stack
            justifyContent={"center"}
            height={"100px"}
            data-testid="progress-bar"
          >
            <LinearProgress />
          </Stack>
        )}

        {todaysList?.length > 0 &&
          todaysList.map((res: GetTodaysCampaignDetails) => {
            return (
              <Box key={res.id} paddingBottom={theme.mint.spacing.xxs}>
                <TodaysFeedDetails data={res} />
              </Box>
            );
          })}
        {todaysList?.length == 0 && !loading && (
          <Box
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={theme.mint.spacing.xs}
          >
            <DocumentLightOutlinedIcon
              size={63.996}
              color={theme.mint.color.pallet.black200}
            />
            <Box>
              <MintTypography size="body" color={theme.mint.color.text.low}>
                {t("todays-feed.no-interview")}
              </MintTypography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TodaysFeedList;
