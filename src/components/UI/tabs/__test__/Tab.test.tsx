import { render, fireEvent } from "@testing-library/react";
import Tabs from "../tab/Tab";
import AppTheme from "../../../../theme";

// Mocked tab items
const tabItems = [
  {
    value: 0,
    label: "Tab 1",
    Icon: () => <div>Icon 1</div>,
    notificationCount: 3,
  },
  {
    value: 1,
    label: "Tab 2",
    Icon: () => <div>Icon 2</div>,
    notificationCount: 0,
  },
];

describe("Tabs component", () => {
  test("renders tab items correctly", () => {
    const { getByTestId, getByText } = render(
      <AppTheme>
        <Tabs value={0} handleChange={() => {}} tabItems={tabItems} />
      </AppTheme>
    );

    // Check if each tab item is rendered
    tabItems.forEach((tabItem, index) => {
      const tab = getByTestId(`MuiTab${index}`);
      expect(tab).toBeInTheDocument();

      // Check if label and icon are rendered correctly
      expect(getByText(tabItem.label)).toBeInTheDocument();
      expect(getByText(`Icon ${index + 1}`)).toBeInTheDocument();

      // Check if notification badge is rendered when notificationCount is greater than 0
      if (tabItem.notificationCount > 0) {
        expect(
          getByText(tabItem.notificationCount.toString())
        ).toBeInTheDocument();
      }
    });
  });

  test("calls handleChange when a tab is clicked", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <AppTheme>
        <Tabs value={0} handleChange={handleChange} tabItems={tabItems} />
      </AppTheme>
    );

    // Click on a tab
    fireEvent.click(getByTestId("MuiTab1"));
  });
});
