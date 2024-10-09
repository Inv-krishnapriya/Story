import * as React from "react";
import { useTranslation } from "react-i18next";
import { ContainedButton, TextButton } from "../UI/button/button";
import { customerService } from "@/common/apiUrls";
import {
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintTextField,
  MintTypography,
  errorToast,
} from "@/design-system";
import { Box } from "@mui/material";
import { getErrorMessage } from "@/utils";
import { useDispatch } from "react-redux";
import { actions as CampaignActions } from "@/stores/campaign/reducer";

interface IEditNoteModalProps {
  open: boolean;
  onClose: () => void;
  data: string;
  monitorId: string;
  campaignId: string;
  setMemo: (memo: string) => void;
  memo: string;
  handleCampaign: (id: any) => void;
}
const EditNoteModal: React.FC<IEditNoteModalProps> = (props) => {
  const {
    open,
    onClose,
    data,
    monitorId,
    campaignId,
    setMemo,
    memo,
    handleCampaign,
  } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMemoUpdate = () => {
    if ((data.length > 0 && memo.length === 0) || memo.length > 0) {
      let data = {
        monitorId: monitorId,
        memo: memo,
      };
      customerService
        .updateMemo(campaignId, data)
        .then((response) => {
          setMemo(memo);
          onClose();
          handleCampaign(campaignId);
          console.log("Response from memo updation: ", response);
        })
        .catch((error) => {
          console.log("Memo updation failed : ", error);
          onClose();
          const errorMessage = getErrorMessage(error?.response?.data);
          errorToast(errorMessage);
        });
    } else {
      onClose();
    }
  };

  const handleMemoChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMemo(event?.target.value);
  };

  const handleMemoCancel = () => {
    console.log(data);

    setMemo(data);
    onClose();
  };

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "500px",
          width: "600px",
          maxHeight: "360px",
        },
      }}
    >
      <MintDialogTitle>
        <MintTypography size="head-m" weight="700">
          {t("campaign.campaignDetail.memo")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          "&.MuiDialogContent-root": {
            paddingBottom: "16px",
            paddingTop: "16px",
            paddingLeft: "24px",
            paddingRight: "24px",
            marginRight: "10px",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <MintTextField
            sx={{
              width: "550px",
              "&.MuiOutlinedInput-root": {
                padding: "4px 2px",
              },
              "& .MuiOutlinedInput-input": {
                resize: "auto",
                width: "552px",
                height: "24px",
              },
            }}
            placeholder="メモを入力してください"
            multiline
            minRows={5}
            defaultValue={data}
            inputProps={{ maxLength: 250, "data-testid": "input-field" }}
            onChange={(e) => handleMemoChange(e)}
          />
        </Box>
      </MintDialogContent>

      <MintDialogActions>
        <TextButton
          textVariant="text-accent"
          onClick={handleMemoCancel}
          data-testid="cancel-button"
        >
          {t("campaign.campaignDetail.modaldetail.agreeButtonName")}
        </TextButton>
        <ContainedButton
          containVariant="accent-primary"
          onClick={handleMemoUpdate}
          data-testid="save-button"
        >
          {t("campaign.campaignDetail.save")}
        </ContainedButton>
      </MintDialogActions>
    </MintDialog>
  );
};

export default EditNoteModal;
