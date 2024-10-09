import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppCheckbox from "../AppCheckbox";

describe("AppCheckbox", () => {
  test("renders checkbox with label", () => {
    // Arrange
    const label = "Checkbox Label";
    const handleChange = jest.fn();
    const checked = false;
    const name = "checkboxName";
    const value = "checkboxValue";
    const disabled = false;

    // Act
    const { getByLabelText } = render(
      <AppCheckbox
        label={label}
        handleChange={handleChange}
        checked={checked}
        name={name}
        value={value}
        disabled={disabled}
      />
    );

    // Assert
    const checkbox = getByLabelText(label) as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(checked);

    // Simulate change event
    fireEvent.click(checkbox);

    // Assert that handleChange function is called
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), true);
  });

  // Add more test cases as needed for different scenarios
});
