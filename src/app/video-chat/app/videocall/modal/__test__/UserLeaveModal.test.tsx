import { fireEvent, render } from "@testing-library/react";
import UserLeaveModal from "../UserLeaveModal";
import AppTheme from "@/theme";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

describe("UserLeaveModal", () => {
  it("renders correctly", () => {
    const mockProps = {
      open: true,
      onClose: jest.fn(),
      onAgree: jest.fn(),
      isUserLeft: false,
    };

    const { getByText } = render(
      <AppTheme>
        <UserLeaveModal {...mockProps} />
      </AppTheme>
    );
    expect(getByText("user-leave-modal.title")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockProps = {
      open: true,
      onClose: jest.fn(),
      onAgree: jest.fn(),
      isUserLeft: false,
    };

    const { getByText } = render(
      <AppTheme>
        <UserLeaveModal {...mockProps} />
      </AppTheme>
    );
    const closeButton = getByText("user-leave-modal.close");

    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onAgree when agree button is clicked", () => {
    const mockProps = {
      open: true,
      onClose: jest.fn(),
      onAgree: jest.fn(),
      isUserLeft: false,
    };

    const { getByText } = render(
      <AppTheme>
        <UserLeaveModal {...mockProps} />
      </AppTheme>
    );
    const leaveButton = getByText("user-leave-modal.exit");

    fireEvent.click(leaveButton);

    expect(mockProps.onAgree).toHaveBeenCalledTimes(1);
  });
});
