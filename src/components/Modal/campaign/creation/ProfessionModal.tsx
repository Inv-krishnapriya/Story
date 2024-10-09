import { ProfessionResponse } from "@/common/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../AppModal";
import { Box, Button, Stack, useTheme } from "@mui/material";
import AppCheckbox from "@/components/Checkbox/AppCheckbox";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintFormControlLabel,
  MintTypography,
} from "@/design-system";

type TProfessionModal = {
  professions: ProfessionResponse[];
  open: boolean;
  handleClose: () => void;
  checked: string[];
  handleSubmit: (selected: string[]) => void;
};

const ProfessionModal = ({
  professions,
  open,
  handleClose,
  checked,
  handleSubmit,
}: TProfessionModal) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selected, setSelected] = useState<string[]>(checked);
  useEffect(() => {
    if (checked?.length > 0) setSelected(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(selected);
    const { checked, value } = event.target;
    const newIndustries = checked
      ? [...selected!, value]
      : selected?.filter((x) => x !== value);
    setSelected(newIndustries);
  };
  const allChecked = professions?.every((professions) =>
    selected.includes(professions.id)
  );
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const allSelected = professions?.map((x) => x.id);
    if (!allChecked) {
      setSelected(allSelected);
    } else {
      setSelected([]);
    }
  };

  return (
    <MintDialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "400px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
          zIndex: 100,
        }}
      >
        <Box p={theme.mint.spacing.m}>
          <MintTypography
            size="head-m"
            weight="500"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            職業の設定
          </MintTypography>
        </Box>
        <Box px={theme.mint.spacing.m}>
          <MintTypography
            size="body"
            weight="400"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            対象としたいモニターの職業をすべて選択してください
          </MintTypography>
        </Box>
      </Box>

      <Box
        px={theme.mint.spacing.m}
        pb={theme.mint.spacing.s}
        gap={theme.mint.spacing.s}
        pt={theme.mint.spacing.s}
      >
        <Box>
          <MintFormControlLabel
            control={
              <MintCheckbox
                name="all"
                onChange={handleSelectAll}
                // checked={professions?.every((professions) =>
                //   selected.includes(professions.id)
                // )}
                checked={allChecked}
              />
            }
            label={t("campaign.creation.modal.all-select")}
          />
        </Box>
        <Stack mt={theme.mint.spacing.s}>
          <Stack gap={theme.mint.spacing.x3s}>
            {professions?.map((profession, index) => (
              <Box
                display={"flex"}
                gap={theme.mint.spacing.xxs}
                py={theme.mint.spacing.x3s}
                key={profession.id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.mint.color.surfaceGray.area.hover,
                  },
                }}
              >
                <MintFormControlLabel
                  control={
                    <MintCheckbox
                      value={profession.id}
                      name={profession.name}
                      key={profession.id}
                      checked={selected?.some((x) => x === profession.id)}
                      onChange={handleChange}
                      inputProps={{ "aria-label": `item-${index}` }}
                    />
                  }
                  label={profession.name}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
      <Stack
        p={theme.mint.spacing.m}
        justifyContent={"end"}
        direction={"row"}
        gap={theme.mint.spacing.xxs}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
          zIndex: 100,
        }}
      >
        <MintButton size="medium" variant="text" onClick={handleClose}>
          {t("interview.button.cancel")}
        </MintButton>
        <MintButton
          size="medium"
          onClick={() => handleSubmit(selected)}
          data-testid="submit-button"
        >
          {t("campaign.creation.modal.submit-button")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
};

export default ProfessionModal;
