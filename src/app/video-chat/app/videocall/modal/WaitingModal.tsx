import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogTitle,
  MintTypography,
} from "@/design-system";
import React from "react";

interface IWaitingModalProps {
  open: boolean;
  nickName: string;
  onClose: () => void;
  onAgree: () => void;
}
export default function WaitingModal(props: IWaitingModalProps) {
  const { open, onClose, nickName, onAgree } = props;
  return (
    <>
      <MintDialog
        open={open}
        sx={{
          ".MuiDialog-container": {
            display: "flex",
            alignItems: "flex-start",
          },
          ".MuiDialog-paper": {
            width: "400px",
          },
        }}
        hideBackdrop
      >
        <MintDialogTitle>
          <MintTypography size="head-m" weight="500">
            {nickName} さんが待機しています
          </MintTypography>
        </MintDialogTitle>
        <MintDialogActions>
          <MintButton
            sx={{
              background: (theme) =>
                theme.mint.color.surfaceAccent.primary.primary,
            }}
            onClick={onAgree}
          >
            参加許可
          </MintButton>
        </MintDialogActions>
      </MintDialog>
    </>
  );
}
