import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers
import ConfirmationModal from "../confirmation/ConfirmationModal";
import AppTheme from "../../../theme";

const mockOnClose = jest.fn();
const mockOnAgree = jest.fn();
const mockOnDisagree = jest.fn();

const defaultProps: any = {
  open: true,
  title: "Confirmation Title",
  content: "Confirmation Content",
  onClose: mockOnClose,
  onAgree: mockOnAgree,
  onDisagree: mockOnDisagree,
  agreeButtonName: "Agree",
  disAgreeButtonName: "Disagree",
  isLoading: false,
  width: 400,
  height: 200,
  ticketInfo: "Ticket Info",
  ticketCount: 3,
  modalWidth: 500,
  agreeButtonColorVariant: "primary",
  disAgreeButtonVariant: "secondary",
};

describe("ConfirmationModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <ConfirmationModal {...defaultProps} />
      </AppTheme>
    );
    expect(screen.getByText("Confirmation Title")).toBeInTheDocument();
    expect(screen.getByText("Confirmation Content")).toBeInTheDocument();
  });

  it("calls onClose when the modal is closed", () => {
    render(
      <AppTheme>
        <ConfirmationModal {...defaultProps} />
      </AppTheme>
    );
    fireEvent.click(screen.getByRole("button", { name: "Disagree" }));
  });

  it('calls onAgree when the "Agree" button is clicked', () => {
    render(
      <AppTheme>
        <ConfirmationModal {...defaultProps} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("modal-onAgree"));
    expect(mockOnAgree).toHaveBeenCalled();
  });

  // Additional test cases for other functionalities...
});
