// src/components/MintButton.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintButton } from '@/design-system';
import AppTheme from '@/theme';
import { Button } from '@mui/material';

const meta: Meta<typeof MintButton> = {
  title: 'Design System/MintButton',
  component: MintButton,
  tags:["autodocs"],
  argTypes: {
    onClick: { action: 'clicked' },
    loading: { control: 'boolean' },
    variant: {
      control: {
        type: 'radio',
        options: ['contained', 'outlined', 'text'],
      },
    },
    color: {
      control: {
        type: 'radio',
        options: [ 'primary', 'secondary', 'error' ],
      },
      defaultValue: 'primary', 
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large'], 
      },
      defaultValue: 'medium', 
    }
  },
};

  
export default meta;

type Story = StoryObj<typeof MintButton>;

// Default story
export const Default: Story = {
  render: (args) => <AppTheme><MintButton {...args} /></AppTheme>,
  args: {
    children: 'Click Me',
    disabled: false,
    loading: false,
    // color: 'primary', 
    size:'medium',  
  },
};