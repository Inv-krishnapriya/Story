import React from "react";
import { render, screen } from "@testing-library/react";
import {
  ErrorToastElement,
  InfoToastElement,
  SuccessToastElement,
} from "../elements/toastElements";

describe("ErrorToastElement", () => {
  test("renders with message", () => {
    const message = "Error message";
    render(<ErrorToastElement message={message} />);
    render(<SuccessToastElement message={message} />);
    render(<InfoToastElement message={message} />);
    render(<ErrorToastElement message={message} />);
  });
});
