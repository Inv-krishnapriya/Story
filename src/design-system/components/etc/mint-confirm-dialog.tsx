import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { PromiseCallback } from "./model";
import { TFunction } from "i18next";
import { MintButton } from "../..";

export type MintConfirmDialogProps = {
  t: TFunction;
};

export type MintConfirmDialogRef = {
  open: (v: string | ReactNode) => Promise<boolean>;
};

export const MintConfirmDialog = forwardRef(function MintConfirmDialog(
  { t }: MintConfirmDialogProps,
  ref: Ref<MintConfirmDialogRef>
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
      <DialogTitle sx={{ m: 0, p: 2 }}>{t("confirm")}</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <MintButton onClick={onClose} variant="text">
          {t("button.cancel")}
        </MintButton>
        <MintButton onClick={onConfirm} variant="contained">
          {t("button.confirm")}
        </MintButton>
      </DialogActions>
    </Dialog>
  );
});
