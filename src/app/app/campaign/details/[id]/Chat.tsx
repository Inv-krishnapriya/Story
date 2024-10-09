import ImagePreviewModal from "./ImagePreviewModal";
import { v4 as uuid } from "uuid";
import useToggle from "@/hooks/useToggle";
import { Box, Collapse, Stack, useTheme } from "@mui/material";
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import ChatMessageSection from "./ChatMessageSection";
import ChatActions from "./ChatActions";
import moment from "moment";
import { ChatMessageType, ExcludedImagesTypes } from "@/utils/common.data";
import { WebsocketType } from "@/utils/common.data";
import { actions as chatActions } from "@/stores/chat/reducer";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { customerService } from "@/common/apiUrls";
import { buildFormData, removeTextAreaEmptyLines } from "@/utils";
import { IChatItem } from "@/stores/chat/interface";
import { CommentOutlinedBigIcon, MintTypography } from "@/design-system";
import { useTranslation } from "react-i18next";

interface IChatRoom {
  tabValue: number;
  chatData: IChatItem[];
  roomId: string;
  campaignId: string;
  onAddChatData: (data: IChatItem) => void;
  onSocketAddData: (data: IChatItem) => void;
  onPaginationChange: () => void;
  monitorStatus: boolean;
  chatScrollToBottom: () => void;
  monitorNickname: string;
}

const Chat = forwardRef(
  (
    {
      tabValue,
      chatData,
      roomId,
      campaignId,
      onAddChatData,
      onSocketAddData,
      onPaginationChange,
      monitorStatus,
      monitorNickname,
    }: IChatRoom,
    ref: any
  ) => {
    const [carousalData, setCarousalData] = useState<any[]>([]);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [activeCarousalIndex, setActiveCarousalIndex] = useState(0);
    const [formData, setFormData] = useState<{
      textValue: string;
      selectedFile: any;
      imagePreview: string;
      isActive: boolean;
      fileName: string;
      error: string;
    }>({
      textValue: "",
      selectedFile: null,
      imagePreview: "",
      isActive: false,
      fileName: "",
      error: "",
    });
    const theme = useTheme();

    const chatImageItemPreview = (
      data: { fileUrl: string; fileName: string }[],
      activeIndex: number
    ) => {
      togglePreviewModal();
      setCarousalData(data);
      setActiveCarousalIndex(activeIndex);
    };

    console.log("CHAT DATA : ", chatData);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event?.target;
      setFormData({
        ...formData,
        textValue: value,
        isActive: value?.trim() ? true : false,
      });
      const chatHeight = chatRef.current?.clientHeight ?? 0;
      const chatContainerHeight =
        document.querySelector(".chat-container")?.clientHeight ?? 0;
      console.log("chat height : ", chatHeight, chatContainerHeight);

      if (chatHeight - 100 < chatContainerHeight) {
        setTimeout(() => {
          if (boxRef.current) {
            const boxHeight = boxRef?.current?.clientHeight;
            setBottomBarHeight(boxHeight);
          }
        }, 10);
      }
    };

    const handleMultiFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files: any = event?.target?.files ?? [];

      if (files && files?.length > 0 && files?.length < 11) {
        let totalSize = 0;
        const fileList: any = Array.from(files);
        fileList.forEach((file: any) => {
          totalSize += file?.size;
        });
        formData.selectedFile?.forEach((file: any) => {
          totalSize += file?.size;
        });
        const MAX_TOTAL_SIZE_MB = 100;
        const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
        console.log(totalSize, MAX_TOTAL_SIZE_BYTES, "totalSize");

        if (totalSize <= MAX_TOTAL_SIZE_BYTES) {
          setFormData((prv) => ({
            ...prv,
            selectedFile: fileList,
            isActive: true,
            error: "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            error: "Total file size exceeds the limit (100 MB).",
          }));
        }
      }

      if (files.length > 10) {
        setFormData((prv) => ({
          ...prv,
          error: "You can only upload a maximum of 10 files.",
        }));
      }
    };

    const handleSingleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file: any = event?.target?.files?.[0] ?? [];
      if (file) {
        setFormData((prv) => ({
          ...prv,
          selectedFile: [file],
          isActive: true,
        }));
      }
    };

    const imageItemPreview = (src: string) => {
      togglePreviewModal();
      const item = {
        fileUrl: src,
      };
      setCarousalData([item]);
    };

    const imagePreviewData: {
      isImage: boolean;
      imageUrl: string;
      fileName: string;
      size: string;
    }[] = useMemo(() => {
      const selectedFile = formData?.selectedFile;
      if (formData?.selectedFile?.length > 0) {
        const previewData = selectedFile?.map((file: any) => {
          const isImage =
            file.type.startsWith("image/") &&
            !ExcludedImagesTypes.some(
              (extension) => file?.name?.toLowerCase()?.endsWith(extension)
            );
          let imageUrl = "";
          if (isImage) {
            imageUrl = URL.createObjectURL(file);
          }
          const sizeInMB = file?.size / (1024 * 1024);
          return {
            isImage: isImage,
            imageUrl: imageUrl,
            fileName: file.name,
            size: `${parseFloat(sizeInMB?.toFixed(2))}mb`,
          };
        });
        return previewData;
      }
      return [];
    }, [formData]);

    useLayoutEffect(() => {
      const timeout = setTimeout(() => {
        chatScrollToBottom();
      }, 1);
      return () => clearTimeout(timeout);
    }, [tabValue, chatData]);

    const clearState = () => {
      setFormData((prv) => ({
        textValue: "",
        selectedFile: null,
        imagePreview: "",
        isActive: false,
        fileName: "",
        error: "",
      }));
    };
    const onDeleteFileItem = (index: number) => {
      setFormData((prev) => {
        const updatedSelectedFile = [...prev.selectedFile];
        updatedSelectedFile?.splice(index, 1);

        return {
          ...prev,
          imagePreview: "",
          selectedFile: updatedSelectedFile,
          isActive:
            updatedSelectedFile?.length > 0 || prev?.textValue?.trim() !== "",
        };
      });
    };
    const boxRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [bottomBarHeight, setBottomBarHeight] = useState(0);

    const userID = useSelector(
      (state: RootState) => state.global.clientData.userId
    );

    useEffect(() => {
      if (boxRef.current && !formData.textValue) {
        setTimeout(() => {
          setBottomBarHeight(0);
        }, 10);
      }
    }, [formData]);

    const onSubmit = () => {
      if (formData?.textValue) {
        const unique_id = uuid()?.replaceAll("-", "");
        const now = moment();
        const formattedDateTime = new Date().toISOString();
        const trimValue = removeTextAreaEmptyLines(formData?.textValue);
        const newText = {
          message: trimValue,
          messageId: [unique_id],
          senderId: userID,
          type: WebsocketType.Message,
          messageType: ChatMessageType.Message,
          datetime: formattedDateTime,
          status: 0,
          files: [],
          id: uuid().replaceAll("-", ""),
        };
        console.log(unique_id, "unique_id");
        onSocketAddData(newText);
        clearState();
      } else if (formData?.selectedFile?.length > 0) {
        const imageFiles = formData?.selectedFile?.filter(
          (file: any) =>
            file.type.startsWith("image/") &&
            !ExcludedImagesTypes?.some(
              (extension) => file?.name?.toLowerCase().endsWith(extension)
            )
        );
        const docFiles = formData?.selectedFile?.filter(
          (file: any) =>
            !file?.type?.startsWith("image/") ||
            ExcludedImagesTypes?.some(
              (extension) => file?.name?.toLowerCase()?.endsWith(extension)
            )
        );
        const formattedDateTime = new Date()?.toISOString();
        const msgIds = docFiles?.map(() => {
          return uuid()?.replaceAll("-", "");
        });

        if (docFiles?.length > 0) {
          const docUuid = docFiles?.map(() => uuid()?.replaceAll("-", ""));
          clearState();
          docFiles?.forEach((file: any, index: number) => {
            const fileId = uuid()?.replaceAll("-", "");
            const fileUrl = URL.createObjectURL(file);
            const fileSuccessSocketAdd = (messageId: string, file: any) => {
              const newText = {
                message: "",
                messageId: [docUuid[index]],
                senderId: userID,
                type: WebsocketType.Message,
                messageType: ChatMessageType.File,
                datetime: formattedDateTime,
                status: 0,
                files: file,
                id: uuid().replaceAll("-", ""),
              };
              onSocketAddData(newText);
            };
            const newText = {
              message: "",
              messageId: [docUuid[index]],
              senderId: userID,
              type: WebsocketType.Message,
              messageType: ChatMessageType.File,
              datetime: formattedDateTime,
              status: 0,
              files: [
                {
                  fileName: file?.name,
                  fileUrl: fileUrl,
                  fileId: fileId,
                  hasPreview: false,
                  fileSize: file?.size,
                },
              ],
              id: uuid().replaceAll("-", ""),
            };
            onAddChatData(newText);
            dispatch(
              chatActions.setPendingFileMessages({
                messageId: docUuid[index],
                fileId: fileId,
                failed: false,
              })
            );
            const request = {
              roomId: roomId,
              isBroadcast: "0",
              file: file,
              messageId: docUuid[index],
            };
            const formDataRequest = buildFormData(request);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            let messageId = docUuid[index];
            customerService
              .uploadFile(campaignId, formDataRequest, config)
              .then((response) => {
                fileSuccessSocketAdd(messageId, [response?.data?.data]);
                dispatch(
                  chatActions.removePendingFileMessages({
                    messageId,
                    fileId: fileId,
                  })
                );
              })
              .catch((error) => {
                dispatch(
                  chatActions.changePendingFilesErrorStatus({
                    messageId,
                    fileId: fileId,
                  })
                );

                console.log(error?.response, "chatError");
              });
          });
        }
        if (imageFiles?.length > 0) {
          const messageId = uuid()?.replaceAll("-", "");
          const ids = uuid()?.replaceAll("-", "");
          const imageFileIds = imageFiles?.map(
            () => uuid()?.replaceAll("-", "")
          );
          const formattedDateTime = new Date().toISOString();
          const imageData = imageFiles?.map((file: any, index: number) => {
            const imageUrl = URL.createObjectURL(file);
            return {
              fileName: file?.name,
              fileUrl: imageUrl,
              fileId: imageFileIds[index],
              hasPreview: false,
              fileSize: file?.size,
            };
          });
          const newText = {
            message: formData?.textValue,
            messageId: [messageId],
            senderId: userID,
            type: WebsocketType.Message,
            messageType: ChatMessageType.Image,
            datetime: formattedDateTime,
            status: 0,
            files: imageData,
            id: ids,
          };
          onAddChatData(newText);
          clearState();
          const imageSuccessSocketAdd = (
            imageFile: any,
            id: string,
            fileId: string
          ) => {
            console.log(imageFile, id, "imageFile");

            const newText = {
              message: formData?.textValue,
              messageId: [messageId],
              senderId: userID,
              type: WebsocketType.Message,
              messageType: ChatMessageType.Image,
              datetime: formattedDateTime,
              status: 0,
              files: imageFile,
              id: ids,
            };
            onSocketAddData(newText);
            dispatch(
              chatActions.removePendingImageMessages({
                messageId: id,
                fileId: fileId,
              })
            );
          };

          imageFiles?.forEach((file: any, index: number) => {
            console.log(messageId, imageFileIds[index]);
            dispatch(
              chatActions.setPendingImageMessages({
                messageId: messageId,
                fileId: imageFileIds[index],
                failed: false,
              })
            );
            const request = {
              roomId: roomId,
              isBroadcast: "0",
              file: file,
              messageId: messageId,
            };
            const formDataRequest = buildFormData(request);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            customerService
              .uploadFile(campaignId, formDataRequest, config)
              .then((response) => {
                imageSuccessSocketAdd(
                  [response?.data?.data],
                  messageId,
                  imageFileIds[index]
                );
              })
              .catch((error: any) => {
                console.log("Error occured!!!!", error);

                dispatch(
                  chatActions.changePendingImagesErrorStatus({
                    messageId: messageId,
                    fileId: imageFileIds[index],
                  })
                );
              });
          });
        }
        console.log(imageFiles, docFiles, "docFiles");
      }
    };

    const chatScrollToBottom = () => {
      if (chatRef.current) {
        const chatContainer =
          chatRef?.current?.querySelector(".chat-container");
        if (chatContainer) {
          chatContainer.scrollIntoView({
            block: "end",
            inline: "nearest",
          });
        }
      }
    };

    const [previewModal, togglePreviewModal] = useToggle();

    const onImageClick = () => {
      togglePreviewModal();
    };

    const handleScroll = () => {
      if (chatRef?.current) {
        const scrollTop = chatRef?.current?.scrollTop;

        // Check if the content has reached the top (you can adjust the threshold as needed)
        const isAtTop = scrollTop <= 0;

        if (isAtTop) {
          onPaginationChange();
          console.log("Reached the top!");
          // Perform actions when the content reaches the top
        }
      }
    };

    const handleDownloadFile = async (fileUrl: string, fileName: string) => {
      console.log(fileUrl, fileName);

      try {
        const response = await fetch(fileUrl);
        const blob = await response?.blob();
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger a click event to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Use the provided fileName
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };

    return (
      <>
        <Box position={"relative"} id="tab3">
          <Box
            display={"flex"}
            justifyContent={"center"}
            pb={theme.mint.spacing.x3s}
          >
            <MintTypography
              size="caption"
              color={theme.mint.color.text.low}
              weight="400"
              lineHeight={"150%"}
            >
              {t("campaign.campaignDetail.modalMessage.sub-title")}
            </MintTypography>
          </Box>
          <Box
            height={"70vh"}
            display={"flex"}
            flexDirection={"column"}
            sx={{
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
            ref={chatRef}
            onScroll={handleScroll}
          >
            {chatData?.length > 0 && (
              <Collapse in>
                <ChatMessageSection
                  bottomBarHeight={bottomBarHeight}
                  onImageClick={onImageClick}
                  chatImageItemPreview={chatImageItemPreview}
                  data={chatData}
                  monitorName={monitorNickname}
                  handleDownloadFile={handleDownloadFile}
                />
              </Collapse>
            )}

            {chatData?.length === 0 && (
              <Stack
                py={`${theme.mint.spacing.x3l}`}
                px={`${theme.mint.spacing.s}`}
                justifyContent={"center"}
                textAlign={"center"}
                alignItems={"center"}
              >
                <CommentOutlinedBigIcon />
                <MintTypography
                  size="body"
                  lineHeight={"150%"}
                  color={theme.mint.color.text.low}
                >
                  {t("campaign.campaignDetail.modalMessage.info-message")}
                </MintTypography>
              </Stack>
            )}
          </Box>

          {previewModal && (
            <ImagePreviewModal
              open={previewModal}
              onClose={togglePreviewModal}
              data={carousalData}
              handleDownloadFile={handleDownloadFile}
              activeCarousalIndex={activeCarousalIndex}
            />
          )}
        </Box>
        <ChatActions
          ref={boxRef}
          formData={formData}
          handleMultiFileChange={handleMultiFileChange}
          handleSingleFileChange={handleSingleFileChange}
          imageItemPreview={imageItemPreview}
          onDeleteFileItem={onDeleteFileItem}
          onInputChange={onInputChange}
          imagePreviewData={imagePreviewData}
          monitorStatus={monitorStatus}
          onSubmit={onSubmit}
        />
      </>
    );
  }
);

export default Chat;
