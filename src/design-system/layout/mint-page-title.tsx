import React from "react";
import { MintTypography } from "..";

export type MintPageTitleProps = {
  text: string;
};

export function MintPageTitle({ text }: MintPageTitleProps) {
  return (
    <MintTypography size="head-l" weight="700">
      {text}
    </MintTypography>
  );
}
