"use client";

import React, { useEffect, useState } from "react";
import {
  MintPagination,
  MintTypography,
  PlayCircleIcon,
} from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import DataTable, { IDataTableColumn } from "@/components/tables/DataTable";
import moment from "moment";
import { useRouter } from "next/navigation";
import { researchService } from "@/common/apiUrls";
import { useTranslation } from "react-i18next";

const VideoList = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deliveryList, setDeliveryList] = useState({
    data: [],
    pages: {
      totalPages: 0,
    },
  });
  const toLocalDurationDate = (startsAt: string, endsAt: string) => {
    const localStartsAt = moment.utc(startsAt).local().format("YYYY/MM/DD");
    const localEndsAt = moment.utc(endsAt).local().format("YYYY/MM/DD");

    return `${localStartsAt}~${localEndsAt}`;
  };
  const goToDeliveryDetails = (id: string) => {
    router.push("/app/delivery/" + id);
  };

  useEffect(() => {
    setLoading(true);
    getDeliveryList();
  }, [page]);

  const getDeliveryList = async () => {
    await researchService
      .getDeliveryList({ page: page })
      .then((res: any) => {
        setDeliveryList(res.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const columns: IDataTableColumn[] = [
    {
      key: "title",
      header: "delivery.columns.implementation-period",
      headerProps: {
        width: "155px",
      },
      Cell: (campaign: any) => {
        return (
          <MintTypography size="caption">
            {toLocalDurationDate(campaign.startsAt, campaign.endsAt)}
          </MintTypography>
        );
      },
    },
    {
      key: "titles",
      header: "delivery.columns.project-title",
      headerProps: {
        width: "100%",
      },
      Cell: (campaign: any) => (
        <MintTypography size="body">{campaign.title}</MintTypography>
      ),
    },
    {
      key: "title3",
      header: "delivery.columns.participants-count",
      headerProps: {
        width: "88px",
        align: "center",
      },
      cellProps: {
        align: "center",
      },
      Cell: (campaign: any) => (
        <MintTypography size="body" color={theme.mint.color.text.high}>
          {campaign.monitorCount}
        </MintTypography>
      ),
    },
    {
      key: "title3",
      header: "",
      headerProps: {
        width: "130px",
      },
      cellProps: {
        width: "130px",
      },
      Cell: (campaign: any) => (
        <MintTypography
          onClick={() => goToDeliveryDetails(campaign.campaignId)}
          sx={{
            "&:hover": { cursor: "pointer" },
            textDecorationLine: "underline",
            textDecorationColor: theme.mint.color.border.link,
            textUnderlineOffset: theme.mint.spacing.x3s,
            paddingY: theme.mint.spacing.xxs,
          }}
          size="body"
          color={theme.mint.color.text.link}
        >
          {t("delivery.columns.check-video-delivery")}
        </MintTypography>
      ),
    },
  ];

  return (
    <Box height={"100%"}>
      <MintTypography
        size="head-m"
        weight="700"
        color={theme.mint.color.text.high}
      >
        {t("delivery.title")}
      </MintTypography>
      <Box py={theme.mint.spacing.m} height={"100%"}>
        {!loading && deliveryList.data.length == 0 ? (
          <Box
            height={"320px"}
            bgcolor={theme.mint.color.background.containerBg.layer1}
            borderRadius={`${theme.mint.cornerRadius.xl}px`}
          >
            <Stack
              height={"320px"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={theme.mint.spacing.xxs}
            >
              <PlayCircleIcon
                size={63.996}
                color={theme.mint.color.pallet.black200}
              />
              <MintTypography size="head-s" color={theme.mint.color.text.low}>
                {t("delivery.empty-list")}
              </MintTypography>
            </Stack>
          </Box>
        ) : (
          <Box
            height={"100%"}
            bgcolor={theme.mint.color.background.containerBg.layer1}
            borderRadius={`${theme.mint.cornerRadius.xl}px`}
          >
            <Stack height={"100%"} justifyContent={"space-between"}>
              <DataTable
                //   rowClick={handleMonitor}
                data={deliveryList?.data}
                columns={columns}
                disableScrollButton={true}
                fixedSizeTable
                isFetching={loading}
              />
              {!loading && deliveryList?.data.length > 0 && (
                <MintPagination
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    px: theme.mint.spacing.m,
                    paddingBottom: theme.mint.spacing.m,
                  }}
                  count={deliveryList?.pages.totalPages}
                  defaultPage={1}
                  shape="rounded"
                  color="primary"
                  boundaryCount={1}
                  siblingCount={0}
                  page={page}
                  onChange={handlePageChange}
                />
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoList;
