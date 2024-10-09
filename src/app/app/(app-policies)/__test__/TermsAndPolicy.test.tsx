import { render, screen } from "@testing-library/react";
import TermsAndConditionPage from "../terms/page";
import AppTheme from "@/theme";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Terms and condition page", () => {
  it("Should render properly", () => {
    renderWithTheme(<TermsAndConditionPage />);

    expect(screen.getByText("terms-of-use.title")).toBeInTheDocument();
  });
});
