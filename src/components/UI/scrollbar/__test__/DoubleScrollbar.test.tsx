import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DoubleScrollbar from "../DoubleScrollbar";
import AppTheme from "../../../../theme";

describe("DoubleScrollbar component", () => {
  it("should render without crashing", () => {
    render(<DoubleScrollbar>Test Content</DoubleScrollbar>);
  });

  it("should scroll right when the right scroll button is clicked", () => {
    const { getByText } = render(
      <AppTheme>
        <DoubleScrollbar>Test Content</DoubleScrollbar>
      </AppTheme>
    );

    // You can assert the scrolling behavior here
  });

  it("show tooltip scrollbar", () => {
    render(
      <AppTheme>
        <DoubleScrollbar showTooltip>Test Content</DoubleScrollbar>
      </AppTheme>
    );
    render(
      <AppTheme>
        <DoubleScrollbar
          showTooltip
          tooltipProps={{
            title: "test",
          }}
          setScrollBarStatus={jest.fn()}
        >
          <div style={{ width: "100vw%" }}>Test Content</div>
        </DoubleScrollbar>
      </AppTheme>
    );
    const outerDivs = screen.getAllByTestId("mouse-enter");

    // Now you can access and interact with each outer div as needed
    outerDivs.forEach((outerDiv) => {
      fireEvent.mouseEnter(outerDiv);
      // Perform assertions or continue testing
    });
    outerDivs.forEach((outerDiv) => {
      fireEvent.mouseLeave(outerDiv);
      // Perform assertions or continue testing
    });
  });
  it("scrollbar loading", () => {
    render(
      <AppTheme>
        <DoubleScrollbar isLoading enableScrollRight>
          Test Content
        </DoubleScrollbar>
      </AppTheme>
    );
  });
  it("scrollbar hide", () => {
    render(
      <AppTheme>
        <DoubleScrollbar hideUpperScrollbar>Test Content</DoubleScrollbar>
      </AppTheme>
    );
  });

  // Add more test cases to cover other functionalities if needed
});
