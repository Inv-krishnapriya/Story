import { render } from "@testing-library/react";
import { MintAlert, MintToastContainer } from "..";
import AppTheme from "../../theme";

import { MintErrorToastElement, MintInfoToastElement, MintSuccessToastElement, MintWarningToastElement } from "../components/feedback/toast/elements/toastElements";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: "div",
}));

describe('Mint Feedback Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<AppTheme>
      <MintAlert title="Test Title" message="Test Message" />
    </AppTheme>);

    const titleElement = getByText('Test Title');
    const messageElement = getByText('Test Message');

    // Add assertions for title and message elements
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();

    // Add more assertions as needed
  });

  it('applies styles based on alert type', () => {
    const { container } = render(

      <AppTheme>
        <MintAlert title="Test Title" message="Test Message" severity="error" />
      </AppTheme>
    );

    const alertRoot = container.querySelector('.MuiAlert-root');
    const alertIcon = container.querySelector('.MuiAlert-icon');

    // Add assertions for styles based on alert type (e.g., backgroundColor, border color, icon color)
    expect(alertRoot).toHaveStyle({
      backgroundColor: 'your-expected-error-background-color',
      // Add more style assertions as needed
    });

    expect(alertIcon).toHaveStyle({
      color: 'rgb(224, 28, 13)',
      // Add more style assertions as needed
    });
  });
 
  it("renders the component with the provided message", () => {
    const { getByText } = render(<MintErrorToastElement message="Error message" />);

    const messageElement = getByText("Error message");
    expect(messageElement).toBeInTheDocument();
  });
  it("renders the component with the provided message", () => {
    const { getByText } = render(<MintSuccessToastElement message="Success message" />);

    const messageElement = getByText("Success message");
    expect(messageElement).toBeInTheDocument();
  });
  it("renders the component with the provided message", () => {
    const { getByText } = render(<MintInfoToastElement message="Info message" />);

    const messageElement = getByText("Info message");
    expect(messageElement).toBeInTheDocument();
  });
  it("renders the component with the provided message", () => {
    const { getByText } = render(<MintWarningToastElement message="Warning message" />);

    const messageElement = getByText("Warning message");
    expect(messageElement).toBeInTheDocument();
  });
  it("StyledToastContainer", () => {
    render(

      <MintToastContainer />

    );
  });
  // Add more test cases for other variations and interactions as needed
});