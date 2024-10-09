import AppTheme from "@/theme";
import { render, screen } from "@testing-library/react";
import Section from "../terms/Section";

const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

const dummyTitle = "Hello World";
const dummyBaseKey = "baseKey";
const simpleContent = [1];
const complexContent = [[1, 2, 3]];

describe("Section Component", () => {
  it("Should render properly", () => {
    renderWithTheme(
      <Section
        title={dummyTitle}
        baseKey={dummyBaseKey}
        contents={simpleContent}
      />
    );

    expect(
      screen.getByText(`${dummyBaseKey}.${dummyTitle}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${dummyBaseKey}.${simpleContent[0]}`)
    ).toBeInTheDocument();
  });

  it("Should render properly", () => {
    renderWithTheme(
      <Section
        title={dummyTitle}
        baseKey={dummyBaseKey}
        contents={simpleContent}
      />
    );

    expect(
      screen.getByText(`${dummyBaseKey}.${dummyTitle}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${dummyBaseKey}.${simpleContent[0]}`)
    ).toBeInTheDocument();
  });
});
