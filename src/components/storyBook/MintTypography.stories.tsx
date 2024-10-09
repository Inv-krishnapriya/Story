// src/components/MintTypography.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintTypography } from '@/design-system';
import AppTheme from '@/theme'; // Adjust the import path for your theme
import { MintConfirmDialog } from '@/design-system';

const meta: Meta<typeof MintTypography> = {
  title: 'Design System/MintTypography',
  component: MintTypography,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: [
          'head-xxl',
          'head-xl',
          'head-l',
          'head-m',
          'head-s',
          'head-xs',
          'body',
          'button',
          'caption',
        ],
      },
      defaultValue: 'body', 
    },
    weight: {
      control: {
        type: 'select',
        options: ['400', '500', '700', '800'],
      },
      defaultValue: '400',
    },
    fontFamily: {
      control: {
        type: 'select',
        options: ['Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Courier New'],
      },
      defaultValue: 'Roboto',
    },
    fontSize: {
      control: {
        type: 'select',
        options: ['12', '14', '16', '18', '20'],
      },
      defaultValue: '16px',
    },
    align: {
      control: {
        type: 'radio',
        options: ['inherit', 'left', 'center', 'right', 'justify'],
      },
      defaultValue: 'inherit',
    },
   
    className: { control: 'text' },
    // style :{ control: 'object' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof MintTypography>;

// Default story
export const Default: Story = {
  render: (args) => (
    <AppTheme>
      <MintTypography {...args}   />
    </AppTheme>
  ),
  args: {
    children: 'This is default typography',
    color: 'primary',
    weight: '400',
    size: 'head-xxl',
    align: 'center',
    fontFamily: 'Roboto', 
    fontSize: '16', 
  },
};
