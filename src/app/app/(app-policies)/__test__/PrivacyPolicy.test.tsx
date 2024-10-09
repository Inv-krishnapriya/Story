import { render, screen } from "@testing-library/react";
import AppTheme from "@/theme";
import PrivacyPolicyPage from "../privacy-policy/page";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Privacy policy page", () => {
  it("Should render properly", () => {
    renderWithTheme(<PrivacyPolicyPage />);

    expect(screen.getByText("privacy-policy.title")).toBeInTheDocument();
  });
});
