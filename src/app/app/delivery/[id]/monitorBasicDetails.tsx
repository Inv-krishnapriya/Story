"use client";
import { MintTypography } from "@/design-system";
import { Box, useTheme, Stack } from "@mui/material";
import React from "react";

const MonitorBasicDetails = ({
  name,
  value,
  question,
}: {
  name: string;
  value: string;
  question?: string;
}) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      gap={theme.mint.spacing.s}
      paddingTop={theme.mint.spacing.xxs}
    >
      <Box width={"72px"}>
        <MintTypography size={"body"}>{name}</MintTypography>
      </Box>
      <Stack>
        {question && (
          <MintTypography
            paddingBottom={theme.mint.spacing.xxs}
            color={theme.mint.color.text.low}
          >
            {question}
          </MintTypography>
        )}
        <MintTypography size="body">{value}</MintTypography>
      </Stack>
    </Box>
  );
};

export default MonitorBasicDetails;
