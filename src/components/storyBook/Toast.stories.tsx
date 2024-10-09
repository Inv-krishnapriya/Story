// src/components/Toast.stories.tsx
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { successToast, errorToast, infoToast } from '@/design-system';
import { MintToastContainer, MintButton } from '@/design-system';
import AppTheme from '@/theme';

const meta: Meta = {
  title: 'Design System/Toast',
  component: MintToastContainer,
};

export default meta;

export const ToastExample = () => {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const handleShowToast = (type: 'success' | 'error' | 'info') => {
    setToastMessage(type);
    setOpen(true);
    
    setTimeout(() => {
      setOpen(false);
      setToastMessage(null);
    }, 10000);
    switch (type) {
      case 'success':
        successToast("This is a success message!");
        break;
      case 'error':
        errorToast("This is an error message!");
        break;
      case 'info':
        infoToast("This is an info message!");
        break;
    }
  };


  return (
    <AppTheme>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <MintButton onClick={() => handleShowToast('success')}>Show Success Toast</MintButton>
        <MintButton onClick={() => handleShowToast('error')}>Show Error Toast</MintButton>
        <MintButton onClick={() => handleShowToast('info')}>Show Info Toast</MintButton>
      </div>

      <MintToastContainer  /> 
    </AppTheme>
  );
};
