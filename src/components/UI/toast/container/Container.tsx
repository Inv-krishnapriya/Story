import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)(({ theme }) => ({
  "& .Toastify__toast": {
    boxShadow: "none",
    display: "inline-flex",
    padding: "8px 16px",
    alignItems: "center",
    borderRadius: "8px",
    color: "white",
  },
  "& .Toastify__toast--success": {
    backgroundColor: "#00947F",
  },
  "& .Toastify__toast--error": {
    backgroundColor: "#E01C0D",
  },
  "& .Toastify__toast--warning": {
    backgroundColor: '#CF4500'
  },
  "& .Toastify__toast-icon ": {
    display: "none",
  },
}));
