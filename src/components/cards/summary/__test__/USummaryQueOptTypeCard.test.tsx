import { render } from "@testing-library/react";
import USummaryQueOptTypeCard from "../USummaryQueOptTypeCard";

describe("USummaryQueOptTypeCard", () => {
  it('renders a Checkbox when value is "0" and optionType is 1', () => {
    const { getByRole } = render(
      <USummaryQueOptTypeCard value="0" optionType={1} />
    );
    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
  });

  it('renders a Radio when value is "0" and optionType is not 1', () => {
    const { getByRole } = render(
      <USummaryQueOptTypeCard value="0" optionType={2} />
    );
    const radio = getByRole("radio");

    expect(radio).toBeInTheDocument();
    expect(radio).toBeDisabled();
  });

  it('renders a Checkbox with default checked when value is not "0" and optionType is 1', () => {
    const { getByRole } = render(
      <USummaryQueOptTypeCard value="1" optionType={1} />
    );
    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
  });

  it('renders a Radio with default checked when value is not "0" and optionType is not 1', () => {
    const { getByRole } = render(
      <USummaryQueOptTypeCard value="1" optionType={2} />
    );
    const radio = getByRole("radio");

    expect(radio).toBeInTheDocument();
    expect(radio).toBeDisabled();
    expect(radio).toBeChecked();
  });
});
