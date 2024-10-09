"use client";

import { IMonitorData } from "@/app/app/campaign/details/[id]/ApplicantDetails";

import { customerService } from "@/common/apiUrls";
import {
  MintButton,
  MintCheckbox,
  MintChip,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintFormControlLabel,
  MintTypography,
  successToast,
} from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "moment/locale/ja";

interface IOfferModalProps {
  open: boolean;
  onClose: () => void;
  onDisagree: () => void;
  applicantList: IMonitorData[];
  timeslotList: any;
  campaignId: string;
  handleCampaign: (id: any) => void;
}

const OfferSchedule: React.FC<IOfferModalProps> = (props) => {
  const {
    open,
    onClose,
    onDisagree,
    applicantList,
    timeslotList,
    campaignId,
    handleCampaign,
  } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { t } = useTranslation();
  const [isMore, setIsMore] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOffer = () => {
    if (checkedItems?.length > 0) {
      console.log(checkedItems, applicantList?.map((monitor) => monitor?.id));
      let data = JSON.stringify({
        timeslotId: checkedItems,
        monitorId: applicantList?.map((monitor) => monitor?.id),
      });
      customerService
        .updateBulkOffer(campaignId, data)
        .then((response) => {
          console.log("Response from bulk schedule offer : ", response);
          successToast(t("campaign.campaignDetail.modalOffer.success"));
          onClose();
          handleCampaign(campaignId);
        })
        .catch((error) => {
          console.log("Error occured during bulk offer scheduling : ", error);
        });
    }
  };

  const handleChecboxChange = (e: any, id: string) => {
    const { checked } = e?.target;
    console.log(checked, id);
    if (checked) {
      if (checkedItems?.includes(id)) {
        setCheckedItems((prev) => {
          return [...prev];
        });
      } else {
        setCheckedItems((prev) => {
          return [...prev, id];
        });
      }
    } else {
      console.log(checkedItems);
      console.log(checkedItems?.filter((item) => item !== id));
      setCheckedItems((prev) => {
        return prev?.filter((item) => item !== id);
      });
    }
  };

  const handleAllChecks = (e: any) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItems(
        timeslotList
          ?.filter((item: any) => !isDisabled(item))
          ?.map((item: any) => item.id)
      );
    } else {
      setCheckedItems([]);
    }
  };

  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time)?.local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };

  const handleIsMore = () => {
    console.log("Inside more settings!!!!!");
    setIsMore(!isMore);
  };

  const [visibleItemsCount, setVisibleItemsCount] = useState<any>(0);
  const hiddenElementCount = applicantList?.length - visibleItemsCount ?? 0;
  const [userefReady, setUseRefReady] = useState(false);

  const observer = new IntersectionObserver(
    (entries) => {
      // entries is an array of observed elements
      const visibleItems = entries.filter((entry) => entry.isIntersecting);
      console.log(visibleItemsCount, "visibleItemsCount");
      console.log(visibleItems?.length, "visibleItems?.lengtht");
      console.log(isMore, "isMore");

      if (visibleItemsCount !== visibleItems?.length && !isMore) {
        setVisibleItemsCount(visibleItems?.length ?? 0);
      }
    },
    {
      root: null, // use the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.5, // trigger when 50% of the element is visible
    }
  );

  if (containerRef.current) {
    // Observe each child element
    containerRef?.current?.childNodes?.forEach((child: any) => {
      observer?.observe(child);
    });
  }
  console.log(observer);

  useLayoutEffect(() => {
    console.log(isMore, containerRef.current, "isMore");

    // Cleanup observer on component unmount
    return () => {
      observer?.disconnect();
    };
  }, [userefReady]);

  useEffect(() => {
    setTimeout(() => {
      setUseRefReady(true);
    }, 1);
  }, []);

  const isDisabled = (slot: any) => {
    const now = new Date();
    const startTime = new Date(slot?.startTime);
    if (now > startTime) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          display: "flex",
          width: "600px",
          height: "672px",
          padding: 0,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          borderRadius: (theme) => theme.mint.cornerRadius.xs,
          background: (theme) => theme.mint.color.surfaceGray.high.high,
          boxShadow: (theme) => theme.mint.color.surfaceGray.componentBg.bg,
        },
      }}
    >
      <MintDialogTitle
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          alignSelf: "stretch",
        }}
      >
        <MintTypography
          size="head-m"
          weight="500"
          fontStyle={"normal"}
          fontFamily={"Roboto"}
        >
          {t("campaign.campaignDetail.modalOffer.title")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          "&.MuiDialogContent-root": {
            overflowY: "hidden",
          },
          display: "flex",
          padding: "0px 24px 16px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
          flex: "0px 0px 0px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 3,
            alignSelf: "stretch",
            height: "76px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: 0,
              alignItems: "baseline",
              gap: 1,
            }}
          >
            <MintTypography size="head-xs" weight="700">
              {t("campaign.campaignDetail.modalOffer.applicants")}
            </MintTypography>
            <MintTypography
              size="body"
              weight="400"
              sx={{ color: (theme) => theme.mint.color.text.accent }}
            >
              {applicantList?.length}{" "}
              {t("campaign.campaignDetail.modalOffer.count")}
            </MintTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 1,
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderRadius: (theme) => theme.mint.cornerRadius.xs,
              border: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <Box
              ref={containerRef}
              id="applicantsList"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
                height: isMore ? "auto" : "35px",
                padding: 0,
                alignItems: "center",
                gap: 1,
              }}
            >
              {applicantList?.map((monitor, index) => {
                return (
                  <Box
                    key={index}
                    className="applicant"
                    sx={{
                      alignItems: "center",
                      padding: "4px 8px",
                      justifyContent: "center",
                    }}
                  >
                    <MintChip
                      size="small"
                      color="primary"
                      variant="filled"
                      sx={{
                        background: (theme) =>
                          theme.mint.color.surfaceAccent.primary.bright,
                      }}
                      label={monitor?.name}
                    />
                  </Box>
                );
              })}
            </Box>
            {!isMore && hiddenElementCount > 0 && userefReady && (
              <Box
                sx={{
                  alignItems: "center",
                  padding: "4px 8px",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <MintTypography size="body" weight="500">
                  <MintChip
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleIsMore}
                    data-testid="more-button"
                    sx={{
                      background: (theme) =>
                        theme.mint.color.surfaceAccent.primary.bright,
                    }}
                    label={`+他${hiddenElementCount}名`}
                  />
                </MintTypography>
              </Box>
            )}
            {isMore && (
              <Box
                sx={{
                  alignItems: "end",
                  padding: "4px 8px",
                  justifyContent: "center",
                  display: "flex",
                  height: "100%",
                }}
              >
                <MintTypography size="body" weight="500">
                  <MintButton
                    size="small"
                    color="gray"
                    variant="text"
                    onClick={handleIsMore}
                  >
                    {t("side-drawer.offer-schedule.is-more")}
                  </MintButton>
                </MintTypography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 3,
              flex: "8px 0px 0px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                alignSelf: "stretch",
              }}
            >
              <MintTypography size="head-xs" weight="700">
                {t("campaign.campaignDetail.modalOffer.date")}
              </MintTypography>
              <MintTypography size="body" weight="400">
                {t("campaign.campaignDetail.modalOffer.content")}
              </MintTypography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                flex: "8px 0px 0px",
                alignSelf: "stretch",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      label={t("side-drawer.offer-schedule.check")}
                      onChange={(e) => handleAllChecks(e)}
                      checked={
                        checkedItems?.length === timeslotList?.length ||
                        checkedItems.length ===
                          timeslotList
                            ?.filter((item: any) => !isDisabled(item))
                            .map((item: any) => item.id).length
                      }
                      inputProps={{ "aria-label": "checkbox" }}
                    />
                  }
                  label={t("campaign.campaignDetail.modalOffer.selectall")}
                />
              </Box>
            </Box>
            <Box
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                display: "flex",
                paddingBottom: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                flex: "8px 0px 0px",
                alignSelf: "stretch",
                overflowY: "auto",
                height: "250px",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "40px",
                  justifyContent: "space-between",
                  gap: "2px",
                  flexWrap: "wrap",
                }}
              >
                {timeslotList?.map((slot: any, index: number) => {
                  return (
                    slot.type === 0 && (
                      <Box
                        sx={{
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.mint.color.surfaceGray.componentBg.hover,
                          },

                          backgroundColor: checkedItems.includes(slot?.id!)
                            ? (theme) =>
                                theme.mint.color.surfaceAccent.primary
                                  .areaSelected
                            : (theme) =>
                                theme.mint.color.surfaceGray.componentBg.bg,
                          width: "272px",
                          height: "40px",
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                          padding: "8px 16px 8px 8px",
                          alignItems: "center",
                          flex: "8px 0px 0px",
                          borderRadius: (theme) => theme.mint.cornerRadius.xs,
                          border: "1px solid rgba(10, 24, 38, 0.08)",
                        }}
                      >
                        <MintFormControlLabel
                          control={
                            <MintCheckbox
                              disabled={
                                slot.status === 1 || isDisabled(slot)
                                  ? true
                                  : false
                              }
                              label=""
                              onChange={(e) =>
                                handleChecboxChange(e, slot?.id!)
                              }
                              checked={
                                slot.status === 1 || isDisabled(slot)
                                  ? false
                                  : checkedItems.includes(slot?.id!)
                              }
                              inputProps={{ "aria-label": `item-${index}` }}
                            />
                          }
                          label={toLocalDatetime(slot?.startTime, slot?.endTime)}
                        />
                      </Box>
                    )
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Box>
      </MintDialogContent>
      <MintDialogActions
        borderTop="1px solid rgba(10, 24, 38, 0.08)"
        background="#FFF"
        sx={{
          display: "flex",
          padding: 2,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          alignSelf: "stretch",
        }}
      >
        <Box>
          <MintButton
            size="medium"
            variant="text"
            color="accentPrimary"
            onClick={onDisagree}
          >
            <MintTypography
              size="body"
              weight="500"
              color={(theme) => theme.mint.color.text.accent}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.modalOffer.disagreeButtonName")}
            </MintTypography>
          </MintButton>
          <MintButton
            size="medium"
            variant="contained"
            onClick={handleOffer}
            data-testid="offer-button"
            sx={{
              background: (theme) =>
                theme.mint.color.surfaceAccent.primary.primary,
            }}
          >
            <MintTypography
              size="body"
              weight="500"
              color={(theme) => theme.mint.color.text.highInverse}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.modalOffer.agreeButtonName")}
            </MintTypography>
          </MintButton>
        </Box>
      </MintDialogActions>
    </MintDialog>
  );
};

export default OfferSchedule;
