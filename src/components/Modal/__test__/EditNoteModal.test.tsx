import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PolicyModal from "../PolicyModal";
import AppTheme from "../../../theme";
import EditNoteModal from "../EditNoteModal";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe("PolicyModal", () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    data: "Existing memo",
    monitorId: "123",
    campaignId: "456",
    setMemo: jest.fn(),
    memo: "",
    handleCampaign: jest.fn(),
  };

  it("cancel", () => {
    render(
      <AppTheme>
        <EditNoteModal {...mockProps} />
      </AppTheme>
    );
    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);
  });
  it("input change", () => {
    render(
      <AppTheme>
        <EditNoteModal {...mockProps} />
      </AppTheme>
    );
    fireEvent.change(screen.getByTestId("input-field"), {
      target: { value: "Test feedback" },
    });
  });

  // Additional test cases for other functionalities...
});
