import { fireEvent, render } from "@testing-library/react";

import AppTheme from "../../../../../../theme";
import WaitingModal from "../WaitingModal";
jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
describe("WaitingModal", () => {
  it("renders correctly", () => {
    const mockProps = {
      open: true,
      nickName: "John",
      onClose: jest.fn(),
      onAgree: jest.fn(),
    };

    const { getByText } = render(
      <AppTheme>
        <WaitingModal {...mockProps} />
      </AppTheme>
    );
    expect(getByText("John さんが待機しています")).toBeInTheDocument();
  });

  it("calls onClose when dialog is closed", () => {
    const mockProps = {
      open: true,
      nickName: "John",
      onClose: jest.fn(),
      onAgree: jest.fn(),
    };

    render(
      <AppTheme>
        <WaitingModal {...mockProps} />
      </AppTheme>
    );
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it('calls onAgree when "参加許可" button is clicked', () => {
    const mockProps = {
      open: true,
      nickName: "John",
      onClose: jest.fn(),
      onAgree: jest.fn(),
    };

    const { getByText } = render(
      <AppTheme>
        <WaitingModal {...mockProps} />
      </AppTheme>
    );
    const joinButton = getByText("参加許可");

    fireEvent.click(joinButton);

    expect(mockProps.onAgree).toHaveBeenCalled();
  });
});
