import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BackButton from "../BackButton";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

describe("BackButton component", () => {
  test("renders label correctly", () => {
    const { getByText } = render(<BackButton label="Back" path="/" />);
    expect(getByText("Back")).toBeInTheDocument();
  });

  test("navigates to the specified path when clicked", () => {
    const mockNavigate = jest.fn();
    jest.mock("next/navigation", () => ({
      useRouter: () => ({
        push: mockNavigate,
      }),
    }));

    const { getByTestId } = render(<BackButton label="Back" path="/path" />);
    fireEvent.click(getByTestId("back-button"));
  });

  test("renders with custom styles", () => {
    const { container } = render(
      <BackButton label="Back" path="/" sx={{ color: "red" }} />
    );
    expect(container.firstChild).toHaveStyle("color: red");
  });
});
