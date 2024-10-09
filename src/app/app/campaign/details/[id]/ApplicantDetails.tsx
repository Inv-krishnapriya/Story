import {
  childrenRadios,
  genderRadios,
  marriedRadios,
} from "@/utils/dropdown.data";
import EditNoteModal from "@/components/Modal/EditNoteModal";
import { TonalButton } from "@/components/UI/button/button";
import { FilterSvgIcon, VectorSvgIcon } from "@/components/UI/icons/Icon";
import { H6 } from "@/components/UI/typography/Typography";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableRow,
  styled,
  useTheme,
  LinearProgress,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DisplaySettingsModal from "./DisplaySettingsModal";
import SendOffModal from "./SendOffModal";
import {
  MintBadge,
  MintButton,
  MintCheckbox,
  MintTooltip,
  MintTypography,
  PencilIcon,
  errorToast,
  successToast,
} from "@/design-system";
import { customerService, generalServices } from "@/common/apiUrls";
import FilterModal from "./FilterModal";
import OfferSchedule from "./OfferSchedule";
import AppliedMonitorDrawer from "./Drawer";
import DoubleScrollbar from "@/components/UI/scrollbar/DoubleScrollbar";
import moment from "moment";
import BroadCastMessage from "./BroadcastMessage";
import { getErrorMessage } from "@/utils";
import { useDispatch } from "react-redux";
import { setCampaignDetails, setCampaignDetailsPageination } from "@/stores/data/reducer";


interface IApplicantData {
  campaignDetails: any;
  handleCampaign: (id: any, filter?: object) => void;
  isFetching: boolean;
  filterData:object;
  setFilterData:Dispatch<SetStateAction<object>>
  setPageNumber: Dispatch<SetStateAction<number>>
 

}

export interface IMonitorData {
  id: string;
  name: string;
}

function ApplicantDetails({
  campaignDetails,
  handleCampaign,
  isFetching,
  setPageNumber,
  filterData,
  setFilterData

}: IApplicantData) {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [columnDisplay, setColumnDisplay] = useState<boolean>(false);
  const [sendOffModal, setSendOffModal] = useState<boolean>(false);
  const [offerModal, setOfferModal] = useState<boolean>(false);
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [applicantList, setApplicantList] = useState<IMonitorData[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<boolean>(false);

  const [profession, setProfession] = useState<[]>([]);
  const [prefectures, setPrefectures] = useState<[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [monitorData, setMonitorData] = useState<any>(null);
  const [monitors, setMonitors] = useState<any>(campaignDetails?.monitors);
  const [limitReached, setLimitReached] = useState<boolean>(false);
  
   const theme = useTheme();
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setColumnDisplay(true);
  };

  useEffect(() => {
    if (campaignDetails?.monitors) {
      setMonitors(campaignDetails?.monitors);
      let confirmedMonitors = campaignDetails?.monitors?.filter(
        (item: any) =>
          item?.monitorStatus === 6 ||
          (item?.monitorStatus === 8 &&
            (item?.timeSlotDetails?.consumedStatus === 2 ||
              item?.timeSlotDetails?.consumedStatus === 6)) ||
          (item?.monitorStatus === 4 &&
            (item?.timeSlotDetails?.consumedStatus === 2 ||
              item?.timeSlotDetails?.consumedStatus === 6)) ||
          item?.monitorStatus === 2
      );
      console.log(confirmedMonitors);
      if (campaignDetails?.monitorsCount === confirmedMonitors?.length) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    }
    console.log("campaign details: ", campaignDetails);
  }, [campaignDetails]);
  const screeningTableHeading = useMemo(
    () =>
      campaignDetails?.screening?.question?.map((item: any, index: number) => {
        return {
          key: `campaign.campaignDetail.th.question${index + 1}`,
          value: 10 + index,
          style: { width: "88px" },
        };
      }) ?? [],
    [campaignDetails?.screening?.question]
  );

  console.log(
    screeningTableHeading,
    campaignDetails?.screening?.question,
    "campaignTableHeading"
  );

  const tableHeaders = [
    {
      key: "campaign.campaignDetail.th.memo",
      value: 0,
      style: { width: "141px" },
    },
    {
      key: "campaign.campaignDetail.th.gender",
      value: 1,
      style: { width: "60px" },
    },
    {
      key: "campaign.campaignDetail.th.age",
      value: 2,
      style: { width: "92px" },
    },
    {
      key: "campaign.campaignDetail.th.prefecture",
      value: 3,
      style: { width: "88px" },
    },
    {
      key: "campaign.campaignDetail.th.maritalstatus",
      value: 4,
      style: { width: "74px" },
    },
    {
      key: "campaign.campaignDetail.th.childrenpresence",
      value: 5,
      style: { width: "88px" },
    },
    {
      key: "campaign.campaignDetail.th.profession",
      value: 6,
      style: { width: "88px" },
    },
    {
      key: "campaign.campaignDetail.th.personalincome",
      value: 7,
      style: { width: "88px" },
    },
    {
      key: "campaign.campaignDetail.th.householdincome",
      value: 8,
      style: { width: "88px" },
    },
    {
      key: "campaign.campaignDetail.th.implementationdate",
      value: 9,
      style: { width: "88px" },
    },
    ...screeningTableHeading,
  ];
  console.log(tableHeaders, "tableHeaders");
  useEffect(() => {
    setVisibleColumns(tableHeaders?.map((item) => item.value));
  }, [screeningTableHeading]);
  const [visiblecolumns, setVisibleColumns] = useState(() => {
    return tableHeaders?.map((item) => item.value);
  });

  console.log(visiblecolumns, "visiblecolumns");

  const toggleCoulmnVisibility = (header: number) => {
    if (header !== 100 && header !== 0) {
      setVisibleColumns((prevVisibleCoulmn) => {
        if (prevVisibleCoulmn?.includes(header)) {
          return prevVisibleCoulmn?.filter((item) => item !== header);
        } else {
          return [...prevVisibleCoulmn, header];
        }
      });
    } else if (header === 0) {
      setVisibleColumns(tableHeaders.map((item) => item.value));
    } else {
      setVisibleColumns((prev) => {
        return prev.filter((item) => item === 0);
      });
    }
  };

  const onCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: string,
    name: string
  ) => {
    const { checked } = e?.target;

    if (checked) {
      setApplicantList((prevState) => [...prevState, { id: id, name: name }]);
    } else {
      setApplicantList(
        (preState) => preState?.filter((item) => item?.id !== id)
      );
    }
    console.log(applicantList, index, id, name);
    if (checkedItems?.includes(index)) {
      setCheckedItems(
        (preState) => preState?.filter((checked) => checked !== index)
      );
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const handleSendOff = () => {
    let data = JSON.stringify({
      monitorId: applicantList?.map((monitor) => monitor?.id),
    });
    let campaignId = campaignDetails?.id;
    customerService
      .sendOff(campaignId, data)
      .then((response) => {
        resetApplicantList();
        console.log("Response from sendoff API : ", response);
        setSendOffModal(false);
        handleCampaign(campaignId);
        successToast(t("campaign.campaignDetail.modalsendoff.success"));
      })
      .catch((error) => {
        console.log("Error occured during monitor sendoff : ", error);
        setSendOffModal(false);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };

  useEffect(() => {
    generalServices
      .getProfession()
      .then((response) => {
        setProfession(
          response?.data?.data?.sort(
            (a: { order: number }, b: { order: number }) => a?.order - b?.order
          )
        );
      })
      .catch((error) => {
        console.log("Error occured in listing occupation: ", error);
      });
    generalServices
      .getPrefectures()
      .then((response) => {
        setPrefectures(
          response?.data?.data?.areas?.sort(
            (a: { order: number }, b: { order: number }) => a?.order - b?.order
          )
        );
      })
      .catch((error) => {
        console.log("Error occured in listing prefectures: ", error);
      });
  }, []);

  const handleFilter = async () => {
    if (profession?.length > 0 && prefectures?.length > 0) {
      setFilter(true);
    }
  };
  const handleFilterData = (campaignId: string, formData: any) => {
    setPageNumber(1)
    formData.status = 1;
    setFilterData(formData);
    console.log("Pages:22222",formData);

    customerService
      .getFilterData(campaignId, formData)
      
      
      .then((response: any) => {
        console.log("Response from API  apll: ", response?.data?.data);
        dispatch(setCampaignDetails(response?.data?.data))
        dispatch(setCampaignDetailsPageination(response?.data?.pages))
        console.log("Pages: ", response?.data?.pages);
        
        setMonitors(response?.data?.data?.monitors);
        setFilter(false);
      })
      .catch((error) => {
        console.log("Error occured in filtering : ", error);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
        setFilter(false);
      });
  };

  const openDrawer = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    data: any
  ) => {
    e.stopPropagation();
    const answers = data?.answer;
    const questions = campaignDetails?.screening?.question;
    const timeslotsList = campaignDetails?.timeslotsList;

    const questionWithAnswer = questions
      ? questions?.map((question: any, index: number) => ({
          questionText: question?.questionText,
          answer: answers[index],
        }))
      : [];

    setMonitorData({
      campaignId: campaignDetails?.id,
      id: data?.id,
      name: data?.nickName,
      status: data?.monitorStatus,
      confirmedStatus: data?.timeSlotDetails?.consumedStatus,
      answers: questionWithAnswer,
      timeslotsList: timeslotsList,
      monitorDetail: {
        memo: data?.memo,
        gender: data?.gender,
        age: data?.age,
        occupation: data?.occupation,
        prefecture: data?.prefecture,
      },
      meetingDetails: {
        url: data?.meetingDetails?.link,
        id: data?.meetingDetails?.id,
        passcode: data?.meetingDetails?.passCode,
        meetingId: data?.meetingDetails?.meetingId,
      },
      unreadCount: data?.unreadCount,
      scheduleConfirmationDetails: data?.timeSlotDetails,
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    console.log("Drawer close called!");
    handleCampaign(campaignDetails?.id, filterData);
    setIsDrawerOpen(false);
  };

  const getOfferStatusCheck = () => {
    let scheduleAdjustedMonitors = [];

    if (checkedItems?.length > 0) {
      applicantList?.map((item) => {
        const monitorFound = campaignDetails?.monitors?.find(
          (monitor: any) => monitor?.id === item?.id
        );
        if (
          monitorFound &&
          (limitReached ||
            monitorFound?.monitorStatus === 5 ||
            monitorFound?.monitorStatus === 3 ||
            monitorFound?.monitorStatus === 6 ||
            monitorFound?.monitorStatus === 4 ||
            monitorFound?.monitorStatus === 8 ||
            monitorFound?.monitorStatus === 2)
        ) {
          scheduleAdjustedMonitors.push(monitorFound);
        }
      });
    }
    if (scheduleAdjustedMonitors?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const getSendoffStatusCheck = () => {
    let scheduleAdjustedMonitors = [];
    if (checkedItems?.length > 0) {
      applicantList?.map((item) => {
        const monitorFound = campaignDetails?.monitors?.find(
          (monitor: any) => monitor?.id === item?.id
        );
        if (
          monitorFound &&
          (monitorFound?.monitorStatus === 6 ||
            monitorFound?.monitorStatus === 3 ||
            monitorFound?.monitorStatus === 4 ||
            monitorFound?.monitorStatus === 8 ||
            monitorFound?.monitorStatus === 2)
        ) {
          scheduleAdjustedMonitors?.push(monitorFound);
        }
      });
    }
    if (scheduleAdjustedMonitors?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const getMessageStatusCheck = () => {
    let scheduleAdjustedMonitors = [];
    if (checkedItems?.length > 0) {
      applicantList?.map((item) => {
        const monitorFound = campaignDetails?.monitors?.find(
          (monitor: any) => monitor?.id === item?.id
        );
        if (
          monitorFound &&
          (monitorFound?.monitorStatus === 4 ||
            monitorFound?.monitorStatus === 3 ||
            monitorFound?.monitorStatus === 8 ||
            monitorFound?.monitorStatus === 2)
        ) {
          scheduleAdjustedMonitors?.push(monitorFound);
        }
      });
    }
    if (scheduleAdjustedMonitors?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleOfferModalChange = () => {
    console.log("Inside offer modal initiate block");
    setOfferModal(true);
  };

  const handleFilterClear = () => {
    console.log("Handling filter clear options");
    customerService
      .getFilterData(campaignDetails?.id, { status: 1 })
      .then((response: any) => {
        console.log("Response from api: ", response);
        setMonitors(response?.data?.data?.monitors);
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
    // setFilter(false);
  };

  const scrollRef = useRef();
  console.log(scrollRef, "ref");

  monitors?.answer?.map((item: any) => {
    console.log(item);
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.checked);
    if (e?.target?.checked && checkedItems?.length === 0) {
      console.log("Inside if");

      setCheckedItems(monitors.map((item: any, index: any) => index));
      const monitorsSelected = monitors?.map((item: any) => {
        return {
          id: item?.id,
          name: item?.nickName,
        };
      });
      console.log(monitorsSelected);

      setApplicantList(monitorsSelected);
    } else if (e.target.checked && checkedItems?.length > 0) {
      console.log("Inside eles-if");

      setCheckedItems([]);
      setApplicantList([]);
    } else {
      console.log("Inside else");

      setCheckedItems([]);
      setApplicantList([]);
    }
  };

  const handleMessageModalChange = () => {
    setMessageModal(true);
  };

  const resetApplicantList = () => {
    setCheckedItems([]);
    setApplicantList([]);
  };

  const handleOfferModalClose = () => {
    setOfferModal(false);
    resetApplicantList();
  };

  const handleMessageModalClose = () => {
    setMessageModal(false);
    resetApplicantList();
  };
  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time).local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };

  return (
    <Box
      p={3}
      borderRadius={"var(--mm-radius-xl)"}
      bgcolor={"var(--mm-background-container-bg)"}
      pb={10}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <H6
          sx={{
            fontWeight: 400,
            lineHeight: "150%",
            color: "var(--mm-text-high)",
          }}
        >
          {monitors?.length}
          {t("campaign.campaignDetail.itemCount")}
        </H6>
        <Box display={"flex"} gap={1}>
          <MintButton
            variant="outlined"
            id="basic-button"
            color="gray"
            size="small"
            aria-controls={columnDisplay ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={columnDisplay ? "true" : undefined}
            startIcon={<VectorSvgIcon sx={{ fill: "var(--mm-text-medium)" }} />}
            onClick={handleClick}
            data-testid="click-button"
          >
            {t("campaign.campaignDetail.columnDisplay")}
          </MintButton>

          <MintButton
            variant="outlined"
            size="small"
            color="gray"
            startIcon={<FilterSvgIcon sx={{ fill: "var(--mm-text-medium)" }} />}
            onClick={handleFilter}
            data-testid="filter-button"
          >
            {t("campaign.campaignDetail.filter")}
          </MintButton>
        </Box>
      </Stack>
      {checkedItems?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            padding: "4px 16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            borderRadius: "var(--mm-radius-s)",
            bgcolor: "var(--mm-background-container-bg-layer-2)",
            mt: 2,
          }}
        >
          <H6>
            {checkedItems?.length}
            {t("campaign.campaignDetail.itemschecked")}
          </H6>
          <Box display={"flex"} gap={1}>
            <MintButton
              size="small"
              disabled={getOfferStatusCheck() ? true : false}
              variant="outlined"
              sx={{
                color: getOfferStatusCheck()
                  ? theme.mint.color.text.disabled
                  : theme.mint.color.text.accent,
                border: getOfferStatusCheck()
                  ? "1px solid rgba(10, 24, 38, 0.15)"
                  : "1px solid #162987",
              }}
              onClick={handleOfferModalChange}
            >
              {t("campaign.campaignDetail.offerDate")}
            </MintButton>

            <MintButton
              disabled={getMessageStatusCheck() ? true : false}
              size="small"
              variant="outlined"
              sx={{
                color: getMessageStatusCheck()
                  ? theme.mint.color.text.disabled
                  : theme.mint.color.text.accent,
                border: getMessageStatusCheck()
                  ? `1px solid rgba(10, 24, 38, 0.15)`
                  : "1px solid #162987",
              }}
              onClick={handleMessageModalChange}
            >
              {t("campaign.campaignDetail.message")}
            </MintButton>
            <MintButton
              disabled={getSendoffStatusCheck() ? true : false}
              variant="outlined"
              size="small"
              sx={{
                color: getSendoffStatusCheck()
                  ? theme.mint.color.text.disabled
                  : theme.mint.color.text.accent,
                border: getSendoffStatusCheck()
                  ? `1px solid rgba(10, 24, 38, 0.15)`
                  : "1px solid #162987",
              }}
              onClick={() => setSendOffModal(true)}
              data-testid="sendoff-button"
            >
              {t("campaign.campaignDetail.sendOff")}
            </MintButton>
          </Box>
        </Box>
      )}

      <DoubleScrollbar
        rootContainerStyle={{
          marginLeft: "294px",
          whiteSpace: "nowrap",
          mt: "8px",
        }}
        enableScrollRight
        showTooltip
        tooltipProps={{
          title: (
            <div>
              {t("campaign.campaignDetail.tooltip.top-scrollbar.content1")}
              <br></br>
              {t("campaign.campaignDetail.tooltip.top-scrollbar.content2")}
            </div>
          ),
          placement: "top",
        }}
      >
        <Table
          sx={{
            borderCollapse: "inherit",
            padding: "10px 0px",
            width: "auto",
            "*marginLeft": "-100px",
            borderSpacing: "0px !important",
            marginRight: "35px",
            
          }}
        >
          <TableBody>
            <TableRow>
              <TableHeadCell
                className="hard_left"
                component={"th"}
                sx={{
                  width: "44px",
                  position: "absolute",

                  left: "0",
                  padding: checkedItems?.length > 0 ? "8px 12px" : "8px 16px",
                }}
              >
                <MintCheckbox
                  checked={checkedItems?.length === monitors?.length}
                  onChange={(e) => handleSelectAll(e)}
                  indeterminate={checkedItems?.length > 0}
                  inputProps={{ "aria-label": "all-checked" }}
                />
              </TableHeadCell>
              <TableHeadCell
                className="next_left"
                component={"th"}
                sx={{
                  width: "104px",
                  left: "43px",
                  position: "absolute",
                }}
              >
                {t("campaign.campaignDetail.th.status")}
              </TableHeadCell>
              <TableHeadCell
                className="next_third"
                component={"th"}
                sx={{
                  width: "148px",
                  left: "146px",
                  position: "absolute",
                  borderRight: "1px solid var(--mm-border-low)",
                }}
              >
                {t("campaign.campaignDetail.th.nickname")}
              </TableHeadCell>
              {tableHeaders?.map((header) => {
                return (
                  <TableHeadCell
                    key={header?.key}
                    component={"th"}
                    sx={{
                      display: visiblecolumns?.includes(header?.value)
                        ? "auto"
                        : "none",
                      ...header.style,
                    }}
                  >
                    {t(header?.key)}
                  </TableHeadCell>
                );
              })}
            </TableRow>
            {(!isFetching || monitors?.length > 0) &&
              monitors?.map?.((monitor: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    onClick={(e) => openDrawer(e, monitor)}
                    data-testid="drawer-open"
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.mint.color.surfaceGray.componentBg.hover,
                      },
                    }}
                  >
                    <TableBodyCell
                      className="hard_left"
                      sx={{
                        borderRight: "none",
                        borderLeft: "none",
                        width: "44px",
                        position: "absolute",
                        left: "0",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        height={"100%"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MintCheckbox
                          onChange={(e) => {
                            onCheckChange(
                              e,
                              index,
                              monitor?.id,
                              monitor?.nickName
                            );
                          }}
                          checked={checkedItems?.includes(index)}
                          inputProps={{ "aria-label": `item-${index}` }}
                        />
                      </Box>
                    </TableBodyCell>
                    <TableBodyCell
                      className="next_left"
                      sx={{
                        borderRight: "none",
                        borderLeft: "none",
                        width: "104px",
                        left: "43px",
                        position: "absolute",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        height={"100%"}
                      >
                        {monitor.monitorStatus === 1 && (
                          <TonalButton tonalVariant="teal">
                            {t("campaign.campaignDetail.monitorStatus.applied")}
                          </TonalButton>
                        )}
                        {(monitor?.monitorStatus === 3 ||
                          monitor?.monitorStatus === 4 ||
                          monitor?.monitorStatus === 8) && (
                          <TonalButton tonalVariant="gray">
                            {t("campaign.campaignDetail.monitorStatus.sendOff")}
                          </TonalButton>
                        )}
                        {monitor?.monitorStatus === 5 && (
                          <TonalButton tonalVariant="yellow">
                            {t(
                              "campaign.campaignDetail.monitorStatus.scheduleAdjusted"
                            )}
                          </TonalButton>
                        )}
                        {monitor?.monitorStatus === 6 && (
                          <TonalButton tonalVariant="orange">
                            {t(
                              "campaign.campaignDetail.monitorStatus.scheduleConfirmed"
                            )}
                          </TonalButton>
                        )}
                        {monitor?.monitorStatus === 2 && (
                          <TonalButton tonalVariant="gray">
                            {t(
                              "campaign.campaignDetail.monitorStatus.completed"
                            )}
                          </TonalButton>
                        )}
                      </Box>
                    </TableBodyCell>
                    <TableBodyCell
                      className="next_third"
                      sx={{
                        wordBreak: "break-all",
                        overflowWrap: "break-word",
                        whiteSpace: "initial",
                        borderLeft: "none",
                        width: "148px",
                        left: "146px",
                        padding: "10px 16px",
                        position: "absolute",
                        borderRight: "1px solid var(--mm-border-low)",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        height={"100%"}
                        gap={1}
                      >
                        <Box
                          sx={{
                            display: monitor?.notificationExist
                              ? "flex"
                              : "none",
                          }}
                        >
                          <MintBadge color="error" />
                        </Box>
                        {monitor?.nickName}
                      </Box>
                    </TableBodyCell>
                    <TableCellData
                      data={monitor?.memo}
                      id={monitor?.id}
                      campaignId={campaignDetails?.id}
                      monitorStatus={monitor?.monitorStatus}
                      handleCampaign={handleCampaign}
                      handleFilterClear={handleFilterClear}
                      filterData={filterData}
                    />
                    <TableBodyCell
                      hide={!visiblecolumns.includes(1)}
                      sx={{
                        textAlign: monitor?.gender !== 0 ? "initial" : "center",
                      }}
                    >
                      {monitor?.gender !== 0
                        ? t(
                            genderRadios
                              .filter((item) => item.value === monitor?.gender)
                              .map((item) => item.label)
                          )
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(2)}
                      sx={{
                        textAlign: monitor?.age ? "initial" : "center",
                      }}
                    >
                      {monitor?.age ? monitor?.age : "-"}{" "}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(3)}
                      sx={{
                        textAlign: monitor?.prefecture ? "initial" : "center",
                      }}
                    >
                      {" "}
                      {monitor?.prefecture ? monitor?.prefecture : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(4)}
                      sx={{
                        textAlign:
                          monitor?.isMarried !== 0 ? "initial" : "center",
                      }}
                    >
                      {monitor?.isMarried !== 0
                        ? t(
                            marriedRadios
                              ?.filter(
                                (item) => item.value === monitor?.isMarried
                              )
                              .map((item) => item.label)
                          )
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(5)}
                      sx={{
                        textAlign:
                          monitor?.hasChildren !== 0 ? "initial" : "center",
                      }}
                    >
                      {" "}
                      {monitor?.hasChildren !== 0
                        ? t(
                            childrenRadios
                              .filter(
                                (item) => item.value === monitor?.hasChildren
                              )
                              .map((item) => item.label)
                          )
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(6)}
                      sx={{
                        textAlign: monitor?.occupation ? "initial" : "center",
                      }}
                    >
                      {monitor?.occupation ? monitor?.occupation : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(7)}
                      sx={{
                        textAlign: monitor?.personalIncome
                          ? "initial"
                          : "center",
                      }}
                    >
                      {monitor?.personalIncome
                        ? monitor?.personalIncome + `万`
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(8)}
                      sx={{
                        textAlign: monitor?.householdIncome
                          ? "initial"
                          : "center",
                      }}
                    >
                      {monitor?.householdIncome
                        ? monitor?.householdIncome + `万`
                        : "-"}
                    </TableBodyCell>
                    <TableBodyCell
                      hide={!visiblecolumns?.includes(9)}
                      sx={{
                        textAlign:
                          monitor?.timeSlotDetails?.id !== ""
                            ? "initial"
                            : "center",
                      }}
                    >
                      {monitor?.timeSlotDetails?.id !== ""
                        ? toLocalDatetime(
                            monitor?.timeSlotDetails?.startTime,
                            monitor?.timeSlotDetails?.endTime
                          )
                        : ""}
                    </TableBodyCell>

                    {monitor?.answer !== null &&
                      monitor?.answer?.map((answer: any, index: any) =>
                        answer !== null ? (
                          <TableBodyCell
                            sx={{
                              maxWidth: "200px",
                            }}
                            hide={!visiblecolumns.includes(index + 10)}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                width: "200px",
                                minWidth: "150px",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                position: "relative",
                                marginRight: "8px",
                                paddingRight: 2,
                              }}
                            >
                              <MintTypography
                                size="body"
                                weight="400"
                                sx={{
                                  lineHeight: "150%",
                                  overflow: "hidden",
                                  width: "100%",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {" "}
                                <MintTooltip
                                  arrow={false}
                                  sx={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "92px",
                                    color: (theme) =>
                                      theme.mint.color.text.highInverse,
                                  }}
                                  title={answer?.join(", ")}
                                >
                                  <Box
                                    component={"p"}
                                    sx={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      width: "100%",
                                    }}
                                  >
                                    {answer?.join(", ")}
                                  </Box>
                                </MintTooltip>
                              </MintTypography>
                            </Box>
                          </TableBodyCell>
                        ) : (
                          <TableBodyCell
                            hide={!visiblecolumns?.includes(index + 10)}
                            sx={{
                              textAlign: "center",
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {"-"}
                          </TableBodyCell>
                        )
                      )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        
      </DoubleScrollbar>
      {isFetching && monitors?.length === 0 && (
        <Stack
          justifyContent={"center"}
          height={"100px"}
          data-testid="progress-bar"
        >
          <LinearProgress />
        </Stack>
      )}

      {columnDisplay && (
        <DisplaySettingsModal
          campaignDetails={campaignDetails}
          anchorEl={anchorEl}
          open={columnDisplay}
          onClose={() => setColumnDisplay(false)}
          toggleCoulmnVisibility={toggleCoulmnVisibility}
          visiblecolumns={visiblecolumns}
        />
      )}

      {sendOffModal && (
        <SendOffModal
          open={sendOffModal}
          onClose={() => setSendOffModal(false)}
          onAgree={handleSendOff}
          onDisagree={() => setSendOffModal(false)}
          applicantList={applicantList}
        />
      )}

      {filter && (
        <FilterModal
          open={filter}
          onClose={() => setFilter(false)}
          onDisagree={handleFilterClear}
          profession={profession}
          prefectures={prefectures}
          campaignId={campaignDetails?.id}
          handleFilterData={handleFilterData}
        />
      )}

      {offerModal && (
        <OfferSchedule
          open={offerModal}
          onClose={handleOfferModalClose}
          onDisagree={() => setOfferModal(false)}
          applicantList={applicantList}
          timeslotList={campaignDetails?.timeslotsList}
          campaignId={campaignDetails?.id}
          handleCampaign={handleCampaign}
        />
      )}

      {isDrawerOpen && (
        <AppliedMonitorDrawer
          closeDrawer={closeDrawer}
          open={isDrawerOpen}
          campaignDetail={{
            campaignId: campaignDetails?.id,
            duration: campaignDetails?.duration,
            startDate: campaignDetails?.startsAt,
            endDate: campaignDetails?.endsAt,
          }}
          limitReached={limitReached}
          monitorData={monitorData}
          handleCampaign={handleCampaign}
        />
      )}

      {messageModal && (
        <BroadCastMessage
          open={messageModal}
          onClose={handleMessageModalClose}
          onDisagree={handleMessageModalClose}
          applicantList={applicantList}
          campaignId={campaignDetails?.id}
          handleCampaign={handleCampaign}
        />
      )}
    </Box>
  );
}

const TableCellData = ({
  data,
  id,
  campaignId,
  handleCampaign,
  monitorStatus,
  handleFilterClear,
  filterData,
}: {
  data: string;
  id: string;
  campaignId: string;
  handleCampaign: (id: any, filter: object) => void;
  monitorStatus: number;
  handleFilterClear: () => void;
  filterData: object;
}) => {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [memo, setMemo] = useState<string>(data?.length > 0 ? data : "");

  const onModalOPen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(true);
  };

  const updateMemo = (memoe: string) => {
    setMemo(memoe);
  };

  const onModalClose = () => {
    setModal(false);
    setHover(false);
  };

  return (
    <TableBodyCell
      sx={{
        padding: 0,
        borderRight: "1px solid var(--mm-border-low)",
        borderBottom: "1px solid var(--mm-border-low)",
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "240px",
          minWidth: "241px",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          position: "relative",
          marginRight: "8px",
        }}
      >
        <MintTypography
          size="body"
          weight="400"
          sx={{
            lineHeight: "150%",
            overflow: "hidden",
            width: "100%",
            textOverflow: "ellipsis",
          }}
        >
          <MintTooltip
            arrow={false}
            sx={{
              position: "absolute",
              left: "16px",
              top: "92px",
              color: (theme) => theme.mint.color.text.highInverse,
            }}
            title={data}
          >
            <Box
              component={"p"}
              sx={{
                padding: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: data ? "initial" : "center",
              }}
            >
              {data ? data : "-"}
            </Box>
          </MintTooltip>
        </MintTypography>
        <Box
          sx={{
            display: hover && monitorStatus !== 3 ? "flex" : "none",
            position: "static",
            width: "24px",
            height: "24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            flexShrink: "0",
            borderRadius: "50%",
            border: "1px solid var(--mm-border-high)",
            cursor: "pointer",
          }}
          onClick={(e) => onModalOPen(e)}
        >
          <PencilIcon size={16} />
        </Box>
      </Box>

      <EditNoteModal
        open={modal}
        onClose={onModalClose}
        data={data}
        monitorId={id}
        campaignId={campaignId}
        setMemo={updateMemo}
        memo={memo}
        handleCampaign={(id: any) => {
          handleCampaign(id, filterData);
        }}
      />
    </TableBodyCell>
  );
};

export default ApplicantDetails;

const TableCell = styled(MuiTableCell)(() => ({
  borderBottom: "none",
  borderTop: "1px solid #0a182614",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
}));

const TableBodyCell = styled(MuiTableCell)<{ hide?: boolean }>(({ hide }) => ({
  borderRight: "1px solid var(--mm-border-low)",
  borderBottom: "1px solid var(--mm-border-low)",

  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  height: "67px",
  display: hide ? "none" : "auto",
}));
const TableHeadCell = styled(MuiTableCell)(() => ({
  height: "44px",
  padding: "8px 16px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",
}));
