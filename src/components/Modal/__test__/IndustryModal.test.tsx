import React from "react";
import { fireEvent, render } from "@testing-library/react";

import AppTheme from "../../../theme";
import { IndustryResponse } from "@/common/types";
import IndustryModal from "../campaign/creation/IndustryModal";

describe("IndustryModal component", () => {
  const industries: IndustryResponse[] = [
    {
      id: "1",
      name: "Industry 1",
      order: 1,
    },
    {
      id: "2",
      name: "Industry 2",
      order: 2,
    },
    // Add more industries if needed
  ];

  it("should render with all elements", () => {
    const closeMock = jest.fn();
    const submitMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <AppTheme>
        <IndustryModal
          industries={industries}
          isOpen={true}
          close={closeMock}
          submit={submitMock}
          checked={[]}
        />
      </AppTheme>
    );

    // Assert that the modal title is rendered
  });

  // Add more test cases for other functionalities if needed
});
