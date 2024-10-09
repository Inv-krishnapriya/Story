import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import AppTheme from "../../../theme";
import { ProfessionResponse } from "@/common/types";
import ProfessionModal from "../campaign/creation/ProfessionModal";

describe("ProfessionModal component", () => {
  const professions: ProfessionResponse[] = [
    {
      id: "1",
      name: "Profession 1",
      order: 1,
    },
    {
      id: "2",
      name: "Profession 2",
      order: 2,
    },
    // Add more professions if needed
  ];

  it("should render with all elements", () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <AppTheme>
        <ProfessionModal
          professions={professions}
          open={true}
          handleClose={handleClose}
          checked={[]}
          handleSubmit={handleSubmit}
        />
      </AppTheme>
    );
    const mintSwitch = screen.getByLabelText("item-0");
    fireEvent.click(mintSwitch);
    fireEvent.click(mintSwitch);
    fireEvent.click(screen.getByTestId("submit-button"));
  });
});
