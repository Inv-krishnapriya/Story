import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MintSelectField } from "@/design-system";
import AppTheme from "@/theme"; // Adjust the import path according to your project structure

const meta: Meta<typeof MintSelectField> = {
  title: "Design System/MintSelectField",
  component: MintSelectField,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    label: { control: "text" },
    required: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof MintSelectField>;

// Default story
export const Default: Story = {
  render: (args) => (
    <AppTheme>
      <MintSelectField {...args} />
    </AppTheme>
  ),
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
      { label: "Option 3", value: "option3", disabled: true },
    ],
    placeholder: "Select an option",
    helperText: "This is a helper text.",
    label: "Select Field",
    required: false,
    error: false,
    disabled: false,
  },
};
