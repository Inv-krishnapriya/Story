interface IConfirmationProps {
  open: boolean;
  title: string;
  content?: string;
  onClose?: () => void;
  onAgree?: () => void;
  onDisagree?: (event?: any) => void;
  agreeButtonName?: string;
  disAgreeButtonName?: string;
  isLoading?: boolean;
  width?: string;
  height?: string;
  ticketInfo?: string;
  ticketCount?: number;
  modalWidth?: string;
  agreeButtonColorVariant?: "error" | "primary" | "gray";
  disAgreeButtonVariant?: "error" | "primary" | "gray";
  hideModalContent?: boolean;
  hasTransition?: boolean,
  sx?:object,
  hideBackdrop ?: boolean
}

export type { IConfirmationProps };
