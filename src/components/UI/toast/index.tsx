import { ToastOptions, toast } from "react-toastify";
import {
  InfoToastElement,
  SuccessToastElement,
} from "./elements/toastElements";

const successToast = (message: string, options?: ToastOptions) => {
  toast.success(<SuccessToastElement message={message} />, {
    closeButton: false,
    hideProgressBar: true,
    position: "bottom-center",
    ...options,
  });
};
const errorToast = (message: string | undefined, options?: ToastOptions) => {
  const toastMessage = message ?? "エラーが発生しました。後でもう一度お試しください";
  toast.error(<SuccessToastElement message={toastMessage} />, {
    closeButton: false,
    hideProgressBar: true,
    position: "bottom-center",
    ...options,
  });
};

const infoToast = (message: string, options?: ToastOptions) => {
  const toastMessage = message ?? "エラーが発生しました。後でもう一度お試しください";
  toast.info(<InfoToastElement message={toastMessage} />, {
    closeButton: false,
    hideProgressBar: true,
    position: "bottom-center",
    ...options,
  });
};

export { successToast, errorToast, infoToast };
