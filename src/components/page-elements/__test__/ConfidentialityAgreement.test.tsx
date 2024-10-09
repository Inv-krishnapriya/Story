import AppTheme from "@/theme";
import { render, screen } from "@testing-library/react";
import ConfidentialityAgreement from "../accept-app-policy/ConfidentialityAgreement";

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("Confidentiality agreement component", () => {
  it("should render the component properly", () => {
    renderWithTheme(<ConfidentialityAgreement />);

    expect(
      screen.getByText("communication-agreement.disclaimer")
    ).toBeInTheDocument();
  });
});
