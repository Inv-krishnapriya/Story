import { Stack } from "@mui/material";
import React from "react";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { H6 } from "../typography/Typography";

function BackButton({
  label,
  path,
  sx,
}: Readonly<{
  label: string;
  path: string;
  sx?: object;
}>) {
  const { t } = useTranslation();
  const navigate = useRouter();

  const onNavigate = () => {
    navigate.push(path);
  };
  return (
    <Stack
      direction={"row"}
      onClick={onNavigate}
      sx={{ cursor: "pointer", ...sx }}
      data-testid="back-button"
      alignItems={"center"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M10.0366 2.6665L10.9962 3.60918L6.52647 7.99984L10.9962 12.3905L10.0366 13.3332L5.56681 8.94251L5.56613 8.94318C5.0615 8.41571 5.06107 7.58356 5.56613 7.0565L5.56681 7.05716L10.0366 2.6665Z"
          fill="#006891"
        />
      </svg>
      <H6
        sx={{
          color: "var(--mm-text-link)",
          fontWeight: 400,
          lineHeight: "150%",
        }}
      >
        {t(label)}
      </H6>
    </Stack>
  );
}

export default BackButton;
