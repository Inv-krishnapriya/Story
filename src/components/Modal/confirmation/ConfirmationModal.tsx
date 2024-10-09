import * as React from "react";
import { useTranslation } from "react-i18next";
import { Box, Slide } from "@mui/material";
import { IConfirmationProps } from "./interface";
import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTypography,
  TicketOutlinedIcon,
} from "@/design-system";
import { TransitionProps } from "@mui/material/transitions";

const ConfirmationModal: React.FC<IConfirmationProps> = (props) => {
  const {
    open,
    title,
    content,
    onClose,
    onAgree,
    onDisagree,
    agreeButtonName,
    disAgreeButtonName,
    isLoading,
    width,
    height,
    ticketInfo,
    ticketCount,
    modalWidth,
    agreeButtonColorVariant,
    disAgreeButtonVariant,
    hideModalContent = false,
    hasTransition,
    sx,
    hideBackdrop
  } = props;
  const { t } = useTranslation();
  const onModalAgree = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAgree) {
      onAgree();
    }
  };
  const onModalDisAgree = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDisagree) {
      onDisagree();
    }
  };
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  return (
    <MintDialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "343px",
          ...(modalWidth || width
            ? { width: modalWidth || width }
            : { minWidth: "343px" }),
          ...(height && { height: height }),
        },
        ...sx
      }}
      hideBackdrop = {hideBackdrop}
      {...(hasTransition && {TransitionComponent:Transition})}
    >
      <MintDialogTitle id="alert-dialog-title">
        <MintTypography
          weight="500"
          size="head-m"
          sx={{
            color: (theme) => theme?.palette.uiColor?.textHigh,
          }}
        >
          {t(title)}
        </MintTypography>
      </MintDialogTitle>
      {!hideModalContent && (
        <MintDialogContent>
          {content && (
            <MintTypography
              weight="400"
              size="body"
              sx={{ color: (theme) => theme.palette.uiColor.textHigh }}
              dangerouslySetInnerHTML={{ __html: t(content) }}
            ></MintTypography>
          )}

          {ticketCount && (
            <Box
              sx={{
                display: "flex",
                p: "6px",
                mt: "16px",
                mb: "16px",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "4px",
                background: (theme) =>
                  theme.mint.color.background.containerBg.layer2,
              }}
            >
              <TicketOutlinedIcon />
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.palette.uiColor.textHigh }}
                >
                  {ticketInfo}
                </MintTypography>
                <MintTypography
                  weight="400"
                  size="caption"
                  sx={{ color: (theme) => theme.palette.uiColor.textHigh }}
                >
                  {ticketCount}枚
                </MintTypography>
              </Box>
            </Box>
          )}
        </MintDialogContent>
      )}
      <MintDialogActions>
        {disAgreeButtonName && (
          <MintButton
            onClick={onModalDisAgree}
            variant="text"
            sx={{
              width: "auto",
            }}
            disabled={isLoading}
            id="confirmation-disAgreeButton"
            color={disAgreeButtonVariant}
            data-testid="modal-onDisAgree"
          >
            {t(disAgreeButtonName)}
          </MintButton>
        )}
        {agreeButtonName && (
          <MintButton
            onClick={onModalAgree}
            color={agreeButtonColorVariant}
            variant="contained"
            sx={{
              width: "auto",
            }}
            disabled={isLoading}
            data-testid="modal-onAgree"
            id="confirmation-agreeButton"
            loading={isLoading}
          >
            {t(agreeButtonName)}
          </MintButton>
        )}
      </MintDialogActions>
    </MintDialog>
  );
};

export default ConfirmationModal;
