import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // For additional matchers
import AuthenticationLayout from "../AuthenticationLayout";
import AppTheme from "../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  redirect: jest.fn(),
  usePathname: jest.fn(() => ""),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Authentication Layout", () => {
  it("renders without crashing", () => {
    render(
      <AppTheme>
        <AuthenticationLayout>hi</AuthenticationLayout>
      </AppTheme>
    );
    expect(screen.getByText("dashboard.header")).toBeInTheDocument();
  });

  // Additional test cases for other functionalities...

  describe("Already login User", () => {
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
                isUserServiceAgreementAccepted: true,
                isUserConfidentialityAgreementAccepted: true,
              },
            },
            ui: {},
          })
      );
    });
    it("renders without crashing", () => {
      render(
        <AppTheme>
          <AuthenticationLayout>hi</AuthenticationLayout>
        </AppTheme>
      );
    });

    // Additional test cases for other functionalities...
  });
});
