import React from "react";
import { render } from "@testing-library/react";
import { StyledToastContainer } from "../container/Container";

describe("StyledToastContainer", () => {
  test("renders with correct styles", () => {
    const { container } = render(<StyledToastContainer />);
  });
});
