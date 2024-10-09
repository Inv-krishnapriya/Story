// src/components/MintRadio.stories.tsx
import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintRadio } from '@/design-system';
import AppTheme from '@/theme';

const meta: Meta<typeof MintRadio> = {
  title: 'Design System/MintRadio',
  component: MintRadio,
  tags: ['autodocs'],
  argTypes: {
    
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof MintRadio>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked); 
    const [disabled, setDisabled] = useState(args.disabled); 

    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]); 

    useEffect(() => {
      setDisabled(args.disabled); 
    }, [args.disabled]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <AppTheme>
        <MintRadio
          checked={checked}
          onChange={handleChange} 
          disabled={disabled} 
        />
      </AppTheme>
    );
  },
  args: {
    checked: false,
    
    disabled: false, 
  },
};
