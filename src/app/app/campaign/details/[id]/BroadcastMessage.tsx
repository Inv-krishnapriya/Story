"use client";

import { IMonitorData } from "@/app/app/campaign/details/[id]/ApplicantDetails";
import { customerService } from "@/common/apiUrls";
import {
  CheckOutlinedIcon,
  CrossOutlinedIcon,
  ExclamationOutlinedIcon,
  FolderOutlinedIcon,
  MintButton,
  MintChip,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTextField,
  MintTypography,
  successToast,
} from "@/design-system";
import { Box, Chip, CircularProgress, Stack, useTheme } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "moment/locale/ja";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { RootState } from "@/stores/rootReducer";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { ChatMessageType } from "@/utils/common.data";

interface IOfferModalProps {
  open: boolean;
  onClose: () => void;
  onDisagree: () => void;
  applicantList: IMonitorData[];
  campaignId: string;
  handleCampaign: (id: any) => void;
}

interface ChatFile {
  id: string;
  fileName: string;
  fileUrl: string;
  hasPreview: boolean;
  fileSize: number;
  fileType?: number;
}

const BroadCastMessage: React.FC<IOfferModalProps> = (props) => {
  const {
    open,
    onClose,
    onDisagree,
    applicantList,
    campaignId,
    handleCampaign,
  } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { t } = useTranslation();
  const [isMore, setIsMore] = useState<boolean>(false);
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<
    { file: File; isUploading: boolean; status: boolean }[]
  >([]);
  const chatApplicants = applicantList?.map((item) => {
    return `${campaignId}${item.id}`;
  });

  const [socketFiles, setsocketFiles] = useState<ChatFile[]>([]);
  const [fileError, setFileError] = useState<any>(null);
  const [isUploading, setIsuploading] = useState<boolean>(false);
  const [fileCount, setFileCount] = useState<number>(0);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<any>(null);
  const [socketProperties, setSocketProperties] = useState({
    connection: true,
    reconnectCount: 0,
  });
  const tokenData = useSelector(
    (state: RootState) => state.global.clientData.accessToken
  );

  const userID = useSelector(
    (state: RootState) => state.global.clientData.userId
  );

  const query = {
    authorizationToken: tokenData,
    userType: "0",
    userId: userID,
  };

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  const { readyState, sendJsonMessage, sendMessage } = useWebSocket(
    socketUrl! + String(chatApplicants) + "/",
    {
      queryParams: query,

      onOpen: () => {
        console.log("Connected!!!!!!!!!!!");
      },
      onClose: (e) => {
        console.log(e.wasClean);
        console.log("Disconnected!");
      },
      onError: (e) => {
        console.log(e, "error");
      },
      onReconnectStop(numAttempts) {
        console.log(numAttempts);
      },
      shouldReconnect(event) {
        console.log(event);
        return true;
      },
      reconnectInterval: 5000,
      reconnectAttempts: 3,
      retryOnError: false,
      onMessage: (e) => {
        console.log(e, "onMessage");
        let data = JSON.parse(e.data);
        console.log(data);
        console.log(data?.id, data?.data);
        if (data?.id || data?.data) {
          handleCampaign(campaignId);
          onClose();
          successToast("送信が完了しました");
          setFileCount(0);
        }
        // if (data?.errorCode === "E600003") {
        //   setSocketProperties((prev) => ({
        //     ...prev,
        //     connection: false,
        //   }));
        //   setTimeout(() => {
        //     setSocketProperties((prev) => ({
        //       ...prev,
        //       connection: true,
        //       reconnectCount: prev?.reconnectCount + 1,
        //     }));
        //   }, 1000);
        // } else if (data?.errorCode === "E200071") {
        //   setSocketProperties((prev) => ({
        //     ...prev,
        //     connection: false,
        //   }));
        // }
      },
    },
    socketProperties.connection && socketProperties?.reconnectCount <= 20
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  addEventListener("offline", function () {
    setIsOffline(true);
    setNetworkError("Can't connect to chat!");
    console.log("Network status: Offline");
  });

  addEventListener("online", function () {
    setIsOffline(false);
    setNetworkError(null);
    console.log("Network status: online");
  });

  useEffect(() => {
    console.log("Connection status : ", connectionStatus);
    if (connectionStatus === "Closed") {
      setIsOffline(true);
      setNetworkError(null);
    }
  }, [connectionStatus]);

  const BroadcastMessageToAll = () => {
    if (message.length > 0) {
      let msgIds: any = applicantList?.map(() => {
        return uuid().replaceAll("-", "");
      });
      sendJsonMessage({
        messageId: msgIds,
        message: message,
        senderId: userID,
        type: "chat_message",
        datetime: new Date().toISOString(),
        files: [],
        id: uuid().replaceAll("-", ""),
        messageType: ChatMessageType?.Message,
      });
    }

    if (socketFiles.length > 0) {
      console.log("FILES : ", socketFiles);

      const imageFiles = socketFiles?.filter(
        (file: ChatFile) => file?.fileType === ChatMessageType?.Image
      );
      const docFiles = socketFiles?.filter(
        (file: ChatFile) => file?.fileType === ChatMessageType?.File
      );
      if (imageFiles.length > 0) {
        let msgIds: any = applicantList?.map(() => {
          return uuid()?.replaceAll("-", "");
        });
        sendJsonMessage({
          messageId: msgIds,
          message: "",
          senderId: userID,
          type: "chat_message",
          datetime: new Date()?.toISOString(),
          files: imageFiles,
          id: uuid().replaceAll("-", ""),
          messageType: ChatMessageType?.Image,
        });
      }

      if (docFiles.length > 0) {
        let msgIds: any = applicantList?.map(() => {
          return uuid()?.replaceAll("-", "");
        });
        sendJsonMessage({
          messageId: msgIds,
          message: "",
          senderId: userID,
          type: "chat_message",
          datetime: new Date()?.toISOString(),
          files: docFiles,
          id: uuid()?.replaceAll("-", ""),
          messageType: ChatMessageType?.File,
        });
      }
    }
  };

  const handleIsMore = () => {
    console.log("Inside more settings!!!!!");

    setIsMore(!isMore);
  };
  const [visibleItemsCount, setVisibleItemsCount] = useState<any>(0);
  const hiddenElementCount = applicantList?.length - visibleItemsCount ?? 0;
  const [userefReady, setUseRefReady] = useState(false);
  let chatFiles: ChatFile[];

  const observer = new IntersectionObserver(
    (entries) => {
      // entries is an array of observed elements
      const visibleItems = entries.filter((entry) => entry?.isIntersecting);
      console.log(visibleItemsCount, "visibleItemsCount");
      console.log(visibleItems?.length, "visibleItems?.lengtht");
      console.log(isMore, "isMore");

      if (visibleItemsCount !== visibleItems?.length && !isMore) {
        setVisibleItemsCount(visibleItems?.length ?? 0);
      }
    },
    {
      root: null, // use the viewport as the root
      rootMargin: "0px", // no margin
      threshold: 0.5, // trigger when 50% of the element is visible
    }
  );

  if (containerRef.current) {
    // Observe each child element
    containerRef.current.childNodes.forEach((child: any) => {
      observer?.observe(child);
    });
  }
  console.log(observer);

  useLayoutEffect(() => {
    console.log(isMore, containerRef?.current, "isMore");

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [userefReady]);

  useEffect(() => {
    setFiles([]);
    setTimeout(() => {
      setUseRefReady(true);
    }, 1);
  }, []);

  useEffect(() => {
    console.log(files, fileCount);
  }, [fileCount, socketFiles]);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(files, e);
    if (fileError !== null) {
      setFileError(null);
    }

    const selectedFiles = Object.values(e?.target?.files!);
    const filesToUpload = selectedFiles?.map((item) => {
      return { file: item, isUploading: false, status: false };
    });
    if (Object.values(e?.target?.files!)?.length > 10) {
      setFileError("You can only upload a maximum of 10 files.");
      return;
    }

    let fileSize = checkFilesizeExceeded(filesToUpload);

    if (fileSize > 100) {
      setFileError("Total file size exceeds the limit (100 MB).");
      return;
    }

    chatFiles = [...socketFiles];

    if (Object.values(e?.target?.files!)?.length <= 10 && fileSize <= 100) {
      setFileCount(Object.values(e?.target?.files!)?.length);
      setIsuploading(true);
      console.log(files);
      Object.values(e?.target?.files!)?.map((item, index: any) => {
        handleFileUpload(item, index);
      });
      setIsuploading(false);
    }
  };

  const handleFileUpload = (item: any, index: number) => {
    console.log(item);

    setFiles((prev) => {
      let newValue = { file: item, isUploading: true, status: false };
      let existingArray = [newValue, ...prev];

      // existingArray[index] = newValue;
      return existingArray;
    });
    const formData = new FormData();
    formData.append("file", item);
    formData.append("isBroadcast", "1");
    formData.append("roomId", "");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    customerService
      .uploadFile(campaignId, formData, config)
      .then((response) => {
        console.log("File upload successful : ", response);
        chatFiles.push({
          id: response?.data?.data?.id,
          fileName: response?.data?.data.fileName,
          fileUrl: response?.data?.data?.fileUrl,
          hasPreview: response?.data?.data?.hasPreview,
          fileSize: response?.data?.data?.fileSize,
          fileType: item.type.startsWith("image/")
            ? ChatMessageType.Image
            : ChatMessageType.File,
        });

        updateItemAtIndex(index, {
          file: item,
          isUploading: false,
          status: true,
        });
        setsocketFiles(chatFiles);
      })
      .catch((error) => {
        console.log("Error occured during file upload : ", error);
        updateItemAtIndex(index, {
          file: item,
          isUploading: false,
          status: false,
        });
      });
  };

  const updateItemAtIndex = (index: number, newValue: any) => {
    setFiles((prev) => {
      let existingArray = [...prev];
      existingArray[index] = newValue;
      return existingArray;
    });
  };

  const handleDelete = (index: number) => {
    let currentFiles = [...files];
    let arrayAfterDelete = currentFiles?.splice(index, 1);
    console.log(arrayAfterDelete, currentFiles);
    setFiles(currentFiles);
    let currentSocketFiles = [...socketFiles];
    let socketArrayAfterDelete = currentSocketFiles?.splice(index, 1);
    console.log(socketArrayAfterDelete, currentSocketFiles);
    setsocketFiles(currentSocketFiles);
    let size = checkFilesizeExceeded(currentFiles);
    if (size > 100) {
      setFileError("Total file size exceeds the limit (100 MB).");
    } else if (currentFiles?.length > 10) {
      setFileError("You can only upload a maximum of 10 files.");
    } else {
      setFileError(null);
    }
    console.log(files);
  };

  const getFileSize = (size: number) => {
    let kb = size / Math.pow(1024, 1);
    let mb = size / Math.pow(1024, 2);
    console.log(kb, mb);

    let totalsize;
    if (mb > 1) {
      totalsize = Math.floor(mb) + "mb";
    } else if (kb > 1) {
      totalsize = Math.floor(kb) + "kb";
    } else {
      totalsize = size + "b";
    }

    return totalsize;
  };

  const checkFilesizeExceeded = (filesSelected: any[]) => {
    let totalSize: number = 0;
    let size: any = filesSelected?.map((item) => {
      console.log(item?.file?.size);
      totalSize = totalSize + item?.file?.size;
    });

    let fileSize: number = totalSize / Math.pow(1024, 2);
    return fileSize;
  };

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          display: "flex",
          width: "600px",
          height: "672px",
          padding: 0,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          borderRadius: (theme) => theme.mint.cornerRadius.xs,
          background: (theme) => theme.mint.color.surfaceGray.high.high,
          boxShadow: (theme) => theme.mint.color.surfaceGray.componentBg.bg,
        },
      }}
    >
      <MintDialogTitle
        sx={{
          display: "flex",
          padding: 3,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          alignSelf: "stretch",
        }}
      >
        <MintTypography
          size="head-m"
          weight="500"
          fontStyle={"normal"}
          fontFamily={"Roboto"}
        >
          {t("campaign.campaignDetail.modalMessage.title")}
        </MintTypography>

        <MintTypography
          size="caption"
          color={theme.mint.color.text.low}
          weight="400"
          lineHeight={"150%"}
        >
          {t("campaign.campaignDetail.modalMessage.sub-title")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          "&.MuiDialogContent-root": {
            overflowY: "hidden",
          },
          display: "flex",
          padding: "0px 24px 16px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
          flex: "0px 0px 0px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 3,
            alignSelf: "stretch",
            height: "76px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: 0,
              alignItems: "baseline",
              gap: 1,
            }}
          >
            <MintTypography size="head-xs" weight="700">
              {t("campaign.campaignDetail.modalOffer.applicants")}
            </MintTypography>
            <MintTypography
              size="body"
              weight="400"
              sx={{ color: (theme) => theme.mint.color.text.accent }}
            >
              {applicantList?.length}{" "}
              {t("campaign.campaignDetail.modalOffer.count")}
            </MintTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 1,
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderRadius: (theme) => theme.mint.cornerRadius.xs,
              border: "1px solid rgba(10, 24, 38, 0.08)",
            }}
          >
            <Box
              ref={containerRef}
              id="applicantsList"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
                height: isMore ? "auto" : "35px",
                padding: 0,
                alignItems: "center",
                gap: 1,
              }}
            >
              {applicantList?.map((monitor, index) => {
                return (
                  <Box
                    key={index}
                    className="applicant"
                    sx={{
                      alignItems: "center",
                      padding: "4px 8px",
                      justifyContent: "center",
                    }}
                  >
                    <MintChip
                      size="small"
                      color="primary"
                      variant="filled"
                      sx={{
                        background: (theme) =>
                          theme.mint.color.surfaceAccent.primary.bright,
                      }}
                      // selected
                      label={monitor?.name}
                    />
                  </Box>
                );
              })}
            </Box>
            {!isMore && hiddenElementCount > 0 && userefReady && (
              <Box
                sx={{
                  alignItems: "center",
                  padding: "4px 8px",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <MintTypography size="body" weight="500">
                  <MintChip
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleIsMore}
                    sx={{
                      // visibility: isMore ? "visible" : "hidden",
                      background: (theme) =>
                        theme.mint.color.surfaceAccent.primary.bright,
                    }}
                    label={`+他${hiddenElementCount}名`}
                  />
                </MintTypography>
              </Box>
            )}
            {isMore && (
              <Box
                sx={{
                  alignItems: "end",
                  padding: "4px 8px",
                  justifyContent: "center",
                  display: "flex",
                  height: "100%",
                }}
              >
                <MintTypography size="body" weight="500">
                  <MintButton
                    size="small"
                    color="gray"
                    variant="text"
                    onClick={handleIsMore}
                  >
                    {t("campaign.campaignDetail.close-more")}
                  </MintButton>
                </MintTypography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              flex: "8px 0px 0px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column",
                alignItems: "flex-start",
                paddingBottom: 1,
                gap: 1,
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
              }}
            >
              <MintTypography size="head-xs" weight="700">
                {t("campaign.campaignDetail.modalMessage.message-area")}
              </MintTypography>
            </Box>

            <Box
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                display: "flex",
                paddingBottom: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                flex: "8px 0px 0px",
                alignSelf: "stretch",
                overflowY: "auto",
                height: "219px",
              }}
            >
              <MintTextField
                sx={{
                  width: "550px",
                  ".MuiOutlinedInput-root": {
                    padding: "2px",
                    border: "1px solid white",
                    borderColor: "white",
                    borderWidth: "0px",
                    "&.Mui-focused": {
                      outline: "none",
                    },
                    ":hover": {
                      backgroundColor: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    },
                    ":active": {
                      backgroundColor: "white",
                      outline: "none",
                      borderWidth: "0px",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    },
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    outline: "none",
                  },

                  "& .MuiOutlinedInput-input": {
                    padding: "unset",
                    width: "552px",
                    height: "278px",
                  },
                }}
                multiline
                inputProps={{ maxLength: 500 }}
                minRows={9}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>
            {files?.length > 0 && (
              <Box
                id="upload-area"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "552px",
                  height: "120px",
                  gap: 1,
                  overflowY: "scroll",
                  paddingBottom: 2,
                }}
              >
                {files?.map((item: any, index: any) => {
                  let itemName =
                    item?.file?.name +
                    " (" +
                    getFileSize(item?.file?.size) +
                    ") ";

                  return (
                    <>
                      <Box
                        sx={{
                          height: "36px",
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                        }}
                      >
                        <Stack
                          spacing={2}
                          gap={2}
                          direction="row"
                          sx={{
                            position: "relative",
                            width: "341px",
                            background:
                              theme.mint.color.background.containerBg.layer2,
                            borderRadius: "4px",
                          }}
                        >
                          <Box sx={{ width: "328px" }}>
                            <Chip
                              sx={{
                                "&.MuiChip-root": {
                                  background:
                                    theme.mint.color.background.containerBg
                                      .layer2,
                                },
                                "&.MuiButtonBase-root": {
                                  width: "341px",
                                  height: "36px",
                                  paddingRight: 1,
                                  borderRadius: "4px",
                                  background:
                                    theme.mint.color.background.containerBg
                                      .layer2,
                                },
                                ".MuiChip-label": {
                                  fontSize: "12px",
                                  paddingRight: "12px",
                                  fontWeight: "400",
                                  color: "#0A1826",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                },
                              }}
                              label={itemName}
                            />
                          </Box>

                          <Box
                            sx={{
                              cursor: "pointer",
                              display: "flex",
                              position: "absolute",
                              right: "8px",
                              alignSelf: "center",
                            }}
                          >
                            <CrossOutlinedIcon
                              size={16}
                              color="#0A1826"
                              onClick={() => handleDelete(index)}
                              data-testid={`file-item-delete-${index}`}
                            />
                          </Box>
                        </Stack>
                        {item?.isUploading ? (
                          <Box>
                            <CircularProgress size={20} />
                          </Box>
                        ) : item?.status ? (
                          <Box>
                            <CheckOutlinedIcon color="#167D6F" />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display:
                                fileError !== null && networkError !== null
                                  ? "none"
                                  : "flex",
                              // display: "flex",
                              flexDirection: "row",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <ExclamationOutlinedIcon
                              size={20}
                              color="#E01C0D"
                            />
                            <MintTypography size="caption" color="#E01C0D">
                              Failed!
                            </MintTypography>
                            <MintTypography
                              size="caption"
                              onClick={() =>
                                handleFileUpload(item?.file, index)
                              }
                              data-testid={`file-item-${index}`}
                              color={"blue"}
                              sx={{ cursor: "pointer" }}
                            >
                              Resend
                            </MintTypography>
                          </Box>
                        )}
                      </Box>
                    </>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </MintDialogContent>
      <MintDialogActions
        background="#FFF"
        sx={{
          width: "100%",
          borderTop: "1px solid rgba(10, 24, 38, 0.08)",
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 1,
        }}
      >
        {fileError && (
          <Box
            sx={{
              display: networkError !== null ? "none" : "flex",
              alignSelf: "flex-start",
              color: "red",
            }}
          >
            {fileError}
          </Box>
        )}
        {networkError && (
          <Box sx={{ alignSelf: "flex-start", color: "red" }}>
            {networkError}
          </Box>
        )}{" "}
        {/* </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <MintButton variant="outlined" color="gray" component="label">
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => handleFileSelection(e)}
                onClick={(e) => {
                  e.currentTarget.value = "";
                }}
                data-testid="file-input"
              />
              <FolderOutlinedIcon />
              <MintTypography
                size="body"
                weight="500"
                color={theme.mint.color.text.medium}
              >
                {t("campaign.campaignDetail.modalMessage.upload-button")}
              </MintTypography>
            </MintButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <MintButton
              size="medium"
              variant="text"
              color="accentPrimary"
              onClick={onDisagree}
            >
              <MintTypography
                size="body"
                weight="500"
                color={(theme) => theme.mint.color.text.accent}
                lineHeight={"100%"}
              >
                {t("campaign.campaignDetail.modalOffer.disagreeButtonName")}
              </MintTypography>
            </MintButton>

            {(files?.length > 0 &&
              !isUploading &&
              fileError == null &&
              networkError == null) ||
            message?.length > 0 ? (
              <MintButton
                id="agreeButton"
                disabled={isOffline || files.length !== socketFiles?.length}
                size="medium"
                variant="contained"
                onClick={BroadcastMessageToAll}
                data-testid="broadcast-all"
                sx={{
                  background: (theme) =>
                    theme.mint.color.surfaceAccent.primary.primary,
                }}
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={(theme) => theme.mint.color.text.highInverse}
                  lineHeight={"100%"}
                >
                  {t("campaign.campaignDetail.modalOffer.agreeButtonName")}
                </MintTypography>
              </MintButton>
            ) : (
              <MintButton
                id="disabledAgreeButton"
                size="medium"
                variant="contained"
                disabled
                sx={{
                  background: (theme) =>
                    theme.mint.color.surfaceAccent.primary.primary,
                }}
              >
                {isUploading ? (
                  <CircularProgress />
                ) : (
                  <MintTypography
                    size="body"
                    weight="500"
                    color={(theme) => theme.mint.color.text.highInverse}
                    lineHeight={"100%"}
                  >
                    {t("campaign.campaignDetail.modalOffer.agreeButtonName")}
                  </MintTypography>
                )}
              </MintButton>
            )}
          </Box>
        </Box>
      </MintDialogActions>
    </MintDialog>
  );
};

export default BroadCastMessage;
