import {
  CrossIcon,
  DocumentIcon,
  FolderOutlinedIcon,
  MintButton,
  MintIconButton,
  MintTextField,
  MintTypography,
  PictureIcon,
  PictureOutlinedIcon,
} from "@/design-system";
import { VisibilityIcon } from "@/design-system";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";

interface ChatActionsProps {
  formData: {
    textValue: string;
    selectedFile: any;
    imagePreview: string;
    isActive: boolean;
    fileName: string;
    error: string;
  };
  handleSingleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMultiFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imagePreviewData: {
    isImage: boolean;
    imageUrl: string;
    fileName: string;
    size: string;
  }[];
  onDeleteFileItem: (index: number) => void;
  imageItemPreview: (imageUrl: string) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  monitorStatus: boolean;
}

const ChatActions: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ChatActionsProps
> = (props, ref) => {
  // your component logic here
  const {
    formData,
    handleSingleFileChange,
    handleMultiFileChange,
    imagePreviewData,
    onDeleteFileItem,
    imageItemPreview,
    onInputChange,
    onSubmit,
    monitorStatus,
  } = props;
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallDevice = useMediaQuery("(max-width:400px)");

  return (
    <Box
      ref={ref}
      position="absolute"
      bottom={1}
      left={0}
      right={0}
      padding={`${theme.mint.spacing.xxs}`}
      zIndex={100}
      sx={{
        backgroundColor: theme.mint.color.background.containerBg.layer2,
      }}
    >
      <Box display={"flex"} gap={`${theme.mint.spacing.xxs}`}>
        {!formData.isActive && (
          <Box display={"flex"} alignItems={"center"}>
            <Box width={"40px"} position={"relative"}>
              <PictureOutlinedIcon size={24} color="#0A1826" />
              <Box
                data-testid="file-input"
                disabled={monitorStatus}
                component={"input"}
                accept="image/*"
                multiple
                type="file"
                onChange={handleMultiFileChange}
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  opacity: "0",
                  zIndex: "10",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box width={"40px"} position={"relative"}>
              <FolderOutlinedIcon size={24} color="#0A1826" />
              <Box
                component={"input"}
                disabled={monitorStatus}
                multiple
                type="file"
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  opacity: "0",
                  zIndex: "10",
                  cursor: "pointer",
                }}
                onChange={handleMultiFileChange}
              />
            </Box>
          </Box>
        )}

        <Box flexGrow={1}>
          {formData?.selectedFile?.length > 0 ? (
            <Stack gap="8px">
              {imagePreviewData?.map((file, index) => {
                return (
                  <Box
                    p={"10px"}
                    bgcolor={theme.mint.color.background.containerBg.layer1}
                    display={"flex"}
                    borderRadius="8px"
                    key={index}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      flexGrow={1}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        {file?.isImage ? (
                          <PictureIcon
                            color={theme.mint.color.pallet.orangeBrilliant600}
                          />
                        ) : (
                          <DocumentIcon
                            color={theme.mint.color.pallet.yellowBrilliant600}
                          />
                        )}
                        <MintTypography
                          size="caption"
                          weight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: isSmallDevice ? "50px" : "100px",
                          }}
                        >
                          {file?.fileName}
                        </MintTypography>
                        <MintTypography
                          size="body"
                          color={theme.mint.color.text.low}
                        >
                          / {file?.size}
                        </MintTypography>
                      </Box>
                      <Box display={"flex"}>
                        {file?.isImage && (
                          <MintIconButton
                            onClick={() => {
                              imageItemPreview(file.imageUrl);
                            }}
                          >
                            <VisibilityIcon
                              color={
                                theme.mint.color.surfaceAccent.primary.primary
                              }
                            />
                          </MintIconButton>
                        )}

                        <MintIconButton
                          onClick={() => {
                            onDeleteFileItem(index);
                          }}
                        >
                          <CrossIcon
                            color={theme.mint.color.system.error.error}
                          />
                        </MintIconButton>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          ) : (
            <MintTextField
              placeholder="メッセージを送信"
              disabled={monitorStatus}
              onChange={onInputChange}
              minRows={0}
              multiline
              inputProps={{ maxLength: 500, "data-testid": "chat-input" }}
              fullWidth
              value={formData.textValue}
              sx={{
                ".MuiInputBase-input": {
                  maxHeight: "200px",
                  overflowY: "auto !important",
                },
              }}
            />
          )}
        </Box>
        <Box display={"flex"} alignItems={"end"}>
          <MintButton
            data-testid="chat-form"
            onClick={onSubmit}
            disabled={monitorStatus || !formData?.isActive}
          >
            送信
          </MintButton>
        </Box>
      </Box>
      {formData?.error && (
        <MintTypography
          size="body"
          color={theme.mint.color.system.error.error}
          mt={`${theme.mint.spacing.xxs}px`}
        >
          {formData?.error}
        </MintTypography>
      )}
    </Box>
  );
};

export default forwardRef(ChatActions);
