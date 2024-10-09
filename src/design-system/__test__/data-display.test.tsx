// Example test file
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AppTheme from '../../theme';
import { MintBadge, MintChip, MintTooltip } from '..';

describe('MintBadge Component', () => {
  it('renders with default props', () => {
    render(
      <AppTheme>
        <MintBadge />
      </AppTheme>
    );
    // Your test logic here
  });

  it('renders with custom count and variant', () => {
    render(
      <AppTheme>
        <MintBadge count={5} variant="tonal" />
      </AppTheme>
    );
    // Your test logic here
  });
  it('renders with default props', () => {
    render( <AppTheme><MintChip title='Default Chip'></MintChip></AppTheme>);
    
    // Add more assertions as needed
  });

  it('renders with selected prop', () => {
    render(<AppTheme><MintChip title='Selected Chip' selected></MintChip></AppTheme>);
    
  });
  it('renders with default props', () => {
    render(
      <AppTheme>
        <MintTooltip title="Tooltip Content">
          <div>Content that triggers the tooltip</div>
        </MintTooltip>
      </AppTheme>
    );

    // Your test logic here
    // You can use testing-library queries to assert certain behaviors or content
    // For example, you can check if the tooltip content is rendered when the trigger content is hovered
    const triggerContent = screen.getByText('Content that triggers the tooltip');
    fireEvent.mouseOver(triggerContent);
   
  
  });
  
  // Add more test cases as needed
});
