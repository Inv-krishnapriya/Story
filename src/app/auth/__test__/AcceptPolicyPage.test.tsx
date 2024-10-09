import React from "react";

import AgreePolicyPage from "../accept-app-policy/page";
import AppTheme from "@/theme";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

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
}));

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Accept Policy Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render properly", () => {
    renderWithTheme(<AgreePolicyPage />);
    expect(screen.getByText("accept-policy.terms.title")).toBeInTheDocument();
  });

  it("should be able to agree", async () => {
    await act(async () => {
      renderWithTheme(<AgreePolicyPage />);
    });
    const agreeButton = screen.getByRole("button", {
      name: "accept-policy.agree",
    });

    await waitFor(() => {
      fireEvent.click(agreeButton);
      expect(
        screen.getByText("accept-policy.communication.title")
      ).toBeInTheDocument();
    });
  });
});
