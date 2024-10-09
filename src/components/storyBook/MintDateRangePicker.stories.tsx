// src/components/MintDateRangePicker.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { MintDateRangePicker } from '@/design-system';
import AppTheme from '@/theme'; 
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const meta: Meta<typeof MintDateRangePicker> = {
  title: 'Design System/MintDateRangePicker',
  component: MintDateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },

  },
};

export default meta;

type Story = StoryObj<typeof MintDateRangePicker>;

// Default story
export const Default: Story = {
  render: (args) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppTheme>
        <MintDateRangePicker {...args} />
      </AppTheme>
    </LocalizationProvider>
  ),
  args: {
    value: [null, null],  
    disabled: false,
  },
};
