import { PrefectureResponse } from "@/common/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../AppModal";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import AppCheckbox from "@/components/Checkbox/AppCheckbox";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintTypography,
} from "@/design-system";
import { RootState } from "@/stores/rootReducer";
import { useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
type TModal = {
  open: boolean;
  close: () => void;
  data: any;
  handleSubmit: (status: number) => void;
  setIsSubmitted: (value: boolean) => void;
  isSubmitted: boolean;
};

const SuccessModal = ({
  open,
  close,
  data,
  handleSubmit,
  setIsSubmitted,
  isSubmitted,
}: TModal) => {
  const theme = useTheme();
  const { t } = useTranslation();

  let ticketsConsumed = useSelector(
    (state: RootState) => state?.global?.consumed!
  );

  ticketsConsumed = ticketsConsumed ?? 0;

  let balanceTickets: number | 0 = useSelector(
    (state: RootState) => state?.global?.tickets?.unlockedTickets!
  );

  console.log(balanceTickets, ticketsConsumed);

  balanceTickets = balanceTickets ?? 0;

  const remainingTickets =
    balanceTickets! < ticketsConsumed ? 0 : balanceTickets - ticketsConsumed;

  const handleModalSubmit = (status: number) => {
    setIsSubmitted(true);
    handleSubmit(status);
  };

  return (
    <MintDialog
      open={open}
      onClose={close}
      sx={{
        "& .MuiPaper-root": {
          width: "400px",
        },
      }}
    >
      <Box p={theme.mint.spacing.m}>
        <MintTypography
          size="head-m"
          weight="500"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.success-modal.header")}
        </MintTypography>
      </Box>
      <Stack
        px={theme.mint.spacing.m}
        pb={theme.mint.spacing.s}
        gap={theme.mint.spacing.s}
      >
        <MintTypography
          size="body"
          weight="400"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.success-modal.content")}
        </MintTypography>
        <Box
          sx={{
            p: `${theme.mint.spacing.xxs}`,
            backgroundColor: theme.mint.color.background.containerBg.layer2,
            display: "flex",
            flexDirection: "column",
            borderRadius: `${theme.mint.cornerRadius.s}px`,
            gap: `${theme.mint.spacing.xxs}`,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box display={"flex"} gap={`${theme.mint.spacing.x3s}`}>
              <RemoveIcon />
              <MintTypography
                size="caption"
                weight="400"
                lineHeight={"150%"}
                color={theme.mint.color.text.high}
                display={"flex"}
                alignItems={"center"}
              >
                {t("interview.success-modal.consumed")}
              </MintTypography>
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {ticketsConsumed} {t("interview.success-modal.tickets")}
            </MintTypography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box display={"flex"} gap={`${theme.mint.spacing.x3s}`}>
              <ConfirmationNumberOutlinedIcon />
              <MintTypography
                size="caption"
                weight="400"
                lineHeight={"150%"}
                color={theme.mint.color.text.high}
                display={"flex"}
                alignItems={"center"}
              >
                {t("interview.success-modal.available")}
              </MintTypography>
            </Box>
            <MintTypography
              size="caption"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {remainingTickets} {t("interview.success-modal.tickets")}
            </MintTypography>
          </Stack>
        </Box>
      </Stack>

      <Stack
        p={theme.mint.spacing.m}
        justifyContent={"end"}
        direction={"row"}
        gap={theme.mint.spacing.xxs}
      >
        <MintButton
          size="medium"
          variant="text"
          onClick={() => {
            handleModalSubmit(0);
            close();
          }}
          disabled={isSubmitted}
          data-testid="submit-draft"
        >
          {t("interview.button.draft")}
        </MintButton>
        <MintButton
          size="medium"
          onClick={() => {
            handleModalSubmit(1);
            close();
          }}
          disabled={isSubmitted}
          data-testid="submit-publish"
        >
          {t("interview.button.modal-ok")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
};
export default SuccessModal;
