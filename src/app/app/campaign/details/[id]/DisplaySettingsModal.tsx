"use client";

import {
  MintButton,
  MintCheckbox,
  MintFormControlLabel,
  MintTypography,
} from "@/design-system";
import { Box, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface ICoulmnSettingsProp {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  toggleCoulmnVisibility: (header: number) => void;
  visiblecolumns: number[];
  campaignDetails: any;
}
const DisplaySettingsModal: React.FC<ICoulmnSettingsProp> = (props) => {
  const {
    open,
    onClose,
    anchorEl,
    toggleCoulmnVisibility,
    visiblecolumns,
    campaignDetails,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [checkAll, setcheckAll] = useState<boolean>(true);
  const [clearAll, setClearAll] = useState<boolean>(false);

  const opens = Boolean(anchorEl);

  const handleClose = () => {};

  const screeningTableHeading =
    campaignDetails?.screening?.question?.map((item: any, index: number) => {
      return {
        key: `campaign.campaignDetail.th.question${index + 1}`,
        value: 10 + index,
      };
    }) ?? [];

  const basicHeaders: any[] = [
    {
      label: t("campaign.campaignDetail.displaysettings.section1.heading"),
      data: [
        { key: "campaign.campaignDetail.th.gender", value: 1 },
        { key: "campaign.campaignDetail.th.age", value: 2 },
        { key: "campaign.campaignDetail.th.prefecture", value: 3 },
        { key: "campaign.campaignDetail.th.maritalstatus", value: 4 },
        { key: "campaign.campaignDetail.th.childrenpresence", value: 5 },
        { key: "campaign.campaignDetail.th.profession", value: 6 },
        { key: "campaign.campaignDetail.th.personalincome", value: 7 },
        { key: "campaign.campaignDetail.th.householdincome", value: 8 },
        { key: "campaign.th.date", value: 9 },
      ],
    },
    {
      label: t("campaign.campaignDetail.displaysettings.section2.heading"),
      data: [...screeningTableHeading],
    },
  ];

  const [checkedItems, setCheckedItems] = useState(() => {
    const data = basicHeaders?.map(
      (item) => item?.data?.map((item: any) => item.value)
    );
    return [...data[0], ...data[1]];
  });

  const handleChecked = (e: any, header: number) => {
    const { checked } = e.target;
    console.log(checkedItems, checked, header, checkedItems?.includes(header));
    if (checked) {
      if (checkedItems?.includes(header)) {
        console.log("Item already exist");
        setCheckedItems(
          (preState) => preState?.filter((checked) => checked !== header)
        );
      } else {
        console.log("Item not in the list");
        setCheckedItems([...checkedItems, header]);
      }
    } else {
      console.log("Not in checked state");
      setCheckedItems(
        (preState) => preState?.filter((checked) => checked !== header)
      );
    }

    console.log("Header selcted : ", header);
    toggleCoulmnVisibility(header);
  };

  const handleUncheck = () => {
    setClearAll(true);
    setcheckAll(false);
    setCheckedItems([]);
    toggleCoulmnVisibility(100);
  };

  const handleCheck = () => {
    setClearAll(false);
    setcheckAll(true);
    const data = basicHeaders?.map((item) =>
      item?.data?.map((item: any) => item.value)
    );
    setCheckedItems([...data[0], ...data[1]]);
    toggleCoulmnVisibility(0);
  };

  return (
    <div id="displayMain">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opens}
        onClose={onClose}
        sx={{ mt: 1, width: "200px !important", minWidth: "200px !important" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            "&::-webkit-scrollbar": {
              display: "none",
            },
            width: "200px",
            minWidth: "200px",
            position: "relative",
            maxHeight: "296px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: clearAll ? "auto" : "248px",
            maxHeight: "248px",
            padding: clearAll ? 0 : 2,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              padding: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            {!clearAll &&
              basicHeaders?.map((item) => (
                <>
                  <MintTypography
                    size="body"
                    weight="700"
                    color={theme.mint.color.text.high}
                    style={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      lineHeight: "150%",
                    }}
                  >
                    {item?.label}
                  </MintTypography>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {item?.data?.map((data: any, index: number) => (
                      <MenuItem
                        onClick={handleClose}
                        sx={{ gap: 1, px: 0 }}
                        key={index}
                      >
                        <MintFormControlLabel
                          control={
                            <MintCheckbox
                              checked={visiblecolumns.includes(data?.value)}
                              onChange={(e) => handleChecked(e, data?.value)}
                            />
                          }
                          label={t(data?.key)}
                        />
                      </MenuItem>
                    ))}
                  </Stack>
                </>
              ))}
            <Stack
              height="40px"
              width={"200px"}
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 100,
                flexDirection: "row",
                display: "flex",
                padding: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
                alignSelf: "stretch",
                background: (theme) => theme.mint.color.surfaceGray.high.high,
              }}
            >
              <MintButton
                size="small"
                variant="text"
                color="accentPrimary"
                onClick={handleCheck}
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={theme.mint.color.text.accent}
                >
                  {t(
                    "campaign.campaignDetail.displaysettings.action.selectall"
                  )}
                </MintTypography>
              </MintButton>
              <MintButton
                size="small"
                variant="text"
                color="accentPrimary"
                onClick={handleUncheck}
              >
                <MintTypography
                  size="body"
                  weight="500"
                  color={theme.mint.color.text.accent}
                >
                  {t("campaign.campaignDetail.displaysettings.action.clear")}
                </MintTypography>
              </MintButton>
            </Stack>
          </Stack>
        </Box>
      </Menu>
    </div>
  );
};
export default DisplaySettingsModal;
