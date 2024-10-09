import {
  Badge,
  Box,
  Tab as MuiTab,
  Tabs as MuiTabs,
  useTheme,
} from "@mui/material";

import { ICustomTabProps } from "./interface";
import { useTranslation } from "react-i18next";
import { MintBadge, MintTabs, MintTypography } from "@/design-system";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabs({
  value,
  handleChange,
  tabItems,
  sx,
  tabItemProps = {},
  tabProps,
  disabled,
}: Readonly<ICustomTabProps>) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <MintTabs
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example"
      sx={{
        ...sx,
      }}
    >
      {tabItems?.map((tabItem, index) => {
        const isActive = value === tabItem?.value ?? index;
        const { label, Icon, notificationCount } = tabItem;
        return (
          <MuiTab
            data-testid={`MuiTab${index}`}
            disableRipple
            value={tabItem.value}
            label={
              <Box display={"flex"} gap={"8px"}>
                {Icon && (
                  <Icon
                    size={24}
                    color={
                      isActive
                        ? theme.mint.color.text.accent
                        : theme.mint.color.text.medium
                    }
                  />
                )}
                <MintTypography
                  weight={isActive ? "700" : "400"}
                  size={
                    notificationCount && notificationCount > 0
                      ? "caption"
                      : "body"
                  }
                  sx={{
                    ...(isActive && {
                      color: theme.mint.color.text.accent,
                    }),
                    ...(!isActive && {
                      color: theme.mint.color.text.high,
                    }),
                  }}
                >
                  {t(label)}
                </MintTypography>
                {notificationCount && notificationCount > 0 && (
                  <MintBadge color="primary" count={notificationCount} />
                )}
              </Box>
            }
            {...a11yProps(tabItem.value ?? 3)}
            sx={{
              fontWeight: "bold",
              "& .MuiButtonBase-root": {
                // ...(!isActive && {
                borderBottom: "1px solid red",
                // }),
              },
              ...tabItemProps,
            }}
            {...tabProps}
            disabled={disabled}
          />
        );
      })}
    </MintTabs>
  );
}
