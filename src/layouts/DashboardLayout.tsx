"use client";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { MintAppBar } from "@/design-system";
import { useMediaQuery } from "@mui/material";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  hasBasicAccessSelector,
  ticketInfoSelector,
  userActiveStatusSelector,
} from "@/stores/global/selector";
import { setCampaignDetails as setCampaignDetailsAction } from "@/stores/data/reducer";

import { useEffect, useState } from "react";
import { customerService } from "@/common/apiUrls";
import {
  addClientData,
  getClientInfoRequest,
  logoutRequest,
  resetClientData,
  updatePreviewModeValue,
} from "@/stores/global/reducer";
import { openDrawer } from "@/stores/dashboard/reducer";
import AppToolbar from "@/components/UI/app-bar/AppToolBar";
import AppSideBar from "@/components/UI/app-bar/AppSideBar";
import useToggle from "@/hooks/useToggle";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import UseFcmToken from "@/hooks/useFcmToken";
import { NotificationType } from "@/utils/common.data";
import { checkIfLoading } from "@/stores/ui/selector";
import { actions } from "@/stores/campaign/reducer";
import { SSO_Redirection_URL } from "@/api/ApiConstants";
import { RootState } from "@/stores/rootReducer";
import { getErrorCode, getErrorMessage } from "@/utils";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  height: "100vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.mint.color.background.uiBackground,
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${theme.mint.drawerWidth}px`,
  ...(open && {
    width: `calc(100% - ${theme.mint.drawerWidth}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MintAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${theme.mint.drawerWidth}px)`,
    marginLeft: `${theme.mint.drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

let count = 0;
let sessionExistCount = 0;

export default function DashboardLayout({ children }: any) {
  const isUserActive = useSelector(userActiveStatusSelector);
  const hasBasicAccess = useSelector(hasBasicAccessSelector);
  const ticketInfo = useSelector(ticketInfoSelector);
  const isLoggingOut = useSelector(checkIfLoading(logoutRequest.type));
  const [isSessionExist, setIsSessionExist] = useState<boolean>(false);
  const [oneTimeToken, setOneTimeToken] = useState<string>("");
  const [logoutConfirmModal, toggleLogoutConfirmModal] = useToggle();
  const theme = useTheme();
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const matches = useMediaQuery("(max-width:850px)");
  const [open, setOpen] = useState(!matches);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const setIsUnreadExist = (data: boolean) =>
    dispatch(actions.setIsUnreadExist(data));
  const search = useSearchParams();
  const clientData = useSelector((state: RootState) => state.global.clientData);
  const token = search?.get("token");

  // useFcmToken();

  useEffect(() => {
    setIsPageReady(true);
    if (isUserActive) {
      dispatch(getClientInfoRequest());
      dispatch(updatePreviewModeValue(false));
      // firebaseGetMessage();
      firebaseNotificationHandle();
    }
  }, [isUserActive]);

  const isPathEnquiry = pathname.includes("/app/inquiry");

  const AuthenticateSSOUSer = async (data: any) => {
    console.log("DATA : ", JSON.parse(data));
    console.log("Token get from home URL : ", count, sessionExistCount, router);
    try {
      const response = await customerService.authenticateSSOUser(data);
      console.log("Response from API call : ", response);
      if (response) {
        dispatch(
          addClientData(
            JSON.stringify({
              accessToken: response?.data?.data?.accessToken,
              refreshToken: response?.data?.data?.refreshToken,
              userId: response?.data?.data?.userId,
              isUserServiceAgreementAccepted:
                response?.data?.data?.isUserServiceAgreementAccepted,
              isUserConfidentialityAgreementAccepted:
                response?.data?.data?.isUserConfidentialityAgreementAccepted,
              isSsoLogin: true,
            })
          )
        );
        const hasUserAgreedPolicies =
          response?.data?.data?.isUserConfidentialityAgreementAccepted &&
          response?.data?.data?.isUserServiceAgreementAccepted;
        if (router) {
          router.push(
            hasUserAgreedPolicies ? "/app/home" : "/auth/accept-app-policy"
          );
          // setIsSessionExist(false);
        }
      }
    } catch (error: any) {
      console.log("Error occured in SSO login : ", error);
      const errorCode = getErrorCode(error?.response?.data);
      const errorMessage = getErrorMessage(error?.response?.data) ?? "";
      console.log(errorCode);
      if (errorCode === "E100002") {
        setOneTimeToken(error?.response?.data?.data?.oneTimeToken);
        console.log("User session exist for sso user");
        setIsSessionExist(true);
      } else {
        router.replace(SSO_Redirection_URL);
      }
    }
  };

  useEffect(() => {
    if (pathname === "/app/home" && token) {
      console.log("USer logged in thru AIRs");
      dispatch(resetClientData());
      const data = JSON.stringify({
        token: token,
        isSessionExist: isSessionExist,
      });
      if (count === 0) {
        count++;
        AuthenticateSSOUSer(data);
      }
    } else if (!isUserActive && clientData?.isSsoLogin) {
      router.replace(SSO_Redirection_URL);
    } else if (!isUserActive) {
      console.log("User not active ", !isUserActive, !isSessionExist);
      if (!isSessionExist) {
        redirect("/auth/login");
      }
    }

    if (
      isPageReady &&
      isUserActive &&
      !["/app/home", "/app/home/notification"].includes(pathname)
    ) {
      console.log("pathname", pathname);

      getNotificationList();
    }
    if (!isUserActive && hasBasicAccess && !token) {
      console.log(
        "Not an actiev user but have basic access ",
        !isUserActive,
        hasBasicAccess,
        !isPathEnquiry,
        !isSessionExist
      );

      if (!isPathEnquiry) {
        if (!isSessionExist) redirect("/auth/accept-app-policy");
      }
    }
  }, [isPageReady, pathname]);

  const getNotificationList = async () => {
    await customerService
      .getNotificationList({ page: "1" })
      .then((res) => {
        console.log(res);
        setIsUnreadExist(res?.data?.isUnreadExists);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDrawerToggle = () => {
    dispatch(openDrawer(!open));
    setOpen(!open);
  };

  const setCampaignDetails = (data: any) =>
    dispatch(setCampaignDetailsAction(data));

  const getPublishedCampaignDetails = async (id: any) => {
    console.log("Campaign get API called");

    await customerService

      .getFilterData(id, { status: 1 })

      .then((response: any) => {
        console.log("Response from api: ", response);

        setCampaignDetails(response?.data?.data);
      });
  };

  const firebaseGetMessage = () => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // const notificationTitle = payload?.data?.title ?? "";
        // const notificationOptions = {
        //   body: payload?.data?.body,
        //   icon: "/icon-192x192.png",
        // };
        const notificationType = payload?.data?.notificationType ?? "0";

        const campaignId = payload?.data?.campaignId;

        if (
          [
            "" + NotificationType.SCHEDULE_CONFIRMATION,
            "" + NotificationType.MONITOR_CHAT,
          ].includes(notificationType) &&
          pathname.includes("app/campaign/details/" + campaignId)
        ) {
          getPublishedCampaignDetails(campaignId);
        }
        // navigator.serviceWorker
        //   .getRegistration("/firebase-cloud-messaging-push-scope")
        //   .then((registration) => {
        //     registration?.showNotification(
        //       notificationTitle,
        //       notificationOptions
        //     );
        //   });
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  };

  const firebaseNotificationHandle = () => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (!event.data.action) {
          return;
        }

        if (event.data.action == "redirect-from-notificationclick") {
          navigate.push("/app/home/notification");
        }
      });
    }
  };

  const handleLogout = () => {
    dispatch(logoutRequest({ router: navigate }));
  };

  const onHeaderClick = () => {
    navigate.push("/app");
  };

  const appActionClick = () => {
    navigate.push("/app/ticket");
  };

  const onSessionExistAgree = () => {
    console.log("Session exist agree clicked : ", isSessionExist);
    const data = JSON.stringify({
      isSessionExist: isSessionExist,
      oneTimeToken: oneTimeToken,
    });
    if (sessionExistCount === 0) {
      sessionExistCount++;
      AuthenticateSSOUSer(data);
    }
  };

  const onSessionExistDisagree = () => {
    console.log("Session exist disagree clicked : ", isSessionExist);
    setIsSessionExist(false);
    router.replace(SSO_Redirection_URL);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {isPageReady && isUserActive && (
        <>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <AppToolbar
              appName="dashboard.header"
              hasMenuButton
              hasAppBarActions
              handleMenuBarToggle={handleDrawerToggle}
              onHeaderClick={onHeaderClick}
              isUserActive={isUserActive}
              ticketInfo={ticketInfo}
              appActionClick={appActionClick}
            />
          </AppBar>
          <AppSideBar handleLogout={toggleLogoutConfirmModal} open={open} />

          <Main open={open} id="main-container">
            <DrawerHeader
              sx={{
                height: theme.mint.appBarHeight,
                minHeight: theme.mint.appBarHeight,
                [theme.breakpoints.up("xs")]: {
                  minHeight: theme.mint.appBarHeight,
                },
              }}
            />
            <Box p={theme.mint.spacing.xl} flexGrow={1}>
              {children}
            </Box>
          </Main>
          {logoutConfirmModal && (
            <ConfirmationModal
              open={logoutConfirmModal}
              title="modal.logout.title"
              agreeButtonName="modal.logout.agreeButton"
              disAgreeButtonName="modal.logout.disAgreeButton"
              onAgree={handleLogout}
              onDisagree={toggleLogoutConfirmModal}
              hideModalContent
              isLoading={isLoggingOut}
            />
          )}
        </>
      )}
      {isSessionExist && (
        <ConfirmationModal
          open={isSessionExist}
          onAgree={onSessionExistAgree}
          onDisagree={onSessionExistDisagree}
          onClose={() => setIsSessionExist(false)}
          title="modal.client-login.title"
          content="modal.client-login.content"
          agreeButtonName="modal.client-login.agreeButton"
          disAgreeButtonName="modal.client-login.disAgreeButton"
          modalWidth="400px"
        />
      )}
      {isPageReady && isUserActive && <UseFcmToken />}
    </Box>
  );
}
