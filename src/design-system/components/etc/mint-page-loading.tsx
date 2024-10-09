import React from 'react';
import { CircularProgress } from '@mui/material';

const ScreenStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
};

const ContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

export type MintPageLoadingProps = {
  size?: 'screen' | 'container';
};

export function MintPageLoading({ size = 'container' }: MintPageLoadingProps) {
  return (
    <div style={size === 'screen' ? ScreenStyle : ContainerStyle}>
      <CircularProgress />
    </div>
  );
}
