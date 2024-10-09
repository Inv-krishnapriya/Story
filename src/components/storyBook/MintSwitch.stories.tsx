// src/components/MintSwitch.stories.tsx
import React,{ useEffect, useState }from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintSwitch } from '@/design-system';
import AppTheme from '@/theme';

const meta: Meta<typeof MintSwitch> = {
  title: 'Design System/MintSwitch',
  component: MintSwitch,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof MintSwitch>;

// Default story for the switch
export const ControlledSwitch: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    useEffect(() => {
        setChecked(args.checked);
      }, [args.checked]); 
  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
    

    return (
      <AppTheme>
        <MintSwitch {...args} checked={checked} onChange={handleChange} />
        <div>{checked ? 'Switch is ON' : 'Switch is OFF'}</div>
      </AppTheme>
    );
  },
  args: {
    checked: false,
    disabled: false,
  },
};
