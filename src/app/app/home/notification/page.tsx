"use client";

import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import Tabs from "@/components/UI/tabs/tab/Tab";
import { MintPagination, MintTypography } from "@/design-system";
import { Box, LinearProgress, List, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationDetails from "../NotificationDetails";
import { customerService } from "@/common/apiUrls";
import { GetNotificationList } from "@/common/types";
import { MailOutlinedLightIcon, BellOutlinedLightIcon } from "@/design-system";
import { t } from "i18next";
import { useSearchParams } from "next/navigation";

const Notification = () => {
  const theme = useTheme();
  const searchParam = useSearchParams() 
  const [tabValue, setTabValue] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationList, setNotificationList] = useState<GetNotificationList>(
    {
      data: [],
      pages: { totalPages: 0 },
    }
  );

  const notificationAddedTabData = [
    {
      label: t("notification.tabHeader.tab1"),
      value: 0,
    },
    {
      label: t("notification.tabHeader.tab2"),
      value: 1,
    },
  ];

  const tabParam = searchParam.get('tab')
  const CategoryTypes = {
    SYSTEM_MESSAGE: 1,
    NORMAL: 2,
  } as const;

  useEffect(()=>{
    if(tabParam == "1"){
      setTabValue(1)
    }else{
      setTabValue(0)
    }
  },[tabParam])

  useEffect(() => {
    if (tabValue != -1) {
      
      getNotificationList(currentPage, tabValue);
    }

  }, [tabValue, currentPage , searchParam]);

  const getNotificationList = async (page: number, tabValue: number) => {
    console.log(
      tabValue,
      CategoryTypes.NORMAL,
      tabValue == CategoryTypes.NORMAL
    );

    const category =
      tabValue == 0
        ? "" + CategoryTypes.NORMAL
        : "" + CategoryTypes.SYSTEM_MESSAGE;

    const params = {
      page: "" + page,
      category: category,
    };

    await customerService
      .getNotificationList(params)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setNotificationList(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    setCurrentPage(value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {

    console.log(newValue);
    
    setTabValue(newValue);
    setCurrentPage(1);
    setLoading(true);
  };

  return (
    <Box>
      <MintTypography
        size="head-m"
        weight="700"
        color={theme.mint.color.text.high}
        paddingBottom={theme.mint.spacing.s}
      >
        お知らせ
      </MintTypography>
      <Tabs
        sx={{ width: "fit-content" }}
        value={tabValue}
        handleChange={handleTabChange}
        tabItems={notificationAddedTabData}
        tabItemProps={{ flex: 1 }}
      />
      <TabPanel value={tabValue} index={0}>
        <Stack
          marginTop={theme.mint.spacing.s}
          paddingBottom={theme.mint.spacing.m}
          paddingTop={theme.mint.spacing.s}
          px={theme.mint.spacing.m}
          borderRadius={`${theme.mint.cornerRadius.xl}px`}
          border={`1px solid ${theme.mint.color.border.low}`}
          bgcolor={theme.mint.color.background.containerBg.layer1}
        >
          {!loading && notificationList?.data?.length > 0 && (
            <React.Fragment>
              <Stack
                minHeight={"calc(100vh - 319px)"}
              >
                {notificationList?.data?.map((res: any) => {
                  return (
                    <List key={res.id}>
                      <NotificationDetails fromHome={false} data={res} />
                    </List>
                  );
                })}
                </Stack>
                <MintPagination
                  sx={{ display: "flex", justifyContent: "end" }}
                  count={notificationList?.pages.totalPages}
                  defaultPage={1}
                  shape="rounded"
                  color="primary"
                  boundaryCount={1}
                  siblingCount={0}
                  page={currentPage}
                  onChange={handlePageChange}
                />
            </React.Fragment>
          )}

          {loading && (
            <Stack minHeight={"calc(100vh - 287px)"} data-testid="progress-bar">
              <LinearProgress />
            </Stack>
          )}

          {!loading && notificationList?.data?.length == 0 && (
            <Stack
              minHeight={"320px"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={theme.mint.spacing.s}
            >
              <MailOutlinedLightIcon
                size={63.996}
                color={theme.mint.color.pallet.black50}
              />
              <Box>
                <MintTypography size="body" color={theme.mint.color.text.low}>
                  新着のやりとりはありません。
                </MintTypography>
              </Box>
            </Stack>
          )}
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box
          marginTop={theme.mint.spacing.s}
          justifyContent={"space-between"}
          paddingBottom={theme.mint.spacing.m}
          paddingTop={theme.mint.spacing.s}
          px={theme.mint.spacing.m}
          borderRadius={`${theme.mint.cornerRadius.xl}px`}
          border={`1px solid ${theme.mint.color.border.low}`}
          bgcolor={theme.mint.color.background.containerBg.layer1}
        >
          {!loading && notificationList?.data?.length > 0 && (
            <React.Fragment>

            <Stack
              minHeight={"calc(100vh - 319px)"}
              >
              {notificationList?.data?.map((res: any) => {
                return (
                  <List key={res?.id}>
                    <NotificationDetails fromHome={true} data={res} />
                  </List>
                );
              })}
                </Stack>
              <MintPagination
                sx={{ display: "flex", justifyContent: "end" }}
                count={notificationList?.pages.totalPages}
                defaultPage={1}
                shape="rounded"
                color="primary"
                boundaryCount={1}
                siblingCount={0}
                page={currentPage}
                onChange={handlePageChange}
                />
            </React.Fragment>
          )}
          {loading && (
            <Stack minHeight={"calc(100vh - 287px)"} data-testid="progress-bar">
              <LinearProgress />
            </Stack>
          )}
          {!loading && notificationList?.data?.length == 0 && (
            <Stack
              minHeight={"320px"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={theme.mint.spacing.s}
            >
              <BellOutlinedLightIcon
                size={63.996}
                color={theme.mint.color.pallet.black50}
              />
              <Box>
                <MintTypography size="body" color={theme.mint.color.text.low}>
                  新着の通知はありません。
                </MintTypography>
              </Box>
            </Stack>
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Notification;
