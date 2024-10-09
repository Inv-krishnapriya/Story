import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InterviewPolicyModal from "../modal/InterviewPolicyModal";
import AppTheme from "@/theme";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

describe("InterviewPolicyModal", () => {
  it("renders with correct title and content", () => {
    const onClose = jest.fn();
    const onAgree = jest.fn();

    const { getByText } = render(
      <AppTheme>
        <InterviewPolicyModal open={true} onClose={onClose} onAgree={onAgree} />
      </AppTheme>
    );

    expect(getByText("interview-policy-modal.title")).toBeInTheDocument();
    expect(
      getByText("interview-policy-modal.disclaimer-1")
    ).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const onClose = jest.fn();
    const onAgree = jest.fn();

    const { getByText } = render(
      <AppTheme>
        <InterviewPolicyModal open={true} onClose={onClose} onAgree={onAgree} />
      </AppTheme>
    );

    fireEvent.click(getByText("interview-policy-modal.cancel"));

    expect(onClose).toHaveBeenCalled();
    expect(onAgree).not.toHaveBeenCalled();
  });

  it("calls onAgree when agree button is clicked", () => {
    const onClose = jest.fn();
    const onAgree = jest.fn();

    const { getByText } = render(
      <AppTheme>
        <InterviewPolicyModal open={true} onClose={onClose} onAgree={onAgree} />
      </AppTheme>
    );

    fireEvent.click(getByText("interview-policy-modal.receive"));

    expect(onAgree).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
