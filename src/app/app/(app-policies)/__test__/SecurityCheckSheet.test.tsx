import { render, screen } from "@testing-library/react";
import AppTheme from "@/theme";
import SecurityCheckSheetPage from "../security-check-sheet/page";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Security check sheet page", () => {
  it("Should render properly", () => {
    renderWithTheme(<SecurityCheckSheetPage />);

    expect(screen.getByText("security-check-sheet.title")).toBeInTheDocument();
  });
});
