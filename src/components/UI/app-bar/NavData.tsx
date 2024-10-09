import { ENVIRONMENT_TYPE } from "@/api/ApiConstants";
import {
  ContractOutlinedIcon,
  DotsCircleOutlinedIcon,
  MailOutlinedIcon,
  PlayOutlinedIcon,
  TicketOutlinedIcon,
  HomeoutlinedIcon,
} from "@/design-system";

export interface INavDataItem {
  icon: any;
  label: string;
  path?: string;
  disabled?: boolean;
  key: string;
  subMenu?: SubMenuItem[];
  hidden?: boolean;
}

interface SubMenuItem {
  label: string;
  path: string;
  disabled?: boolean;
  key: string;
  hidden?: boolean;
}

export const NavData: INavDataItem[] = [
  {
    icon: HomeoutlinedIcon,
    label: "dashboard.navdata.home",
    path: "/app/home",
    key: "campaign",
  },
  {
    icon: ContractOutlinedIcon,
    label: "dashboard.navdata.case-management",
    path: "/app/campaign",
    key: "",
  },
  {
    icon: TicketOutlinedIcon,
    label: "dashboard.navdata.ticket-management",
    path: "/app/ticket",
    key: "ticket",
  },
  {
    icon: PlayOutlinedIcon,
    label: "dashboard.navdata.interview-video",
    path: "/app/delivery",
    key: "video",
  },
  {
    icon: MailOutlinedIcon,
    label: "inquiry.heading",
    path: "/app/inquiry",
    key: "inquiry",
  },
  {
    icon: DotsCircleOutlinedIcon,
    label: "dashboard.navdata.see-more",

    subMenu: [
      {
        label: "dashboard.navdata.terms-of-service",
        path: "/app/terms",
        key: "",
      },
      {
        label: "dashboard.navdata.privacy-policy",
        path: "/app/privacy-policy",
        key: "",
      },
      {
        label: "dashboard.navdata.info-security-policy",
        path: "/app/security-policy",
        key: "",
      },
      ...(ENVIRONMENT_TYPE !== "prod"
        ? [
            {
              label: "dashboard.navdata.security-check-sheet",
              path: "/app/security-check-sheet",
              key: "security-check-sheet",
            },
          ]
        : []),
      {
        label: "dashboard.navdata.company-profile",
        path: "/app/company-profile",
        key: "company.profile",
      },
      { label: "dashboard.navdata.log-out", path: "", key: "log-out" },
    ],
    disabled: true,
    key: "campaign",
  },
];
