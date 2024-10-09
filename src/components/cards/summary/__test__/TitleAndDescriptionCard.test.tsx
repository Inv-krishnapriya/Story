import React from "react";
import { render } from "@testing-library/react";
import TitleAndDescriptionCard from "../TitleAndDescriptionCard";

describe("TitleAndDescriptionCard", () => {
  it("renders the title for the specified language", () => {
    // Mock data
    const titleAndDescription = [
      { languageId: "en", title: "English Title" },
      { languageId: "fr", title: "French Title" },
    ];
    const languageId = "en"; // Language ID for English

    // Render the component
    const { getByText, queryByText } = render(
      <TitleAndDescriptionCard
        titleAndDescription={titleAndDescription}
        languageId={languageId}
      />
    );

    // Assert that the English title is rendered and the French title is not
    expect(getByText("English Title")).toBeInTheDocument();
    expect(queryByText("French Title")).not.toBeInTheDocument();
  });

  it("does not render anything when title for the specified language is not found", () => {
    // Mock data
    const titleAndDescription = [
      { languageId: "en", title: "English Title" },
      { languageId: "fr", title: "French Title" },
    ];
    const languageId = "de"; // Non-existent language ID

    // Render the component
    const { container } = render(
      <TitleAndDescriptionCard
        titleAndDescription={titleAndDescription}
        languageId={languageId}
      />
    );

    // Assert that nothing is rendered
    expect(container.firstChild).toBeNull();
  });
});
