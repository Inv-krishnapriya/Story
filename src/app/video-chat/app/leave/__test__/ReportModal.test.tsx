import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ReportModal from "../modal/ReportModal";
import AppTheme from "../../../../../theme";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
describe("ReportModal", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <AppTheme>
        <ReportModal open={true} onClose={() => {}} />
      </AppTheme>
    );

    expect(getByText("問題を報告")).toBeInTheDocument();
    expect(getByText("メールアドレス")).toBeInTheDocument();
    expect(
      getByPlaceholderText("メッセージを入力してください")
    ).toBeInTheDocument();
  });

  test("handles email input", () => {
    render(
      <AppTheme>
        <ReportModal open={true} onClose={() => {}} />
      </AppTheme>
    );
    const submitButton = screen.getByTestId("report-submit");

    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.click(submitButton);
  });

  test("handles report submission", async () => {
    const { getByText, getByPlaceholderText } = render(
      <AppTheme>
        <ReportModal open={true} onClose={() => {}} />
      </AppTheme>
    );

    fireEvent.click(getByText("送信"));
    await waitFor(() =>
      expect(getByText("メールアドレスの入力は必須です。")).toBeInTheDocument()
    );

    fireEvent.change(getByPlaceholderText("メッセージを入力してください"), {
      target: { value: "Test report" },
    });
    fireEvent.click(getByText("送信"));
  });
  test("handles report invalid email submission", async () => {
    render(
      <AppTheme>
        <ReportModal open={true} onClose={() => {}} />
      </AppTheme>
    );

    const submitButton = screen.getByTestId("report-submit");
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "error" } });
    fireEvent.click(submitButton);
  });
});
