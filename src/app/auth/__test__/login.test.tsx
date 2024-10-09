import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login/page";
import AppTheme from "../../../theme";

import { act } from "react-dom/test-utils";
import { customerService } from "@/common/apiUrls";

// Mocking the dependencies
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mocking the API service
jest.mock("../../../common/apiUrls", () => ({
  customerService: {
    authenticateUser: jest.fn(() => Promise.resolve({ data: { data: {} } })),
  },
}));
jest.mock("axios");

describe("Login Component Auth Fails", () => {
  beforeEach(() => {
    (customerService.authenticateUser as any).mockRejectedValueOnce({
      response: {
        data: {
          errorCode: "E100002",
          message: "Authentication failed",
        },
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks
  });
  it("renders login form and submits", async () => {
    render(
      <AppTheme>
        <Login />
      </AppTheme>
    );

    // Mocking user input

    await act(async () => {
      userEvent.type(screen.getByTestId(/login-id/i), "testuser");
      userEvent.type(screen.getByTestId(/password/i), "testpassword");
    });
    // Triggering form submission

    await act(async () => {
      fireEvent.click(screen.getByTestId(/login-submit/i));
    });
    fireEvent.click(screen.getByTestId(/login-submit/i));

    // Waiting for the async operation (API call) to complete
    await waitFor(() => {
      expect(screen.getByTestId("login-form")).toBeInTheDocument();
      fireEvent.click(screen.getByText(/modal.client-login.agreeButton/i));
      // Add more assertions based on your component's behavior
    });
  });

  it("handles authentication failure", async () => {
    render(
      <AppTheme>
        <Login />
      </AppTheme>
    );

    // Mocking user input
    userEvent.type(screen.getByTestId(/login-id/i), "testuser");
    userEvent.type(screen.getByTestId(/password/i), "testpassword");

    // Triggering form submission
    fireEvent.click(screen.getByTestId(/login-submit/i));

    // Waiting for the async operation (API call) to complete
  });
  it("handles authentication form errors", async () => {
    // Mocking the API service to simulate an authentication failure
    render(
      <AppTheme>
        <Login />
      </AppTheme>
    );

    // Triggering form submission
    fireEvent.click(screen.getByTestId(/login-submit/i));

    // Waiting for the async operation (API call) to complete
  });
  it("handles modal open  success", async () => {
    render(
      <AppTheme>
        <Login />
      </AppTheme>
    );

    // Triggering form submission
    fireEvent.click(screen.getByTestId(/login-submit/i));
  });
});
