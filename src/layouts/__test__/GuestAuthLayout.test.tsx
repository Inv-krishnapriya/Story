import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // For additional matchers
import DashboardLayout from "../DashboardLayout";
import AppTheme from "../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { customerService } from "../../common/apiUrls";
import GuestAppLayout from "../GuestAppLayout";
import { useSearchParams } from "next/navigation";
import GuestAuthLayout from "../GuestAuthLayout";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  redirect: jest.fn(),
  usePathname: jest.fn(() => ""),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("Test"), // mock campaignId
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("../../common/apiUrls", () => ({
  customerService: {
    logout: jest.fn(() => Promise.resolve({ data: { data: {} } })),
  },
}));
jest.mock("axios");

describe("PersistentDrawerLeft Component", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useSearchParams().get as jest.Mock).mockReturnValue("");

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            language: "jp",
            clientData: {
              refreshToken: "",
              accessToken: "",
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
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("handles drawer toggle", () => {
    render(
      <AppTheme>
        <GuestAuthLayout>hii</GuestAuthLayout>
      </AppTheme>
    );
  });
});
