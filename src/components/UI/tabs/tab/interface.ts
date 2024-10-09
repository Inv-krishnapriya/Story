import { SvgIconProps, SxProps, TabProps } from "@mui/material";

export interface ICustomTabProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabItems: {
    label: any;
    Icon?: any;
    notificationCount?: number;
    value: number;
  }[];
  sx?: SxProps;
  tabItemProps?: SxProps;
  variant?: any;
  tabProps?: TabProps;
  disabled?: boolean;
}
