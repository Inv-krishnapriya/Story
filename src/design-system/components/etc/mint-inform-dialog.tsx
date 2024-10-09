import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ReactNode,
  Ref,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { PromiseCallback } from "./model";
import { MintIconButton } from "../..";

export type MintInformDialogProps = {
  t: (k: string) => string;
};

export type MintInformDialogRef = {
  open: (v: string | ReactNode) => Promise<boolean>;
};

export const MintInformDialog = forwardRef(function MintInformDialog(
  { t }: MintInformDialogProps,
  ref: Ref<MintInformDialogRef>
) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | ReactNode>("");
  const [promiseCallback, setPromiseCallback] =
    useState<PromiseCallback<boolean> | null>(null);

  const onConfirm = () => {
    if (promiseCallback) {
      promiseCallback.resolve(true);
    }
    setVisible(false);
  };

  const onClose = () => {
    if (promiseCallback) {
      promiseCallback.resolve(false);
    }
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open(message: string | ReactNode) {
      setMessage(message);
      setVisible(true);
      return new Promise((resolve, reject) => {
        setPromiseCallback({ resolve, reject });
      });
    },
  }));

  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{t("inform")}</DialogTitle>
      <MintIconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </MintIconButton>
      <DialogContent dividers style={{ minWidth: "343px" }} className="xxx">
        {message}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onConfirm} variant="contained">
          {t("button.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
