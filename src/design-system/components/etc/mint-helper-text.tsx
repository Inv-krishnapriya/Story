import { TypographyProps } from "@mui/material";
import React from "react";
import { MintTypography } from "../input/mint-typography";

export function MintHelperText(props: TypographyProps) {
  return (
    <MintTypography
      size="caption"
      weight="400"
      mt={"4px"}
      color={(theme) => theme.mint.color.system.error.error}
      {...props}
    >
      {props.children}
    </MintTypography>
  );
}
