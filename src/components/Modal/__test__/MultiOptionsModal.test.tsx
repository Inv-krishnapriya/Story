import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MultiQuestionModal from "../campaign/creation/MultiQuestionModal";
import AppTheme from "../../../theme";
import MultiOptionsModal from "../campaign/creation/MultiOptionsModal";
describe("MultiQuestionModal component", () => {
  test("renders properly when open", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiOptionsModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          options={[
            { optionText: "Option 1", order: 1, optionType: 1 },
            { optionText: "Option 2", order: 2, optionType: 1 },
          ]}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("multiOptions"), {
      target: {
        value:
          "hasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMo",
      },
    });
    fireEvent.click(getByTestId("multiOptions-submit"));
  });
  test("renders properly when open", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const maximumOptions = [...Array(50)].map(() => ({
      optionText: "Option 1",
      order: 1,
      optionType: 1,
    }));
    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiOptionsModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          options={maximumOptions}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("multiOptions"), {
      target: {
        value:
          "500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n",
      },
    });
    fireEvent.click(getByTestId("multiOptions-submit"));
  });
  test("renders properly when open", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiOptionsModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          options={[
            { optionText: "Option 1", order: 1, optionType: 1 },
            { optionText: "Option 2", order: 2, optionType: 1 },
          ]}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("multiOptions"), {
      target: {
        value: "500",
      },
    });
    fireEvent.click(getByTestId("multiOptions-submit"));
  });
  test("renders properly when open", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiOptionsModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          options={[
            { optionText: "Option 1", order: 1, optionType: 1 },
            { optionText: "Option 2", order: 2, optionType: 1 },
          ]}
        />
      </AppTheme>
    );

    fireEvent.click(getByTestId("multiOptions-submit"));
  });
  // Add other test cases as needed
});
