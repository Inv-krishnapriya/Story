import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AppTheme from "../../../../../theme";
import Page from "../page";

describe("ParticipantsDrawer", () => {
  test("renders participants correctly", () => {
    render(
      <AppTheme>
        <Page />
      </AppTheme>
    );

    // Check if microphone status icons are rendered
  });
});
