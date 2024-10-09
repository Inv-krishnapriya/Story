import React, { ReactNode } from 'react';
import { styled } from '@mui/material';

type MintPageHeaderProps = {
  children: ReactNode | string;
};

export function MintPageHeader({ children }: MintPageHeaderProps) {
  return <MintPageHeaderStyled>{children}</MintPageHeaderStyled>;
}

const MintPageHeaderStyled = styled('div')(({ theme }) => ({
  marginBottom: theme.mint.spacing.s,
}));
