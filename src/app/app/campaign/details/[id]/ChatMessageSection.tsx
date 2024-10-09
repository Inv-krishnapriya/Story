import {
  DocumentOutlinedIcon,
  DownloadOutlinedIcon,
  MintIconButton,
  MintTypography,
} from "@/design-system";
import {
  Box,
  CircularProgress,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import {
  ChatMessageType,
  MessageStatus,
  MessageType,
} from "@/utils/common.data";
import moment from "moment";
import { arrangeChatMessagesByDate, renderTextWithLinks } from "@/utils/index";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import { IChatItem } from "@/stores/chat/interface";
import errorGif from "../../../../../../public/images/error.gif";
import { useTranslation } from "react-i18next";

function ChatMessageSection({
  bottomBarHeight,
  onImageClick,
  chatImageItemPreview,
  data,
  handleDownloadFile,
  monitorName,
}: {
  bottomBarHeight: number;
  onImageClick: () => void;
  chatImageItemPreview: (
    data: { fileUrl: string; fileName: string }[],
    activeIndex: number
  ) => void;
  data: IChatItem[];
  handleDownloadFile: (fileUrl: string, fileName: string) => void;
  monitorName: string;
}) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [chatData, setChatData] = useState<IChatItem[]>([]);
  console.log(data);

  const pendingImageMessages = useSelector(
    (state: RootState) => state.chat.pendingImageMessages
  );
  const pendingFileMessages = useSelector(
    (state: RootState) => state.chat.pendingFileMessages
  );

  const isPending: any = (fileId: string, msgId: string) => {
    const pendingFile = pendingFileMessages?.find((message) => {
      return message.fileId === fileId && message?.messageId === msgId?.[0];
    });
    return pendingFile;
  };

  const isPendingImage: any = (fileId: string, msgId: string) => {
    console.log(
      "pendingImageMsgs: ",
      pendingImageMessages,
      "file&msgId: ",
      fileId,
      msgId
    );

    const pendingImage = pendingImageMessages?.find((message) => {
      return message.fileId === fileId && message?.messageId === msgId;
    });
    return pendingImage;
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

  useEffect(() => {
    setChatData(data);
  }, [data]);

  const chatByDate = useMemo(() => {
    if (chatData?.length > 0) {
      const newData = arrangeChatMessagesByDate(data);
      return newData;
    }
    return [];
  }, [chatData]);

  const userID = useSelector(
    (state: RootState) => state.global.clientData.userId
  );

  console.log(chatData, chatByDate);

  const isSmallDevice = useMediaQuery("(max-width:400px)");
  return (
    <Box
      bgcolor={theme.mint.color.background.containerBg.layer1}
      py={`${theme.mint.spacing.m}`}
      px={`${theme.mint.spacing.s}`}
      pt={0}
      flexGrow={1}
      // top={0}
      className="chat-container"
      position={"relative"}
      bottom={bottomBarHeight + "px"}
    >
      <Stack gap={`${theme.mint.spacing.xxs}`} marginBottom="30px">
        {chatByDate?.map((chatItem: any) => {
          return (
            <>
              {chatItem?.chat?.map((chat: IChatItem) => {
                console.log("Chat.filessss", chat.files);

                const sentTime = moment(chat?.datetime)
                  .local()
                  .format("HH:mm");
                const date = moment(chat?.datetime);
                const formattedDate = date?.format("M月D日(ddd) HH:mm");
                return (
                  <Stack
                    key={chat?.messageId?.[0] ?? ""}
                    display={
                      chat?.senderId !== userID &&
                      chat?.status === MessageStatus.NgMessage
                        ? "none"
                        : "inherit"
                    }
                  >
                    {chat.messageType === MessageType.SystemMessage ? (
                      <Stack
                        py={theme.mint.spacing.xxs}
                        px={theme.mint.spacing.s}
                        bgcolor={theme.mint.color.system.info.bright}
                        gap={theme.mint.spacing.x3s}
                        borderRadius={`${theme.mint.cornerRadius.m}px`}
                      >
                        <MintTypography
                          size="caption"
                          weight="400"
                          color={theme.mint.color.text.high}
                          lineHeight={"150%"}
                          dangerouslySetInnerHTML={{
                            __html: renderTextWithLinks(chat.message),
                          }}
                        ></MintTypography>
                        <Box display={"flex"} justifyContent={"end"}>
                          <MintTypography
                            size="body"
                            weight="400"
                            color={theme.mint.color.text.low}
                            lineHeight={"150%"}
                          >
                            {chat?.datetime && formattedDate}
                          </MintTypography>
                        </Box>
                      </Stack>
                    ) : (
                      <Box
                        gap={`${theme.mint.spacing.xxs}`}
                        display={"flex"}
                        key={chat.id}
                        justifyContent={
                          chat?.senderId === userID ? "end" : "start"
                        }
                      >
                        {chat?.senderId !== userID ? (
                          <>
                            <Box
                              display={"flex"}
                              gap={`${theme.mint.spacing.xxs}`}
                            >
                              <Image
                                src={`https://ui-avatars.com/api/?name=${monitorName}`}
                                alt="404"
                                height={40}
                                width={40}
                                style={{
                                  borderRadius: "40px",
                                }}
                                unoptimized
                              />
                            </Box>
                            {chat?.messageType === ChatMessageType.Message && (
                              <Box
                                px={`${theme.mint.spacing.s}`}
                                py={`${theme.mint.spacing.xxs}`}
                                bgcolor={
                                  theme.mint.color.pallet.aquaBrilliant300
                                }
                                borderRadius={`${theme.mint.cornerRadius.m}px`}
                                sx={{ wordBreak: "break-all" }}
                              >
                                <MintTypography
                                  sx={{ maxWidth: "220px" }}
                                  weight="400"
                                  lineHeight={"150%"}
                                  size="body"
                                  color={theme.mint.color.text.high}
                                  dangerouslySetInnerHTML={{
                                    __html: renderTextWithLinks(chat.message),
                                  }}
                                ></MintTypography>
                              </Box>
                            )}
                            {chat?.messageType === ChatMessageType.Image && (
                              <Box
                                display={"flex"}
                                gap={`${theme.mint.spacing.x3s}`}
                                flexWrap={"wrap"}
                              >
                                {chat?.files?.map((file, index) => {
                                  console.log(chat?.files, "chat.files");

                                  return (
                                    <Box
                                      flex={"48%"}
                                      key={index}
                                      id={file?.fileName}
                                    >
                                      <Image
                                        src={file.fileUrl}
                                        alt="404"
                                        height={136}
                                        width={100}
                                        style={{
                                          // width: "100%",
                                          // objectFit: "cover",
                                          // borderRadius: "8px",
                                          objectFit: "cover",
                                          borderRadius: "8px",
                                          // outline: findPendingImages?.failed
                                          //   ? `1px solid ${theme.mint.color.system.error.error}`
                                          //   : "none",

                                          ...(chat.files?.length > 1
                                            ? {
                                                width: "100%",
                                                height: "136px",
                                                minWidth: "80px",
                                              }
                                            : {
                                                width: "170px",
                                                height: "auto",
                                                maxHeight: "276px",
                                              }),
                                        }}
                                        loading="lazy"
                                        onClick={() => {
                                          chatImageItemPreview(
                                            chat.files,
                                            index
                                          );
                                        }}
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAG9AxgDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAFRABAQAAAAAAAAAAAAAAAAAAABH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQMCBP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDnAPQwAAEVAAAAAAAQABFQAAEAARUFEVEAAEABAAQAEAQQEABAEVAEVAEVEBFQBFQBFQBFRAABAAEVEAAEAFAAAAAAAEAABUAUAABQAAVFAAAAAAAVFAAAAAAUAAAAdQQaOVEAAAAAAAEAAAEAABAABUAQEVAAQBFQBFQBFQBFRARUARUARUARUAQEBFQBAAQAEVEAEAABAEAEAAFAAAAAEAAAAAABUAUAABQABQAAAAAAAUQBRFAAAAAAUdMBo5AAAQFEAAAAQFQBQAEAQEVAAAQABABAAEABAAQEEABAAQAEABAEEABAQAEAAQEABFQABAQAABQQBRAFEEFEAURQAAAAAAUQUUABUAUQBQAAAAAAAAAAAAAdMBqgAAAACAogAAgAgAAAIACAqAAgAIAAIAgAICAioAioAgAIACAgIACAAgAICAgAAgAACAgAgqoAACAAAAAAAAAACiAKIoAAAAKIKKAAAAqAKIAogCiAKIAogDqCDRFEAAAAQFEAVAAEAVAAEAAQFQAEAAQARUABEAEABAAQAEABAARABAAQAEAQEAEFAQFQEAQAAAEEFEAAAAAAAFQBRAFEAURQFQFUQBRFAAAAUUQBRAFAAAAAAAB0hBo5UQBRAFEAVAABAUQABAVAAEAAQFQAEBAEAAQAEABAAQAEQEAAQFBAAEQEVAAQAQABEFQABAABAEAUQAAAAAARQAFEAUQUUABUAUQBRAFEUAAFEAUQUURQAAAAAAdIQaOVEAVAAEAUQBUAAQBRAAQQVAAEABAAEBUEBUAUQABBAQAEABAAQAEBAQAEABAAQEAQABAVAQAQFEAAEUBAUQBRAFAAVAFEAUQBRFAVAFEFFEAUAFEAUQBRAFEAUQBRAHSEGjlRAFEAVBAUQBRAAEBRAVUEBRAAQBUEBUAAQAEAARABAVBAVBAVBAVBEAEABAVBAVBEFQAEAAQQAQVRBAAAEAUQQUQFUQBRAFEAUQBRFBRBRRAFEUFEAUQBRBRRFAAAAAVAFEAdESlaOVEAUQBRAFRAFEAVKAAgCoAAgCoICiCAIACAAICoICoICoCAIACACAAgAIIgqAAIACCKCAKgiCiAAIiqIAAiCiAqiAKIAogCiAKIUGhlQUQUUQBVZUFEAUQUUQBoZURRAFEAUQBRAHREGrlaJQFEqA0iAKIAogCoICiCCiICiAKggKIACAAICoICoIgogAIACAoIACCAIACAAggCAAggqCCqIiCiCKqVAFEAUQFAABAFEAUQBRAFEAUAFKgClQBaIAtWs0oNCUoKJSgolKo0M0ojVKzQGqVmgNUZAdIZGrhRAFEAUQBaIAtQQVRAFESgolAURAUQBUEBRBAEAVBAURAUQAoggCVAUQAEABBAEABBFBAAQqVVRBBUAUEAVAABFVRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBVZAaEAUQQUQBRAFEAUQB0RKVszWiUoLSoAtKlSg1UqUBaJSgolKColKCiUoKhUQUQApUAVBAUSlAEAVEEFQQFQSgqCAqCIKggqoIgqFSgpURFWiCKCAAIqqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA99Kg1ZrSoApUAWlQBaVAFpWSoLSpSgtKlSg1UqUoLSpSirUqFBaVKlBpEpQVEogtSiAoiUFKgBSpRApUpQWpUogUqFKpRBAEEVUEUUQFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe2lZK0cNUrNKDVKzSg1Ss0oKJSgolKCiVKCiUoKJSgtSoAtESoKVKAtSoAtKiUFpUogtSpSgtRKUValSlQWpUKgtSoCqggKICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPVSoNHC0qUoKVKAolKColKCiUoKJSgpWaAtKgC0qIgtKgKtSoAtKlQFpUKgtSoAtSoIq1KlEFqCAogKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+9Kg0crSoApUoC0qALSoUFpUqUFEpQWlQBalSlQWiUoLUqUoKVKlFUSlQCpQFQRBRBFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfUQauVEEFEAUQBREFUQBRAFQQFEEFQABAFQEAERQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsBqgAAAAAAIAqAgAACAKgAAIoAgAAICAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2A1QAAAAQAAAAAEVEUAAAEAEUAAAQQVEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsBqgAAAAACCgIKgAAIKCoAgAAAIAAACCCogAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPoKNkQUBBQEFRARQEFAQVAQUBBUARQEFRFAAAEABBBRBAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH2FRs5AAQUFQUBBQEFRBBQEFQBFAQVAQUBEUBBURQBAAARRBBUcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7ijZygoCCgIKAgoCIoCCiCI0gIKCsigIKgIKAyKAiKIqCoAAgAIIKiAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9IDZyAAIoCCgIKAgAAAIKIIigIKgIKAiKCoKgIKgIKIIigqAIACAiiCAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUA2cgAAAAAIKAgoCAAgoCAAgogiKAgAIKAyKCsigIiiCIoKgCAAgIoggCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD1gNnIAAAAACCgIKgAAIKgAAIKgCKIIACCoAigIigqIqAIogiKCoAgAIIKiAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9gDZwAAIoCCoKAAAAIoCAAIqAAAgqICKAiKAgAIKgqCoCCoggqAIqCgCAijkQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7AGzgAAAAABABQAAAEFQAAEAARUQAAQAEAARUARUFEVAEVEBFQUAQAEEAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="
                                      />
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}

                            {chat?.messageType == ChatMessageType?.File && (
                              <Stack gap={`${theme.mint.spacing.xxs}`}>
                                {chat.files?.map((file, index) => {
                                  return (
                                    <Box
                                      px={`${theme.mint.spacing.s}`}
                                      py={`${theme.mint.spacing.xxs}`}
                                      bgcolor={
                                        theme.mint.color.pallet.aquaBrilliant300
                                      }
                                      borderRadius={`${theme.mint.cornerRadius.m}px`}
                                      display={"flex"}
                                      gap={`${theme.mint.spacing.xxs}`}
                                      key={index}
                                    >
                                      <Box
                                        height={"40px"}
                                        width={"40px"}
                                        bgcolor={
                                          theme.mint.color.pallet.gray100
                                        }
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                      >
                                        <DocumentOutlinedIcon
                                          color={theme.mint.color.object.low}
                                        />
                                      </Box>
                                      <Stack>
                                        <MintTypography
                                          size="body"
                                          weight={"700"}
                                          lineHeight={"150%"}
                                          color={theme.mint.color.object.high}
                                          sx={{
                                            width: "100px",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            wordBreak: "break-all",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {file?.fileName}
                                        </MintTypography>
                                        <MintTypography
                                          size="body"
                                          weight={"400"}
                                          lineHeight={"150%"}
                                          color={theme.mint.color.object.low}
                                        >
                                          サイズ：
                                          {getFileSize(
                                            parseInt(file?.fileSize!)
                                          )}
                                        </MintTypography>
                                      </Stack>
                                      {file?.fileUrl && (
                                        <Box
                                          display={"flex"}
                                          alignItems={"center"}
                                        >
                                          <MintIconButton
                                            sx={{ p: 0 }}
                                            disableRipple
                                            onClick={() => {
                                              handleDownloadFile(
                                                file?.fileUrl,
                                                file?.fileName
                                              );
                                            }}
                                          >
                                            <DownloadOutlinedIcon
                                              color={
                                                theme.mint.color.object.high
                                              }
                                            />
                                          </MintIconButton>
                                        </Box>
                                      )}
                                    </Box>
                                  );
                                })}
                              </Stack>
                            )}

                            <Box display={"flex"} alignItems={"end"}>
                              <MintTypography
                                weight="400"
                                lineHeight={"150%"}
                                size="caption"
                                color={theme.mint.color.text.low}
                              >
                                {sentTime}
                              </MintTypography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Stack justifyContent={"end"} pl={"40px"}>
                              {chat?.status === MessageStatus.Read && (
                                <MintTypography
                                  weight="400"
                                  lineHeight={"150%"}
                                  size="caption"
                                  color={theme.mint.color.text.low}
                                >
                                  {t(
                                    "campaign.campaignDetail.modalMessage.already-read"
                                  )}
                                </MintTypography>
                              )}

                              <MintTypography
                                weight="400"
                                lineHeight={"150%"}
                                size="caption"
                                color={theme.mint.color.text.low}
                              >
                                {sentTime}
                              </MintTypography>
                            </Stack>

                            {chat?.messageType === ChatMessageType.Message && (
                              <Box
                                px={`${theme.mint.spacing.s}`}
                                py={`${theme.mint.spacing.xxs}`}
                                bgcolor={
                                  chat.status === MessageStatus.NgMessage
                                    ? theme.mint.color.system.error.bright
                                    : theme.mint.color.background.containerBg
                                        .layer2
                                }
                                borderRadius={`${theme.mint.cornerRadius.m}px`}
                                id="messageArea"
                                sx={{ wordBreak: "break-all" }}
                              >
                                <MintTypography
                                  sx={{ maxWidth: "272px" }}
                                  weight="400"
                                  lineHeight={"150%"}
                                  size="body"
                                  color={theme.mint.color.text.high}
                                  dangerouslySetInnerHTML={{
                                    __html: renderTextWithLinks(chat.message),
                                  }}
                                ></MintTypography>
                              </Box>
                            )}
                            {chat?.messageType === ChatMessageType.Image && (
                              <Box
                                display={"flex"}
                                gap={`${theme.mint.spacing.xxs}`}
                                flexWrap={"wrap"}
                              >
                                {chat?.files?.map((file, index) => {
                                  const findPendingImages =
                                    pendingImageMessages?.find((message) => {
                                      return (
                                        message?.fileId === file?.fileId &&
                                        message?.messageId ===
                                          chat?.messageId[0]
                                      );
                                    });

                                  return (
                                    <Box
                                      flex={"48%"}
                                      onClick={() => {
                                        if (!findPendingImages?.failed) {
                                          chatImageItemPreview(
                                            chat?.files,
                                            index
                                          );
                                        }
                                      }}
                                      key={index}
                                    >
                                      <Box
                                        position={"relative"}
                                        id={file?.fileName}
                                      >
                                        <Image
                                          src={file?.fileUrl}
                                          alt="404"
                                          height={136}
                                          width={100}
                                          style={{
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            outline: findPendingImages?.failed
                                              ? `1px solid ${theme.mint.color.system.error.error}`
                                              : "none",

                                            ...(chat.files?.length > 1
                                              ? {
                                                  width: "100%",
                                                  height: "136px",
                                                  minWidth: "80px",
                                                }
                                              : {
                                                  width: "170px",
                                                  height: "auto",
                                                  maxHeight: "276px",
                                                }),
                                          }}
                                          loading="lazy"
                                          placeholder="blur"
                                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAG9AxgDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAFRABAQAAAAAAAAAAAAAAAAAAABH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQMCBP/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDnAPQwAAEVAAAAAAAQABFQAAEAARUFEVEAAEABAAQAEAQQEABAEVAEVAEVEBFQBFQBFQBFRAABAAEVEAAEAFAAAAAAAEAABUAUAABQAAVFAAAAAAAVFAAAAAAUAAAAdQQaOVEAAAAAAAEAAAEAABAABUAQEVAAQBFQBFQBFQBFRARUARUARUARUAQEBFQBAAQAEVEAEAABAEAEAAFAAAAAEAAAAAABUAUAABQABQAAAAAAAUQBRFAAAAAAUdMBo5AAAQFEAAAAQFQBQAEAQEVAAAQABABAAEABAAQEEABAAQAEABAEEABAQAEAAQEABFQABAQAABQQBRAFEEFEAURQAAAAAAUQUUABUAUQBQAAAAAAAAAAAAAdMBqgAAAACAogAAgAgAAAIACAqAAgAIAAIAgAICAioAioAgAIACAgIACAAgAICAgAAgAACAgAgqoAACAAAAAAAAAACiAKIoAAAAKIKKAAAAqAKIAogCiAKIAogDqCDRFEAAAAQFEAVAAEAVAAEAAQFQAEAAQARUABEAEABAAQAEABAARABAAQAEAQEAEFAQFQEAQAAAEEFEAAAAAAAFQBRAFEAURQFQFUQBRFAAAAUUQBRAFAAAAAAAB0hBo5UQBRAFEAVAABAUQABAVAAEAAQFQAEBAEAAQAEABAAQAEQEAAQFBAAEQEVAAQAQABEFQABAABAEAUQAAAAAARQAFEAUQUUABUAUQBRAFEUAAFEAUQUURQAAAAAAdIQaOVEAVAAEAUQBUAAQBRAAQQVAAEABAAEBUEBUAUQABBAQAEABAAQAEBAQAEABAAQEAQABAVAQAQFEAAEUBAUQBRAFAAVAFEAUQBRFAVAFEFFEAUAFEAUQBRAFEAUQBRAHSEGjlRAFEAVBAUQBRAAEBRAVUEBRAAQBUEBUAAQAEAARABAVBAVBAVBAVBEAEABAVBAVBEFQAEAAQQAQVRBAAAEAUQQUQFUQBRAFEAUQBRFBRBRRAFEUFEAUQBRBRRFAAAAAVAFEAdESlaOVEAUQBRAFRAFEAVKAAgCoAAgCoICiCAIACAAICoICoICoCAIACACAAgAIIgqAAIACCKCAKgiCiAAIiqIAAiCiAqiAKIAogCiAKIUGhlQUQUUQBVZUFEAUQUUQBoZURRAFEAUQBRAHREGrlaJQFEqA0iAKIAogCoICiCCiICiAKggKIACAAICoICoIgogAIACAoIACCAIACAAggCAAggqCCqIiCiCKqVAFEAUQFAABAFEAUQBRAFEAUAFKgClQBaIAtWs0oNCUoKJSgolKo0M0ojVKzQGqVmgNUZAdIZGrhRAFEAUQBaIAtQQVRAFESgolAURAUQBUEBRBAEAVBAURAUQAoggCVAUQAEABBAEABBFBAAQqVVRBBUAUEAVAABFVRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBVZAaEAUQQUQBRAFEAUQB0RKVszWiUoLSoAtKlSg1UqUBaJSgolKColKCiUoKhUQUQApUAVBAUSlAEAVEEFQQFQSgqCAqCIKggqoIgqFSgpURFWiCKCAAIqqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA99Kg1ZrSoApUAWlQBaVAFpWSoLSpSgtKlSg1UqUoLSpSirUqFBaVKlBpEpQVEogtSiAoiUFKgBSpRApUpQWpUogUqFKpRBAEEVUEUUQFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe2lZK0cNUrNKDVKzSg1Ss0oKJSgolKCiVKCiUoKJSgtSoAtESoKVKAtSoAtKiUFpUogtSpSgtRKUValSlQWpUKgtSoCqggKICgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPVSoNHC0qUoKVKAolKColKCiUoKJSgpWaAtKgC0qIgtKgKtSoAtKlQFpUKgtSoAtSoIq1KlEFqCAogKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+9Kg0crSoApUoC0qALSoUFpUqUFEpQWlQBalSlQWiUoLUqUoKVKlFUSlQCpQFQRBRBFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfUQauVEEFEAUQBREFUQBRAFQQFEEFQABAFQEAERQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsBqgAAAAAAIAqAgAACAKgAAIoAgAAICAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2A1QAAAAQAAAAAEVEUAAAEAEUAAAQQVEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsBqgAAAAACCgIKgAAIKCoAgAAAIAAACCCogAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPoKNkQUBBQEFRARQEFAQVAQUBBUARQEFRFAAAEABBBRBAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH2FRs5AAQUFQUBBQEFRBBQEFQBFAQVAQUBEUBBURQBAAARRBBUcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7ijZygoCCgIKAgoCIoCCiCI0gIKCsigIKgIKAyKAiKIqCoAAgAIIKiAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9IDZyAAIoCCgIKAgAAAIKIIigIKgIKAiKCoKgIKgIKIIigqAIACAiiCAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUA2cgAAAAAIKAgoCAAgoCAAgogiKAgAIKAyKCsigIiiCIoKgCAAgIoggCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD1gNnIAAAAACCgIKgAAIKgAAIKgCKIIACCoAigIigqIqAIogiKCoAgAIIKiAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9gDZwAAIoCCoKAAAAIoCAAIqAAAgqICKAiKAgAIKgqCoCCoggqAIqCgCAijkQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7AGzgAAAAABABQAAAEFQAAEAARUQAAQAEAARUARUFEVAEVEBFQUAQAEEAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="
                                        />
                                        {findPendingImages &&
                                          !findPendingImages?.failed && (
                                            <>
                                              <Box
                                                position={"absolute"}
                                                top={0}
                                                bottom={0}
                                                right={0}
                                                left={0}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                              >
                                                <CircularProgress />
                                              </Box>
                                              <Box
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(0,0,0,0.3)",
                                                  zIndex: (theme) => 10,
                                                  position: "absolute",
                                                  overflow: "hidden",
                                                  top: 0,
                                                  left: 0,
                                                  height: "95%",
                                                  width: "100%",
                                                }}
                                              ></Box>
                                            </>
                                          )}
                                        {findPendingImages?.failed && (
                                          <Box
                                            position={"absolute"}
                                            top={0}
                                            bottom={0}
                                            right={0}
                                            left={0}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                          >
                                            <Image
                                              src={errorGif}
                                              alt="404"
                                              height={40}
                                              width={40}
                                              style={{
                                                height: "auto",
                                                width: "auto",
                                              }}
                                            />
                                          </Box>
                                        )}
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}
                            {chat?.messageType === ChatMessageType.File && (
                              <Stack gap={`${theme.mint.spacing.xxs}`}>
                                {chat.files?.map((file, index) => {
                                  return (
                                    <Box
                                      px={`${theme.mint.spacing.s}`}
                                      py={`${theme.mint.spacing.xxs}`}
                                      bgcolor={
                                        isPending(
                                          chat?.files?.[0].fileId,
                                          chat?.messageId
                                        )?.failed
                                          ? theme.mint.color.system.error.bright
                                          : theme.mint.color.background
                                              .containerBg.layer2
                                      }
                                      borderRadius={`${theme.mint.cornerRadius.m}px`}
                                      display={"flex"}
                                      gap={`${theme.mint.spacing.xxs}`}
                                      key={index}
                                    >
                                      <Box
                                        height={"40px"}
                                        width={"40px"}
                                        bgcolor={
                                          theme.mint.color.pallet.gray100
                                        }
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                      >
                                        <DocumentOutlinedIcon
                                          color={theme.mint.color.object.low}
                                        />
                                      </Box>
                                      <Stack>
                                        <MintTypography
                                          size="body"
                                          weight={"700"}
                                          lineHeight={"150%"}
                                          color={theme.mint.color.object.high}
                                          sx={{
                                            width: "100px",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            wordBreak: "break-all",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {file?.fileName}
                                        </MintTypography>
                                        <MintTypography
                                          size="body"
                                          weight={"400"}
                                          lineHeight={"150%"}
                                          color={theme.mint.color.object.low}
                                          display={"flex"}
                                        >
                                          サイズ：
                                          {getFileSize(
                                            parseInt(file?.fileSize!)
                                          )}
                                          {isPending(
                                            chat?.files?.[0].fileId,
                                            chat?.messageId
                                          )?.failed && (
                                            <MintTypography
                                              size="body"
                                              weight={"400"}
                                              lineHeight={"150%"}
                                              color={
                                                theme.mint.color.system.error
                                                  .error
                                              }
                                              pl={`${theme.mint.spacing.x3s}px`}
                                            >
                                              {t("messages.failed")}
                                            </MintTypography>
                                          )}
                                          {isPending(
                                            chat?.files[0]?.fileId,
                                            chat?.messageId
                                          ) &&
                                            !isPending?.failed && (
                                              <Box
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                pl={`${theme.mint.spacing.x3s}px`}
                                              >
                                                <CircularProgress size={18} />
                                              </Box>
                                            )}
                                        </MintTypography>
                                      </Stack>
                                      {file?.fileUrl &&
                                        !isPending(
                                          chat?.files[0]?.fileId,
                                          chat?.messageId
                                        ) && (
                                          <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                          >
                                            <MintIconButton
                                              sx={{ p: 0 }}
                                              disableRipple
                                              onClick={() => {
                                                handleDownloadFile(
                                                  file?.fileUrl,
                                                  file?.fileName
                                                );
                                              }}
                                            >
                                              <DownloadOutlinedIcon
                                                color={
                                                  theme.mint.color.object.high
                                                }
                                              />
                                            </MintIconButton>
                                          </Box>
                                        )}
                                    </Box>
                                  );
                                })}
                              </Stack>
                            )}
                          </>
                        )}
                      </Box>
                    )}

                    {chat?.status === MessageStatus.NgMessage && (
                      <Box
                        display={"flex"}
                        justifyContent={
                          chat?.senderId === userID ? "end" : "start"
                        }
                      >
                        <MintTypography
                          color={theme.mint.color.system.error.error}
                          size="caption"
                          weight="400"
                          lineHeight={"150%"}
                        >
                          {t("campaign.campaignDetail.modalMessage.ng-message")}
                        </MintTypography>
                      </Box>
                    )}
                  </Stack>
                );
              })}
            </>
          );
        })}
      </Stack>
    </Box>
  );
}

export default ChatMessageSection;
