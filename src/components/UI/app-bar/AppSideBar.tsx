import { MintTypography } from "@/design-system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { INavDataItem, NavData } from "./NavData";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function AppSideBar({
  handleLogout,
  open,
}: Readonly<{
  handleLogout: () => void;
  open: boolean;
}>) {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: theme.mint.drawerWidth,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.mint.drawerWidth,
          boxSizing: "border-box",
          backgroundColor:
            theme.mint.color.surfaceAccent.primaryNavigation.primary,
          color: theme.mint.color.background.containerBg.layer2,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List sx={{ padding: "12px 8px 16px 8px" }}>
        {NavData?.map((item) => {
          return (
            <>
              {item?.subMenu ? (
                <NavSubmenu item={item} handleLogout={handleLogout} />
              ) : (
                <NavMenu item={item} />
              )}
            </>
          );
        })}
      </List>
    </Drawer>
  );
}

export default AppSideBar;
const NavMenu = ({ item }: { item: INavDataItem }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathName = usePathname();
  const isActive = item?.path ? pathName.includes(item?.path) : false;
  const theme = useTheme();
  const onRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <ListItemStyled
      key={item.key}
      disablePadding
      sx={{
        padding: "6px 16px",
        height: "48px",
        cursor: item?.disabled ? "default" : "pointer",
      }}
      isActive={isActive}
    >
      <ListItemButton
        disableRipple
        sx={{ padding: "0" }}
        onClick={() => {
          onRedirect(item?.path ?? "");
        }}
        disabled={item?.disabled}
      >
        <ListItemIcon
          sx={{
            color: (theme) => theme.mint.color.background.containerBg.layer2,
            minWidth: "auto",
            marginRight: theme.mint.spacing.s,
          }}
        >
          {<item.icon color={theme.mint.color.object.fixedWhite} />}
        </ListItemIcon>
        <MintTypography weight="400" size="body">
          {t(item.label)}
        </MintTypography>
      </ListItemButton>
    </ListItemStyled>
  );
};
const NavSubmenu = ({
  item,
  handleLogout,
}: {
  item: INavDataItem;
  handleLogout: () => void;
}) => {
  const [subMenu, setSubMenu] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const handleClick = () => {
    setSubMenu((subMenu) => !subMenu);
  };
  const onSubMenuClick = (path: string, key: string) => {
    if (key === "log-out") {
      handleLogout();
    } else {
      onRedirect(path);
    }
  };

  const onRedirect = (path: string) => {
    router.push(path);
  };

  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <>
      <ListItemStyled
        key={item.key}
        disablePadding
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <ListItemButton sx={{ padding: "0" }} disableRipple>
          <ListItemIcon
            sx={{ minWidth: "auto", marginRight: theme.mint.spacing.s }}
          >
            {<item.icon color={theme.mint.color.object.fixedWhite} />}
          </ListItemIcon>
          <MintTypography weight="400" size="body">
            {t(item.label)}
          </MintTypography>
        </ListItemButton>
        {subMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={subMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ padding: "0" }}>
          {item?.subMenu?.map((subMenu) => {
            return (
              <ListItemButton
                disableRipple
                sx={{
                  padding: "8px 16px 8px 56px",
                  ...(isActive(subMenu.path) && ActiveStyle),
                  display: subMenu?.hidden ? "none" : "inherit",
                }}
                key={subMenu.path}
                onClick={() => {
                  onSubMenuClick(subMenu.path, subMenu.key);
                }}
                disabled={subMenu.disabled}
                data-testid={subMenu?.key === "log-out" ? "app-lout-out" : ""}
              >
                <MintTypography weight="400" size="body">
                  {t(subMenu.label)}
                </MintTypography>
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

const ActiveStyle = {
  backgroundColor: "#162331",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "0",
    borderRadius: "4px",
    padding: "2px",
    background: "linear-gradient(45deg,#05A0ED,#7690C1,#F27E91)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, \n     linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  },
};

const ListItemStyled = styled(ListItem)<{
  isActive?: boolean;
}>(({ theme, isActive }) => ({
  padding: "6px 16px",
  position: "relative",
  height: "48px",
  ...(isActive && ActiveStyle),
}));
