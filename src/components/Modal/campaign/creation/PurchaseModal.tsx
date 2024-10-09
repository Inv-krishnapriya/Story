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

type TPurchaseModal = {
  open: boolean;
  close: () => void;
  handleSubmit: () => void;
};
const PurchaseModal = ({ open, close, handleSubmit }: TPurchaseModal) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const theme = useTheme();
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
          {t("interview.purchase-modal.header")}
        </MintTypography>
      </Box>
      <Box px={theme.mint.spacing.m} pb={theme.mint.spacing.s}>
        <MintTypography
          size="body"
          weight="400"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
        >
          {t("interview.purchase-modal.content")}
        </MintTypography>
      </Box>
      <Stack
        p={theme.mint.spacing.m}
        justifyContent={"end"}
        direction={"row"}
        gap={theme.mint.spacing.xxs}
      >
        <MintButton
          size="medium"
          variant="text"
          onClick={close}
          disabled={isSubmitted}
        >
          キャンセル
        </MintButton>
        <MintButton size="medium" onClick={handleSubmit} disabled={isSubmitted}>
          {t("interview.button.modal-ok")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
};
export default PurchaseModal;
