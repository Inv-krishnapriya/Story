import { MintButton, MintDialog, MintTypography } from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface IModal {
  open: boolean;
  close: () => void;
}

const PolicyModal = ({ open, close }: IModal) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  return (
    <MintDialog
      open={open}
      onClose={close}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          width: "600px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Box
        px={theme.mint.spacing.m}
        display={"flex"}
        flexDirection={"column"}
        gap={theme.mint.spacing.m}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: theme.mint.color.background.containerBg.layer1,
            zIndex: 100,
          }}
          pt={theme.mint.spacing.m}
        >
          <MintTypography size="head-l" weight={"700"}>
            {t("interview.policy.title")}
          </MintTypography>
        </Box>
        <MintTypography size="body" weight={"400"}>
          {t("interview.policy.contents.p1")}
        </MintTypography>
        <MintTypography size="body" weight={"400"}>
          <p
            dangerouslySetInnerHTML={{
              __html: t("interview.policy.contents.p2"),
            }}
          ></p>
        </MintTypography>
        <MintTypography size="head-s" weight={"700"}>
          {t("interview.policy.sub.heading")}
        </MintTypography>
        <MintTypography size="body" weight={"400"}>
          {t("interview.policy.sub.content")}
        </MintTypography>
        <Stack
          direction="row"
          gap={1}
          sx={{
            placeContent: "end",
            position: "sticky",
            bottom: 0,
            backgroundColor: theme.mint.color.background.containerBg.layer1,
            zIndex: 100,
          }}
          pb={theme.mint.spacing.m}
        >
          <MintButton
            variant="outlined"
            color="gray"
            onClick={close}
            data-testid="policy-modal-close"
          >
            {t("interview.policy.button.not")}
          </MintButton>
          <MintButton
            onClick={() => router.push("/app/campaign/creation")}
            variant="contained"
            // className={style.Button}
          >
            {t("interview.policy.button.agreed")}
          </MintButton>
        </Stack>
      </Box>
    </MintDialog>
  );
};

export default PolicyModal;
