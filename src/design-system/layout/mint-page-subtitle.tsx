import React from "react";
import { MintTypography } from "..";

export type MintPageSubtitleProps = {
  text: string;
};

export function MintPageSubtitle({ text }: MintPageSubtitleProps) {
  return (
    <MintTypography size="head-s" weight="700">
      {text}
    </MintTypography>
  );
}
