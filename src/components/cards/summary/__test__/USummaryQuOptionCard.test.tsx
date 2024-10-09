import { render } from "@testing-library/react";
import USummaryQuOptionCard from "../USummaryQuOptionCard";

describe("USummaryQuOptionCard", () => {
  it('renders a disabled Checkbox with default checked when type is not 3 and value is "1"', () => {
    const option = {
      optionsName: [{ languageId: "en", text: "Option 1" }],
      value: "1",
    };
    const { getByRole, queryByRole } = render(
      <USummaryQuOptionCard option={option} languageId="en" type={1} />
    );
    const checkbox = getByRole("checkbox");
    const radio = queryByRole("radio");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
    expect(radio).not.toBeInTheDocument();
  });

  it('renders a disabled Radio with default checked when type is not 3 and value is "1"', () => {
    const option = {
      optionsName: [{ languageId: "en", text: "Option 1" }],
      value: "1",
    };
    const { getByRole, queryByRole } = render(
      <USummaryQuOptionCard option={option} languageId="en" type={2} />
    );
    const radio = getByRole("radio");
    const checkbox = queryByRole("checkbox");

    expect(radio).toBeInTheDocument();
    expect(radio).toBeDisabled();
    expect(radio).toBeChecked();
    expect(checkbox).not.toBeInTheDocument();
  });

  it('renders a TextField with default value "Not Answered" when type is 3 and value is not a valid JSON string', () => {
    const option = {
      optionsName: [{ languageId: "en", text: "Option 1" }],
      value: "This is not a valid JSON string",
    };
    const { getByRole } = render(
      <USummaryQuOptionCard option={option} languageId="en" type={3} />
    );
  });

  it('renders a TextField with default value "Not Answered" when type is 3 and value is an empty array', () => {
    const option = {
      optionsName: [{ languageId: "en", text: "Option 1" }],
      value: ["1", "2"],
    };
    const { getByRole } = render(
      <USummaryQuOptionCard option={option} languageId="en" type={3} />
    );
  });
  it('renders a TextField with default value "Not Answered" when type is 3 and value is an empty array', () => {
    const option = {
      optionsName: [{ languageId: "en", text: "Option 1" }],
      value: "",
    };
    const { getByRole } = render(
      <USummaryQuOptionCard option={option} languageId="en" type={3} />
    );
  });
});
