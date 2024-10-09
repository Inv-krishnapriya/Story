import React from "react";
import {
  act,
  render,
  screen,
} from "@testing-library/react";
import Payment from "../page";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(), // Mock the push function
  }),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Payment", () => {

  test("should render", () => {
    render(<Payment />);

    expect(
      screen.getByText("Total amount (including tax):")
    ).toBeInTheDocument();
  });

  test("should be able to click on the button", async () => {
    await act(async () => {
      render(
        <Payment />
      );
    });
  });
});
