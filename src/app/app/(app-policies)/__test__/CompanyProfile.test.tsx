import { render, screen } from "@testing-library/react";
import AppTheme from "@/theme";
import CompanyProfilePage from "../company-profile/page";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Privacy policy page", () => {
  it("Should render properly", () => {
    renderWithTheme(<CompanyProfilePage />);

    expect(screen.getByText("company-profile.title")).toBeInTheDocument();
  });
});
