import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MultiQuestionModal from "../campaign/creation/MultiQuestionModal";
import AppTheme from "../../../theme";
describe("MultiQuestionModal component", () => {
  test("renders properly when open", () => {
    const mockQuestions = [
      {
        questionText: "Question 1",
        type: 1,
        isRequired: true,
        order: 1,
        sequence: 1,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
      {
        questionText: "Question 2",
        type: 1,
        isRequired: true,
        order: 2,
        sequence: 2,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
    ];

    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiQuestionModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          questions={mockQuestions}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("input-testid"), {
      target: {
        value:
          "hasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMohasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMoreThan100LengthhasStringWithMo",
      },
    });
    fireEvent.click(getByTestId("submit-button"));
  });
  test("renders properly when open", () => {
    const mockQuestions = [
      {
        questionText: "Question 1",
        type: 1,
        isRequired: true,
        order: 1,
        sequence: 1,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
      {
        questionText: "Question 2",
        type: 1,
        isRequired: true,
        order: 2,
        sequence: 2,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
    ];
    const maximumMockData: any = [...Array(10)]?.map(() => ({
      questionText: "",
      type: 1,
      isRequired: true,
      order: 1,
      sequence: 1,
      options: [
        { optionsName: "", order: 1, optionType: 1 },
        { optionsName: "", order: 2, optionType: 1 },
      ],
    }));
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiQuestionModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          questions={maximumMockData}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("input-testid"), {
      target: {
        value:
          "500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n500\n",
      },
    });
    fireEvent.click(getByTestId("submit-button"));
  });
  test("renders properly when open", () => {
    const mockQuestions = [
      {
        questionText: "Question 1",
        type: 1,
        isRequired: true,
        order: 1,
        sequence: 1,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
      {
        questionText: "Question 2",
        type: 1,
        isRequired: true,
        order: 2,
        sequence: 2,
        options: [
          { optionText: "Option 1", order: 1, optionType: 1 },
          { optionText: "Option 2", order: 2, optionType: 1 },
        ],
      },
    ];
    const maximumMockData: any = [...Array(10)]?.map(() => ({
      questionText: "",
      type: 1,
      isRequired: true,
      order: 1,
      sequence: 1,
      options: [
        { optionsName: "", order: 1, optionType: 1 },
        { optionsName: "", order: 2, optionType: 1 },
      ],
    }));
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <AppTheme>
        <MultiQuestionModal
          open={true}
          close={handleClose}
          handleFormSubmit={handleSubmit}
          questions={maximumMockData}
        />
      </AppTheme>
    );
    fireEvent.change(getByTestId("input-testid"), {
      target: {
        value: "500",
      },
    });
    fireEvent.click(getByTestId("submit-button"));
  });
  // Add other test cases as needed
});
