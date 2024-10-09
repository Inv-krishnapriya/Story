import { render, screen } from "@testing-library/react";
import AppModal from "../AppModal";

describe("App Modal component", () => {
  test("should render if open is true", () => {
    render(<AppModal title="Modal" open />);

    expect(screen.getByText(/Modal/)).toBeInTheDocument();
  });

  test("should not render if open is false", () => {
    render(<AppModal title="Modal" open={false} />);

    expect(screen.queryByText(/Modal/)).toBeFalsy();
  });

  test("should render childrens", () => {
    render(
      <AppModal open>
        <button>Modal button</button>
      </AppModal>
    );

    expect(
      screen.getByRole("button", { name: /Modal button/i })
    ).toBeInTheDocument();
  });
});
