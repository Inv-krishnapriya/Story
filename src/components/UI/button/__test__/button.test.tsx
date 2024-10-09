import React from "react";
import { render } from "@testing-library/react";
import {
  ContainedButton,
  OutlinedButton,
  TextButton,
  TonalButton,
} from "../button";

describe("TonalButton component", () => {
  test("renders with default blue tonal variant", () => {
    const { container } = render(<TonalButton />);
  });

  // Add more tests for other variants and customizations
});

describe("ContainedButton component", () => {
  test("renders with default accent-primary contain variant", () => {
    const { container } = render(<ContainedButton />);
  });

  // Add more tests for other variants and customizations
});

describe("OutlinedButton component", () => {
  test("renders with default text-accent outlined variant", () => {
    const { container } = render(<OutlinedButton />);
  });

  // Add more tests for other variants and customizations
});

describe("TextButton component", () => {
  test("renders with default text-accent text variant", () => {
    const { container } = render(<TextButton />);
  });

  // Add more tests for other variants and customizations
});
