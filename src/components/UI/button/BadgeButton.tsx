import { Box, colors, useTheme } from "@mui/material";
import React from "react";

type BadgeTypes = {
  isActive: boolean;
  value: number;
  onClick: () => void;
};
const BadgeButton = ({ isActive, value, onClick }: BadgeTypes) => {
  const theme = useTheme();
  const bgcolor = isActive
    ? theme.mint.color.surfaceAccent.primary.primary
    : theme.mint.color.surfaceGray.medium.medium;
  const color = isActive ? theme.mint.color.object.fixedWhite : "";
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: !isActive  ? theme.mint.color.surfaceGray.medium.hover : "",
        },
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={46}
      height={46}
      bgcolor={bgcolor}
      color={color}
      borderRadius={theme.mint.cornerRadius.full}
    >
      {value}
    </Box>
  );
};

BadgeButton.propTypes = {};

export default BadgeButton;
