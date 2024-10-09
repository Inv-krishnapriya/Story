// Page.test.js
import React from "react";
import { render } from "@testing-library/react";
import Page from "../page";
import AppTheme from "../../../../../theme";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

describe("Page component", () => {
  it("renders without crashing", () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );
  });

  it("renders the WaitingScreen component", () => {
    const { getByTestId } = render(<Page />);
  });
});
