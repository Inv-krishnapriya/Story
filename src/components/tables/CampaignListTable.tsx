"use client";
import { Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

import { TonalButton } from "../UI/button/button";
import { useRouter } from "next/navigation";
import { researchService } from "../../common/apiUrls";
import { useDispatch } from "react-redux";
import { actions as QuestionOptionActions } from "@/stores/survey/reducer";
import {
  addSchedule,
  addSelectedDuration,
  addSlot,
  removeAllSchedule,
  removeAllSlots,
} from "@/stores/interview/reducer";
import moment from "moment";
import { addDays } from "date-fns";
import { addDate } from "@/stores/interview/datereducer";
import { updateConsumedTickets } from "@/stores/global/reducer";
import { useTranslation } from "react-i18next";
import { updateCampaign, updateCampaignId } from "@/stores/data/reducer";
import { errorToast } from "../UI/toast";
import { DeleteSvgIcon } from "../UI/icons/Icon";
import useToggle from "@/hooks/useToggle";
import ConfirmationModal from "../Modal/confirmation/ConfirmationModal";
import DataTable, { IDataTableColumn } from "./DataTable";
import { MintButton, successToast } from "@/design-system";
import { getErrorMessage } from "@/utils";

type TCampaign = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  status: number;
  releaseDate: string;
  defaultLanguageId: string;
  monitorsCount: number;
  interviewDuration: number;
  monitorPoints: number;
  appliedMonitorCount: number;
  scheduleConfirmed: number;
  vacantSlots: number;
  completion: number;
};

function CampaignListTable({
  campaignData,
  handlePageChange,
  paginationData,
  pageNumber,
  isFetching,
  handleDraftDeletion,
  campaignToDelete,
  setCampaignToDelete,
  toggleDeleteModal,
  deleteModal,
}: Readonly<{
  campaignData: TCampaign[];
  paginationData: any;
  handlePageChange: any;
  pageNumber: number;
  isFetching: boolean;
  handleDraftDeletion: (campaignId: string) => void;
  campaignToDelete: string;
  setCampaignToDelete: Dispatch<SetStateAction<string>>;
  toggleDeleteModal: any;
  deleteModal: any;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCampaign = async (item: any) => {
    const { id: campaignId, status: campaignStatus } = item;
    dispatch(QuestionOptionActions.removeSurveyData());
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
              dispatch(addDate({ start: start!, end: end }));
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
            router.push(`/app/campaign/creation?id=${campaignId}`);
          } else {
            errorToast(t("interview.api-error-info"));
          }
        } else {
          router.push(`/app/campaign/details/${campaignId}`);
        }
      })
      .catch((error) => {
        console.log("Error occured: ", error);
        router.push(`/app/campaign`);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };

  const handleModalOpen = (e: React.MouseEvent, campaignId: string) => {
    console.log(e);
    setCampaignToDelete(campaignId);
    e.stopPropagation();
    toggleDeleteModal();
  };

  const handleDeletion = () => {
    handleDraftDeletion(campaignToDelete);
  };

  const columnData: IDataTableColumn[] = [
    {
      key: "status",
      header: "campaign.campaignList.tableHeader.status",
      Cell: (campaign: any) => {
        return (
          <>
            {campaign?.status === 1 && (
              <TonalButton tonalVariant="blue">募集中</TonalButton>
            )}
            {campaign?.status === 0 && (
              <TonalButton tonalVariant="yellow">公開前</TonalButton>
            )}
            {campaign?.status === 2 && (
              <TonalButton tonalVariant="blue">募集中</TonalButton>
            )}
            {campaign?.status === 3 && (
              <TonalButton tonalVariant="red">募集終了</TonalButton>
            )}
          </>
        );
      },
      headerProps: {
        width: "102px",
      },
    },
    {
      key: "title",
      header: "campaign.campaignList.tableHeader.projectTitle",
      headerProps: {
        width: "320px",
      },
      cellProps: {
        sx: {
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "initial",
        },
      },
    },
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
                <Box
                  display={"flex"}
                  alignItems={"end"}
                  dangerouslySetInnerHTML={{ __html: implementationPeriod }}
                ></Box>
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
      key: "releaseDate",
      header: "campaign.campaignList.tableHeader.releaseDate",
      Cell: (campaign: any) => {
        return (
          <>
            {campaign?.releaseDate !== ""
              ? moment(campaign?.releaseDate).format("YYYY/MM/DD")
              : ""}
          </>
        );
      },
      headerProps: {
        width: "107px",
      },
    },
    {
      key: "monitorsCount",
      header: "campaign.campaignList.tableHeader.noOfApllicants",
      cellProps: {
        align: "right",
      },
      headerProps: {
        width: "88px",
      },
    },
    {
      key: "appliedMonitorCount",
      header: "campaign.campaignList.tableHeader.noOfApllicants1",
      cellProps: {
        align: "right",
      },
      headerProps: {
        width: "88px",
      },
    },
    {
      key: "scheduleConfirmed",
      header: "campaign.campaignList.tableHeader.fixedDate",
      cellProps: {
        align: "right",
      },
      headerProps: {
        width: "88px",
      },
    },
    // as per improvement requests 1659 it is hidden;Do not delete columns, just hide them. It may reappear at a later date.
    // {
    //   key: "vacantSlots",
    //   header: "campaign.campaignList.tableHeader.waitingList",
    //   cellProps: {
    //     align: "right",
    //   },
    //   headerProps: {
    //     width: "88px",
    //   },
    // },
    {
      key: "completion",
      header: "campaign.campaignList.tableHeader.completed",
      cellProps: {
        align: "right",
      },
      headerProps: {
        width: "88px",
      },
    },
    {
      key: "action",
      header: "",
      Cell: (campaign: any) => {
        return (
          <>
            {campaign?.status === 0 && (
              <Box
                sx={{ cursor: "pointer" }}
                onClick={(e) => handleModalOpen(e, campaign?.id)}
                data-testid={`delete-action${campaign?.id}`}
                pr={"70px"}
              >
                <DeleteSvgIcon />
              </Box>
            )}
          </>
        );
      },
      headerProps: {
        width: "60px",
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columnData}
        data={campaignData}
        rowClick={handleCampaign}
        isFetching={campaignData?.length === 0 ? isFetching : false}
        paginationProps={{
          hasPagination: true,
          count: paginationData?.totalPages,
          defaultPage: 1,
          page: pageNumber,
          onChange: handlePageChange,
        }}
        noDataMessage="campaign.nopublishedproject"
        fixedSizeTable
        showDoubleScroll
        tableContainerStyle={{
          minHeight: "69vh",
        }}
      />
      {deleteModal && (
        <ConfirmationModal
          open={deleteModal}
          title="interview.delete-modal.header"
          content="interview.delete-modal.content"
          agreeButtonName="interview.delete-modal.agreeButton"
          disAgreeButtonName="interview.delete-modal.disAgreeButton"
          onDisagree={toggleDeleteModal}
          onAgree={handleDeletion}
          modalWidth="400px"
          agreeButtonColorVariant="error"
          disAgreeButtonVariant="gray"
        />
      )}
    </>
  );
}

export default CampaignListTable;
