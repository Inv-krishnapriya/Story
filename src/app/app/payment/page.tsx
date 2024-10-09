"use client";

import { Button, Paper, Stack, Typography, styled } from "@mui/material";
import { splitAmountWithComma } from "@/utils/index";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { successToast } from "@/components/UI/toast";

const Payment = () => {
  const totalAmount = useSelector(
    (state: RootState) => state?.data?.totalAmount
  );
  const { t } = useTranslation();
  const total = totalAmount;

  return (
    <Stack>
      <Paper
        sx={{
          height: "20rem",
        }}
      >
        <Stack direction="row" justifyContent="center" paddingY={10}>
          <Typography fontWeight="900" fontSize="larger">
            Total amount (including tax): &nbsp;
          </Typography>
          <Typography fontWeight="900" fontSize="larger">
            {splitAmountWithComma(total, 1)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Link href="/app/ticket">
            <Button
              onClick={() => {
                successToast(t("payment.success"));
              }}
              variant="contained"
              sx={{ width: "10rem", background: "#162987 !important" }}
            >
              {t("payment.button.home")}
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Payment;
