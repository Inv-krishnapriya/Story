import { render } from "@testing-library/react";
import UserSummaryQuestionCard from "../UserSummaryQuestionCard";

describe("UserSummaryQuestionCard", () => {
  it("renders InputLabel components based on the provided text array and languageId", () => {
    const text = [
      { text: "Question 1", languageId: "en" },
      { text: "Question 2", languageId: "en" },
      { text: "Question 3", languageId: "jp" },
    ];
    const languageId = "en";

    const { getAllByRole } = render(
      <UserSummaryQuestionCard text={text} languageId={languageId} />
    );
  });
});
