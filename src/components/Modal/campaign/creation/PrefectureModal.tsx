import { PrefectureResponse } from "@/common/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../AppModal";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import AppCheckbox from "@/components/Checkbox/AppCheckbox";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintFormControlLabel,
  MintTypography,
} from "@/design-system";

type TModal = {
  prefectures: PrefectureResponse[];
  open: boolean;
  handleClose: () => void;
  checked: string[];
  handleSubmit: (selected: string[]) => void;
};

function PrefectureModal({
  prefectures,
  open,
  handleClose,
  checked,
  handleSubmit,
}: TModal) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selected, setSelected] = useState<string[]>(checked);
  const [allSelect, setAllSelect] = useState<boolean>(false);

  useEffect(() => {
    if (checked?.length > 0) setSelected(checked);
  }, [checked]);

  const handleColumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllSelect(false);
    const { checked, name, value } = event.target;
    if (prefectures?.some((n) => n.name === name) && checked) {
      let areaSelected = prefectures.find((area) => area.name === name);
      const result: string[] =
        areaSelected?.prefectures?.map((prefecture) => prefecture.id) ?? [];
      setSelected((pre) => [...pre, ...result]);
    } else {
      const areaSelected = prefectures.find((area) => area.name === name);
      const ids = areaSelected?.prefectures?.map((area) => area.id) ?? [];
      const updatedValue = selected?.filter((x) => !ids.includes(x));
      setSelected(updatedValue);
    }
  };
  const handleColumItemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllSelect(false);
    const { checked, value } = event.target;
    if (checked) {
      setSelected((pre) => [...pre, value]);
    } else {
      const updatedValue = selected?.filter((x) => x !== value);
      setSelected(updatedValue);
    }
  };

  const cancel = () => setSelected([]);
  const onSelectAll = (checked: boolean) => {
    setAllSelect(checked);
    if (checked) {
      const allIds: string[] = [];
      prefectures?.forEach((x) => {
        const allPrefecturesId = x.prefectures?.map((y) => y.id);
        allIds.push(...allPrefecturesId);
      });
      console.log(allIds, "allIds");

      setSelected(allIds);
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
          width: "600px",
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
            居住地の設定
          </MintTypography>
        </Box>
        <MintTypography
          size="body"
          weight="400"
          lineHeight={"150%"}
          color={theme.mint.color.text.high}
          px={theme.mint.spacing.m}
        >
          対象としたいモニターの居住地をすべて選択してください
        </MintTypography>
      </Box>

      <Box px={theme.mint.spacing.m} pb={theme.mint.spacing.s}>
        <Box
          mt={theme.mint.spacing.xs}
          px={theme.mint.spacing.xs}
          pt={theme.mint.spacing.xs}
          borderRadius={"8px"}
          border={`1px solid ${theme.mint.color.border.low}`}
        >
          <Box
            display={"flex"}
            gap={theme.mint.spacing.xxs}
            sx={{
              "&:hover": {
                backgroundColor: theme.mint.color.surfaceGray.area.hover,
              },
            }}
          >
            <MintFormControlLabel
              control={
                <MintCheckbox
                  onChange={(e) => {
                    onSelectAll(e.target.checked);
                  }}
                  checked={allSelect}
                  id="allSelect"
                />
              }
              label="すべて"
            />
          </Box>
          <Stack
            direction={"row"}
            mt={theme.mint.spacing.s}
            flexWrap={"wrap"}
            gap={theme.mint.spacing.xxs}
            rowGap={theme.mint.spacing.s}
          >
            {prefectures?.map?.((area) => {
              return (
                <Stack key={area.id} flexGrow={1} minWidth={"110px"}>
                  <Box
                    display={"flex"}
                    gap={theme.mint.spacing.xxs}
                    p={theme.mint.spacing.xxs}
                    height={"40px"}
                    borderRadius={`${theme.mint.cornerRadius.s}px`}
                    bgcolor={theme.mint.color.background.containerBg.layer2}
                  >
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          name={area.name}
                          onChange={handleColumChange}
                          checked={area.prefectures.every(
                            (x) => selected?.includes(x.id)
                          )}
                        />
                      }
                      label={area.name}
                    />
                  </Box>
                  <Box py={theme.mint.spacing.x3s}>
                    {area?.prefectures?.map((prefecture) => {
                      return (
                        <Box
                          display={"flex"}
                          gap={theme.mint.spacing.xxs}
                          px={theme.mint.spacing.xxs}
                          py={theme.mint.spacing.x3s}
                          key={prefecture.id}
                          sx={{
                            "&:hover": {
                              backgroundColor:
                                theme.mint.color.surfaceGray.area.hover,
                            },
                          }}
                        >
                          <MintFormControlLabel
                            control={
                              <MintCheckbox
                                value={prefecture.id}
                                key={prefecture.id}
                                name={prefecture.name}
                                onChange={handleColumItemChange}
                                checked={selected?.some(
                                  (x) => x === prefecture.id
                                )}
                              />
                            }
                            label={prefecture.name}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Box>
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
        <MintButton size="medium" onClick={() => handleSubmit(selected)}>
          {t("campaign.creation.modal.submit-button")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
}

export default PrefectureModal;
