"use client;";

import { H4, H6, H7 } from "@/components/UI/typography/Typography";
import {
  CalendarOutlinedIcon,
  ChevronDownOutlinedIcon,
  ChevronUpOutlinedIcon,
  ClockOutlinedIcon,
  MintButton,
  MintTypography,
  PersonOutlinedIcon,
  PointCircleOutlinedIcon,
} from "@/design-system";
import { Box, Collapse, Stack, useTheme } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectDetailModal from "../../campaign/details/[id]/ProjectDetailModal";
import { IBasics } from "../interface";

const CampaignDetails = ({
data}: {
  data?: IBasics;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(false);
  const [isProjectDetail, setIsProjectDetail] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <Box
      pt={3}
      px={3}
      mt={2}
      pb={2}
      borderRadius={"var(--mm-radius-xl)"}
      border={`1px solid var(--mm-border-low)`}
      bgcolor={"var(--mm-background-container-bg)"}
    >
      <H4 id="title">{data?.title}</H4>
      <Stack pt={"12px"} gap={2} direction={"row"}>
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
              id="campaign-period"
            >
              {moment(data?.startsAt).format("YYYY/MM/DD")} ~{" "}
              {moment(data?.endsAt).format("YYYY/MM/DD")}
            </H7>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <PersonOutlinedIcon size={16} color={theme.mint.color.object.low} />
            <H7
              id = "campaign-count"
              sx={{
                color: "var(--mm-text-low)",
              }}
            >
              {data?.monitorsCount}人
            </H7>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1} id ="campaign-duration">
            <ClockOutlinedIcon size={16} color={theme.mint.color.object.low} />
            <H7
              sx={{
                color: "var(--mm-text-low)",
              }}
            >
              {data?.duration}分
            </H7>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1} id="reward-point">
            <PointCircleOutlinedIcon size={16} />
            <H7
              sx={{
                color: "var(--mm-text-low)",
              }}
            >
              {data?.rewardPoint ?? 0}ポイント
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
            id="collapse-text"
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
                    {data?.includeCondition}
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
                    {data?.excludeCondition}
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
                    {String(data?.industries)}
                  </H6>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Collapse>
      </Box>
      {isProjectDetail && (
        <ProjectDetailModal
          open={isProjectDetail}
          info={data}
          onClose={() => setIsProjectDetail(false)}
          onAgree={() => setIsProjectDetail(false)}
          agreeButtonName={t(
            "campaign.campaignDetail.modaldetail.agreeButtonName"
          )}
        />
      )}
    </Box>
  );
};

export default CampaignDetails;
