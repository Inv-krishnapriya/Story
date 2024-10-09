import React, { CSSProperties } from "react";
import { MintButton } from "../input/mint-button";
import { useTheme } from "@mui/material";
import { MintPageTitle } from "../../layout/mint-page-title";

export type MintNoPermissionProps = {
  t: (v: string) => string;
  onOk?: () => void;
};

export function MintNoPermission({ t, onOk }: MintNoPermissionProps) {
  const theme = useTheme();

  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onClickOk = () => {
    if (onOk) {
      onOk();
    }
  };

  return (
    <div style={style}>
      <div>
        <MintPageTitle text={t("youDontHavePermission")} />
        <div
          className="center-x"
          style={{ marginTop: theme.mint.spacing.xs + "px" }}
        >
          <MintButton variant="contained" onClick={onClickOk}>
            {t("button.ok")}
          </MintButton>
        </div>
      </div>
    </div>
  );
}
