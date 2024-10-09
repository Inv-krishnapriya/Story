import { render, screen } from "@testing-library/react";
import AppTheme from "@/theme";
import SecurityPolicyPage from "../security-policy/page";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Security policy page", () => {
  it("Should render properly", () => {
    renderWithTheme(<SecurityPolicyPage />);

    expect(screen.getByText("security-policy.title")).toBeInTheDocument();
  });
});
