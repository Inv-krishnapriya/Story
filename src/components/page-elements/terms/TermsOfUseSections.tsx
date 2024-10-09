import Section from "@/app/app/(app-policies)/terms/Section";
import { MintTypography } from "@/design-system";
import React from "react";

/**
 * The `sections` array contains objects representing different sections of content.
 * Each object has the following structure:
 *
 * {
 *   contents: (number | (number | string)[])[] // The content of the section
 * }
 *
 * The `contents` array can have the following structures:
 *
 * 1. If `contents` is an array of numbers, it represents a simple list.
 *    Each number is a key in the translation file, and the corresponding translation
 *    will be rendered as a list item.
 *
 * 2. If `contents` is an array of array, where the nested array's first element is a string,
 *    and the rest of the elements are numbers, it represents
 *    a main point with sub-points.
 *
 *    Example:
 *    [1, 2, [
 *      'main', // Main point (key in the translation file)
 *      2, 3 // Sub-points (keys or custom strings)
 *    ], 4 ]
 *
 * The actual content (translations) for the keys will be fetched from the translation file.
 */
const sections = [
  {
    content: [1, 2, 3],
  },
  {
    content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    content: [1],
  },
  {
    content: [1, 2, 3],
  },
  {
    content: [1, 2, ["main", 1, 2, 3], 4, 5],
  },
  {
    content: [1, 2, 3, 4, ["main", 1, 2, 3]],
  },
  {
    content: [1, 2, 3, 4, 5, 6],
  },
  {
    content: [1, 2, 3, 4, 5],
  },
  {
    content: [1, 2, 3, 4, 5, 6],
  },
  {
    content: [
      [
        "main",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
      ],
      ["main", 1, 2, 3, 4],
      3,
    ],
  },
  {
    content: [["main", 1, 2, 3, 4, 5], 2, 3],
  },
  {
    content: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    content: [1, 2],
  },
  {
    content: [1],
  },
  {
    content: [1, ["main", 1, 2, 3, 4], 3, 4, 5, 6],
  },
  {
    content: [["main", 1, 2, 3, 4, 5], ["main", 1, 2, 3, 4, 5], 3, 4],
  },
  {
    content: [1, 2],
  },
  {
    content: [1, 2],
  },
  {
    content: [1],
  },
  {
    content: [1],
  },
  {
    content: [1, 2, 3, 4],
  },
  {
    content: [1, 2],
  },
  {
    content: [1, 2, ["main", 1, 2, 3, 4], 4],
  },
  {
    content: [["main", 1, 2, 3], 2, 3],
  },
  {
    content: [1],
  },
  {
    content: [1],
  },
  {
    content: [1, 2, 3],
  },
];

interface TermsOfUseSectionsProp {
  establishedDate: string;
}

const TermsOfUseSections: React.FC<TermsOfUseSectionsProp> = (props) => {
  const { establishedDate } = props;

  return (
    <>
      {sections.map((section, index) => (
        <Section
          key={index}
          contents={section.content}
          title="title"
          baseKey={`terms-of-use.section.${index + 1}`}
        />
      ))}
      <section>
        <MintTypography size="body" weight="400">
          {establishedDate}
        </MintTypography>
      </section>
    </>
  );
};

export default TermsOfUseSections;
