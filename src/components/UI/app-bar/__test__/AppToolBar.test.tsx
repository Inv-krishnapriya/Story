import {
  fireEvent,
  logRoles,
  render,
  screen,
  within,
} from "@testing-library/react";
import AppToolbar from "../AppToolBar";
import AppTheme from "../../../../theme";
import { useSelector } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"), // mock campaignId
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

describe("AppToolbar Component", () => {
  it("renders without crashing", () => {
    renderWithTheme(<AppToolbar appName="Test App" />);
    expect(screen.getByText("Test App")).toBeInTheDocument();
  });

  it("renders with menu button", () => {
    renderWithTheme(<AppToolbar appName="Test App" hasMenuButton />);
    expect(screen.getByTestId("menu-bar")).toBeInTheDocument();
  });

  it("handles menu button click", () => {
    const handleMenuBarToggle = jest.fn();
    renderWithTheme(
      <AppToolbar
        appName="Test App"
        hasMenuButton
        handleMenuBarToggle={handleMenuBarToggle}
      />
    );

    fireEvent.click(screen.getByTestId("menu-bar"));

    expect(handleMenuBarToggle).toHaveBeenCalledTimes(1);
  });

  it("should be able to click app name", () => {
    const handleMenuBarToggle = jest.fn();
    const appName = "Test App";
    const onHeaderClick = jest.fn();

    renderWithTheme(
      <AppToolbar
        appName={appName}
        hasMenuButton
        handleMenuBarToggle={handleMenuBarToggle}
        onHeaderClick={onHeaderClick}
      />
    );

    const appNameClickable = screen.getByText(appName);
    fireEvent.click(appNameClickable);
    expect(onHeaderClick).toHaveBeenCalled();
  });

  it("should redirect to notifications page", () => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          campaign: {
            isUnreadExist: true,
          },
        })
    );

    renderWithTheme(
      <AppToolbar appName="Test App" hasMenuButton hasAppBarActions />
    );
    const actionBar = screen.getByTestId("app-actions");
    const button = within(actionBar).getByRole("button");
    fireEvent.click(button);
  });
});
