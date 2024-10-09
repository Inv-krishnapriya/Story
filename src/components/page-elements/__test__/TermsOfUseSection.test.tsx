import AppTheme from "@/theme";
import { render, screen } from "@testing-library/react";
import TermsOfUseSections from "../terms/TermsOfUseSections";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

const date = "SomeDateString";

describe("Terms of use sections component", () => {
  it("should render the component properly", () => {
    renderWithTheme(<TermsOfUseSections establishedDate={date} />);

    expect(screen.getByText(date)).toBeInTheDocument();
  });
});
