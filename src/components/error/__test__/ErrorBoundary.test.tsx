import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

jest.mock("@/i18n", () => ({
  t: (key: string) => key,
}));

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const error = new Error("Test error");
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
    ErrorBoundary.prototype.componentDidCatch(error, {});
  });
});

const Child = () => {
  throw new Error();
};
