"use client";

import { Box, Grid,SelectChangeEvent,Stack, useTheme } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import "dayjs/locale/ja";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { researchService, ticketService } from "@/common/apiUrls";
import {
  updateCampaigns,
  updateConsumedTickets,
  updatePreviewModeValue,
  updateTickets,
} from "@/stores/global/reducer";
import { actions as QuestionOptionActions } from "@/stores/survey/reducer";
import {
  addSchedule,
  addSelectedDuration,
  addSlot,
  removeAllSchedule,
  removeAllSlots,
  resetState,
} from "@/stores/interview/reducer";
import TabPanel from "@/components/UI/tabs/tab-panel/TabPanel";
import Tabs from "@/components/UI/tabs/tab/Tab";
import CampaignListTable from "@/components/tables/CampaignListTable";
import { DRAFTED_CAMPAIGN_LIMIT } from "../../../../Constants";
import {
  resetDataState,
  updateCampaign,
  updateCampaignId,
} from "@/stores/data/reducer";
import {
  FilterOutlinedIcon,
  MintButton,
  MintLink,
  MintSelectField,
  MintTextField,
  MintTypography,
  errorToast,
  successToast,
} from "@/design-system";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import DataTable, { IDataTableColumn } from "@/components/tables/DataTable";
import { actions as campaignActions } from "@/stores/campaign/reducer";
import { campaignListSelector } from "@/stores/campaign/selector";
import { PlusSvgIcon } from "@/components/UI/icons/Icon";
import { checkIfLoading } from "@/stores/ui/selector";

import { addDate } from "@/stores/interview/datereducer";
import useToggle from "@/hooks/useToggle";
import NoDataFound from "@/components/Common/NoDataFound";
import { getErrorMessage } from "@/utils";
import { log } from "console";
import Dropdown from "@/components/Dropdown/Dropdown";
import { InterviewSortdata, InterviewStatusdata } from "@/utils/common.data";





export default function Campaign() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [draftModal, setDraftModal] = useState<boolean>(false);
  const [ticketModal, setTicketModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState(0);
  const [deleteModal, toggleDeleteModal] = useToggle();
  const [campaignToDelete, setCampaignToDelete] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusType, setStatusType] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const theme = useTheme(); 

  const isFetching = useSelector(
    checkIfLoading(campaignActions.getCampaignListRequest.type)
  );
  const campaignListSelectorData = useSelector(campaignListSelector);
  const campaignData = campaignListSelectorData.data;

  dispatch(removeAllSchedule());
  dispatch(removeAllSlots());
  dispatch(updatePreviewModeValue(false));

  useLayoutEffect(() => {
    getCampaignListData(pageNumber, status);
  }, []);

  const handleCampaign = async (item: any) => {
    const { id: campaignId, status: campaignStatus } = item;
    dispatch(QuestionOptionActions.removeSurveyData());
    console.log(campaignId);
    await researchService
      .getCampaignDetail(campaignId)
      .then((response: any) => {
        console.log(campaignStatus, "campaignStatus");
        if (campaignStatus === 0) {
          const data = response?.data?.data;
          if (data !== "") {
            console.log(data?.startsAt, data?.endsAt);
            if (data?.startsAt !== "" && data?.endsAt !== "") {
              const start =
                data?.startsAt !== "" ? new Date(data?.startsAt) : undefined;
              const end =
                data?.endsAt !== "" ? new Date(data?.endsAt) : undefined;
              dispatch(addDate({ start: start!, end: end! }));
            }

            const surveyData = response?.data?.data?.screening;
            if (response?.data?.data?.hasScreening) {
              console.log("Inside screening true");

              const surveyObj: any = {
                createdAt: null,
                id: null,
                order: surveyData?.order,
                surveyStatus: 1,
                question: surveyData?.question?.map((quest: any) => {
                  return {
                    questionText: quest?.questionText,
                    type: quest?.type,
                    required: quest?.required,
                    order: quest?.order,
                    sequence: quest?.sequence,
                    options: quest?.options?.map((opt: any) => {
                      return {
                        optionsName: opt?.optionText,
                        order: opt?.order,
                      };
                    }),
                  };
                }),
              };
              dispatch(QuestionOptionActions.setSurveyData(surveyObj));
            }
            dispatch(updateCampaignId(data?.id));
            console.log(
              data?.personalIncomeStart,
              data?.personalIncomeEnd,
              data?.householdIncomeStart,
              data?.householdIncomeEnd
            );

            let formData = JSON.stringify({
              title: data.title,
              conditions: data.includeCondition,
              exclusion: data.excludeCondition,
              ngIndustries: data.industries,
              monitorscount: data.monitorsCount,
              duration: data?.interviewDurationId,
              gender: data?.gender,
              age: {
                lower: data?.ageFrom === 0 ? "" : data?.ageFrom,
                upper: data?.ageTo === 0 ? "" : data?.ageTo,
              },
              prefecture: data?.prefectures,
              married: data?.maritalStatus,
              children: data?.hasChildren,
              personalIncome: {
                lower:
                  data?.personalIncomeStart === 0
                    ? ""
                    : data?.personalIncomeStart,
                upper:
                  data?.personalIncomeEnd === 0 ? "" : data?.personalIncomeEnd,
              },
              householdIncome: {
                lower:
                  data?.householdIncomeStart === 0
                    ? ""
                    : data?.householdIncomeStart,
                upper:
                  data?.householdIncomeEnd === 0
                    ? ""
                    : data?.householdIncomeEnd,
              },
              profession: data?.occupation,
              screening: data?.screening,
            });

            if (data?.timeslotsList?.length > 0) {
              dispatch(removeAllSchedule());
              dispatch(removeAllSlots());
            }

            data?.timeslotsList?.map((item: any) => {
              console.log(
                new Date(
                  moment(item?.startTime, "DD-MM-YYYY HH:mm").format(
                    "YYYY-MM-DD HH:mm"
                  )
                ),
                new Date(item?.endTime)
              );
              dispatch(
                addSchedule({
                  start: new Date(
                    moment(item?.startTime, "DD-MM-YYYY HH:mm").format(
                      "YYYY-MM-DD HH:mm"
                    )
                  ),
                  end: new Date(
                    moment(item?.endTime, "DD-MM-YYYY HH:mm").format(
                      "YYYY-MM-DD HH:mm"
                    )
                  ),
                  title: "",
                })
              );
              dispatch(
                addSlot({
                  startTime: item.startTime.split(" ")[1],
                  endTime: item.endTime.split(" ")[1],
                  scheduledDate: item.startTime.split(" ")[0],
                })
              );
            });
            dispatch(addSelectedDuration(data?.duration));
            dispatch(updateConsumedTickets(data?.ticketsCount));
            dispatch(updateCampaign(formData));
            router.push("/app/interview");
          } else {
            errorToast(t("interview.api-error-info"));
          }
        } else {
          router.push(`/app/campaign/details/${campaignId}`);
        }
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        // router.push(`/app/campaign`);
        const message = getErrorMessage(error?.response?.data);
        errorToast(message);
      });
  };

  useEffect(() => {
    getTicketDetails();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
    getCampaignListData(value, status);
  };

  function getCampaignListData(page: number, status: number, searchQuery?: string ,sortType?:string) {
    const query = {
      page: page,
      status: status,
      ...(searchQuery && { searchQuery: searchQuery }), 
      ...(statusType && { statusType: statusType }),
      ...(sortType && { sortType: sortType })
    };
    dispatch(campaignActions.getCampaignListRequest({ query }));
  }

  const handleSearch = () => {
    console.log("button clicked");   
    getCampaignListData(pageNumber, status, searchInput);
  };

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const sortValue = event.target.value as string;
    setSortType(sortValue);
    getCampaignListData(pageNumber, status, searchInput,sortValue);
  };

  function checkButtonActivity() {
    if (
      userData !== undefined &&
      userData !== null &&
      userData !== "" &&
      Object.keys(userData?.tickets!)?.length !== 0
    ) {
      if (userData?.campaigns?.draftedCampaign === DRAFTED_CAMPAIGN_LIMIT) {
        setDraftModal(true);
        return true;
      }
    }
  }
 
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setStatus(newValue);
    setPageNumber(1);
    getCampaignListData(1, newValue);
    dispatch(campaignActions.restCampaignList([]));
    handleClear()
  };

  const handleCampaignCreation = () => {
    if (userData?.campaigns?.draftedCampaign === DRAFTED_CAMPAIGN_LIMIT) {
      setDraftModal(true);
    } else if (Object.keys(userData?.tickets!)?.length === 0) {      
      setTicketModal(true);
    } else {
      dispatch(QuestionOptionActions.removeSurveyData());
      dispatch(resetState());
      router.push("/app/campaign/creation");
    }
  };

  const getTicketDetails = () => {
    dispatch(resetDataState());
    ticketService
      .getUserDetails()
      .then((response) => {
        if (response) {
          setUserData(response?.data?.data);
          setIsDisabled(
            Object.keys(response.data?.data?.tickets)?.length === 0
          );
          dispatch(updateTickets(response.data?.data?.tickets));
          dispatch(updateCampaigns(response?.data?.data?.campaigns));
        }
      })
      .catch((error) => {
        // console.log("Error occured in get user info : ", error);
      });
  };
  const handleClear=()=>{
    console.log("button clicked");
    setSearchInput("");
    setSortType('');
    setStatusType('');
    // getCampaignListData(pageNumber, status, searchInput);
  }
  
  

  const handleDraftDeletion = (campaignId: string) => {
    console.log(campaignId);
    researchService
      .deleteDraftCampaign(campaignId)
      .then((response) => {
        console.log("Draft campaign deleted successfully", response);
        const query = {
          page: pageNumber,
          status: status,
        };
        dispatch(campaignActions.getCampaignListRequest({ query }));
        getTicketDetails();
        successToast(t("campaign.campaignList.delete-success"));
        setCampaignToDelete("");
        toggleDeleteModal();
      })
      .catch((error) => {
        console.log("Error occured during draft deletion : ", error);
        const message = getErrorMessage(error?.response?.data);
        errorToast(message);
        setCampaignToDelete("");
        toggleDeleteModal();
      });
  };

  const columns: IDataTableColumn[] = [
    {
      key: "implementationPeriod",
      header: "campaign.campaignList.tableHeader.implementationPeriod",
      Cell: (campaign: any) => {
        const startDate = campaign?.startsAt
          ? moment(campaign?.startsAt!).format("YYYY/MM/DD")
          : "";
        const endDate = campaign?.endsAt
          ? moment(campaign?.endsAt!).format("YYYY/MM/DD")
          : "";
        const implementationPeriod = `${startDate}</br>${endDate}`;
        return (
          <Box display={"flex"}>
            {startDate && endDate && (
              <>
                <Box display={"flex"} alignItems={"end"}>
                  ~
                </Box>
                <Box display={"flex"} alignItems={"end"}>
                  <p
                    dangerouslySetInnerHTML={{ __html: implementationPeriod }}
                  ></p>
                </Box>
              </>
            )}
          </Box>
        );
      },
      headerProps: {
        width: "117px",
      },
    },
    {
      key: "title",
      header: "campaign.campaignList.tableHeader.projectTitle",
      headerProps: {
        width: "545px",
      },
    },
    {
      key: "completedCount",
      header: "campaign.campaignList.tableHeader.noOfParticipants",
      cellProps: {
        align: "right",
        width: "88px",
      },
      headerProps: {
        align: "right",
        width: "56px",
      },
    },
    {
      key: "actions",
      header: "",
      headerProps: {
        width: "120px",
      },
      Cell: (item: any) => {
        const url = `/app/delivery/${item?.id}`;
        if (item?.isDeliverablesExist) {
          return <MintLink path={url}>納品動画を確認</MintLink>;
        }
      },
      avoidRowClick: () => true,
    },
  ];
  
  
  
console.log(InterviewStatusdata,"stringarray")

  return (
    <Box height={"100%"}>
    <Stack direction={"row"} justifyContent={"space-between"}>
      <MintTypography
        size="head-l"
        weight="700"
        sx={{
          fontStyle: "normal",
          lineHeight: "150%",
          fontFamily: "Roboto",
          color: (theme) => theme.mint.color.text.high,
        }}
      >
        {t("campaign.title")}
      </MintTypography>
      <MintButton
        variant="contained"
        size="medium"
        color="primary"
        onClick={handleCampaignCreation}
        data-testid="campaign-create"
      >
        <PlusSvgIcon />
        <MintTypography
          size="body"
          weight="500"
          sx={{
            fontStyle: "normal",
            lineHeight: "100%",
            fontFamily: "Roboto",
            color: (theme) => theme.mint.color.text.highInverse,
          }}
        >
          {t("campaign.button.create")}
        </MintTypography>
      </MintButton>
    </Stack>
    <Box pt={3}>
 
    <Box
        pt={3}
        px={3}
        mt={2}
        pb={2}
        borderRadius={"var(--mm-radius-xl)"}
        border={`1px solid var(--mm-border-low)`}
        bgcolor={"var(--mm-background-container-bg)"}
        
      >
    <Stack direction={"row"} justifyContent={"space-between"}>
    
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={2}>
      <MintSelectField 
        placeholder="Search campaign status"
        options={InterviewStatusdata}
        onChange={(e) => setStatusType((e.target as HTMLInputElement).value)}
        value={statusType}
        sx={{ width: '100%' }}
        data-testid="select-status"
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={2}>
      <MintSelectField 
        placeholder="Search campaign status"
        options={InterviewSortdata}
        onChange={handleSortChange}
        value={sortType}
        sx={{ width: '100%' }}
        data-testid="select-sort"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <MintTextField
        placeholder="Search campaigns"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ width: '100%' }}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={1}>
      <MintButton
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ width: '100%' }}
        data-testid="search"
      >
        <MintTypography
          size="body"
          weight="500"
          sx={{ fontStyle: "normal", lineHeight: "100%" }}
        >
           {t("campaign.button.search")}
        </MintTypography>
      </MintButton>
    </Grid>
    <Grid item xs={12} sm={6} md={1}>
  <MintButton
             variant="outlined"
            color="primary"
            onClick={handleClear}
          >
            <MintTypography
              size="body"
              weight="500"
              color={theme.mint.color.text.accent}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.filtersettings.disagreeButton")}
            </MintTypography>
          </MintButton></Grid>    
  </Grid>
  
 
</Stack>
</Box>
 <Tabs
          value={status}
          handleChange={handleChange}
          tabItems={[
            { label: "案件一覧", value: 0 },
            { label: "完了済み", value: 1 },
          ]}
          sx={{ pb: 2 }}
        />
        
        <TabPanel index={0} value={status}>
          {!isFetching && campaignData?.length === 0 ? (
            <Box pt={2}>
              <NoDataFound message={t("campaign.nopublishedproject")} />
            </Box>
          ) : (
            <CampaignListTable
              campaignData={campaignData}
              paginationData={campaignListSelectorData}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
              isFetching={isFetching}
              handleDraftDeletion={handleDraftDeletion}
              campaignToDelete={campaignToDelete}
              setCampaignToDelete={setCampaignToDelete}
              toggleDeleteModal={toggleDeleteModal}
              deleteModal={deleteModal}
            />
          )}
        </TabPanel>

        <TabPanel index={1} value={status}>
          {!isFetching && campaignData?.length === 0 ? (
            <Box pt={2}>
              <NoDataFound message={t("campaign.nounpublishedproject")} />
            </Box>
          ) : (
            <DataTable
              rowClick={handleCampaign}
              columns={columns}
              data={campaignData}
              paginationProps={{
                hasPagination: true,
                count: campaignListSelectorData?.totalPages,
                defaultPage: 1,
                page: pageNumber,
                onChange: handlePageChange,
              }}
              isFetching={campaignData?.length === 0 ? isFetching : false}
              noDataMessage="campaign.nounpublishedproject"
              showDoubleScroll
              fixedSizeTable
              tableContainerStyle={{
                minHeight: "69vh",
              }}
            />
          )}
        </TabPanel>
      </Box>
      

      {draftModal && (
        <ConfirmationModal
          open={draftModal}
          title="interview.draft-modal.header"
          content="interview.draft-modal.content"
          agreeButtonName="interview.draft-modal.agreeButton"
          disAgreeButtonName="interview.draft-modal.disAgreeButton"
          onDisagree={() => setDraftModal(false)}
          onAgree={() => {
            router.push("/app/campaign/creation");
          }}
          modalWidth="400px"
        />
      )}
      {ticketModal && (
        <ConfirmationModal
          open={ticketModal}
          title="interview.purchase-modal.header"
          content="チケット管理ページからチケットを購入してください。"
          agreeButtonName="チケットを購入"
          disAgreeButtonName="キャンセル"
          onDisagree={() => setTicketModal(false)}
          onAgree={() => {
            router.push("/app/ticket");
          }}
          modalWidth="400px"
        />
      )}
    </Box>
  );
}