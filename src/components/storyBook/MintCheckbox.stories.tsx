
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MintCheckbox } from '@/design-system';
import AppTheme from '@/theme';

const meta: Meta<typeof MintCheckbox> = {
  title: 'Design System/MintCheckbox',
  component: MintCheckbox,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    // indeterminate: { control: 'boolean' },
    label: { control: 'text' },
   
     
  
  },
};

export default meta;

type Story = StoryObj<typeof MintCheckbox>;
export const ControlledInput: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);  
    React.useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <AppTheme>
        <MintCheckbox {...args} checked={checked} onChange={handleChange} />
      </AppTheme>
    );
  },
  args: {
    label: 'Controlled Checkbox',
    checked: true,
    disabled: false,
    color: "secondary",
  },
};