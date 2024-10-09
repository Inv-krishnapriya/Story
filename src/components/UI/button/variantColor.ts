import { ITonalVariant } from "./interface";

const tonalVariants: ITonalVariant[] = [
  {
    variant: "blue",
    style: {
      backgroundColor: `var(--mm-ex-blue-1)`,
      color: `var(--mm-ex-blue-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-blue-1)`,
        color: `var(--mm-ex-blue-4)`,
      },
    },
  },
  {
    variant: "yellow",
    style: {
      backgroundColor: `var(--mm-ex-yellow-1)`,
      color: `var(--mm-ex-yellow-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-yellow-1)`,
        color: `var(--mm-ex-yellow-4)`,
      },
    },
  },
  {
    variant: "teal",
    style: {
      backgroundColor: `var(--mm-ex-teal-1)`,
      color: `var(--mm-ex-teal-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-teal-1)`,
        color: `var(--mm-ex-teal-4)`,
      },
    },
  },
  {
    variant: "gray",
    style: {
      backgroundColor: `var(--mm-ex-gray-1)`,
      color: `var(--mm-ex-gray-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-gray-1)`,
        color: `var(--mm-ex-gray-4)`,
      },
    },
  },
  {
    variant: "red",
    style: {
      backgroundColor: `var(--mm-ex-red-1)`,
      color: `var(--mm-ex-red-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-red-1)`,
        color: `var(--mm-ex-red-4)`,
      },
    },
  },
  {
    variant: "orange",
    style: {
      backgroundColor: `var(--mm-ex-orange-1)`,
      color: `var(--mm-ex-orange-4)`,
      "&:hover": {
        backgroundColor: `var(--mm-ex-orange-1)`,
        color: `var(--mm-ex-orange-4)`,
      },
    },
  },
];

const containVariants: ITonalVariant[] = [
  {
    variant: "accent-primary",
    style: {
      backgroundColor: `var(--mm-surface-accent-primary)`,
      color: `var(--mm-text-light)`,
      "&:hover": {
        backgroundColor: `var(--mm-surface-accent-primary)`,
        color: `var(--mm-text-light)`,
      },
    },
  },
];
const outlinedVariants: ITonalVariant[] = [
  {
    variant: "text-accent",
    style: {
      border: `1px solid var(--mm-border-accent)`,
      color: `var(--mm-text-accent)`,
      backgroundColor: `var(--mm-background-container-bg)`,
      "&:hover": {
        backgroundColor: `var(--mm-background-container-bg)`,
        color: `var(--mm-text-accent)`,
        border: `1px solid var(--mm-border-accent)`,
      },
    },
  },
  {
    variant: "text-medium",
    style: {
      border: `1px solid var(--mm-text-medium)`,
      color: `var( --mm-text-medium)`,
      backgroundColor: `var(--mm-background-container-bg)`,
      "&:hover": {
        backgroundColor: `var(--mm-background-container-bg)`,
        color: `var(--mm-text-medium)`,
        border: `1px solid var(--mm-text-medium)`,
      },
    },
  },
];
const textVariants: ITonalVariant[] = [
  {
    variant: "text-accent",
    style: {
      border: `none`,
      color: `var(--mm-text-accent)`,
      backgroundColor: `var(--mm-background-container-bg)`,
      "&:hover": {
        backgroundColor: `var(--mm-background-container-bg)`,
        color: `var(--mm-text-accent)`,
        border: `none`,
      },
    },
  },
];

export { tonalVariants, containVariants, outlinedVariants, textVariants };
