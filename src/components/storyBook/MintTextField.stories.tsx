// src/components/MintTextField.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintTextField } from '@/design-system';
import AppTheme from '@/theme';

const meta: Meta<typeof MintTextField> = {
  title: 'Design System/MintTextField',
  component: MintTextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['outlined', 'filled', 'standard'], 
      },
    },
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'error'],
      },
      defaultValue: 'primary',
    },
   
    onChange: { action: 'changed' },
    required: { control: 'boolean' },
    hidePasswordShowIcon: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    error: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof MintTextField>;

// Default story
export const Default: Story = {
  render: (args) => {
    const [inputValue, setInputValue] = useState(args.value || ''); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value); 
     
    };

    return (
      <AppTheme>
        <MintTextField {...args} value={inputValue} onChange={handleChange} /> 
      </AppTheme>
    );
  },
  args: {
    label: 'Email',
    type: 'text',
    required: false,
    hidePasswordShowIcon: false,
    hideLabel: false,
    error: false,
    value: '',
   
  },
};
