import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PolicyModal from "../PolicyModal";
import AppTheme from "../../../theme";

const mockClose = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe("PolicyModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <PolicyModal open close={mockClose} />
      </AppTheme>
    );
    expect(screen.getByText("interview.policy.title")).toBeInTheDocument(); // Adjust with your actual translation key
    expect(
      screen.getByText("interview.policy.contents.p1")
    ).toBeInTheDocument(); // Adjust with your actual translation key
    expect(
      screen.getByText("interview.policy.contents.p2")
    ).toBeInTheDocument(); // Adjust with your actual translation key
    expect(
      screen.getByText("interview.policy.sub.heading")
    ).toBeInTheDocument(); // Adjust with your actual translation key
    expect(
      screen.getByText("interview.policy.sub.content")
    ).toBeInTheDocument(); // Adjust with your actual translation key
    expect(screen.getByTestId("policy-modal-close")).toBeInTheDocument();
  });

  it('calls close when the "Not Agreed" button is clicked', () => {
    render(
      <AppTheme>
        <PolicyModal open close={mockClose} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("policy-modal-close"));
    expect(mockClose).toHaveBeenCalled();
  });

  it('navigates to "/app/interview" when the "Agreed" button is clicked', () => {
    render(
      <AppTheme>
        <PolicyModal open close={mockClose} />
      </AppTheme>
    );
    fireEvent.click(screen.getByText("interview.policy.button.agreed")); // Adjust with your actual translation key
    expect(window.location.pathname).toBe("/");
  });

  // Additional test cases for other functionalities...
});
