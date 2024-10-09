import {
  customerService,
  researchService,
  videoChatService,
} from "@/common/apiUrls";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import {
  CopyOutlinedIcon,
  MintButton,
  MintTypography,
  errorToast,
  infoToast,
  successToast,
} from "@/design-system";
import { setTemporaryChannelInfo } from "@/stores/global/reducer";
import { getErrorMessage, parseSuccessMessage } from "@/utils";
import { Box, Grid } from "@mui/material";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface IScheduleConfirmedProps {
  campaignId: string;
  monitorId: string;
  monitorStatus: number;
  scheduleInfo: IScheduleInfo;
  closeDrawer: () => void;
  confirmationDetails: any;
  handleCampaign: (id: string) => void;
}

const ScheduleConfirmed: React.FC<IScheduleConfirmedProps> = (props) => {
  const { t } = useTranslation();

  const [isWithin, setIsWithin] = useState<boolean>(false);

  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [slotAdjustMent, setSlotAdjustMent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  let timer: any;
  const {
    scheduleInfo,
    confirmationDetails,
    campaignId,
    monitorId,
    handleCampaign,
    closeDrawer,
    monitorStatus,
  } = props;
  const router = useRouter();

  console.log(scheduleInfo, confirmationDetails);
  const params = useSearchParams();

  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time).local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(
        `URL: ${scheduleInfo?.url}\n ID: ${scheduleInfo.id
          ?.toString()
          .match(/.{1,3}/g)
          ?.join("")}\n Passcode: ${scheduleInfo.passcode}`
      )
      .then((response) => {
        console.log("Text copied to clipboard successfully", response);
        successToast("クリックボードにコピー済み");
      })
      .catch((error) => {
        console.log("Error occured during copying : ", error);
      });
  };

  function getCancellationStatus(processingId: string) {
    researchService
      .getCancellationStatus(processingId)
      .then((response) => {
        console.log("Polling API response: ", response);
        if (response.status === 201) {
          clearInterval(timer);
          setIsLoading(false);
          closeDrawer();
          setIsCancelled(false);
          setIsWithin(false);
          setSlotAdjustMent(false);
          handleCampaign(campaignId);
          const successMessage = parseSuccessMessage(response.data?.message);
          successToast(successMessage);
        }
      })
      .catch((error) => {
        console.log("Interview cancellation failed!", error);
        errorToast(getErrorMessage(error?.response?.data));
      });
  }

  const handleClientCancellation = (slotId: string, status: number) => {
    setIsLoading(true);
    let secondsElapsed = 0;
    const intervalTime = 5000;
    const totalTime = 60000;
    let data = JSON.stringify({
      timeslotId: slotId,
      status: status,
    });
    customerService
      .cancellationByClient(campaignId, monitorId, data)
      .then((response) => {
        console.log("Cancellation API response : ", response);
        if (response.status !== 201) {
          apiInterval();
        } else {
          setIsLoading(false);
          closeDrawer();
          setIsCancelled(false);
          setIsWithin(false);
          setSlotAdjustMent(false);
          handleCampaign(campaignId);
          const successMessage = parseSuccessMessage(response.data?.message);
          successToast(successMessage);
        }
        function apiInterval() {
          getCancellationStatus(response?.data?.data?.processingId);
          secondsElapsed += intervalTime;
          if (secondsElapsed < totalTime) {
            timer = setTimeout(apiInterval, intervalTime);
          } else {
            infoToast(t("interview.processing-info"));
            setIsLoading(false);
            closeDrawer();
            setIsCancelled(false);
            setIsWithin(false);
            setSlotAdjustMent(false);
            handleCampaign(campaignId);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error occured during cancellation by client : ", error);
        errorToast(getErrorMessage(error?.response?.data));
        setIsCancelled(false);
      });
  };

  const handleCancellation = (time: string) => {
    const currentDate = moment();
    console.log(currentDate, time);
    const timeDifference = moment.duration(currentDate.diff(time));
    console.log("Time difference :", Math.abs(timeDifference.asHours()));
    setIsCancelled(true);
    if (Math.abs(timeDifference.asHours()) <= 24) {
      setIsWithin(true);
    } else {
      setIsWithin(false);
    }
  };
  const onCancelAgree = () => {
    setSlotAdjustMent(true);
    setIsCancelled(false);
  };

  const joinInterviewRoom = () => {
    console.log("Inside video-chat invoking", scheduleInfo?.meetingId);
    videoChatService
      .enterWaitingLobby(scheduleInfo?.meetingId)
      .then((response) => {
        console.log("Enter waiting lobby : ", response);
        let joinInfo = {
          appId: response?.data?.data?.agoraAppId,
          channelName: response?.data?.data?.agoraChannelId,
          token: response?.data?.data?.token,
          uid: response?.data?.data?.agoraUserId,
          startTime: response?.data?.data?.startTime,
          endTime: response?.data?.data?.endTime,
          meetingId: scheduleInfo.meetingId,
          participantId: response?.data?.data?.participantId,
          campaignId: campaignId,
          meetingName: response?.data?.data?.meetingName,
        };
        dispatch(setTemporaryChannelInfo(joinInfo));
        // let queryParam = new URLSearchParams(joinInfo).toString();
        window.open(`/video-chat/app/meeting`, "_blank", "noopener,noreferrer");
        closeDrawer();
      })
      .catch((error) => {
        console.log("Error occured during entering : ", error);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
        closeDrawer();
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: 0,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flex: "8px 0px 0px",
          alignSelf: "stretch",
          marginTop: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <MintTypography size="body" weight="700">
              {t("side-drawer.scheduleConfirmed.title")}
            </MintTypography>
            <MintTypography height={"21px"} size="head-xs" weight="400">
              {toLocalDatetime(
                confirmationDetails?.startTime,
                confirmationDetails?.endTime
              )}
            </MintTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
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
                <MintTypography
                  size="body"
                  weight="700"
                  fontStyle={"normal"}
                  lineHeight={"150%"}
                >
                  {t("side-drawer.scheduleConfirmed.detail")}
                </MintTypography>
                <Box
                  onClick={handleCopy}
                  sx={{ cursor: "pointer" }}
                  data-testid="copy-button"
                >
                  <CopyOutlinedIcon size={16} color="#162987" />
                </Box>
              </Box>
              <Grid
                container
                sx={{
                  // display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: " 8px",
                  alignSelf: "stretch",
                }}
              >
                <Grid item xs={4} sx={{ maxWidth: "252px" }}>
                  <MintTypography
                    // sx={{ width: "138px" }}
                    size="body"
                    weight="400"
                    color={(theme) => theme.mint.color.text.medium}
                  >
                    {t("side-drawer.scheduleConfirmed.url")}
                  </MintTypography>
                </Grid>
                <Grid item sx={{ flexGrow: 1, wordBreak: "break-all" }} xs={7}>
                  <MintTypography
                    // sx={{ flex: "8px 0px 0px" }}
                    size="body"
                    weight="400"
                    color={(theme) => theme.mint.color.text.link}
                  >
                    {scheduleInfo?.url}
                  </MintTypography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: " 24px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  sx={{ width: "114px" }}
                  size="body"
                  weight="400"
                  color={(theme) => theme.mint.color.text.medium}
                >
                  ID
                </MintTypography>
                <MintTypography
                  sx={{ flex: "8px 0px 0px" }}
                  size="body"
                  weight="400"
                  color={(theme) => theme.mint.color.text.medium}
                >
                  {scheduleInfo?.id
                    ?.toString()
                    .match(/.{1,3}/g)
                    ?.join(" ")}
                </MintTypography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: " 24px",
                  alignSelf: "stretch",
                }}
              >
                <MintTypography
                  sx={{ width: "114px" }}
                  size="body"
                  weight="400"
                  color={(theme) => theme.mint.color.text.medium}
                >
                  {t("side-drawer.scheduleConfirmed.passcode")}
                </MintTypography>
                <MintTypography
                  sx={{ flex: "8px 0px 0px" }}
                  size="body"
                  weight="400"
                  color={(theme) => theme.mint.color.text.medium}
                >
                  {scheduleInfo.passcode}
                </MintTypography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <MintButton
                id="joinInterview"
                sx={{
                  display: "flex",
                  height: "48px",
                  padding: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  background: (theme) =>
                    theme.mint.color.surfaceAccent.primary.primary,
                }}
                size="large"
                variant="contained"
                color="primary"
                onClick={joinInterviewRoom}
                data-testid="join-room"
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={(theme) => theme.mint.color.text.highInverse}
                >
                  {t("side-drawer.scheduleConfirmed.attendBtn")}
                </MintTypography>
              </MintButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          position: "absolute",
          bottom: 0,
          width: "410px",
        }}
      >
        <MintButton
          variant="text"
          size="medium"
          disabled={monitorStatus === 8 ? true : false}
          sx={{
            display: "flex",
            height: "40px",
            padding: "12px",
            justifyContent: "center",
            alignItems: "center",
            gap: (theme) => theme.mint.spacing.xxs,
            alignSelf: "stretch",
            color: (theme) => theme.mint.color.text.medium,
          }}
          onClick={() => handleCancellation(confirmationDetails?.startTime)}
          data-testid="cancellation-button"
        >
          <MintTypography
            size="body"
            weight="500"
            color={(theme) => theme.mint.color.text.medium}
          >
            {t("side-drawer.scheduleConfirmed.cancelBtn")}
          </MintTypography>
        </MintButton>
        {isCancelled &&
          (isWithin ? (
            <ConfirmationModal
              width="400px"
              open={isWithin}
              title={t("side-drawer.client-cancellation.within24.title")}
              content={t("side-drawer.client-cancellation.within24.content")}
              onAgree={onCancelAgree}
              onDisagree={() => setIsCancelled(false)}
              agreeButtonName={t("side-drawer.client-cancellation.agreeButton")}
              disAgreeButtonName={t(
                "side-drawer.client-cancellation.disagreeButton"
              )}
            />
          ) : (
            <ConfirmationModal
              width="400px"
              open={!isWithin}
              title={t("side-drawer.client-cancellation.without.title")}
              content={t("side-drawer.client-cancellation.without.content")}
              onClose={() => setIsCancelled(false)}
              onAgree={onCancelAgree}
              onDisagree={() => setIsCancelled(false)}
              agreeButtonName={t("side-drawer.client-cancellation.agreeButton")}
              disAgreeButtonName={t(
                "side-drawer.client-cancellation.disagreeButton"
              )}
            />
          ))}
        {slotAdjustMent &&
          (isWithin ? (
            <ConfirmationModal
              width="400px"
              open={slotAdjustMent}
              title={t(
                "side-drawer.client-cancellation-schedule.within24.title"
              )}
              content={t(
                "side-drawer.client-cancellation-schedule.within24.content"
              )}
              onAgree={() =>
                handleClientCancellation(confirmationDetails?.id, 0)
              }
              onDisagree={() => setSlotAdjustMent(false)}
              agreeButtonName={t(
                "side-drawer.client-cancellation-schedule.within24.agreeButton"
              )}
              disAgreeButtonName={t(
                "side-drawer.client-cancellation-schedule.within24.disagreeButton"
              )}
              isLoading={isLoading}
            />
          ) : (
            <ConfirmationModal
              width="400px"
              open={slotAdjustMent}
              title={t(
                "side-drawer.client-cancellation-schedule.without.title"
              )}
              content={t(
                "side-drawer.client-cancellation-schedule.without.content"
              )}
              onAgree={() =>
                handleClientCancellation(confirmationDetails?.id, 1)
              }
              onDisagree={() =>
                handleClientCancellation(confirmationDetails?.id, 0)
              }
              agreeButtonName={t(
                "side-drawer.client-cancellation-schedule.without.agreeButton"
              )}
              disAgreeButtonName={t(
                "side-drawer.client-cancellation-schedule.without.disagreeButton"
              )}
              isLoading={isLoading}
            />
          ))}
      </Box>
    </>
  );
};

export default ScheduleConfirmed;
