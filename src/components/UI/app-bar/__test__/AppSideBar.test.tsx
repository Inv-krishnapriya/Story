import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppSideBar from "../AppSideBar";
import AppTheme from "../../../../theme";

// Mock the handleLogout function
const mockHandleLogout = jest.fn();

// Mock the NavData array
const mockNavData = [
  {
    key: "1",
    label: "Home",
    icon: () => (
      <svg
        className="MintIcon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1298 2.54053C11.5035 1.81662 12.544 1.82071 12.912 2.54753L15.5066 7.67222C15.6565 7.96823 15.9444 8.17056 16.2746 8.21196L21.1188 8.81919C21.8895 8.9158 22.2602 9.81243 21.7812 10.4215L18.2774 14.8772C18.0989 15.1043 18.0279 15.3973 18.0829 15.6804L19.0792 20.8127C19.237 21.6252 18.3888 22.2637 17.647 21.891L12.4153 19.2625C12.1308 19.1196 11.7949 19.1202 11.5109 19.2644L6.3593 21.8789C5.61736 22.2555 4.76538 21.6167 4.92347 20.8024L5.91814 15.6788C5.97293 15.3966 5.90262 15.1045 5.72528 14.8778L2.21023 10.3825C1.73518 9.77498 2.10243 8.8833 2.86898 8.78303L7.75227 8.14433C8.07763 8.10177 8.36133 7.90293 8.51139 7.61227L11.1298 2.54053Z"
          fill={"red"}
        />
      </svg>
    ),
    path: "/home",
  },
  // Add more mock data as needed
];

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue(""),
  useRouter: jest.fn(),
}));

describe("AppSideBar component", () => {
  test("renders sidebar with NavData items", () => {
    const { getByText } = render(
      <AppTheme>
        <AppSideBar handleLogout={mockHandleLogout} open={true} />
      </AppTheme>
    );

    // Replace with actual text content from your NavData
    expect(getByText("dashboard.navdata.home")).toBeInTheDocument();
    // Add assertions for other NavData items
  });

  test("handles click on NavMenu item", () => {
    const { getByText } = render(
      <AppTheme>
        <AppSideBar handleLogout={mockHandleLogout} open={true} />
      </AppTheme>
    );

    // Replace 'Home' with the label of the NavMenu item you want to test
    const secondItem = getByText("dashboard.navdata.case-management");
    // fireEvent.click(secondItem);

    // Add assertions based on the expected behavior of clicking a NavMenu item
  });

  test("handles click on NavSubmenu item", () => {
    const { getByText } = render(
      <AppTheme>
        <AppSideBar handleLogout={mockHandleLogout} open={true} />
      </AppTheme>
    );

    // Replace 'SubmenuItem' with the label of the NavSubmenu item you want to test
    fireEvent.click(getByText("dashboard.navdata.see-more"));
    expect(getByText("dashboard.navdata.terms-of-service")).toBeInTheDocument();
    // Add assertions based on the expected behavior of clicking a NavSubmenu item
  });

  // Add more test cases as needed
});
