import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserSummaryCollapseCard from "../UserSummaryCollapseCard";

describe("UserSummaryCollapseCard", () => {
  const question = {
    questionText: ["Test question"],
    options: [
      { id: 1, text: "Option 1" },
      { id: 2, text: "Option 2" },
    ],
  };
  const languageId = "en";

  it("renders the question text", () => {
    const { getByTestId } = render(
      <UserSummaryCollapseCard question={question} languageId={languageId} />
    );
    const loadingClick = getByTestId("loading-click");
    fireEvent.click(loadingClick);
  });
});
