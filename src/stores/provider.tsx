"use client";
import "../i18n";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from ".";
import AppTheme from "@/theme";
import { StyledToastContainer } from "@/components/UI/toast/container/Container";
import ScrollToTop from "@/components/Common/ScrollTop";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LicenseInfo } from "@mui/x-license-pro";
import { MUI_PRO_LICENSE_KEY } from "@/api/ApiConstants";
import "dayjs/locale/ja";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { MintToastContainer } from "@/design-system";
LicenseInfo.setLicenseKey(MUI_PRO_LICENSE_KEY);

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ScrollToTop />
        <AppTheme>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ja"
            dateFormats={{ monthAndYear: "YYYY年MM月" }}
          >
            {children}
          </LocalizationProvider>
        </AppTheme>
        <MintToastContainer />
      </Provider>
    </ErrorBoundary>
  );
}
