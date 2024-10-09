import React, { useEffect, useRef, useState } from "react";
import { Snackbar } from "@mui/material";
import {
  mintAppService as defaultMintAppService,
  MintAppService,
  ToastType,
} from "./mint-app-service";

import { MintConfirmDialog, MintConfirmDialogRef } from "./mint-confirm-dialog";
import { TFunction } from "i18next";
import { MintAlert } from "../..";

export type MintAppServiceComponentProps = {
  mintAppService?: MintAppService;
  t: TFunction;
};

export function MintAppServiceComponent(props: MintAppServiceComponentProps) {
  const mintAppService = props.mintAppService || defaultMintAppService;

  // toast
  const [visibleToast, setVisibleToast] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("info");
  const [toastMessage, setToastMessage] = useState("");

  // confirm
  const confirmDialogRef = useRef<MintConfirmDialogRef | null>(null);

  useEffect(() => {
    mintAppService.setAppServiceComponentRef({
      toast: (message: string, type: ToastType) => {
        setVisibleToast(true);
        setToastType(type);
        setToastMessage(message);
      },
      confirm(message: string | React.ReactNode): Promise<boolean> {
        if (confirmDialogRef.current) {
          return confirmDialogRef.current.open(message);
        }
        return Promise.reject("Component not initiated");
      },
    });
  }, [mintAppService]);

  const onCloseToast = () => {
    setVisibleToast(false);
  };

  return (
    <div>
      <Snackbar
        open={visibleToast}
        autoHideDuration={6000}
        onClose={onCloseToast}
      >
        <MintAlert
          onClose={onCloseToast}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </MintAlert>
      </Snackbar>
      <MintConfirmDialog t={props.t} ref={confirmDialogRef} />
    </div>
  );
}
