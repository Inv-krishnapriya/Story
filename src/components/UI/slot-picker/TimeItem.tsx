import { MintTypography } from "@/design-system";
import { Box } from "@mui/material";
import React from "react";

function TimeItem({
  isEven,
  isLast,
  timeData,
}: {
  isEven: boolean;
  isLast: boolean;
  timeData: string;
}) {
  console.log("TimeItem");

  return (
    <Box
      sx={{
        display: "flex",
        width: "30px",
        height: "19px",
        flexDirection: "column",
        justifyContent: "center",
        flexShrink: "0",
        position: "relative",
        paddingBottom: isLast ? "13px" : 0,
      }}
    >
      <MintTypography
        size="caption"
        weight="400"
        lineHeight={"150%"}
        sx={{
          visibility: isEven ? "hidden" : "auto",
        }}
      >
        {timeData}
      </MintTypography>
    </Box>
  );
}

export default React.memo(TimeItem);
