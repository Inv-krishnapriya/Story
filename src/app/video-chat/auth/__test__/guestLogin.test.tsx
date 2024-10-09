import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login/page";
import AppTheme from "../../../../theme";

import { act } from "react-dom/test-utils";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Mocking the dependencies
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn().mockReturnValue("testid"),
  })),
}));

// Mocking the API service

jest.mock("axios");

describe("Login Component Auth Fails", () => {
  const mockDispatch = jest.fn();
  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            language: "jp",
          },
          ui: {},
        })
    );
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
