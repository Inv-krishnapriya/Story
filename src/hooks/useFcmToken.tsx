import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { customerFcmTokenSelector } from "@/stores/global/selector";
import { communicationService } from "@/common/apiUrls";
import { warningToast } from "@/design-system";
import { setFcmToken } from "@/stores/global/reducer";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";

const UseFcmToken = () => {
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState(true);
  const firebaseToken = useSelector(customerFcmTokenSelector);
  const dispatch = useDispatch();

  const saveToken = (currentToken: any) => {
    const body = {
      deviceRegistrationToken: currentToken,
      isActive: true,
    };
    communicationService.registerFCMToken(body).then((res) => {
      dispatch(setFcmToken(currentToken));
    });
  };

  const windowNotification =
    typeof Notification != "undefined" ? Notification.permission : null;

  const handleClose = () => {
    setIsOpen(false);

    // dispatch(globalActions.setNotificationRejected(true));
  };

  const requestToken = async () => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "Notification" in window
    ) {
      const messaging = getMessaging(firebaseApp);
      const currentToken = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      console.log("token", currentToken);

      if (currentToken && firebaseToken != currentToken) {
        saveToken(currentToken);
      } else {
        console.log("same token");
      }
    }
  };

  console.log("open", isOpen);

  useEffect(() => {
    // console.log("open",isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (window.Notification != undefined) {
      console.log(
        "notification token permission",
        window.Notification.permission
      );
      console.log("first time", firstTime);

      if (window.Notification.permission == "granted") {
        requestToken();
        // dispatch(globalActions.setNotificationRejected(false))
        // setOpen(true)
      } else if (!firebaseToken && firstTime && !isOpen) {
        setTimeout(() => {
          
          setIsOpen(true);
        }, 500);
        dispatch(setFcmToken(""));
        setFirstTime(false);
      } else if (firebaseToken) {
        dispatch(setFcmToken(""));
        setFirstTime(false);
      }
      //  else if (window.Notification.permission == "default") {
      //   dispatch(globalActions.setFcmToken(""));
      //   dispatch(globalActions.setNotificationRejected(false));

      //   setOpen(true);
      // } else if (window.Notification.permission == "denied") {
      //   dispatch(globalActions.setFcmToken(""));
      // }
    }
  }, [windowNotification]);

  // useEffect(() => {
  const requestPermission = async () => {
    setIsOpen(false);
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "Notification" in window
    ) {
      const messaging = getMessaging(firebaseApp);
      console.log("token request permission");

      // Retrieve the notification permission status
      Notification.requestPermission()
        .then(async (permission) => {
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: vapidKey,
            });

            console.log("token", currentToken);

            if (currentToken && firebaseToken != currentToken) {
              saveToken(currentToken);
            } else {
              console.log("same token");
            }
          } else if (permission == "denied") {
            console.log("permission denied token");

            warningToast("設定で通知を有効にしてください。", {
              delay: 1000,
            });
          }
        })
        .catch((error) => {
          console.log("An error occurred while retrieving token:", error);
        });

      // Check if permission is granted before retrieving the token
    } else {
      console.log("Notification not supported");
    }
  };

  return (
    <>
      {isOpen && (
        <ConfirmationModal
          open={isOpen}
          title="InterviewZeroが通知を送ります。"
          content="通知の受け取りの許可をしてください。"
          agreeButtonName="はい"
          disAgreeButtonName="いいえ"
          onAgree={requestPermission}
          onDisagree={handleClose}
          hasTransition={true}
          hideBackdrop
          sx={{
            "& .MuiDialog-container": {
              alignItems: "flex-start",
            },
          }}
        />
      )}
    </>
  );
};

export default UseFcmToken;
