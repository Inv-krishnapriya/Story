import { act, render, screen, waitFor, within } from "@testing-library/react";
import Dropdown from "../Dropdown";
import user from "@testing-library/user-event";

const menu = [
  "dropdown data 1",
  "dropdown data 2",
  "dropdown data 3",
  "dropdown data 4",
];

describe("Dropdown component", () => {
  test("should render dropdown with default value", () => {
    render(<Dropdown menu={menu} defaultValue={menu[0]} />);

    expect(screen.getByText(menu[0])).toBeInTheDocument();
  });

  test("should not display any menu items", () => {
    render(<Dropdown menu={menu} label="" />);

    menu.forEach((x) => {
      expect(screen.queryByText(x)).toBeFalsy();
    });
  });

  test("should display dropdown on clicking the select", async () => {
    await act(async () =>
      render(<Dropdown menu={menu} label="Dropdown Label" />)
    );

    const dropdown = screen.getByRole("combobox", { name: /Dropdown Label/i });

    await waitFor(() => {
      user.click(dropdown);
    });

    menu.forEach((x) => {
      expect(screen.getByText(x)).toBeInTheDocument();
    });
  });

  test("should be able to select a value in the dropdown", async () => {
    const handleChange = () => jest.fn();

    await act(async () =>
      render(
        <Dropdown menu={menu} label="Dropdown Label" onChange={handleChange} />
      )
    );

    const dropdown = screen.getByRole("combobox", { name: /Dropdown Label/i });

    await waitFor(() => user.click(dropdown));

    const listBox = screen.getByRole("listbox");
    // List all options that starts with the text in menu, ie. "dropdown"
    const options = within(listBox).getAllByRole("option", {
      name: new RegExp(`^${menu[0].split(" ")[0]}`),
    });
    expect(options.length).toEqual(menu.length);
    expect(options[0]).toHaveTextContent(menu[0]);

    await waitFor(() => {
      user.click(options[0]);
    });

    expect(screen.getByRole("combobox")).toHaveTextContent(menu[0]);
  });
});
