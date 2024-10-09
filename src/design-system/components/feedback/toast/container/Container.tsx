
import { MintThemeDefault } from "@/design-system";
import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const MintToastContainer = styled(ToastContainer)(() => ({
  "& .Toastify__toast": {
    boxShadow: "none",
    display: "inline-flex",
    padding: "8px 16px",
    alignItems: "center",
    borderRadius: "8px",
    color: "white",
    marginLeft: "10px",
  },
  "& .Toastify__toast--info":{
    backgroundColor:MintThemeDefault.color.system.info.info
  },
  "& .Toastify__toast--success": {
    backgroundColor:MintThemeDefault.color.system.success.success,
  },
  "& .Toastify__toast--error": {
    backgroundColor:  MintThemeDefault.color.system.error.error,
  },
  "& .Toastify__toast--warning": {
    backgroundColor: MintThemeDefault.color.system.warning.warning,
  },
  "& .Toastify__toast-icon ": {
    display: "none",
  },
}));
