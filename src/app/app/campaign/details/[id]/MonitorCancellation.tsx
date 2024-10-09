import { customerService } from "@/common/apiUrls";
import {
  ExclamationTriangleOutlinedIcon,
  MintButton,
  MintTypography,
  errorToast,
  successToast,
} from "@/design-system";
import { getErrorMessage } from "@/utils";
import { Box, useTheme } from "@mui/material";
import { t } from "i18next";
import moment from "moment";
import React, { useState } from "react";

interface IMonitorCancellationProps {
  monitorStatus: number;
  campaignId: string;
  monitorId: string;
  confirmedSchedule: any;
  handleCampaign: (id: string) => void;
  closeDrawer: () => void;
}

const MonitorCancellation: React.FC<IMonitorCancellationProps> = (props) => {
  const theme = useTheme();
  const {
    monitorStatus,
    campaignId,
    monitorId,
    confirmedSchedule,
    handleCampaign,
    closeDrawer,
  } = props;

  const [isDisplay, setIsDisplay] = useState<boolean>(
    confirmedSchedule?.consumedStatus === 5 ||
      confirmedSchedule?.consumedStatus === 6 ||
      monitorStatus == 8
      ? true
      : false
  );

  console.log(confirmedSchedule);

  const toLocalDatetime = (start_time: string, end_time: string) => {
    const localDateTime1 = moment
      .utc(start_time)
      .local()
      .format("YYYY/MM/DD HH:mm");
    const localDateTime2 = moment.utc(end_time)?.local().format("HH:mm");
    return `${localDateTime1} ~ ${localDateTime2}`;
  };

  const handleScheduleOpenOrBlock = (status: number) => {
    let data = JSON.stringify({
      status: status,
      timeslotId: confirmedSchedule?.id,
    });
    customerService
      .updateMonitorCancellation(campaignId, monitorId, data)
      .then((response) => {
        console.log(response);
        handleCampaign(campaignId);
        if (status === 1) {
          successToast("日程がオファーできるようになりました。");
          setIsDisplay(true);
        } else {
          successToast("この日程は日程候補から削除しました。");
          setIsDisplay(true);
        }
        closeDrawer();
      })
      .catch((error) => {
        console.log("Error occured in schedule open/block api : ", error);
        const errorMessage = getErrorMessage(error?.response?.data);
        errorToast(errorMessage);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 0,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          height: "80px",
          display: "flex",
          padding: "16px",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
          borderRadius: "8px",
          background: theme.mint.color.system.warning.bright,
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            alignItems: "flex-start",
            gap: 1,
            flex: "8px 0px 0px",
          }}
        >
          <ExclamationTriangleOutlinedIcon size={24} color="#CF4500" />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
            flex: "8px 0px 0px",
          }}
        >
          <MintTypography
            size="head-xs"
            weight="700"
            color={theme.mint.color.text.high}
          >
            {toLocalDatetime(
              confirmedSchedule?.startTime,
              confirmedSchedule?.endTime
            )}
            {t("side-drawer.monitor-cancellation.title")}
          </MintTypography>
        </Box>
      </Box>
      <Box
        sx={{
          display: !isDisplay ? "flex" : "none",
          padding: 0,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <MintTypography
          size="head-xs"
          weight="400"
          color={theme.mint.color.text.medium}
        >
          {t("side-drawer.monitor-cancellation.confirmation")}
        </MintTypography>
      </Box>
      <Box
        sx={{
          display: !isDisplay ? "flex" : "none",
          padding: 0,
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <MintButton
          variant="contained"
          sx={{ background: "#162987" }}
          onClick={() => handleScheduleOpenOrBlock(1)}
        >
          <MintTypography
            size="body"
            weight="500"
            color={theme.mint.color.text.highInverse}
          >
            {t("side-drawer.monitor-cancellation.open")}
          </MintTypography>
        </MintButton>
      </Box>
      <Box
        sx={{
          border: "1px solid #162987",
          display: !isDisplay ? "flex" : "none",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
          borderRadius: "8px",
          background: "#FFF",
        }}
      >
        <MintButton variant="text" onClick={() => handleScheduleOpenOrBlock(0)}>
          <MintTypography
            size="body"
            weight="500"
            color={theme.mint.color.text.accent}
          >
            {t("side-drawer.monitor-cancellation.block")}
          </MintTypography>
        </MintButton>
      </Box>
    </Box>
  );
};

export default MonitorCancellation;
