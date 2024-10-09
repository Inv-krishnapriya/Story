import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import { NoDataSvgIcon } from "../UI/icons/Icon";
import { H5 } from "../UI/typography/Typography";

interface INoDataFound {
  message: string;
}

const NoDataFound = ({ message }: INoDataFound) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "320px",
        padding: "16px  40px 32px  40px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        alignSelf: "stretch",
        borderRadius: "var(--mm-radius-xl)",
        border: "1px solid var(--mm-border-low)",
        background: "var(--mm-background-container-bg)",
      }}
    >
      <Stack alignItems={"center"} gap={"12px"}>
        <NoDataSvgIcon sx={{ width: "64px", height: "64px" }} />
        <H5 sx={{ color: "var(--mm-text-low)" }}>{message}</H5>
      </Stack>
    </Box>
  );
};

export default NoDataFound;
