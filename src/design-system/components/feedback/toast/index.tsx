import { ToastOptions, toast } from "react-toastify";
import {
  MintErrorToastElement,
  MintInfoToastElement,
  MintSuccessToastElement,
  MintWarningToastElement,
} from "./elements/toastElements";
import { MintToastContainer } from "./container/Container";

const successToast = (message: string, options?: ToastOptions) => {
  
  toast.dismiss();
  toast.success(<MintSuccessToastElement message={message} />, {
    closeButton: false,
    hideProgressBar: true,
    autoClose: 6000,
    position: "bottom-left",
    ...options,
  });
};
const errorToast = (message: string | undefined, options?: ToastOptions) => {
  
  const toastMessage = message ?? "エラーが発生しました。後でもう一度お試しください";
  toast.error(<MintErrorToastElement message={toastMessage} />, {
    closeButton: false,
    hideProgressBar: true,
    autoClose: 6000,
    position: "bottom-left",
    ...options,
  });
};
const warningToast = (message: string, options?: ToastOptions) => {
  const toastMessage = message ?? "エラーが発生しました。後でもう一度お試しください";
  toast.warning(<MintWarningToastElement message={toastMessage} />, {
    closeButton: false,
    hideProgressBar: true,
    autoClose: 6000,
    position: "bottom-left",
    ...options,
  });
};
const infoToast = (message: string, options?: ToastOptions) => {
  const toastMessage = message ?? "エラーが発生しました。後でもう一度お試しください";
  toast.info(<MintInfoToastElement message={toastMessage} />, {
    closeButton: false,
    hideProgressBar: true,
    autoClose: 6000,
    position: "bottom-left",
    ...options,
  });
};

export {
  successToast,
  errorToast,
  warningToast,
  infoToast,
  MintToastContainer,
};
