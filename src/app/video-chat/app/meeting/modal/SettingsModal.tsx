import {
  MegaphoneOutlinedIcon,
  MicOutlinedIcon,
  MintButton,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintSelectField,
  MintTypography,
  VideoOutlinedIcon,
} from "@/design-system";
import { Box, useTheme } from "@mui/material";
import { t } from "i18next";
import React from "react";

interface ISettingsProps {
  open: boolean;
  onClose: () => void;
  audioDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  speakerDevices: MediaDeviceInfo[];
  selectedAudioDevice: string;
  selectedVideoDevice: string;
  selectedSpeakerDevice: string;
  handleAudioDeviceChange: (e: any) => void;
  handleVideoDeviceChange: (e: any) => void;
  handleSpeakerDeviceChange: (e: any) => void;
}

const SettingsModal: React.FC<ISettingsProps> = (props) => {
  const {
    open,
    onClose,
    audioDevices,
    videoDevices,
    speakerDevices,
    selectedAudioDevice,
    selectedVideoDevice,
    selectedSpeakerDevice,
    handleAudioDeviceChange,
    handleVideoDeviceChange,
    handleSpeakerDeviceChange,
  } = props;

  const theme = useTheme();
  console.log(videoDevices);

  const availableVideoDevices = videoDevices.map((item) => {
    return { label: item.label, value: item.deviceId };
  });
  const availableAudioDevices = audioDevices.map((item) => {
    return { label: item.label, value: item.deviceId };
  });

  const availableSpeakerDevices = speakerDevices.map((item) => {
    return { label: item.label, value: item.deviceId };
  });

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          display: "flex",
          width: "343px",
          minWidth: "343px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          borderRadius: 1,
        },
      }}
      aria-labelledby="settings-dialog"
      aria-describedby="settings-dialog-description"
    >
      <MintDialogTitle
        sx={{
          display: "flex",
          padding: "16px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
          alignSelf: "stretch",
        }}
      >
        <MintTypography
          sx={{ alignSelf: "stretch" }}
          size="head-m"
          weight="500"
        >
          {t("settings-modal.title")}
        </MintTypography>
      </MintDialogTitle>
      <MintDialogContent
        sx={{
          display: "flex",
          padding: "8px 24px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: 0,
            alignItems: "flex-end",
            gap: "8px",
            alignSelf: "stretch",
          }}
          id="video"
        >
          <Box
            sx={{
              display: "flex",
              height: "32px",
              padding: 0,
              justifyContent: "center",
              alignItems: "baseline",
              gap: "10px",
            }}
          >
            <VideoOutlinedIcon />
          </Box>
          <Box
            sx={{
              minWidth: "265px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              flex: "8px 0px 0px",
            }}
            id="select"
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "center",
                gap: 1,
              }}
              id="title"
            >
              <MintTypography
                size="body"
                weight="400"
                color={theme.mint.color.text.high}
              >
                {t("settings-modal.camera")}
              </MintTypography>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: 1,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <MintSelectField
                options={availableVideoDevices}
                fullWidth
                value={selectedVideoDevice}
                onChange={(e) => handleVideoDeviceChange(e)}
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: 0,
            alignItems: "flex-end",
            gap: "8px",
            alignSelf: "stretch",
          }}
          id="microphone"
        >
          <Box
            sx={{
              display: "flex",
              height: "32px",
              padding: 0,
              justifyContent: "center",
              alignItems: "baseline",
              gap: "10px",
            }}
            id="micIcon"
          >
            <MicOutlinedIcon />
          </Box>
          <Box
            sx={{
              minWidth: "265px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              flex: "8px 0px 0px",
            }}
            id="micSelect"
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "center",
                gap: 1,
              }}
              id="micTitle"
            >
              <MintTypography
                size="body"
                weight="400"
                color={theme.mint.color.text.high}
              >
                {t("settings-modal.microphone")}
              </MintTypography>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: 1,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
              id="microphoneSelect"
            >
              <MintSelectField
                options={availableAudioDevices}
                fullWidth
                value={selectedAudioDevice}
                onChange={(e) => handleAudioDeviceChange(e)}
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: 0,
            alignItems: "flex-end",
            gap: "8px",
            alignSelf: "stretch",
          }}
          id="megaPhone"
        >
          <Box
            sx={{
              display: "flex",
              height: "32px",
              padding: 0,
              justifyContent: "center",
              alignItems: "baseline",
              gap: "10px",
            }}
            id="megaPhoneIcon"
          >
            <MegaphoneOutlinedIcon />
          </Box>
          <Box
            sx={{
              minWidth: "265px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              flex: "8px 0px 0px",
            }}
            id="megaPhoneSelect"
          >
            <Box
              sx={{
                display: "flex",
                padding: 0,
                alignItems: "center",
                gap: 1,
              }}
              id="megaPhoneTitle"
            >
              <MintTypography
                size="body"
                weight="400"
                color={theme.mint.color.text.high}
              >
                {t("settings-modal.speaker")}
              </MintTypography>
              <Box
                sx={{
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                  gap: 1,
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
              id="megaPhoneField"
            >
              <MintSelectField
                options={availableSpeakerDevices}
                fullWidth
                value={selectedSpeakerDevice}
                onChange={(e) => handleSpeakerDeviceChange(e)}
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </MintDialogContent>
      <MintDialogActions
        sx={{
          display: "flex",
          padding: "16px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            flex: "8px 0px 0px",
          }}
        >
          <MintButton
            sx={{
              display: "flex",
              height: "40px",
              padding: "12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
            id="close-sssssssss"
            onClick={onClose}
          >
            {t("settings-modal.close")}
          </MintButton>
        </Box>
      </MintDialogActions>
    </MintDialog>
  );
};

export default SettingsModal;
