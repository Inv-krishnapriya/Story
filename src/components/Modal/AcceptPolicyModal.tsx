import {
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTypography,
} from "@/design-system";

interface AcceptPolicyModalProp {
  open: boolean;
  width?: string;
  height?: string;
  title?: string;
  agreeButtonName?: string;
  disagreeButtonName?: string;
  onAgree?: () => void;
  onDisagree?: () => void;
  isLoading?: {
    agree?: boolean;
    disagree?: boolean;
  };
}

const AcceptPolicyModal: React.FC<
  React.PropsWithChildren<AcceptPolicyModalProp>
> = (props) => {
  const {
    children,
    open,
    width,
    height,
    title,
    agreeButtonName,
    disagreeButtonName,
    onAgree,
    onDisagree,
    isLoading,
  } = props;

  const isButtonDisabled = isLoading?.agree || isLoading?.disagree;
  return (
    <MintDialog
      open={open}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "343px",
          ...(width ? { width: width } : { minWidth: "343px" }),
          ...(height && { height: height }),
        },
      }}
    >
      <MintDialogTitle id="alert-dialog-title">
        <MintTypography
          weight="700"
          size="head-l"
          sx={{
            color: (theme) => theme?.palette.uiColor?.textHigh,
          }}
        >
          {title}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </MintDialogContent>
      <MintDialogActions>
        {disagreeButtonName && (
          <MintButton
            onClick={onDisagree}
            variant="text"
            sx={{
              width: "auto",
            }}
            disabled={isButtonDisabled}
            loading={isLoading?.disagree}
            id="confirmation-disAgreeButton"
            data-testid="modal-onDisAgree"
          >
            {disagreeButtonName}
          </MintButton>
        )}
        {agreeButtonName && (
          <MintButton
            onClick={onAgree}
            variant="contained"
            sx={{
              width: "auto",
            }}
            disabled={isButtonDisabled}
            data-testid="modal-onAgree"
            id="confirmation-agreeButton"
            loading={isLoading?.agree}
          >
            {agreeButtonName}
          </MintButton>
        )}
      </MintDialogActions>
    </MintDialog>
  );
};

export default AcceptPolicyModal;
