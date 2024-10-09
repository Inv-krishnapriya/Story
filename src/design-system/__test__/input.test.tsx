import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for better assertions
import {MintButton} from '../components/input/mint-button'
import {MintCheckbox} from '../components/input/mint-checkbox'
import AppTheme from '../../theme';
import { MintIconButton, MintRadio, MintSelectField, MintSwitch, MintTextField, MintTypography } from '..';

describe('Mint Components', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<AppTheme>
      <MintButton>Click me</MintButton>
    </AppTheme>);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-root');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with default props', () => {
    const { getByLabelText } = render(<AppTheme><MintCheckbox /></AppTheme>);
    const checkbox = getByLabelText('MintCheckbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });
  it('renders with default props', () => {
    const { getByLabelText } = render(<AppTheme><MintCheckbox checked/></AppTheme>);
    const checkbox = getByLabelText('MintCheckbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('renders with default props', () => {
    const { getByRole } = render(<AppTheme><MintIconButton /></AppTheme>);
    const iconButton = getByRole('button');

    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass('MuiButtonBase-root');
  });
  it('renders with default props', () => {
    const { getByRole } = render(<AppTheme><MintRadio /></AppTheme>);
    const radio = getByRole('radio');

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('type', 'radio');
  });
  it('renders with default props', () => {
    const { getByRole } = render(<AppTheme><MintRadio checked/></AppTheme>);
    const radio = getByRole('radio');

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('type', 'radio');
  });
  it('renders with default props', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
    ];
    const { getByRole } = render(<AppTheme><MintSelectField options={options} /></AppTheme>);
    const select = getByRole('combobox');

    expect(select).toBeInTheDocument();
   
   
  });
  it('renders with default props', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
    ];
    const { getByRole } = render(<AppTheme><MintSelectField options={options} label="test" helperText="test" required/></AppTheme>);
    const select = getByRole('combobox');

    expect(select).toBeInTheDocument();
   
   
  });
  it('renders with default props', () => {
    const { getByRole } = render(
      <AppTheme>
        <MintSwitch />
      </AppTheme>
    );
   
  });
  it('renders with default props MintTextField', () => {
    const { getByRole } = render(<AppTheme><MintTextField /></AppTheme>);
    const textField = getByRole('textbox');

    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('type', 'text');
   
  });
  it('renders with default props MintTextField', () => {
  render(<AppTheme><MintTextField label="test"/></AppTheme>);
   
  });
  it('renders with default theme', () => {
    const { getByText } = render(
      <AppTheme>
        <MintTypography size="body" weight="400">
          Test Text 
        </MintTypography>
        <MintTypography size="head-xxl" weight="500">
          Test Text 1
        </MintTypography>
        <MintTypography size="head-l" weight="700">
          Test Text 2
        </MintTypography>
        <MintTypography size="head-xl" weight="400">
          Test Text 3
        </MintTypography>
        <MintTypography size="head-m" weight="400">
          Test Text 4
        </MintTypography>
        <MintTypography size="head-s" weight="400">
          Test Text 5
        </MintTypography>
        <MintTypography size="head-xs" weight="400">
          Test Text 6
        </MintTypography>
        <MintTypography size="button" weight="400">
          Test Text 7
        </MintTypography>
        <MintTypography size="caption" weight="400">
          Test Text 8
        </MintTypography>
      </AppTheme>
    );

    const textElement = getByText('Test Text');

    // Assert the rendered text element has the correct styles
    expect(textElement).toHaveStyle({
   
      fontWeight: '400', // Replace with the expected 400 font weight
      // Add more style assertions as needed
    });
  });
});
