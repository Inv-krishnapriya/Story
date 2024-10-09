import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // For additional matchers
import DashboardLayout from "../DashboardLayout";
import AppTheme from "@/theme";
import { useSelector, useDispatch } from "react-redux";
import { customerService } from "../../common/apiUrls";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  redirect: jest.fn(),
  usePathname: jest.fn(() => ""),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../common/apiUrls", () => ({
  customerService: {
    logout: jest.fn(() => Promise.resolve({ data: { data: {} } })),
    getNotificationList: jest.fn(() => Promise.resolve({ data: { data: "" } })),
  },
}));

jest.mock("axios");

jest.mock("firebase/messaging", () => ({
  getMessaging: jest.fn(),
  getToken: jest.fn(),
  deleteToken: jest.fn(),
}));

describe("PersistentDrawerLeft Component", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            language: "jp",
            clientData: {
              refreshToken: "tests",
              isUserConfidentialityAgreementAccepted: true,
              isUserServiceAgreementAccepted: true,
            },
          },
          ui: {},
          campaign: { isUnreadExist: true },
        })
    );
    (customerService.logout as any).mockResolvedValue({
      data: {
        errorCode: "",
        message: "success",
        data: {},
      },
    });
    (customerService.getNotificationList as jest.Mock).mockResolvedValue({
      data: {
        data: [],
        pages: {
          pageSize: 10,
          totalPages: 4,
          currentPage: 1,
        },
      },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <DashboardLayout />
      </AppTheme>
    );
    const header = screen.getByText("dashboard.header");
    expect(header).toBeInTheDocument();
    fireEvent.click(header);
  });

  it("handles drawer toggle", () => {
    render(
      <AppTheme>
        <DashboardLayout />
      </AppTheme>
    );
    const menuButton = screen.getByTestId("menu-bar");
    const appActions = screen.getByTestId("app-actions");

    fireEvent.click(menuButton);
    fireEvent.click(appActions);
    expect(
      screen.getByText("dashboard.navdata.ticket-management")
    ).toBeInTheDocument();
  });

  it("handles logout", async () => {
    render(
      <AppTheme>
        <DashboardLayout />
      </AppTheme>
    );
    const menuButton = screen.getByTestId("menu-bar");

    const logoutButton = screen.getByText("dashboard.navdata.log-out");
    await waitFor(() => {
      fireEvent.click(menuButton);
      userEvent.click(logoutButton);
    });
  });

  // Additional test cases for other functionalities...
});

describe("unauthorized user ", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            language: "jp",
            clientData: {
              refreshToken: "",
            },
          },
          ui: {},
          campaign: { isUnreadExist: true },
        })
    );
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <DashboardLayout />
      </AppTheme>
    );
  });
});
describe("logout fail user ", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            language: "jp",
            clientData: {
              refreshToken: "test",
              isUserConfidentialityAgreementAccepted: true,
              isUserServiceAgreementAccepted: true,
            },
          },
          ui: {},
          campaign: { isUnreadExist: false },
        })
    );

    (customerService.logout as any).mockRejectedValue({
      data: {
        errorCode: "test",
        message: "success",
        data: {},
      },
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <DashboardLayout />
      </AppTheme>
    );
    const logoutButton = screen.getByTestId("app-lout-out");
    userEvent.click(logoutButton);
    userEvent.click(screen.getByTestId("modal-onAgree"));
  });
});
